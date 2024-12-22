import { baseApi } from "../../api/baseApi";

export const OrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => {
        return {
          url: "/order/createorder",
          method: "POST",
          body: orderData,
        };
      },
      invalidatesTags: ["order"],
    }),
    getUserorders: builder.query({
      query: () => {
        return {
          url: "/order/user-order",
          method: "GET",
        };
      },
      providesTags: ["order"],
    }),

    getAllAdminorders: builder.query({
      query: () => {
        return {
          url: "/order/All-orders-admin",
          method: "GET",
        };
      },
      providesTags: ["order"],
    }),
    getVendororders: builder.query({
      query: () => ({
        url: `/order/vendor-orders`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),

    updateorder: builder.mutation({
      query: ({ id, orderData }) => {
        console.log(id, orderData);
        return {
          url: `/order/${id}`,
          method: "PUT",
          body: orderData,
        };
      },
      invalidatesTags: ["order"],
    }),
    deleteorder: builder.mutation({
      query: (id: string) => ({
        url: `/order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order"],
    }),
  }),
});
