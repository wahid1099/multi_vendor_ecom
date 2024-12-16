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
    const token = (getState() as RootState)?.auth?.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
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
    try {
      const res = await fetch(REFRESH_TOKEN_URL, {
        method: "POST",
        credentials: "include",
      });

      const refreshData = await res.json();

      if (refreshData?.data?.accessToken) {
        const user = (api.getState() as RootState).auth.user;

        if (user) {
          // Update token in state
          api.dispatch(
            setUser({
              user,
              token: refreshData.data.accessToken,
            })
          );

          // Retry original request with new token
          result = await baseQuery(args, api, extraOptions);
        }
      } else {
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
  tagTypes: ["user", "product", "reviews", "shop", "transection", "cart"],
  endpoints: () => ({}),
});
