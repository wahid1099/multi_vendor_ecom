import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
// import { logOut, setUser } from "../features/Auth/AuthSlice";

// Base query configuration with the API base URL
const baseQuery = fetchBaseQuery({
  baseUrl: "https://car-rental-backend-assingment.vercel.app/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState)?.auth?.token; // Accessing the token from state

    if (token) {
      headers.set("Authorization", `Bearer ${token}`); // Setting the Authorization header
    }
    return headers;
  },
});

// Create a custom base query with refresh token logic
const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = async (args, api, extraOptions): Promise<any> => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // Attempt to refresh the token
    // const res = await fetch(
    //   "https://car-rental-backend-assingment.vercel.app/api/auth/refresh-token",
    //   {
    //     method: "POST",
    //     credentials: "include",
    //   }
    // );
    // const user = (api.getState() as RootState).auth.user;
    // const data = await res.json(); // Parse the JSON response
    // if (data?.data?.accessToken && user !== null) {
    //   // Get the current user
    //   api.dispatch(
    //     setUser({
    //       user,
    //       token: data.data.accessToken, // Update the token in the state
    //     })
    //   );
    //   result = await baseQuery(args, api, extraOptions); // Retry the original request
    // } else {
    //   api.dispatch(logOut()); // Log out if no access token is received
    // }
  }

  return result;
};

// Create the base API instance with tag types
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["user", "booking", "car", "feedback"],
  endpoints: () => ({}),
});
