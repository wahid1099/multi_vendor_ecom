import { useState } from "react";
import { ReviewApi } from "../../../redux/features/reviews/reviews";
import { useCurrentToken } from "../../../redux/features/Auth/AuthSlice";
import { useAppSelector } from "../../../redux/hook";
import { userApi } from "../../../redux/features/user/userApi";
import { TOrder } from "@/type/global.type";
import uploadImageToCloudinary from "../../../utils/uploadImage";
import { TReview } from "@/type/global.type";
const MyReviews = () => {
  const [activeMainTab, setActiveMainTab] = useState("toReview"); // "toReview" or "myReviews"
  const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null); // Specify TOrder type
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewImage, setReviewImage] = useState<File | null>(null);
  const [imageUploading, setImageUploading] = useState(false);

  const token = useAppSelector(useCurrentToken);

  // Fetch user details
  const { data: getMe } = userApi.useGetMeQuery(undefined, { skip: !token });
  const user = getMe?.data;
  console.log(user);
  const [createReview] = ReviewApi.useCreateReviewMutation();

  // Extract orders and reviews from the user data
  const toReviewOrders =
    user?.orders?.filter((order: TOrder) => !order.isReviewed) || [];
  const userReviews = user?.reviews || [];

  const handleImageUpload = async () => {
    if (!reviewImage) return null;
    try {
      setImageUploading(true);
      const imageUrl = await uploadImageToCloudinary(reviewImage);
      setImageUploading(false);
      return imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      setImageUploading(false);
      return null;
    }
  };

  const handleReviewSubmit = async (orderId: string) => {
    const imageUrl = await handleImageUpload();
    try {
      await createReview({
        user: user._id,
        shop: selectedOrder?.shop,
        product: selectedOrder?.items[0]?.product._id,
        order: orderId,
        rating,
        comment,
        image: imageUrl || null, // Include the image URL
      });
      console.log("Review submitted successfully.");
      setSelectedOrder(null);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">My Reviews</h1>

      {/* Main Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`py-2 px-6 text-lg font-medium ${
            activeMainTab === "toReview"
              ? "border-b-4 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveMainTab("toReview")}
        >
          Orders to Review
        </button>
        <button
          className={`py-2 px-6 text-lg font-medium ${
            activeMainTab === "myReviews"
              ? "border-b-4 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveMainTab("myReviews")}
        >
          My Reviews
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeMainTab === "toReview" && (
          <div>
            {toReviewOrders.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {toReviewOrders.map((order: TOrder) => (
                  <div
                    key={order._id}
                    className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <h3 className="text-xl font-semibold mb-4">
                      Product:{" "}
                      {order.items[0]?.product?.name || "Unknown Product"}
                    </h3>

                    <img
                      src={order.items[0]?.product?.images[0]}
                      alt={order.items[0]?.product?.name || "Product Image"}
                      className="w-full h-40 object-contain rounded mb-4"
                    />
                    <p className="text-lg font-medium">
                      Price: {order.items[0]?.product?.price}
                    </p>
                    <p className="text-sm text-gray-600">
                      Order Id: {order._id}
                    </p>
                    <h5 className="text-sm text-gray-600 mt-2">
                      Order Date:{" "}
                      <b>{new Date(order.createdAt).toLocaleDateString()}</b>
                    </h5>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-200"
                    >
                      Add Review
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-lg text-gray-600">No orders to review.</p>
            )}
          </div>
        )}

        {activeMainTab === "myReviews" && (
          <div>
            {userReviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userReviews.map((review: TReview) => (
                  <div
                    key={review._id}
                    className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <h3 className="text-xl font-semibold mb-4">
                      {review.product?.name || "Unknown Product"}
                    </h3>
                    <img
                      src={review.image || "https://via.placeholder.com/150"}
                      alt="Review Image"
                      className="w-full h-40 object-cover rounded mb-4"
                    />
                    <p className="text-lg font-medium">
                      Rating: {review.rating} / 5
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-lg text-gray-600">No reviews created yet.</p>
            )}
          </div>
        )}

        {/* Modal for Adding Reviews */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-6">
                Add Review for{" "}
                {selectedOrder.items[0]?.product?.name || "Product"}
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleReviewSubmit(selectedOrder._id);
                }}
              >
                <label className="block mb-4">
                  <span className="text-gray-700">Rating</span>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full border rounded-lg p-3 mt-2"
                    required
                  />
                </label>
                <label className="block mb-4">
                  <span className="text-gray-700">Comment</span>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full border rounded-lg p-3 mt-2"
                    rows={4}
                  />
                </label>
                <label className="block mb-4">
                  <span className="text-gray-700">Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setReviewImage(e.target.files ? e.target.files[0] : null)
                    }
                    className="w-full border rounded-lg p-3 mt-2"
                  />
                </label>
                {imageUploading && <p>Uploading image...</p>}
                <div className="flex justify-between mt-6">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-200"
                  >
                    Submit Review
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedOrder(null)}
                    className="bg-gray-300 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-400 transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReviews;
