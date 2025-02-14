import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { ProductApi } from "../../redux/features/products/ProductAPi";
import { addToCart } from "../../redux/features/Cart/cartSlice";
import { useState } from "react";
import { FaShop } from "react-icons/fa6";
import { FaTruck, FaUndo, FaShieldAlt } from "react-icons/fa";

import { useCurrentToken } from "../../redux/features/Auth/AuthSlice";
import { useAppSelector } from "../../redux/hook";
import { userApi } from "../../redux/features/user/userApi";
import { TReview } from "@/type/global.type";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState("description");

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

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
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
            d="M9.707 16.707a1 1 0 001.414 0l6-6a1 1 0 010-1.414l-6-6a1 1 0 01-1.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
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
              className={`w-full h-[400px] object-cover rounded-xl shadow-xl cursor-zoom-in transition-transform duration-300 ${
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
          <div className="bg-white p-6 mb-5 rounded-xl shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              {/* Shop Details */}
              <div
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => navigate(`/shop/${product.data.shop._id}`)}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full shadow-md">
                  <FaShop className="text-blue-600 text-lg group-hover:text-blue-800 transition" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition">
                    {product.data.shop.name}
                  </h1>
                  <span className="text-sm text-gray-500 group-hover:text-blue-400 transition">
                    Visit Shop
                  </span>
                </div>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-4">{name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {category}
              </span>{" "}
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

            {/* Delivery and Refund Information */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-gray-700">
                <FaTruck className="text-xl text-blue-500" />
                <span>Estimated Delivery: 2-3 Business Days</span>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <FaUndo className="text-xl text-blue-500" />
                <span>30-Day Easy Returns & Refunds</span>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <FaShieldAlt className="text-xl text-blue-500" />
                <span>100% Secure Payment</span>
              </div>
            </div>
          </div>

          {/* Quantity Control */}
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={decreaseQuantity}
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 transition"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 transition"
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

      {/* Description & Reviews Card */}
      <div className="bg-white p-6 mt-10 rounded-xl shadow-lg">
        {/* Tab Navigation */}
        <div className="flex border-b mb-4">
          <button
            onClick={() => handleTabClick("description")}
            className={`py-2 px-6 text-lg font-semibold transition ${
              selectedTab === "description"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => handleTabClick("reviews")}
            className={`py-2 px-6 text-lg font-semibold transition ${
              selectedTab === "reviews"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            Reviews
          </button>
        </div>

        {/* Tab Content */}
        {selectedTab === "description" && (
          <div className="prose max-w-none mb-6">
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{description}</p>

            {/* Refund Instructions */}
            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Refund Policy</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Items must be returned within 30 days of delivery</li>
                <li>Product must be unused and in original packaging</li>
                <li>Contact customer service to initiate return process</li>
                <li>
                  Refund will be processed within 5-7 business days after
                  inspection
                </li>
                <li>
                  Shipping costs for returns are buyer's responsibility unless
                  item is defective
                </li>
              </ul>
            </div>
          </div>
        )}

        {selectedTab === "reviews" && (
          <div>
            <h3 className="text-2xl font-semibold mb-4">Customer Reviews</h3>
            {product.data.reviews && product.data.reviews.length > 0 ? (
              product.data.reviews.map((review: TReview, index: number) => (
                <div
                  key={index}
                  className="flex gap-4 mb-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex gap-2 items-center">
                    <img
                      src={review.image}
                      alt={review.user.name || "User"}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">
                        {review.user.name || "Anonymous"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {review.rating} stars
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    {review.comment || "No comment provided."}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-700">No reviews for this product yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
