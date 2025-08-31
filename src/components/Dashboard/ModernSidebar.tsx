import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Store,
  Tag,
  FileText,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  badge?: string;
  isActive?: boolean;
}

const ModernSidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarItems: SidebarItem[] = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
      href: "/dashboard",
      isActive: true,
    },
    {
      icon: <Package className="h-5 w-5" />,
      label: "Add Product",
      href: "/dashboard/add-product",
    },
    {
      icon: <Package className="h-5 w-5" />,
      label: "Manage Products",
      href: "/dashboard/admin-manage-products",
    },
    {
      icon: <ShoppingCart className="h-5 w-5" />,
      label: "Orders",
      href: "/dashboard/admin-manage-order",
      badge: "12",
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Users",
      href: "/dashboard/manage-users",
    },
    {
      icon: <Store className="h-5 w-5" />,
      label: "Shops",
      href: "/dashboard/admin-manage-shops",
    },
    {
      icon: <Tag className="h-5 w-5" />,
      label: "Coupons",
      href: "/dashboard/Manage-coupons-admin",
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      label: "Payments",
      href: "/dashboard/admin-manage-payments",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Reviews",
      href: "/dashboard/all-reviews-admin",
    },
    {
      icon: <Bell className="h-5 w-5" />,
      label: "Profile",
      href: "/dashboard/my-profile",
    },
  ];

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0, width: isCollapsed ? 80 : 256 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-full bg-white/80 backdrop-blur-md border-r border-gray-200/50 shadow-lg z-40"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200/50">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Admin Panel
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                item.isActive
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100/80 hover:text-blue-600"
              }`}
            >
              <div
                className={`${
                  item.isActive
                    ? "text-white"
                    : "text-gray-500 group-hover:text-blue-600"
                }`}
              >
                {item.icon}
              </div>

              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="flex items-center justify-between flex-1"
                  >
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <Badge
                        variant={item.isActive ? "secondary" : "default"}
                        className="ml-auto text-xs"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.a>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200/50">
          <motion.button
            onClick={() => {
              // Add logout logic here
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 group w-full text-left"
          >
            <LogOut className="h-5 w-5" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-medium"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ModernSidebar;
