import { useState } from "react";
import Swal from "sweetalert2";
import uploadImageToCloudinary from "../../../../utils/uploadImage";
import { SubmitHandler, useForm } from "react-hook-form";
import { TProduct } from "@/type/global.type";
import { ProductApi } from "../../../../redux/features/products/ProductAPi";
import slugify from "slugify";

const AddProduct = () => {
  const [createProduct] = ProductApi.useCreateProductMutation();
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const categories = [
    "Fashion",
    "Electronics",
    "Home Appliance",
    "Furniture",
    "Mobile",
    "Headphones",
    "Accessories",
    "Camera & Photo",
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TProduct>();

  const handleImageUpload = async (files: FileList | null) => {
    if (!files) return;

    setIsUploading(true);
    try {
      const validFiles = Array.from(files).filter(
        (file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024 // Max 5MB
      );

      if (validFiles.length !== files.length) {
        Swal.fire({
          title: "Warning",
          text: "Some files were skipped (only images under 5MB are allowed)",
          icon: "warning",
        });
      }

      const uploadPromises = validFiles.map(async (file) => {
        try {
          const url = await uploadImageToCloudinary(file);
          return url;
        } catch (error) {
          console.error("Error uploading image:", error);
          return null;
        }
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const validUrls = uploadedUrls.filter(
        (url): url is string => url !== null
      );

      setImages((prevImages) => [...prevImages, ...validUrls]);
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err instanceof Error ? err.message : "Failed to upload images",
        icon: "error",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit: SubmitHandler<TProduct> = async (data) => {
    if (images.length === 0) {
      Swal.fire({
        title: "Error",
        text: "Please upload at least one image",
        icon: "error",
      });
      return;
    }

    let slug = data.slug;

    if (!slug) {
      slug = slugify(data.name, { lower: true, strict: true });
    }
    const productData = {
      ...data,
      category: data.category,
      slug,
      images,
      price: Number(data.price),
      inventory: Number(data.inventory),
      discount: Number(data.discount),
      stock: Number(data.inventory),
      variants: [],
    };

    try {
      await createProduct(productData).unwrap();
      Swal.fire({
        title: "Success!",
        text: "Product added successfully",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
      // Clear images after successful submission
      setImages([]);
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      Swal.fire({
        title: "Error!",
        text: err?.data?.message || "Failed to add product",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-xl border border-gray-200">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800 text-center">
        Add New Product
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              Product Name
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              {...register("name", { required: "Product name is required" })}
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              Description
            </label>
            <textarea
              className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              rows={4}
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Enter product description"
            />
            {errors.description && (
              <p className="mt-2 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              Slug (Optional)
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              {...register("slug")}
              placeholder="Enter slug (leave blank to auto-generate)"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Price
              </label>
              <input
                type="number"
                className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                {...register("price", {
                  required: "Price is required",
                  min: 0,
                })}
                placeholder="Enter price"
              />
              {errors.price && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Inventory
              </label>
              <input
                type="number"
                className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                {...register("inventory", {
                  required: "Inventory is required",
                  min: 0,
                })}
                placeholder="Enter inventory count"
              />
              {errors.inventory && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.inventory.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              Category
            </label>
            <select
              className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              {...register("category", { required: "Category is required" })}
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category} value={category.toLowerCase()}>
                  {category}
                </option>
              ))}
            </select>

            {errors.category && (
              <p className="mt-2 text-sm text-red-600">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              Discount (%)
            </label>
            <input
              type="number"
              className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              {...register("discount")}
              placeholder="Enter discount percentage"
              min="0"
              max="100"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              Images
            </label>
            <label
              className={`cursor-pointer bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition ${
                isUploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isUploading ? "Uploading..." : "Upload Images"}
              <input
                type="file"
                className="hidden"
                multiple
                accept="image/*"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleImageUpload(e.target.files)
                }
                disabled={isUploading}
              />
            </label>
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Product image ${index + 1}`}
                      className="h-24 w-full object-cover rounded-lg shadow-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isUploading}
          className={`w-full py-3 px-6 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg text-lg font-medium transition ${
            isUploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isUploading ? "Uploading Images..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
