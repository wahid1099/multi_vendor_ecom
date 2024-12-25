import ImageCarousel from "../../components/Home/Slider";
import BrowseProducts from "../../components/Home/BrowseProducts";
import HomeBanner from "../../components/Home/Banner";

const HomePage = () => {
  return (
    <div className="mt-2">
      <ImageCarousel></ImageCarousel>
      <div className="container mx-auto">
        <HomeBanner></HomeBanner>
        <BrowseProducts></BrowseProducts>
      </div>
    </div>
  );
};

export default HomePage;
