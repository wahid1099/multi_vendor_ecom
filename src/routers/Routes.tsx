import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import HomePage from "../pages/HomePage/HomePage.tsx";
import AboutUs from "../pages/HomePage/AboutUsPage";
import ContactUs from "../pages/HomePage/ContactUsPage";
import TermsConditions from "../pages/HomePage/TermsConditions";
import PrivacyPolicy from "../pages/HomePage/PrivacyPolicy";
import CartPage from "../pages/Products/CartPage.tsx";
// import AboutUs from "../pages/AboutUsPage/AboutUs";
// import ContactUs from "../pages/ContactUs/ContactUs";
import RegistrationPage from "../pages/Register/RegistrationPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import ForgotPassword from "../pages/LoginPage/ForgotPassword";
import ResetPassword from "../pages/LoginPage/ResetPasssword";
import ProtectedRoutes from "./ProtectedRoutes.tsx";
import DashboadLayout from "../layout/DashboadLayout";
import AddProduct from "../components/Dashboard/Admin/products/AddProduct.tsx";
import ManageProductsAdmin from "../components/Dashboard/Admin/products/ManageProducts.tsx";

import MyShop from "../components/Dashboard/vendor/Myshop.tsx";
import AddProductVendor from "../components/Dashboard/vendor/AddProdcutVendor";
import ManageUsers from "../components/Dashboard/Admin/ManageUser/ManageUser.tsx";
import ManageProducts from "../components/Dashboard/vendor/ManageProducts.tsx";
import VendorOrdersTable from "../components/Dashboard/vendor/VendorOrdersTable.tsx";
import ProductDetails from "../pages/Products/ProductsDetails.tsx";

import UserAllOrders from "../components/Dashboard/User/Allorders.tsx";
// import AddCarData from "../component/Dashboard/Admin/CarManagement/AddCarData";
// import GetAllCarData from "../component/Dashboard/Admin/CarManagement/AllCars";
// import UpdateCar from "../component/Dashboard/Admin/CarManagement/UpdateCarData";
// import AdminViewProfile from "../component/Dashboard/Admin/AdminProfile/AdminProfile";
// import ManageUser from "../component/Dashboard/Admin/UserManagement/ManageUser";
// import ManageBookings from "../component/Dashboard/Admin/ManageBookings/ManageBookings";
// import UserViewProfile from "../component/Dashboard/User/UserProfile";
// import UpdateProfile from "../component/Dashboard/User/UpdateProfile";
// import MyBookings from "../component/Dashboard/User/MyBookings";
// import ErrorPage from "../pages/ErrorPage/ErrorPage";
// import CarList from "../pages/CarList/CarList";
// import CarViewDetails from "../pages/CarDetails/CarDetailsPage";
// import CarBooking from "../pages/CarbookingPage/CarBookingPage";
// import BookingConfirmation from "../pages/CarbookingPage/BookingConfirmationPage";

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
        path: "/reset-pass",
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

      {
        path: "my-orders",
        element: (
          <ProtectedRoutes allowedRoles={["Customer"]}>
            <UserAllOrders />
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
