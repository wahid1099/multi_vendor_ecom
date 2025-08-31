import React from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ModernDataTable from "./ModernDataTable";

// Sample data
const salesData = [
  { month: "Jan", sales: 4000, orders: 240 },
  { month: "Feb", sales: 3000, orders: 198 },
  { month: "Mar", sales: 5000, orders: 300 },
  { month: "Apr", sales: 4500, orders: 278 },
  { month: "May", sales: 6000, orders: 389 },
  { month: "Jun", sales: 5500, orders: 349 },
];

const categoryData = [
  { name: "Electronics", value: 35, color: "#8884d8" },
  { name: "Clothing", value: 25, color: "#82ca9d" },
  { name: "Books", value: 20, color: "#ffc658" },
  { name: "Home", value: 15, color: "#ff7300" },
  { name: "Sports", value: 5, color: "#00ff88" },
];

const revenueData = [
  { day: "Mon", revenue: 2400 },
  { day: "Tue", revenue: 1398 },
  { day: "Wed", revenue: 9800 },
  { day: "Thu", revenue: 3908 },
  { day: "Fri", revenue: 4800 },
  { day: "Sat", revenue: 3800 },
  { day: "Sun", revenue: 4300 },
];

const StatCard: React.FC<{
  title: string;
  value: string;
  change: string;
  changeType: "increase" | "decrease";
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, change, changeType, icon, color }) => (
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
        <div className={`p-2 rounded-lg bg-gradient-to-br ${color} text-white`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2">{value}</div>
        <div className="flex items-center text-sm">
          {changeType === "increase" ? (
            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span
            className={
              changeType === "increase" ? "text-green-500" : "text-red-500"
            }
          >
            {change}
          </span>
          <span className="text-muted-foreground ml-1">from last month</span>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your store.
          </p>
        </div>
        <Badge variant="outline" className="w-fit">
          <Eye className="h-3 w-3 mr-1" />
          Live Data
        </Badge>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="$45,231"
          change="+20.1%"
          changeType="increase"
          icon={<DollarSign className="h-4 w-4" />}
          color="from-green-500 to-green-600"
        />
        <StatCard
          title="Total Orders"
          value="1,234"
          change="+15.3%"
          changeType="increase"
          icon={<ShoppingCart className="h-4 w-4" />}
          color="from-blue-500 to-blue-600"
        />
        <StatCard
          title="Total Customers"
          value="2,345"
          change="+8.2%"
          changeType="increase"
          icon={<Users className="h-4 w-4" />}
          color="from-purple-500 to-purple-600"
        />
        <StatCard
          title="Total Products"
          value="567"
          change="-2.1%"
          changeType="decrease"
          icon={<Package className="h-4 w-4" />}
          color="from-orange-500 to-orange-600"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                Sales Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorSales)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {categoryData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Weekly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar
                  dataKey="revenue"
                  fill="url(#colorRevenue)"
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modern Data Tables Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Orders Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <ModernDataTable
            title="Recent Orders"
            data={[
              {
                id: "#12345",
                customer: "John Doe",
                amount: "$299.99",
                status: "Completed",
                date: "2024-01-15",
              },
              {
                id: "#12346",
                customer: "Jane Smith",
                amount: "$149.99",
                status: "Processing",
                date: "2024-01-14",
              },
              {
                id: "#12347",
                customer: "Bob Johnson",
                amount: "$89.99",
                status: "Shipped",
                date: "2024-01-13",
              },
            ]}
            columns={[
              { key: "id", label: "Order ID", sortable: true },
              { key: "customer", label: "Customer", sortable: true },
              { key: "amount", label: "Amount", sortable: true },
              {
                key: "status",
                label: "Status",
                render: (value) => (
                  <Badge
                    variant={
                      value === "Completed"
                        ? "default"
                        : value === "Processing"
                        ? "secondary"
                        : "outline"
                    }
                    className={
                      value === "Completed"
                        ? "bg-green-500 hover:bg-green-600"
                        : value === "Processing"
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-blue-500 hover:bg-blue-600"
                    }
                  >
                    {value}
                  </Badge>
                ),
              },
              { key: "date", label: "Date", sortable: true },
            ]}
            actions={{
              view: (row) => console.log("View order:", row),
              edit: (row) => console.log("Edit order:", row),
            }}
          />
        </motion.div>

        {/* Top Products Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <ModernDataTable
            title="Top Products"
            data={[
              {
                name: "iPhone 15 Pro",
                category: "Electronics",
                sales: 245,
                revenue: "$122,500",
                stock: 45,
              },
              {
                name: "MacBook Air M2",
                category: "Electronics",
                sales: 189,
                revenue: "$189,000",
                stock: 23,
              },
              {
                name: "AirPods Pro",
                category: "Electronics",
                sales: 567,
                revenue: "$113,400",
                stock: 156,
              },
            ]}
            columns={[
              { key: "name", label: "Product", sortable: true },
              { key: "category", label: "Category", sortable: true },
              { key: "sales", label: "Sales", sortable: true },
              { key: "revenue", label: "Revenue", sortable: true },
              {
                key: "stock",
                label: "Stock",
                sortable: true,
                render: (value) => (
                  <Badge
                    variant={
                      value > 50
                        ? "default"
                        : value > 20
                        ? "secondary"
                        : "destructive"
                    }
                    className={
                      value > 50
                        ? "bg-green-500 hover:bg-green-600"
                        : value > 20
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-red-500 hover:bg-red-600"
                    }
                  >
                    {value}
                  </Badge>
                ),
              },
            ]}
            actions={{
              view: (row) => console.log("View product:", row),
              edit: (row) => console.log("Edit product:", row),
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
