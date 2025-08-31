import "./App.css";
import { motion } from "framer-motion";
import ProductCard from "./components/modern/ProductCard";
import ModernBanner from "./components/modern/ModernBanner";

// Sample product data
const sampleProducts = [
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
];

function App() {
  const handleAddToCart = (product: any) => {
    console.log("Added to cart:", product);
  };

  const handleToggleWishlist = (product: any) => {
    console.log("Toggle wishlist:", product);
  };

  const handleQuickView = (product: any) => {
    console.log("Quick view:", product);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <ModernBanner />

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products with
            unbeatable quality and prices.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sampleProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard
                product={product}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                onQuickView={handleQuickView}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
