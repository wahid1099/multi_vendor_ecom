import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  Settings,
  Package,
  Star,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TProduct } from "@/type/global.type";
import ModernDataTable from "@/components/Dashboard/ModernDataTable";
import { userApi } from "@/redux/features/user/userApi";
import { OrderApi } from "@/redux/features/order/order";
import {
  formatCurrency,
  formatDate,
  getOrderStatusColor,
  formatPhoneNumber,
} from "@/lib/utils";

const UserDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState<TProduct[]>([]);

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
  } = OrderApi.endpoints.getUserorders.useQuery({});

  const user = userData?.data;
  const orders = ordersData?.data || [];
  const loading = userLoading || ordersLoading;

  useEffect(() => {
    // Fetch wishlist data (if API exists)
    const fetchWishlistData = async () => {
      try {
        // TODO: Replace with actual wishlist API when available
        // const wishlistResponse = await fetch('/api/user/wishlist');
        // const wishlistData = await wishlistResponse.json();
        // setWishlist(wishlistData.data || []);
        setWishlist([]); // Temporary empty array until wishlist API is implemented
      } catch (error) {
        console.error("Error fetching wishlist data:", error);
        setWishlist([]);
      }
    };

    fetchWishlistData();
  }, []);

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
            {userError ? "Error loading user data" : "User not found"}
          </h2>
          <p className="text-gray-500">
            {userError
              ? "Please try refreshing the page."
              : "Please log in to access your dashboard."}
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
  const totalSpent = completedOrders.reduce(
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
                Member since {formatDate(user.createdAt)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="border-gray-300"
              onClick={() => navigate("/dashboard/my-profile")}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              onClick={() => navigate("/dashboard/my-profile")}
            >
              <User className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Orders"
            value={orders.length.toString()}
            icon={<ShoppingBag className="h-4 w-4" />}
            color="from-blue-500 to-blue-600"
            trend="+2 this month"
          />
          <StatCard
            title="Total Spent"
            value={formatCurrency(totalSpent)}
            icon={<CreditCard className="h-4 w-4" />}
            color="from-green-500 to-green-600"
            trend="+$150 this month"
          />
          <StatCard
            title="Wishlist Items"
            value={wishlist.length.toString()}
            icon={<Heart className="h-4 w-4" />}
            color="from-red-500 to-red-600"
          />
          <StatCard
            title="Loyalty Points"
            value="1,250"
            icon={<Star className="h-4 w-4" />}
            color="from-yellow-500 to-yellow-600"
            trend="+50 this week"
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
                  onClick={() => navigate("/all-products")}
                >
                  <ShoppingBag className="h-6 w-6 text-blue-600" />
                  <span className="text-sm">Browse Products</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 border-red-300 hover:bg-red-50"
                  onClick={() => navigate("/wishlist")}
                >
                  <Heart className="h-6 w-6 text-red-600" />
                  <span className="text-sm">My Wishlist</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 border-green-300 hover:bg-green-50"
                  onClick={() => navigate("/dashboard/my-orders")}
                >
                  <Package className="h-6 w-6 text-green-600" />
                  <span className="text-sm">Track Orders</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 border-purple-300 hover:bg-purple-50"
                  onClick={() => navigate("/notifications")}
                >
                  <Bell className="h-6 w-6 text-purple-600" />
                  <span className="text-sm">Notifications</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Profile Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-500" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Full Name
                    </label>
                    <p className="text-lg font-semibold">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Email
                    </label>
                    <p className="text-lg font-semibold">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Phone
                    </label>
                    <p className="text-lg font-semibold">
                      {user.phone
                        ? formatPhoneNumber(user.phone)
                        : "Not provided"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Username
                    </label>
                    <p className="text-lg font-semibold">@{user.username}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    Address
                  </label>
                  <p className="text-lg font-semibold">
                    {user.address || "Not provided"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-500" />
                  Account Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Account Type
                  </label>
                  <Badge className="block w-fit mt-1 bg-blue-500 hover:bg-blue-600">
                    {user.role}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Status
                  </label>
                  <Badge className="block w-fit mt-1 bg-green-500 hover:bg-green-600">
                    Active
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Last Login
                  </label>
                  <p className="text-sm font-medium">
                    {user.lastLoginAt
                      ? formatDate(user.lastLoginAt)
                      : "Not available"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Member Since
                  </label>
                  <p className="text-sm font-medium">
                    {formatDate(user.createdAt)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

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
                amount: formatCurrency(order.totalAmount),
                status: order.status,
                paymentType: order.paymentType,
                date: formatDate(order.createdAt),
                reviewed: order.isReviewed ? "Yes" : "No",
              }))}
              columns={[
                { key: "id", label: "Order ID", sortable: true },
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
                {
                  key: "reviewed",
                  label: "Reviewed",
                  render: (value) => (
                    <Badge
                      variant={value === "Yes" ? "default" : "outline"}
                      className={
                        value === "Yes"
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-gray-500 hover:bg-gray-600"
                      }
                    >
                      {value}
                    </Badge>
                  ),
                },
              ]}
              actions={{
                view: () => navigate(`/dashboard/my-orders`),
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

export default UserDashboardPage;
