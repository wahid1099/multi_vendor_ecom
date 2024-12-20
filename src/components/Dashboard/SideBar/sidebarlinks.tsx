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
import { IoHome } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";

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
      icon: createIcon(RxDashboard),
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
      link: "/dashboard/admin-manage-products",
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
    {
      name: "Home",
      link: "/",
      icon: createIcon(IoHome),
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
      name: "Manage Orders",
      link: "/dashboard/vendor-orders",
      icon: createIcon(FiShoppingBag),
    },
    {
      name: "My Shop",
      link: "/dashboard/vendor-myshop",
      icon: createIcon(CiShop),
    },
    {
      name: "Home",
      link: "/",
      icon: createIcon(IoHome),
    },
  ],
  Customer: [
    {
      name: "Customer Dashboard",
      link: "/dashboard/customer-dashboard",
      icon: createIcon(FiHome),
    },
    {
      name: "View Orders",
      link: "/dashboard/my-orders",
      icon: createIcon(FiPackage),
    },
    {
      name: "Profile",
      link: "/dashboard/profile",
      icon: createIcon(FiUser),
    },
    {
      name: "Home",
      link: "/",
      icon: createIcon(IoHome),
    },
  ],
};
