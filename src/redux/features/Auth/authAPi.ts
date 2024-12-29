import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (userInfo) => ({
        url: "/user/create-user",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["user"],
    }),
    login: builder.mutation({
      query: (loginInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: loginInfo,
      }),
      invalidatesTags: ["user"],
    }),

    getMe: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (userId: string) => ({
        url: `/user/delete-user/${userId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["user"],
    }),

    updateUser: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/user/update-my-profile",
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["user"],
    }),
    forgotPassword: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/forgot-password",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["user"],
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password", // Ensure this matches your backend route
        method: "PATCH", // PATCH is appropriate for updating a specific resource
        body: {
          id: data.userId,
          token: data.token,
          password: data.password,
        },
        headers: {
          "Content-Type": "application/json", // Ensure backend accepts JSON requests
        },
      }),
      invalidatesTags: ["user"], // This invalidates cached data for `user` tag
    }),
  }),
});
