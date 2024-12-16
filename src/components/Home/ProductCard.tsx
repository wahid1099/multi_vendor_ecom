import { useNavigate } from "react-router-dom";

import { TProduct } from "@/type/global.type";

interface ProductCardProps {
  product: TProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="max-w-xs rounded-lg overflow-hidden shadow-md cursor-pointer bg-white hover:shadow-xl transition transform hover:scale-105 relative"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      {/* Image Container with Zoom Effect */}
      <div className="relative group">
        <img
          className="w-full h-80 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
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
      <div className="p-4 pt-5">
        {/* Product Name */}
        <h3 className="font-semibold text-lg text-gray-800 mb-2 truncate">
          {product.name}
        </h3>

        {/* Truncated Description */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
          {product.description.length > 40
            ? `${product.description.substring(0, 40)}...`
            : product.description}
        </p>

        {/* Price */}
        <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded">
          ${product.price}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
