import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { ProductApi } from "../../redux/features/products/ProductAPi";
import { addToCart } from "../../redux/features/Cart/cartSlice";
import { useState } from "react";
import { FaShop, FaHeart } from "react-icons/fa6";

import { useCurrentToken } from "../../redux/features/Auth/AuthSlice";
import { useAppSelector } from "../../redux/hook";
import { userApi } from "../../redux/features/user/userApi";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [quantity, setQuantity] = useState(1); // State for cart quantity

  const token = useAppSelector(useCurrentToken);

  // Fetch user details
  const { data: getMe } = userApi.useGetMeQuery(undefined, { skip: !token });
  const user = getMe?.data;

  const {
    data: product,
    isLoading,
    isError,
  } = ProductApi.useGetSingleProductQuery(id || "");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError || !product?.data) {
    return (
      <div className="text-center text-xl mt-10 text-red-500">
        Failed to load product details. Try again later.
      </div>
    );
  }

  const { name, description, price, images, category, inventory, discount } =
    product.data;
  const finalPrice = discount > 0 ? price - (price * discount) / 100 : price;

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }

    try {
      if (id) {
        dispatch(
          addToCart({
            id,
            name,
            price: finalPrice,
            quantity,
            shopId: product.data.shop._id,
            image: images[0],
            discount: discount || 0,
            inventory,
            userId: user._id,
          })
        );
        toast.success(`${name} has been added to your cart!`);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to add the product to the cart.");
    }
  };

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const handleImageZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const increaseQuantity = () => {
    if (quantity < inventory) setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <button
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
        onClick={() => navigate(-1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Section */}
        <div className="flex-1">
          <div className="relative">
            <img
              src={images[selectedImage]}
              alt={name}
              className={`w-full h-[500px] object-cover rounded-xl shadow-xl cursor-zoom-in transition-transform duration-300 ${
                isZoomed ? "scale-150" : "scale-100"
              }`}
              onClick={handleImageZoom}
            />
          </div>
          <div className="grid grid-cols-4 gap-4 mt-6">
            {images.map((img: string, index: number) => (
              <img
                key={index}
                src={img}
                alt={`${name} ${index + 1}`}
                className={`w-full h-24 object-cover rounded-lg border-2 cursor-pointer hover:opacity-80 transition ${
                  selectedImage === index
                    ? "border-blue-500"
                    : "border-gray-200"
                }`}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="flex-1 flex flex-col">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-gray-800">
                  <FaShop /> {product.data.shop.name}
                </h1>
                <button className="text-blue-500 flex items-center gap-1 hover:underline">
                  Follow
                </button>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {category}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-4">{name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                {inventory > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <div className="mb-6">
              {discount > 0 ? (
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-green-600">
                    ${finalPrice.toFixed(2)}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    ${price.toFixed(2)}
                  </span>
                  <span className="px-2 py-1 bg-red-100 text-red-600 rounded-lg">
                    {discount}% OFF
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-green-600">
                  ${price.toFixed(2)}
                </span>
              )}
            </div>

            <div className="prose max-w-none mb-6">
              <h3 className="text-xl font-semibold mb-2">Description</h3>
              <p className="text-gray-700">{description}</p>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-gray-600">
                Available Stock:{" "}
                <span className="font-semibold">{inventory} units</span>
              </p>

              {/* Quantity Control */}
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={decreaseQuantity}
                  className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md"
                  disabled={quantity >= inventory}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={inventory === 0}
                className={`w-full py-3 rounded-lg text-white text-lg font-semibold transition ${
                  inventory === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {inventory === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="bg-white p-6 mt-10 rounded-xl shadow-lg">
        <h3 className="text-2xl font-semibold mb-4">Customer Reviews</h3>
        <div className="flex gap-4 mb-4">
          <div className="flex gap-2 items-center">
            <img
              src="https://via.placeholder.com/40"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h4 className="font-semibold text-gray-800">John Doe</h4>
              <div className="flex items-center gap-1 text-yellow-500">
                <FaHeart />
                <FaHeart />
                <FaHeart />
                <FaHeart />
                <FaHeart />
              </div>
            </div>
          </div>
        </div>
        <p className="text-gray-700">
          This product is amazing! Highly recommend.
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
