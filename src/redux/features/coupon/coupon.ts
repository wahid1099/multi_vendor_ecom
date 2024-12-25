import { baseApi } from "../../api/baseApi";

export const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCoupon: builder.mutation({
      query: (CouponData) => {
        return {
          url: "/coupon/create-coupon",
          method: "POST",
          body: CouponData,
        };
      },
      invalidatesTags: ["coupon"],
    }),
    getAllCoupon: builder.query({
      query: () => {
        return {
          url: "/coupon",
          method: "GET",
        };
      },
      providesTags: ["coupon"],
    }),

    getCouponById: builder.query({
      query: (id: string) => {
        return {
          url: `/coupon/${id}`,
          method: "GET",
        };
      },
      providesTags: ["coupon"],
    }),

    updateCoupon: builder.mutation({
      query: ({ id, CouponData }) => {
        return {
          url: `/coupon/update-coupon/${id}`,
          method: "PATCH",
          body: CouponData,
        };
      },
      invalidatesTags: ["coupon"],
    }),
    deleteCoupon: builder.mutation({
      query: (id: string) => ({
        url: `/coupon/delete-coupon/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["coupon"],
    }),
  }),
});
