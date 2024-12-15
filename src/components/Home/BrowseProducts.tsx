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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Browse Products
        </h1>
        <div className="max-w-md">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {products.length === 0 && !isLoading && (
        <div className="text-center text-gray-600">
          No products found. Try a different search.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {isLoading && (
        <div className="flex justify-center my-8">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {isFetching && !isLoading && (
        <div className="flex justify-center my-8">
          <div className="w-8 h-8 border-3 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {!hasMore && products.length > 0 && (
        <p className="text-center mt-8 text-gray-600">
          You've reached the end of the list.
        </p>
      )}
    </div>
  );
};

export default BrowseProducts;
