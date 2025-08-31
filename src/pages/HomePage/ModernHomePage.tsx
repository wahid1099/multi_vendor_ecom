import React from "react";
import { motion } from "framer-motion";
import ModernBanner from "../../components/modern/ModernBanner";
import ProductGrid from "../../components/modern/ProductGrid";
import { Sparkles, TrendingUp, Award, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Sample product data
const featuredProducts = [
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
];

const stats = [
  {
    icon: <Users className="h-8 w-8" />,
    value: "50K+",
    label: "Happy Customers",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: <Award className="h-8 w-8" />,
    value: "10K+",
    label: "Products",
    color: "from-green-500 to-green-600",
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    value: "99%",
    label: "Satisfaction Rate",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: <Sparkles className="h-8 w-8" />,
    value: "5 Years",
    label: "Experience",
    color: "from-orange-500 to-orange-600",
  },
];

const ModernHomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <ModernBanner />

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
              Why Choose Us?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best shopping experience with
              quality products and exceptional service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center text-white`}
                    >
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <ProductGrid
          products={featuredProducts}
          title="Featured Products"
          showFilters={false}
        />
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of categories to find exactly what you're
              looking for.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {["Electronics", "Clothing", "Accessories"].map(
              (category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                    <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <h3 className="text-2xl font-bold text-gray-800 group-hover:scale-110 transition-transform duration-300">
                          {category}
                        </h3>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModernHomePage;
