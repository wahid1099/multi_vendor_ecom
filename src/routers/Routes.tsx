import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import HomePage from "../pages/HomePage/HomePage.tsx";
import AboutUs from "../pages/HomePage/AboutUsPage";
import ContactUs from "../pages/HomePage/ContactUsPage";
import TermsConditions from "../pages/HomePage/TermsConditions";
import PrivacyPolicy from "../pages/HomePage/PrivacyPolicy";
import CartPage from "../pages/Products/CartPage.tsx";
import ShopPage from "../pages/ShopPage/ShopPage.tsx";
// import AboutUs from "../pages/AboutUsPage/AboutUs";
// import ContactUs from "../pages/ContactUs/ContactUs";
import RegistrationPage from "../pages/Register/RegistrationPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import ForgotPassword from "../pages/LoginPage/ForgotPassword";
import ResetPassword from "../pages/LoginPage/ResetPasssword";
import ProtectedRoutes from "./ProtectedRoutes.tsx";
import ProductDetails from "../pages/Products/ProductsDetails.tsx";
import DashboadLayout from "../layout/DashboadLayout";
//common for all

import ProfilePage from "../components/Dashboard/shared/Profiledashboard.tsx";
//admin routes
import AddProduct from "../components/Dashboard/Admin/products/AddProduct.tsx";
import ManageProductsAdmin from "../components/Dashboard/Admin/products/ManageProducts.tsx";
import AllOrdersAdmin from "../components/Dashboard/Admin/Allorders/AllOrdersAdmin.tsx";
import ManageUsers from "../components/Dashboard/Admin/ManageUser/ManageUser.tsx";
import AllTransactionsAdmin from "../components/Dashboard/Admin/AllTransections/AllTransections.tsx";
import AllReviews from "../components/Dashboard/Admin/AllReviews/AllReviews.tsx";
import CreateCoupon from "../components/Dashboard/Admin/Coupons/CreateCuopon.tsx";

//vendor routes
import MyShop from "../components/Dashboard/vendor/Myshop.tsx";
import AddProductVendor from "../components/Dashboard/vendor/AddProdcutVendor";
import ManageProducts from "../components/Dashboard/vendor/ManageProducts.tsx";
import VendorOrdersTable from "../components/Dashboard/vendor/VendorOrdersTable.tsx";
//customer routes
import UserAllOrders from "../components/Dashboard/User/Allorders.tsx";
import MyReviews from "../components/Dashboard/User/MyReviews.tsx";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms",
        element: <TermsConditions />,
      },

      //   {
      //     path: "/about-us",
      //     element: <AboutUs />,
      //   },
      //   {
      //     path: "car",
      //     element: <CarList />,
      //   },
      //   {
      //     path: "/view-details/:id",
      //     element: <CarViewDetails />,
      //   },
      //   {
      //     path: "booking",
      //     element: <CarBooking />,
      //   },
      //   {
      //     path: "/booking-confirmation",
      //     element: <BookingConfirmation />,
      //   },
      //   {
      //     path: "/contact-us",
      //     element: <ContactUs />,
      //   },
      {
        path: "/signup",
        element: <RegistrationPage />,
      },

      {
        path: "/cart",
        element: <CartPage />,
      },

      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/forgot-pass",
        element: <ForgotPassword />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/shop/:id",
        element: <ShopPage />,
      },

      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoutes allowedRoles={["Admin", "Vendor", "Customer"]}>
        <DashboadLayout />
      </ProtectedRoutes>
    ),
    children: [
      //commong profile route
      {
        path: "my-profile",
        element: (
          <ProtectedRoutes allowedRoles={["Admin", "Vendor", "Customer"]}>
            <ProfilePage />
          </ProtectedRoutes>
        ),
      },
      //
      //admin routes
      {
        path: "add-product",
        element: (
          <ProtectedRoutes allowedRoles={["Admin"]}>
            <AddProduct />
          </ProtectedRoutes>
        ),
      },
      {
        path: "manage-users",
        element: (
          <ProtectedRoutes allowedRoles={["Admin"]}>
            <ManageUsers />
          </ProtectedRoutes>
        ),
      },
      {
        path: "admin-manage-products",
        element: (
          <ProtectedRoutes allowedRoles={["Admin"]}>
            <ManageProductsAdmin />
          </ProtectedRoutes>
        ),
      },

      {
        path: "admin-manage-order",
        element: (
          <ProtectedRoutes allowedRoles={["Admin"]}>
            <AllOrdersAdmin />
          </ProtectedRoutes>
        ),
      },
      {
        path: "admin-manage-payments",
        element: (
          <ProtectedRoutes allowedRoles={["Admin"]}>
            <AllTransactionsAdmin />
          </ProtectedRoutes>
        ),
      },
      {
        path: "all-reviews-admin",
        element: (
          <ProtectedRoutes allowedRoles={["Admin"]}>
            <AllReviews />
          </ProtectedRoutes>
        ),
      },
      {
        path: "Manage-coupons-admin",
        element: (
          <ProtectedRoutes allowedRoles={["Admin"]}>
            <CreateCoupon />
          </ProtectedRoutes>
        ),
      },

      //vemdor routes
      {
        path: "vendor/add-product",
        element: (
          <ProtectedRoutes allowedRoles={["Vendor"]}>
            <AddProductVendor />
          </ProtectedRoutes>
        ),
      },
      {
        path: "vendor-myshop",
        element: (
          <ProtectedRoutes allowedRoles={["Vendor"]}>
            <MyShop />
          </ProtectedRoutes>
        ),
      },
      {
        path: "vendor-manage-products",
        element: (
          <ProtectedRoutes allowedRoles={["Vendor"]}>
            <ManageProducts />
          </ProtectedRoutes>
        ),
      },
      {
        path: "vendor-orders",
        element: (
          <ProtectedRoutes allowedRoles={["Vendor"]}>
            <VendorOrdersTable />
          </ProtectedRoutes>
        ),
      },
      //customer

      {
        path: "my-orders",
        element: (
          <ProtectedRoutes allowedRoles={["Customer"]}>
            <UserAllOrders />
          </ProtectedRoutes>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <ProtectedRoutes allowedRoles={["Customer"]}>
            <MyReviews />
          </ProtectedRoutes>
        ),
      },

      //       {
      //         path: "my-bookings",
      //         element: <MyBookings />,
      //       },
      //       /* admin Profile Dropdown */
      //       {
      //         path: "all-cars",
      //         element: <GetAllCarData />,
      //       },
      //       {
      //         path: "add-car",
      //         element: <AddCarData />,
      //       },
      //       {
      //         path: "update-car/:id",
      //         element: <UpdateCar />,
      //       },
      //       {
      //         path: "admin-profile-view",
      //         element: <AdminViewProfile />,
      //       },
      //       {
      //         path: "all-users",
      //         element: <ManageUser />,
      //       },
      //       {
      //         path: "admin-bookings",
      //         element: <ManageBookings />,
      //       },
    ],
  },

  //   {
  //     path: "*",
  //     element: <ErrorPage />,
  //   },
]);
