import { useNavigate } from "react-router-dom";
import { TProduct } from "@/type/global.type";
import { FaShoppingCart, FaHeart, FaEye } from "react-icons/fa";
import { Star } from "lucide-react";

interface ProductCardProps {
  product: TProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleBuyNow = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    navigate(`/product/${productId}`);
  };

  const averageRating =
    product.reviews.length > 0
      ? product.reviews.reduce((sum, review) => sum + review.rating, 0) /
        product.reviews.length
      : 0;

  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  return (
    <div className="group relative bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200/50 hover:border-gray-300/50">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={product.images[0]}
          alt={product.name}
          onClick={() => navigate(`/product/${product._id}`)}
        />

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button
            onClick={() => navigate(`/product/${product._id}`)}
            className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          >
            <FaEye className="h-4 w-4 text-gray-700" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Add to Wishlist Logic
            }}
            className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          >
            <FaHeart className="h-4 w-4 text-gray-700" />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.discount && (
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
              -{product.discount}%
            </div>
          )}
          {/* Removed isNew badge as it's not in the TProduct type */}
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
          {product.category || "Category"}
        </p>

        {/* Product Name */}
        <h3
          className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors cursor-pointer"
          onClick={() => navigate(`/product/${product._id}`)}
        >
          {product.name}
        </h3>

        {/* Ratings */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(averageRating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            ({product.reviews.length})
          </span>
        </div>

        {/* Price Section */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-blue-600">
            ${discountedPrice.toFixed(2)}
          </span>
          {product.discount && (
            <span className="text-sm text-gray-500 line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            onClick={(e) => handleBuyNow(e, product._id)}
          >
            <FaShoppingCart className="h-4 w-4" />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
