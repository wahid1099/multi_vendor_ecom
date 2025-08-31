import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Store,
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Star,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ModernDataTable from "./ModernDataTable";
import { userApi } from "@/redux/features/user/userApi";
import { OrderApi } from "@/redux/features/order/order";

import { formatCurrency, formatDate, getOrderStatusColor } from "@/lib/utils";

const VendorDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Use RTK Query hooks for API data
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = userApi.endpoints.getMe.useQuery({});

  const {
    data: ordersData,
    isLoading: ordersLoading,
    error: ordersError,
  } = OrderApi.endpoints.getVendororders.useQuery({});

  const user = userData?.data;
  const orders = ordersData?.data || [];
  const loading = userLoading || ordersLoading;

  const StatCard: React.FC<{
    title: string;
    value: string;
    icon: React.ReactNode;
    color: string;
    trend?: string;
  }> = ({ title, value, icon, color, trend }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5`}
        />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div
            className={`p-2 rounded-lg bg-gradient-to-br ${color} text-white`}
          >
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2">{value}</div>
          {trend && (
            <div className="flex items-center text-sm text-green-500">
              <TrendingUp className="h-4 w-4 mr-1" />
              {trend}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (userError || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            {userError ? "Error loading vendor data" : "Vendor not found"}
          </h2>
          <p className="text-gray-500">
            {userError
              ? "Please try refreshing the page."
              : "Please log in to access your vendor dashboard."}
          </p>
          <Button
            onClick={() => navigate("/login")}
            className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600"
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  const completedOrders = orders.filter(
    (order: any) => order.status === "completed"
  );
  const totalRevenue = completedOrders.reduce(
    (sum: number, order: any) => sum + order.totalAmount,
    0
  );

  // Show error message if orders failed to load but user data is available
  const showOrdersError = ordersError && !ordersLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={user.profileImage}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600">
                Vendor since {formatDate(user.createdAt)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="border-gray-300"
              onClick={() => navigate("/dashboard/my-shop")}
            >
              <Store className="h-4 w-4 mr-2" />
              My Shop
            </Button>
            <Button
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              onClick={() => navigate("/dashboard/add-product")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Orders"
            value={orders.length.toString()}
            icon={<ShoppingCart className="h-4 w-4" />}
            color="from-blue-500 to-blue-600"
            trend="+5 this month"
          />
          <StatCard
            title="Total Revenue"
            value={formatCurrency(totalRevenue)}
            icon={<DollarSign className="h-4 w-4" />}
            color="from-green-500 to-green-600"
            trend="+12% this month"
          />
          <StatCard
            title="Products"
            value="24"
            icon={<Package className="h-4 w-4" />}
            color="from-purple-500 to-purple-600"
            trend="+3 this week"
          />
          <StatCard
            title="Shop Rating"
            value="4.8"
            icon={<Star className="h-4 w-4" />}
            color="from-yellow-500 to-yellow-600"
            trend="+0.2 this month"
          />
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 border-blue-300 hover:bg-blue-50"
                  onClick={() => navigate("/dashboard/add-product")}
                >
                  <Plus className="h-6 w-6 text-blue-600" />
                  <span className="text-sm">Add Product</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 border-green-300 hover:bg-green-50"
                  onClick={() => navigate("/dashboard/vendor-manage-products")}
                >
                  <Package className="h-6 w-6 text-green-600" />
                  <span className="text-sm">My Products</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 border-purple-300 hover:bg-purple-50"
                  onClick={() => navigate("/dashboard/vendor-orders")}
                >
                  <ShoppingCart className="h-6 w-6 text-purple-600" />
                  <span className="text-sm">Manage Orders</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 border-orange-300 hover:bg-orange-50"
                  onClick={() => navigate("/dashboard/my-shop")}
                >
                  <Store className="h-6 w-6 text-orange-600" />
                  <span className="text-sm">Shop Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Orders Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {showOrdersError ? (
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Unable to load orders
                </h3>
                <p className="text-gray-500 mb-4">
                  There was an error loading your order history. Please try
                  again later.
                </p>
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                >
                  Retry
                </Button>
              </CardContent>
            </Card>
          ) : ordersLoading ? (
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-500">Loading your orders...</p>
              </CardContent>
            </Card>
          ) : (
            <ModernDataTable
              title="Recent Orders"
              data={orders.map((order: any) => ({
                id: order._id,
                customer: order.user?.name || "Unknown",
                amount: formatCurrency(order.totalAmount),
                status: order.status,
                paymentType: order.paymentType,
                date: formatDate(order.createdAt),
              }))}
              columns={[
                { key: "id", label: "Order ID", sortable: true },
                { key: "customer", label: "Customer", sortable: true },
                { key: "amount", label: "Amount", sortable: true },
                {
                  key: "status",
                  label: "Status",
                  render: (value) => (
                    <Badge
                      variant="default"
                      className={getOrderStatusColor(value)}
                    >
                      {value.charAt(0).toUpperCase() + value.slice(1)}
                    </Badge>
                  ),
                },
                { key: "paymentType", label: "Payment", sortable: true },
                { key: "date", label: "Date", sortable: true },
              ]}
              actions={{
                view: () => navigate(`/dashboard/vendor-orders`),
              }}
              searchable={true}
              filterable={false}
              exportable={true}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default VendorDashboard;
