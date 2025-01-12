import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import camera from "../../assets/categories/camera.jpeg";
import fashionpic from "../../assets/categories/fashion.jpeg";
import phone from "../../assets/categories/phone.jpeg";
import furniture from "../../assets/categories/furniture.jpeg";
import headphone from "../../assets/categories/headphone.png";
import homeapplience from "../../assets/categories/homeapl.jpeg";
import accesosiries from "../../assets/categories/accessiories.png";
import electronics from "../../assets/categories/electronins.jpeg";

const categories = [
  { name: "Fashion", image: fashionpic },
  { name: "Electronics", image: electronics },
  { name: "Home Appliance", image: homeapplience },
  { name: "Furniture", image: furniture },
  { name: "Mobile", image: phone },
  { name: "Headphones", image: headphone },
  { name: "Accessories", image: accesosiries },
  { name: "Camera & Photo", image: camera },
];

const CategoryCards = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    // Navigate to the "All Products" page with the selected category as a query parameter
    navigate(
      `/all-products?category=${encodeURIComponent(category.toLowerCase())}`
    );
  };

  return (
    <div className="container mx-auto p-12">
      <h2 className="text-2xl font-bold mb-8 mt-4 text-center">
        Shop by Categories
      </h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={2}
        navigation
        pagination={{
          clickable: true,
          el: ".custom-swiper-pagination",
        }}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 5 },
        }}
        className="swiper-container"
      >
        {categories.map((category) => (
          <SwiperSlide key={category.name}>
            <div
              onClick={() => handleCategoryClick(category.name)}
              className="group flex flex-col items-center cursor-pointer"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gray-100 rounded-full overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="mt-2 text-sm text-center font-medium">
                {category.name}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Custom pagination container */}
      <div className="custom-swiper-pagination mt-4"></div>
    </div>
  );
};

export default CategoryCards;
