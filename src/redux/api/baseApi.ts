import {
  // BaseQueryApi,
  BaseQueryFn,
  createApi,
  // DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logOut, setUser } from "../features/Auth/AuthSlice";

// Define API URLs
const API_BASE_URL = "https://ecomerce-backend-expressjs.vercel.app/api";
const REFRESH_TOKEN_URL = `${API_BASE_URL}/auth/refresh-token`;

// Base query with API configuration
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const rawToken = (getState() as RootState)?.auth?.token;

    // Parse token if it's stringified
    const token =
      typeof rawToken === "string" && rawToken.startsWith("{")
        ? JSON.parse(rawToken)
        : rawToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    } else {
      console.warn("No valid token found in state");
    }
    return headers;
  },
});

// Base query with token refresh logic
const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  unknown,
  unknown
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    console.warn("Access token expired, attempting to refresh...");
    try {
      const res = await fetch(REFRESH_TOKEN_URL, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(
          `Refresh token request failed with status: ${res.status}`
        );
      }

      const refreshData = await res.json();

      if (refreshData?.data?.accessToken) {
        const user = (api.getState() as RootState).auth.user;

        if (user) {
          // Update token in state
          api.dispatch(
            setUser({
              user,
              token: refreshData.data.accessToken, // Store as a plain string
            })
          );

          // Retry original request with new token
          result = await baseQuery(args, api, extraOptions);
        } else {
          console.warn("User not found in state during token refresh");
        }
      } else {
        console.error("No access token received during token refresh");
        api.dispatch(logOut());
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      api.dispatch(logOut());
    }
  }

  return result;
};

// Create the base API instance
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["user", "product", "reviews", "shop", "payment", "cart", "order"],
  endpoints: () => ({}),
});
