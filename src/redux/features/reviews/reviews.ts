import { baseApi } from "../../api/baseApi";

export const ReviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (reviewDatqa) => {
        return {
          url: "/reivew/create-review",
          method: "POST",
          body: reviewDatqa,
        };
      },
      invalidatesTags: ["review"],
    }),
    getAllreviews: builder.query({
      query: () => {
        return {
          url: "/reivew",
          method: "GET",
        };
      },
      providesTags: ["review"],
    }),
    updateReviews: builder.query({
      query: (id: string) => ({
        url: `/review/${id}`,
        method: "PATCH",
      }),
      providesTags: ["review"],
    }),

    deleteReview: builder.mutation({
      query: (id: string) => ({
        url: `/review/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["review"],
    }),
  }),
});
