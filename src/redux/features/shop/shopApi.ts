import { baseApi } from "../../api/baseApi";

export const ShopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createShop: builder.mutation({
      query: (ShopData) => {
        return {
          url: "/shop",
          method: "POST",
          body: ShopData,
        };
      },
      invalidatesTags: ["shop"],
    }),
    getAllShops: builder.query({
      query: () => {
        return {
          url: "/shop",
          method: "GET",
        };
      },
      providesTags: ["shop"],
    }),
    getSingleShop: builder.query({
      query: (id: string) => ({
        url: `/shop/${id}`,
        method: "GET",
      }),
      providesTags: ["shop"],
    }),

    updateShop: builder.mutation({
      query: ({ id, shopData }) => {
        console.log(id, shopData);
        return {
          url: `/shop/${id}`,
          method: "PUT",
          body: shopData,
        };
      },
      invalidatesTags: ["shop"],
    }),
    deleteShop: builder.mutation({
      query: (id: string) => ({
        url: `/shop/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["shop"],
    }),
  }),
});
