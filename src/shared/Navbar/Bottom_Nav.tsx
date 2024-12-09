import {
  FiMapPin,
  FiRefreshCw,
  FiHeadphones,
  FiHelpCircle,
  FiPhone,
} from "react-icons/fi";

const InfoBar = () => {
  return (
    <div className="bg-gray-100 py-2 border-b">
      <div className="container mx-auto flex items-center justify-between flex-wrap px-4">
        {/* Category Dropdown */}
        <div className="flex items-center space-x-2">
          <select className="bg-white border text-sm px-3 py-2 rounded shadow-sm outline-none focus:ring">
            <option>All Category</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Home & Furniture</option>
            <option>Sports</option>
          </select>
        </div>

        {/* Info Items */}
        <div className="flex items-center space-x-4 text-gray-600 text-sm flex-wrap">
          <a
            href="/track-order"
            className="flex items-center space-x-1 hover:text-gray-900 transition"
          >
            <FiMapPin />
            <span>Track Order</span>
          </a>
          <a
            href="/compare"
            className="flex items-center space-x-1 hover:text-gray-900 transition"
          >
            <FiRefreshCw />
            <span>Compare</span>
          </a>
          <a
            href="/support"
            className="flex items-center space-x-1 hover:text-gray-900 transition"
          >
            <FiHeadphones />
            <span>Customer Support</span>
          </a>
          <a
            href="/help"
            className="flex items-center space-x-1 hover:text-gray-900 transition"
          >
            <FiHelpCircle />
            <span>Need Help</span>
          </a>
        </div>

        {/* Contact Info */}
        <div className="flex items-center text-gray-600 text-sm space-x-1">
          <FiPhone />
          <span className="font-medium">+1-202-555-0104</span>
        </div>
      </div>
    </div>
  );
};

export default InfoBar;
