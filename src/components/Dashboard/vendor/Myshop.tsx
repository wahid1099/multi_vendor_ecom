import React, { useState } from "react";
import { ShopApi } from "../../../redux/features/shop/shopApi";
import { useCurrentToken } from "../../../redux/features/Auth/AuthSlice";
import { useAppSelector } from "../../../redux/hook";
import { userApi } from "../../../redux/features/user/userApi";
import uploadImageToCloudinary from "../../../utils/uploadImage";
// import { TShop } from "@/type/global.type";

const MyShop: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shopData, setShopData] = useState({
    name: "",
    description: "",
    logo: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const token = useAppSelector(useCurrentToken);

  // Fetch user details
  const { data: getMe } = userApi.useGetMeQuery(undefined, { skip: !token });
  const user = getMe?.data;

  const { useCreateShopMutation } = ShopApi;

  // Mutation for creating a shop
  const [createShop] = useCreateShopMutation();

  const handleCreateShop = async () => {
    if (shopData.name.trim() === "") {
      alert("Shop name cannot be empty");
      return;
    }

    try {
      let logoUrl: string = shopData.logo;

      if (file) {
        logoUrl = (await uploadImageToCloudinary(file)) || "";
      }

      await createShop({
        ...shopData,
        logo: logoUrl,
        vendorId: user._id,
      }).unwrap();

      setShopData({ name: "", description: "", logo: "" });
      setFile(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating shop:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (user?.shops && user.shops.length > 0) {
    const shop = user.shops[0];
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 border-b pb-2">
            My Shop
          </h1>
          <div className="flex flex-col md:flex-row items-center gap-6">
            {shop.logo && (
              <img
                src={shop.logo}
                alt="Shop Logo"
                className="w-48 h-48 object-cover rounded-lg shadow-md"
              />
            )}
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold text-gray-700">
                {shop.name}
              </h2>
              <p className="text-gray-600 mt-2">{shop.description}</p>
              <p className="text-gray-600 mt-2">
                {shop.isBlacklisted ? "Blacklisted" : "Not Blacklisted"}
              </p>
              <p className="text-gray-600 mt-2">Orders: {shop.orders.length}</p>
              <p className="text-gray-600 mt-2">
                Followers: {shop.followers.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold mb-4">
        You don’t have a shop yet.
      </h1>
      <button
        onClick={openModal}
        disabled={user?.shops && user.shops.length > 0}
        className="px-6 py-3 bg-blue-500 text-white font-medium text-lg rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Create Shop
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Create Shop</h2>
            <input
              type="text"
              placeholder="Enter shop name"
              value={shopData.name}
              onChange={(e) =>
                setShopData({ ...shopData, name: e.target.value })
              }
              className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Enter shop description"
              value={shopData.description}
              onChange={(e) =>
                setShopData({ ...shopData, description: e.target.value })
              }
              className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCreateShop}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Submit
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyShop;
