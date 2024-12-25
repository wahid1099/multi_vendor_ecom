import { baseApi } from "../../api/baseApi";
export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getMe: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    deleteUserData: builder.mutation({
      query: (userId: string) => ({
        url: `/auth/delete-user/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/user/update-my-profile/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    suspendVednor: builder.mutation({
      query: (vendorId: string) => {
        return {
          url: `/user/suspend-vendor/${vendorId}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["user"],
    }),
    toggleUserDeletation: builder.mutation({
      query: (userId: string) => {
        return {
          url: `/user/deactivate-user/${userId}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["user"],
    }),
    toggleFollowShop: builder.mutation({
      query: (shopId: string) => {
        return {
          url: `/user/toggle-followshop/${shopId}`,
          method: "POST",
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});
