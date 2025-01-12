import { useNavigate } from "react-router-dom";
import { TProduct } from "@/type/global.type";
import { FaShoppingCart } from "react-icons/fa";

interface ProductCardProps {
  product: TProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleBuyNow = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    navigate(`/product/${productId}`);
  };

  return (
    <div
      className="w-72 bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      {/* Product Image */}
      <div className="relative w-full h-48">
        <img
          className="w-full h-full object-cover"
          src={product.images[0]}
          alt={product.name}
        />
        {/* Sale Badge */}
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.discount}% OFF
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        {/* Ratings */}
        <div className="flex items-center text-yellow-400 text-sm mb-2">
          {product.reviews.length > 0 ? (
            <>
              {"★".repeat(
                Math.round(
                  product.reviews.reduce(
                    (sum, review) => sum + review.rating,
                    0
                  ) / product.reviews.length
                )
              )}
              {"☆".repeat(
                5 -
                  Math.round(
                    product.reviews.reduce(
                      (sum, review) => sum + review.rating,
                      0
                    ) / product.reviews.length
                  )
              )}
              <span className="ml-2 text-gray-500 text-xs">
                ({product.reviews.length})
              </span>
            </>
          ) : (
            <span className="text-gray-500 text-xs">No reviews yet</span>
          )}
        </div>

        {/* Product Name */}
        <h3 className="text-md font-medium text-gray-800 truncate">
          {product.name}
        </h3>

        {/* Price Section */}
        <div className="mt-2">
          {product.discount ? (
            <div className="flex items-center space-x-2">
              <span className="text-red-500 font-bold text-base">
                $
                {(
                  product.price -
                  (product.price * product.discount) / 100
                ).toFixed(2)}
              </span>
              <span className="text-gray-500 line-through text-sm">
                ${product.price.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-gray-800 font-bold text-base">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Buy Now Button */}
        <div className="mt-4 flex items-center justify-between">
          <button
            className="flex items-center bg-red-500 text-white text-sm font-medium px-3 py-2 rounded-md hover:bg-red-600 transition-colors"
            onClick={(e) => handleBuyNow(e, product._id)}
          >
            <FaShoppingCart className="mr-2" />
            Buy Now
          </button>
          <button
            className="border border-gray-300 text-gray-600 text-sm font-medium px-3 py-2 rounded-md hover:border-gray-400 hover:bg-gray-100 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              // Add to Wishlist Logic
            }}
          >
            ♥
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
