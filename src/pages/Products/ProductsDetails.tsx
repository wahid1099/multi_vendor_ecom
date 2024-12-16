import { useParams, useNavigate } from "react-router-dom";
import { ProductApi } from "../../redux/features/products/ProductAPi"; // Adjust the path based on your project structure.

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from the URL
  const navigate = useNavigate();

  // Fetch product details using RTK Query
  const {
    data: product,
    isLoading,
    isError,
  } = ProductApi.useGetSingleProductQuery(id || "");

  if (isLoading) {
    return <div className="text-center text-xl mt-10">Loading...</div>;
  }

  if (isError || !product?.data) {
    return (
      <div className="text-center text-xl mt-10 text-red-500">
        Failed to load product details. Try again later.
      </div>
    );
  }

  const { name, description, price, images, category, inventory } =
    product.data;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        onClick={() => navigate(-1)} // Navigate back to the previous page
      >
        Back
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Image Section */}
        <div className="flex-1">
          <img
            src={images[0]}
            alt={name}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
          <div className="flex gap-2 mt-4">
            {images.slice(1).map((img: string, index: number) => (
              <img
                key={index}
                src={img}
                alt={`${name} ${index + 1}`}
                className="w-20 h-20 object-cover rounded-md border border-gray-200 shadow-sm cursor-pointer hover:border-blue-500"
              />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="flex-1 flex flex-col">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{name}</h1>
          <p className="text-gray-600 text-lg mb-2">Category: {category}</p>
          <p className="text-gray-700 text-base mb-4">{description}</p>
          <p className="text-xl font-semibold text-green-600 mb-4">
            Price: ${price}
          </p>
          <p className="text-gray-500 mb-6">
            Inventory: {inventory} units available
          </p>

          <button className="w-full md:w-1/2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
