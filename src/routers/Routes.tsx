import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import HomePage from "../pages/HomePage/HomePage";
// import AboutUs from "../pages/AboutUsPage/AboutUs";
// import ContactUs from "../pages/ContactUs/ContactUs";
import RegistrationPage from "../pages/Register/RegistrationPage";
import LoginPage from "../pages/LoginPage/LoginPage";
// import ProtectedRoutes from "./ProtectedRoutes";
import DashboadLayout from "../layout/DashboadLayout";
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
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <DashboadLayout />
      // <ProtectedRoutes>

      // </ProtectedRoutes>
    ),
    children: [
      //       {
      //         path: "profile-view",
      //         element: <UserViewProfile />,
      //       },
      //       {
      //         path: "profile-update",
      //         element: <UpdateProfile />,
      //       },
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
