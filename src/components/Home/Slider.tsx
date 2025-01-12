import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel styles
import { Carousel } from "react-responsive-carousel";
import b1 from "../../assets/banner/banner1.png";
import b2 from "../../assets/banner/banner2.jpg";
import b3 from "../../assets/banner/b44.jpg";
import b4 from "../../assets/banner/banner4.jpg";
import b5 from "../../assets/banner/bn2.jpg";

const ImageCarousel = () => {
  return (
    <div className="w-full h-[50vh] mx-auto mb-20">
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        autoPlay={true}
        interval={3000}
        showThumbs={false}
        showStatus={false}
      >
        <div className="h-[70vh]">
          {" "}
          {/* Set image container height */}
          <img src={b1} alt="Image 1" className="w-full h-full object-fit" />
        </div>
        <div className="h-[70vh]">
          <img src={b2} alt="Image 2" className="w-full h-full object-fit" />
        </div>
        <div className="h-[70vh]">
          {" "}
          {/* Example with 75% height */}
          <img src={b3} alt="Image 3" className="w-full h-full object-fit" />
        </div>
        <div className="h-[70vh]">
          <img src={b4} alt="Image 4" className="w-full h-full object-fit" />
        </div>
        <div className="h-[70vh]">
          <img src={b5} alt="Image 4" className="w-full h-full object-fit" />
        </div>
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
