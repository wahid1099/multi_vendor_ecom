import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ProductApi } from "../../../redux/features/products/ProductAPi";
import { TProduct } from "../../../type/global.type";
import uploadImageToCloudinary from "../../../utils/uploadImage";

interface UpdateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: TProduct | null;
}

const UpdateProductModal = ({
  isOpen,
  onClose,
  product,
}: UpdateProductModalProps) => {
  const [updateProduct] = ProductApi.useUpdateProductMutation();
  const [updatedProduct, setUpdatedProduct] = useState<TProduct | null>(null);
  const [newImages, setNewImages] = useState<File[]>([]); // State for new images
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  useEffect(() => {
    if (product) {
      setUpdatedProduct(product); // Update product state when modal opens
    }
  }, [product]);

  // Handle form submission to update product
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!updatedProduct) return;
    setLoading(true); // Set loading to true when update starts
    try {
      // Upload new images to Cloudinary
      const imagesToAdd: string[] = [];
      if (newImages.length > 0) {
        for (let i = 0; i < newImages.length; i++) {
          const uploadedImageUrl = await uploadImageToCloudinary(newImages[i]);
          if (uploadedImageUrl) {
            // Check if the upload was successful
            imagesToAdd.push(uploadedImageUrl); // Only add if it's not undefined
          }
        }
      }

      // Determine images to remove by comparing the old images with the new ones
      const imagesToRemove = updatedProduct.images.filter(
        (image) => !imagesToAdd.includes(image)
      );

      // Update product data with new images and images to remove
      await updateProduct({
        id: updatedProduct._id,
        ProductData: {
          ...updatedProduct,
          imagesToRemove,
          imagesToAdd,
        },
      }).unwrap();

      Swal.fire("Success!", "Product updated successfully.", "success");
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire("Error!", "There was an issue updating the product.", "error");
    } finally {
      setLoading(false); // Reset loading state after operation
    }
  };

  // Handle image file change (for uploading new images)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setNewImages(files); // Store the new image files
    }
  };

  // Handle visibility selection
  const handleVisibilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (updatedProduct) {
      setUpdatedProduct({
        ...updatedProduct,
        visibility: e.target.value as "active" | "inactive" | "archived",
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof TProduct
  ) => {
    if (updatedProduct) {
      const value = e.target.value;
      setUpdatedProduct({
        ...updatedProduct,
        [field]:
          field === "price" || field === "inventory" || field === "discount"
            ? Number(value) // Convert to number
            : value, // For other fields, just assign the value
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        {updatedProduct && (
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                id="name"
                type="text"
                value={updatedProduct.name}
                onChange={(e) => handleInputChange(e, "name")}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                id="price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) => handleInputChange(e, "price")}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="discount"
                className="block text-sm font-medium text-gray-700"
              >
                Discount
              </label>
              <input
                id="discount"
                type="number"
                value={updatedProduct.discount || ""}
                onChange={(e) => handleInputChange(e, "discount")}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="inventory"
                className="block text-sm font-medium text-gray-700"
              >
                Inventory
              </label>
              <input
                id="inventory"
                type="number"
                value={updatedProduct.inventory}
                onChange={(e) => handleInputChange(e, "inventory")}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                required
              />
            </div>

            {/* Description Field */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                value={updatedProduct.description}
                onChange={(e) => handleInputChange(e, "description")}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                rows={4}
                required
              />
            </div>

            {/* Images Field */}
            <div className="mb-4">
              <label
                htmlFor="images"
                className="block text-sm font-medium text-gray-700"
              >
                Images
              </label>
              <input
                id="images"
                type="file"
                onChange={handleImageChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                multiple
              />
            </div>

            {/* Visibility */}
            <div className="mb-4">
              <label
                htmlFor="visibility"
                className="block text-sm font-medium text-gray-700"
              >
                Visibility
              </label>
              <select
                id="visibility"
                value={updatedProduct.visibility}
                onChange={handleVisibilityChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className={`px-4 py-2 text-white ${
                  loading ? "bg-gray-500" : "bg-blue-500"
                } rounded hover:bg-blue-600`}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Product"}
              </button>
              <button
                type="button"
                className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateProductModal;
