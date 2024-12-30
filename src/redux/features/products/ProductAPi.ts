import { baseApi } from "../../api/baseApi";
import { TProduct } from "@/type/global.type";

interface BrowseProductsQuery {
  page?: number;
  limit?: number;
  search?: string;
}

interface ProductResponse {
  success: boolean;
  data: TProduct[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}

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
    getAllAdminProdcuts: builder.query({
      query: () => {
        return {
          url: "/product/all-products-admin",
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),

    getAllVendorProducts: builder.query({
      query: () => {
        return {
          url: "/product/vendor-products",
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),

    getAllBrowseProducts: builder.query<ProductResponse, BrowseProductsQuery>({
      query: ({ page = 1, limit = 10, search = "" } = {}) => {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
          search,
        });
        return {
          url: `/product/browseproducts?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),

    getSingleProduct: builder.query({
      query: (id: string) => ({
        url: `/product/${id}`,
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
