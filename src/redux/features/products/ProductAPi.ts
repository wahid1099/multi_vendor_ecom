import { baseApi } from "../../api/baseApi";

export const ProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (productData) => {
        return {
          url: "/product",
          method: "POST",
          body: productData,
        };
      },
      invalidatesTags: ["product"],
    }),
    getAllProdcuts: builder.query({
      query: () => {
        return {
          url: "/",
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),

    getAllVendorProducts: builder.query({
      query: () => {
        return {
          url: "product/vendor-products",
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),

    getSingleCars: builder.query({
      query: (id: string) => ({
        url: `/cars/${id}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    searchCarsForBooking: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args?.carType) {
          params.append("carType", args.carType);
        }
        if (args?.features) {
          params.append("features", args.features);
        }
        if (args?.seats) {
          params.append("seats", args.seats);
        }

        return {
          url: "/product/search-cars",
          method: "product",
          params,
        };
      },
      providesTags: ["product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ProductData }) => {
        return {
          url: `/product/${id}`,
          method: "PATCH",
          body: ProductData,
        };
      },
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});
