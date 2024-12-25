import { useParams, useNavigate } from "react-router-dom";
import { ShopApi } from "../../redux/features/shop/shopApi";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { TProduct } from "@/type/global.type";
import { addToCart } from "../../redux/features/Cart/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useCurrentToken } from "../../redux/features/Auth/AuthSlice";
import { useAppSelector } from "../../redux/hook";
import { userApi } from "../../redux/features/user/userApi";

const ShopPage = () => {
  const dispatch = useDispatch();
  const token = useAppSelector(useCurrentToken);
  const navigate = useNavigate();

  const { data: getMe } = userApi.useGetMeQuery(undefined, { skip: !token });
  const user = getMe?.data;

  const { id } = useParams();
  const {
    data: shop,
    isLoading,
    isError,
  } = ShopApi.useGetSingleShopQuery(id || "");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError || !shop?.data) {
    return (
      <div className="text-center text-xl mt-10 text-red-500">
        Failed to load shop details. Try again later.
      </div>
    );
  }

  const { name, description, logo, products, shopFollowers } = shop.data;

  const handleAddToCart = (product: TProduct) => {
    if (!user) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }

    const discount = product.discount || 0;

    try {
      dispatch(
        addToCart({
          id: product._id,
          name: product.name,
          price:
            discount > 0
              ? (product.price * (100 - discount)) / 100
              : product.price,
          quantity: 1, // Default quantity
          shopId: id || "",
          image: product.images?.[0] || "", // Handle empty images array
          discount: product.discount || 0,
          inventory: product.inventory,
          userId: user._id,
        })
      );
      toast.success(`${product.name} has been added to your cart!`);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add the product to the cart.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Shop Details */}
      <div className="flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl text-center">
          {/* Shop Logo */}
          <div className="flex justify-center mb-4">
            <img
              src={logo}
              alt={name}
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
            />
          </div>

          {/* Shop Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{name}</h1>
            <p className="text-gray-600 text-lg mb-4">{description}</p>
          </div>

          {/* Follower Counts */}
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800">Followers</h3>
              <p className="text-blue-600 text-lg font-bold">
                {shopFollowers?.length || 0}
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800">Products</h3>
              <p className="text-green-600 text-lg font-bold">
                {products.length}
              </p>
            </div>
          </div>

          {/* Follow Button */}
          <button className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition flex items-center justify-center gap-2 shadow-md">
            <FaHeart /> Follow Shop
          </button>
        </div>
      </div>

      {/* Product List */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: TProduct) => (
            <div
              key={product._id}
              className="bg-white p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition duration-300"
            >
              <img
                src={product.images?.[0] || "/placeholder.jpg"}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold text-gray-800">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                {product.description}
              </p>
              <div className="flex items-center justify-between mb-4">
                {product?.discount ? (
                  <div className="flex items-center gap-2">
                    <span className="text-green-500 font-bold text-lg">
                      $
                      {(
                        (product.price * (100 - product.discount)) /
                        100
                      ).toFixed(2)}
                    </span>
                    <span className="text-gray-500 line-through text-sm">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-green-500 font-bold text-lg">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center justify-center gap-2"
                >
                  View Details
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent parent click event
                    handleAddToCart(product);
                  }}
                  className="flex-1 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
