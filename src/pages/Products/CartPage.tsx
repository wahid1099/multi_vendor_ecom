import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  removeFromCart,
  applyCoupon,
  clearCart,
} from "../../redux/features/Cart/cartSlice";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const CartPage = () => {
  const dispatch = useAppDispatch();
  const { items, totalPrice } = useAppSelector((state) => state.cart);

  const [coupon, setCoupon] = useState("");
  const [error, setError] = useState("");

  const handleApplyCoupon = () => {
    if (coupon === "DISCOUNT10") {
      dispatch(applyCoupon(10)); // Apply 10% discount
      setError("");
    } else {
      setError("Invalid coupon code");
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div>
          <ul className="divide-y divide-gray-300">
            {items.map((item: CartItem) => (
              <li key={item.id} className="flex justify-between py-4">
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-gray-600">
                    Price: ${item.price.toFixed(2)}
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

          <div className="mt-6">
            <h3 className="text-xl font-bold">
              Total: ${totalPrice.toFixed(2)}
            </h3>
            <div className="flex gap-2 mt-4">
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
                Apply Coupon
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>

          <button
            onClick={() => dispatch(clearCart())}
            className="mt-6 bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
