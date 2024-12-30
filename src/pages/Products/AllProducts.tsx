import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ProductApi } from "../../redux/features/products/ProductAPi";
import "./product.css";
import { ProductResponse } from "../../redux/features/products/ProductAPi";

const AllProducts: React.FC = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";

  const [page, setPage] = useState(1);
  const [limit] = useState(12); // 4 products per row
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const navigate = useNavigate();

  const { data, isLoading, isError } = ProductApi.useGetAllBrowseProductsQuery({
    page,
    limit,
    search,
    category,
    minPrice,
    maxPrice,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return <div>Failed to load products. Please try again later.</div>;
  }

  const { data: products = [], meta } = data as ProductResponse;
  const { page: currentPage, limit: itemsPerPage, total } = meta || {};
  const totalPages = Math.ceil(total / itemsPerPage);

  return (
    <div className="container mx-auto p-4">
      {/* Filters Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        {/* Search Input */}
        <div className="flex items-center w-full md:w-1/2 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-4 w-full mr-4"
          />
          <button
            onClick={() => setPage(1)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {/* Price Filters */}
        <div className="flex items-center space-x-4">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice ?? ""}
            onChange={(e) =>
              setMinPrice(e.target.value ? Number(e.target.value) : undefined)
            }
            className="border border-gray-300 rounded-md py-2 px-4 w-28"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice ?? ""}
            onChange={(e) =>
              setMaxPrice(e.target.value ? Number(e.target.value) : undefined)
            }
            className="border border-gray-300 rounded-md py-2 px-4 w-28"
          />
          <button
            onClick={() => setPage(1)}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Products List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="rounded-lg overflow-hidden shadow-md bg-white hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer relative"
            onClick={() => navigate(`/product/${product._id}`)}
          >
            {/* Image Container */}
            <div className="relative group">
              <img
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                src={product.images[0]}
                alt={product.name}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-lg font-semibold tracking-wide">
                  View Details
                </span>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800 mb-2 truncate">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {product.description.length > 40
                  ? `${product.description.substring(0, 40)}...`
                  : product.description}
              </p>
              <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded">
                ${product.price}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded-md ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setPage((prev) => (prev < totalPages ? prev + 1 : prev))
          }
          disabled={page === totalPages}
          className={`px-4 py-2 rounded-md ${
            page === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProducts;
