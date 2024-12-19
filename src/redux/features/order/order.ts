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
    getAllorders: builder.query({
      query: () => {
        return {
          url: "/user-order",
          method: "GET",
        };
      },
      providesTags: ["order"],
    }),
    getSingleorder: builder.query({
      query: (id: string) => ({
        url: `/order/${id}`,
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
