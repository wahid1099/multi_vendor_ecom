import React, { useState, useEffect } from "react";
import { ProductApi } from "../../redux/features/products/ProductAPi";
import ProductCard from "./ProductCard";
import { TProduct } from "@/type/global.type";

const BrowseProducts: React.FC = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<TProduct[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isFetching } =
    ProductApi.useGetAllBrowseProductsQuery({
      page,
      limit: 12,
      search: searchTerm,
    });

  useEffect(() => {
    if (data) {
      if (page === 1) {
        setProducts(data.data);
      } else {
        setProducts((prev) => [...prev, ...data.data]);
      }
      setHasMore(data.data.length === 12); // Check if we received a full page
    }
  }, [data, page]);

  const handleScroll = () => {
    const scrollPosition =
      window.innerHeight + document.documentElement.scrollTop;
    const scrollThreshold = document.documentElement.scrollHeight - 100; // Add buffer

    if (scrollPosition >= scrollThreshold) {
      if (!isFetching && hasMore) {
        setPage((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching, hasMore]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page when searching
    setProducts([]); // Clear existing products
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
          Browse Products
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover our amazing collection of products with unbeatable quality
          and prices.
        </p>
        <div className="max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-3 pl-12 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm shadow-lg"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {products.length === 0 && !isLoading && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No products found
          </h3>
          <p className="text-gray-500">
            Try a different search term or browse our categories.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <div
            key={product._id}
            className="opacity-0 animate-fade-in"
            style={{
              animationDelay: `${index * 0.1}s`,
              animationFillMode: "forwards",
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading amazing products...</p>
        </div>
      )}

      {isFetching && !isLoading && (
        <div className="flex justify-center my-8">
          <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {!hasMore && products.length > 0 && (
        <div className="text-center mt-12 py-8">
          <div className="text-4xl mb-4">🎉</div>
          <p className="text-lg text-gray-600 font-medium">
            You've seen all our amazing products!
          </p>
          <p className="text-gray-500">Check back later for new arrivals.</p>
        </div>
      )}
    </div>
  );
};

export default BrowseProducts;
