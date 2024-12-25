import b1 from "../../assets/banner/banner6.png";
import b2 from "../../assets/banner/banner7.png";

const HomeBanner = () => {
  return (
    <div className="flex flex-wrap md:flex-nowrap gap-4 p-4">
      {/* Banner 1 */}
      <div className="w-full md:w-1/2">
        <img
          src={b1}
          alt="Banner 1"
          className="w-full h-auto rounded-md shadow-lg object-cover"
        />
      </div>
      {/* Banner 2 */}
      <div className="w-full md:w-1/2">
        <img
          src={b2}
          alt="Banner 2"
          className="w-full h-auto rounded-md shadow-lg object-cover"
        />
      </div>
    </div>
  );
};
export default HomeBanner;
