import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import camera from "../../assets/categories/camera.jpeg";
import fashionpic from "../../assets/categories/fashion.jpeg";
import phone from "../../assets/categories/phone.jpeg";
import furniture from "../../assets/categories/furniture.jpeg";
import headphone from "../../assets/categories/headphone.png";
import homeapplience from "../../assets/categories/homeapl.jpeg";

const blogs = [
  {
    id: 1,
    title: "Top 10 Fashion Trends for 2024",
    description:
      "Stay ahead in style with the latest fashion trends this year.",
    image: camera,
  },
  {
    id: 2,
    title: "How to Choose the Perfect Smartphone",
    description:
      "A complete guide to finding the right smartphone for your needs.",
    image: fashionpic,
  },
  {
    id: 3,
    title: "The Best Deals on Electronics This Season",
    description: "Discover amazing discounts on top electronics and gadgets.",
    image: phone,
  },
  {
    id: 4,
    title: "5 Tips for Shopping Online Safely",
    description: "Protect yourself and your data while shopping online.",
    image: furniture,
  },
  {
    id: 5,
    title: "Top Kitchen Gadgets for the Modern Home",
    description: "Upgrade your kitchen with these must-have gadgets.",
    image: homeapplience,
  },
  {
    id: 6,
    title: "Eco-Friendly Products You’ll Love",
    description:
      "Support sustainability with these environmentally friendly picks.",
    image: headphone,
  },
];

const BlogSlider = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">
        Explore Our Latest Blogs
      </h1>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="mySwiper"
      >
        {blogs.map((blog) => (
          <SwiperSlide key={blog.id}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <p className="text-gray-600">{blog.description}</p>
                <button
                  className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  onClick={() => alert(`Read more about "${blog.title}"`)}
                >
                  Read More
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BlogSlider;
