import ImageCarousel from "../../components/Home/Slider";
import BrowseProducts from "../../components/Home/BrowseProducts";
import HomeBanner from "../../components/Home/Banner";
import CategoryCards from "../../components/Home/CategoryCards";
import ScrollToTop from "../../components/Home/ScrollToTop";

const HomePage = () => {
  return (
    <div className="mt-2">
      <ImageCarousel></ImageCarousel>
      <div className="container mx-auto">
        <CategoryCards></CategoryCards>
        <HomeBanner></HomeBanner>
        <BrowseProducts></BrowseProducts>
      </div>
      <ScrollToTop></ScrollToTop>
    </div>
  );
};

export default HomePage;
