import ImageCarousel from "../../components/Home/Slider";
import BrowseProducts from "../../components/Home/BrowseProducts";

const HomePage = () => {
  return (
    <div className="mt-2">
      <ImageCarousel></ImageCarousel>
      <div className="container mx-auto">
        <h2>Homepage</h2>
        <BrowseProducts></BrowseProducts>
      </div>
    </div>
  );
};

export default HomePage;
