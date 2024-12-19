import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  removeFromCart,
  applyCoupon,
  clearCart,
  updateQuantity,
} from "../../redux/features/Cart/cartSlice";
import { OrderApi } from "../../redux/features/order/order";
import { PaymentApi } from "../../redux/features/Payment/payment";
import { useCurrentToken } from "../../redux/features/Auth/AuthSlice";
import { userApi } from "../../redux/features/user/userApi";
import { toast } from "sonner";
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  discount: number;
  inventory: number;
}

const CartPage = () => {
  const [createOrder] = OrderApi.useCreateOrderMutation();
  const [createPayment] = PaymentApi.useCreatepaymentMutation();
  const token = useAppSelector(useCurrentToken);

  // Fetch user details
  const { data: getMe } = userApi.useGetMeQuery(undefined, { skip: !token });
  const user = getMe?.data;
  const dispatch = useAppDispatch();
  const { items, totalPrice, shopId, userId } = useAppSelector(
    (state) => state.cart
  );

  const [coupon, setCoupon] = useState("");
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "online" | null>(
    null
  );

  const handleQuantityChange = (
    id: string,
    newQuantity: number,
    inventory: number
  ) => {
    if (newQuantity > 0 && newQuantity <= inventory) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleApplyCoupon = () => {
    if (coupon === "DISCOUNT10") {
      dispatch(applyCoupon({ code: "DISCOUNT10", discount: 10 })); // Correct format
      setError("");
    } else {
      setError("Invalid coupon code");
    }
  };

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    try {
      const orderData = {
        items: items.map((item) => ({
          product: item.id, // Matches `product` in OrderItemSchema
          quantity: item.quantity,
        })),
        totalAmount: totalPrice, // Rename to match schema
        status: "pending", // Default status
        shop: shopId, // Rename to match schema
        user: userId, // Rename to match schema
        paymentType: paymentMethod === "cod" ? "COD" : "ONLINE",
      };

      const orderResponse = await createOrder(orderData).unwrap();
      console.log("Order Response:", orderResponse);

      if (paymentMethod === "cod") {
        toast.success("Order placed successfully!");

        // Clear cart after order
        dispatch(clearCart());
      } else if (paymentMethod === "online") {
        const paymentPayload = {
          order: orderResponse.data._id,
          amount: totalPrice,
          method: "card", // Assuming "card" as the online payment method
          user: user._id,
        };

        const paymentResponse = await createPayment(paymentPayload).unwrap();

        if (paymentResponse?.data.paymentSession?.payment_url) {
          // Redirect to payment gateway
          window.location.href =
            paymentResponse.data.paymentSession?.payment_url;
        } else {
          toast.error("Payment initiation failed!");
        }
      }
    } catch (error) {
      console.error("Error placing order or initiating payment:", error);
      toast.error("Failed to place the order. Please try again.");
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      {/* Cart Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {items.length === 0 ? (
            <p className="text-gray-600 text-center">Your cart is empty.</p>
          ) : (
            <ul className="space-y-6">
              {items.map((item: CartItem) => (
                <li
                  key={item.id}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600">
                      Price: $
                      {(item.price * (1 - item.discount / 100)).toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            item.quantity - 1,
                            item.inventory
                          )
                        }
                        className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="text-gray-600">
                        Quantity: {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            item.quantity + 1,
                            item.inventory
                          )
                        }
                        className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                        disabled={item.quantity >= item.inventory}
                      >
                        +
                      </button>
                    </div>
                    <p className="text-gray-600">
                      Inventory Left: {item.inventory}
                    </p>
                  </div>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Cart Summary */}
        <div className="bg-gray-100 p-6 rounded-md shadow-md">
          <h3 className="text-xl font-bold mb-4">Cart Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount Applied:</span>
              <span>
                -$
                {items
                  .reduce(
                    (total, item) =>
                      total +
                      (item.price * item.discount * item.quantity) / 100,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Coupon Input */}
          <div className="mt-4">
            <h4 className="text-md font-semibold mb-2">Apply Coupon</h4>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter coupon code"
                className="border p-2 rounded-md flex-1"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button
                onClick={handleApplyCoupon}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Apply
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>

          {/* Payment Options */}
          <div className="mt-6">
            <h4 className="text-md font-semibold mb-2">Payment Method</h4>
            <div className="flex gap-4">
              <button
                onClick={() => setPaymentMethod("cod")}
                className={`px-4 py-2 rounded-md ${
                  paymentMethod === "cod"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                Cash on Delivery
              </button>
              <button
                onClick={() => setPaymentMethod("online")}
                className={`px-4 py-2 rounded-md ${
                  paymentMethod === "online"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                Online Payment
              </button>
            </div>
          </div>

          {/* Place Order */}
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-green-600 text-white mt-6 py-2 rounded-md hover:bg-green-700"
          >
            Place Order
          </button>

          {/* Clear Cart */}
          <button
            onClick={() => dispatch(clearCart())}
            className="w-full bg-red-500 text-white mt-2 py-2 rounded-md hover:bg-red-600"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
