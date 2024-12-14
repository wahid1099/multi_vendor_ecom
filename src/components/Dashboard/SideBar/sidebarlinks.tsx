import {
  FiHome,
  FiUsers,
  FiSettings,
  FiPackage,
  FiShoppingBag,
  FiUser,
} from "react-icons/fi";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { IoBagAdd } from "react-icons/io5";
import { MdManageHistory } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdOutlineRateReview } from "react-icons/md";
import { CiShop } from "react-icons/ci";

interface LinkItem {
  name: string;
  link: string;
  icon: ReactNode;
}

interface RoleLinks {
  [key: string]: LinkItem[];
}

const createIcon = (Icon: IconType) => <Icon className="text-xl" />;

export const roleLinks: RoleLinks = {
  Admin: [
    {
      name: "Admin Dashboard",
      link: "/dashboard/admin-dashboard",
      icon: createIcon(FiHome),
    },
    {
      name: "Manage Users",
      link: "/dashboard/manage-users",
      icon: createIcon(FiUsers),
    },
    {
      name: "Add Products",
      link: "/dashboard/add-product",
      icon: createIcon(IoBagAdd),
    },
    {
      name: "Manage Products",
      link: "/dashboard/manage-products",
      icon: createIcon(MdManageHistory),
    },
    {
      name: "Manage Transaction ",
      link: "/dashboard/manage-payments",
      icon: createIcon(FaMoneyBillTransfer),
    },
    {
      name: "Manage Reviews",
      link: "/dashboard/manage-reviews",
      icon: createIcon(MdOutlineRateReview),
    },
    {
      name: "Settings",
      link: "/dashboard/settings",
      icon: createIcon(FiSettings),
    },
  ],
  Vendor: [
    {
      name: "Vendor Dashboard",
      link: "/dashboard/vendor-dashboard",
      icon: createIcon(FiHome),
    },
    {
      name: "Manage Products",
      link: "/dashboard/vendor-manage-products",
      icon: createIcon(FiPackage),
    },
    {
      name: "Add Products",
      link: "/dashboard/vendor/add-product",
      icon: createIcon(IoBagAdd),
    },
    {
      name: "Orders",
      link: "/dashboard/orders",
      icon: createIcon(FiShoppingBag),
    },
    {
      name: "My Shop",
      link: "/dashboard/vendor-myshop",
      icon: createIcon(CiShop),
    },
  ],
  Customer: [
    {
      name: "Customer Dashboard",
      link: "/dashboard/customer-dashboard",
      icon: createIcon(FiHome),
    },
    {
      name: "View Products",
      link: "/dashboard/view-products",
      icon: createIcon(FiPackage),
    },
    {
      name: "Profile",
      link: "/dashboard/profile",
      icon: createIcon(FiUser),
    },
  ],
};
