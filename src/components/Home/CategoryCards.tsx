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
      <h2 className="text-2xl font-bold mb-4">Shop by Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div
            key={category.name}
            onClick={() => handleCategoryClick(category.name)}
            className="group relative bg-gray-100 rounded shadow hover:shadow-lg overflow-hidden cursor-pointer"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2">
              <span className="font-medium text-sm">{category.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCards;
