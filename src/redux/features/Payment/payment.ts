import { baseApi } from "../../api/baseApi";

export const PaymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createpayment: builder.mutation({
      query: (paymentData) => {
        return {
          url: "/payment/create-payment",
          method: "POST",
          body: paymentData,
        };
      },
      invalidatesTags: ["payment"],
    }),
    getAllpayments: builder.query({
      query: () => {
        return {
          url: "/payment/get-all-payments",
          method: "GET",
        };
      },
      providesTags: ["payment"],
    }),
    getSinglepayment: builder.query({
      query: (id: string) => ({
        url: `/payment/${id}`,
        method: "GET",
      }),
      providesTags: ["payment"],
    }),

    updatepayment: builder.mutation({
      query: ({ id, paymentData }) => {
        console.log(id, paymentData);
        return {
          url: `/payment/${id}`,
          method: "PUT",
          body: paymentData,
        };
      },
      invalidatesTags: ["payment"],
    }),
    deletepayment: builder.mutation({
      query: (id: string) => ({
        url: `/payment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["payment"],
    }),
  }),
});
