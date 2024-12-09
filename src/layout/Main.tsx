import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";
import InfoBar from "@/shared/Navbar/Bottom_Nav";
// import Footer from "../shared/Footer/Footer";

const Main = () => {
  return (
    <>
      <div>
        <Navbar></Navbar>
        <InfoBar></InfoBar>
        <div className="pb-20 pt-18">
          <Outlet></Outlet>
        </div>
        {/* <Footer></Footer> */}
      </div>
    </>
  );
};
export default Main;
