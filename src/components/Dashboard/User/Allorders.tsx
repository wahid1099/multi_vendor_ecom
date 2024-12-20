import { useMemo, useState } from "react";
import { OrderApi } from "../../../redux/features/order/order";
import {
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";

import { TOrder } from "@/type/global.type";
import ClipLoader from "react-spinners/ClipLoader";

const UserAllOrders = () => {
  const { data, isLoading, error } = OrderApi.useGetUserordersQuery([]);
  const [activeTab, setActiveTab] = useState<
    "pending" | "completed" | "canceled"
  >("pending");

  const categorizedOrders = useMemo(() => {
    const orders: TOrder[] = data?.data || [];
    return {
      pending: orders.filter((order) => order.status === "pending"),
      completed: orders.filter((order) => order.status === "completed"),
      canceled: orders.filter((order) => order.status === "canceled"),
    };
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex items-center">
        <ClipLoader
          color="#e93b16"
          loading={isLoading}
          size={40} // Adjust size for better alignment
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <span className="ml-2">Loading Orders ..</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-4">Error fetching orders</div>;
  }

  const renderOrderCard = (order: TOrder) => (
    <div
      key={order._id}
      className="border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow bg-white"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold bg-blue-100 text-blue-800 px-2 py-1 rounded">
          Order ID: {order._id}
        </h2>
        <span
          className={`text-sm px-2 py-1 rounded flex items-center gap-1 ${
            order.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : order.status === "completed"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {order.status === "pending" && <AiOutlineClockCircle />}
          {order.status === "completed" && <AiOutlineCheckCircle />}
          {order.status === "canceled" && <AiOutlineCloseCircle />}
          {order.status.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex gap-4">
          <img
            src={order.items[0]?.product?.images[0]}
            alt={order.items[0]?.product?.name}
            className="w-24 h-24 object-cover rounded-md border"
          />
          <div>
            <h3 className="font-semibold text-lg">
              {order.items[0]?.product?.name}
            </h3>
            <p className="text-sm text-gray-600">
              Quantity: {order.items[0]?.quantity}
            </p>
            <p className="text-sm text-gray-600">
              Price: ${order.items[0]?.product?.price}
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-600">
            <strong>Shop:</strong> {order.shop?.name || "N/A"}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Order Date:</strong>{" "}
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Payment Type:</strong>{" "}
            {order.payment
              ? `Transaction ID: ${order.payment._id}`
              : "Cash on Delivery (COD)"}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Total Amount:</strong> ${order.totalAmount}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">My Orders</h1>

      <div className="mb-4">
        <div className="flex space-x-1 rounded-lg bg-blue-100 p-1">
          {Object.keys(categorizedOrders).map((category) => (
            <button
              key={category}
              onClick={() =>
                setActiveTab(category as "pending" | "completed" | "canceled")
              }
              className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 transition-colors
                ${
                  activeTab === category
                    ? "bg-white shadow"
                    : "hover:bg-white/[0.12] hover:text-blue-800"
                }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <div className="rounded-lg bg-gray-50 p-3">
            {categorizedOrders[activeTab].length > 0 ? (
              <div className="grid gap-4">
                {categorizedOrders[activeTab].map(renderOrderCard)}
              </div>
            ) : (
              <p className="text-center text-gray-600">No {activeTab} orders</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAllOrders;
