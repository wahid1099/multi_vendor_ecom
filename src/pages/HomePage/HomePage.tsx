import ImageCarousel from "../../components/Home/Slider";
import BrowseProducts from "../../components/Home/BrowseProducts";
import HomeBanner from "../../components/Home/Banner";
import CategoryCards from "../../components/Home/CategoryCards";
import ScrollToTop from "../../components/Home/ScrollToTop";
import Newsletter from "../../components/Home/Newsletter";
import BlogSlider from "../../components/Home/BlogSection";

const HomePage = () => {
  return (
    <div className="mt-2 mb-10">
      <ImageCarousel></ImageCarousel>
      <div className="container mx-auto">
        <CategoryCards></CategoryCards>
        <HomeBanner></HomeBanner>
        <BrowseProducts></BrowseProducts>
        <Newsletter></Newsletter>
      </div>
      <BlogSlider></BlogSlider>
      <ScrollToTop></ScrollToTop>
    </div>
  );
};

export default HomePage;
