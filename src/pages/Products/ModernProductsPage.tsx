import React from "react";
import ProductGrid from "../../components/modern/ProductGrid";

// Extended sample product data
const allProducts = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    rating: 4.5,
    reviews: 128,
    category: "Electronics",
    isNew: true,
    discount: 25,
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    price: 199,
    originalPrice: 249,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    rating: 4.8,
    reviews: 89,
    category: "Electronics",
    discount: 20,
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt",
    price: 29,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    rating: 4.2,
    reviews: 45,
    category: "Clothing",
    isNew: true,
  },
  {
    id: "4",
    name: "Professional Camera Lens",
    price: 599,
    originalPrice: 699,
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
    rating: 4.9,
    reviews: 67,
    category: "Electronics",
    discount: 15,
  },
  {
    id: "5",
    name: "Luxury Leather Wallet",
    price: 89,
    originalPrice: 120,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400",
    rating: 4.6,
    reviews: 234,
    category: "Accessories",
    discount: 26,
  },
  {
    id: "6",
    name: "Wireless Bluetooth Speaker",
    price: 149,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
    rating: 4.4,
    reviews: 156,
    category: "Electronics",
    isNew: true,
  },
  {
    id: "7",
    name: "Designer Sunglasses",
    price: 179,
    originalPrice: 220,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
    rating: 4.7,
    reviews: 98,
    category: "Accessories",
    discount: 19,
  },
  {
    id: "8",
    name: "Gaming Mechanical Keyboard",
    price: 129,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400",
    rating: 4.8,
    reviews: 312,
    category: "Electronics",
    isNew: true,
  },
  {
    id: "9",
    name: "Casual Denim Jacket",
    price: 79,
    originalPrice: 99,
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400",
    rating: 4.3,
    reviews: 87,
    category: "Clothing",
    discount: 20,
  },
  {
    id: "10",
    name: "Smartphone Stand",
    price: 25,
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400",
    rating: 4.1,
    reviews: 156,
    category: "Accessories",
  },
  {
    id: "11",
    name: "Wireless Mouse",
    price: 49,
    originalPrice: 69,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
    rating: 4.5,
    reviews: 203,
    category: "Electronics",
    discount: 29,
  },
  {
    id: "12",
    name: "Cotton Polo Shirt",
    price: 39,
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400",
    rating: 4.4,
    reviews: 92,
    category: "Clothing",
    isNew: true,
  },
];

const ModernProductsPage: React.FC = () => {
  return (
    <div className="min-h-screen py-8">
      <ProductGrid
        products={allProducts}
        title="All Products"
        showFilters={true}
      />
    </div>
  );
};

export default ModernProductsPage;
