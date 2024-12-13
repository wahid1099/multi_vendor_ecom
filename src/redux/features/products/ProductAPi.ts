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
    getAllCars: builder.query({
      query: ({ name, carType, price, location }) => {
        const params = new URLSearchParams();
        if (name) {
          params.append("name", name);
        }
        if (carType) {
          params.append("carType", carType);
        }
        if (price > 0) {
          params.append("price", price);
        }
        if (location) {
          params.append("location", location);
        }

        return {
          url: "/cars",
          method: "GET",
          params,
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
    updateCar: builder.mutation({
      query: ({ id, carData }) => {
        console.log(id, carData);
        return {
          url: `/cars/${id}`,
          method: "PUT",
          body: carData,
        };
      },
      invalidatesTags: ["product"],
    }),
    deleteCar: builder.mutation({
      query: (id: string) => ({
        url: `/cars/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});
