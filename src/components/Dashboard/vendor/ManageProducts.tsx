import { useMemo, useState } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { ProductApi } from "../../../redux/features/products/ProductAPi";
import { TProduct } from "../../../type/global.type";
import slugify from "slugify";
import Swal from "sweetalert2";
import UpdateProductModal from "../shared/UpdateProductModal"; // Import the modal component

const ManageProducts = () => {
  const [createProduct] = ProductApi.useCreateProductMutation(); // Mutation for creating a new product

  const [deleteProduct] = ProductApi.useDeleteProductMutation();
  const { data, isLoading, isError } = ProductApi.useGetAllVendorProductsQuery(
    {}
  );

  const [globalFilter, setGlobalFilter] = useState(""); // Search bar state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null); // The current product being edited

  // Define column structure for @tanstack/react-table
  const columnHelper = createColumnHelper<TProduct>();

  const columns = useMemo(() => {
    const handleDuplicate = async (product: TProduct) => {
      const { _id, ...rest } = product; // Use _ to indicate it's intentionally unused
      console.log(_id);

      try {
        const newSlug = slugify(`${product.slug}-copy`, {
          lower: true,
          strict: true,
        });

        const newProduct = {
          ...rest,
          slug: newSlug,
          name: `${product.name} (Copy)`, // Modify the name as needed
        };

        await createProduct(newProduct).unwrap();

        Swal.fire(
          "Duplicated!",
          "Product has been duplicated successfully.",
          "success"
        );
      } catch (error) {
        console.error("Error duplicating product:", error);
        Swal.fire("Error!", "Failed to duplicate the product.", "error");
      }
    };
    // Handle Delete action with SweetAlert confirmation
    const handleDelete = (id: string) => {
      Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          // Call the deleteProduct mutation if confirmed
          deleteProduct(id)
            .unwrap()
            .then(() => {
              Swal.fire(
                "Deleted!",
                "Your product has been deleted.",
                "success"
              );
            })
            .catch((error) => {
              console.error("Error deleting product:", error);
              Swal.fire(
                "Error!",
                "There was a problem deleting the product.",
                "error"
              );
            });
        }
      });
    };

    return [
      columnHelper.accessor("_id", {
        header: "Product ID",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("name", {
        header: "Product Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("price", {
        header: "Price ($)",
        cell: (info) => `$${info.getValue()}`,
      }),
      columnHelper.accessor("category", {
        header: "Category",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("inventory", {
        header: "Inventory",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("visibility", {
        header: "Visibility",
        cell: (info) => (
          <span
            className={`${
              info.getValue() === "active" ? "text-green-600" : "text-red-600"
            } font-medium`}
          >
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("images", {
        header: "Images",
        cell: (info) => (
          <div className="flex space-x-2">
            {info.getValue()?.map((image: string, index: number) => (
              <img
                key={index}
                src={image}
                alt={`Product Image ${index + 1}`}
                className="w-16 h-16 object-cover rounded"
              />
            ))}
          </div>
        ),
      }),
      columnHelper.accessor("description", {
        header: "Description",
        cell: (info) => {
          const description = info.getValue();
          const maxLength = 100; // Set the maximum length of the description
          return description && description.length > maxLength
            ? description.substring(0, maxLength) + "..."
            : description;
        },
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              className="px-2 py-1 text-white bg-blue-500 rounded"
              onClick={() => handleEdit(row.original)}
            >
              Edit
            </button>
            <button
              className="px-2 py-1 text-white bg-red-500 rounded"
              onClick={() => handleDelete(row.original._id)}
            >
              Delete
            </button>
            <button
              className="px-2 py-1 text-white bg-green-500 rounded"
              onClick={() => handleDuplicate(row.original)}
            >
              Duplicate
            </button>
          </div>
        ),
      }),
    ];
  }, [columnHelper, deleteProduct, createProduct]);

  // Handle Edit and Delete actions
  const handleEdit = (product: TProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const table = useReactTable({
    data: data?.data || [],
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Error fetching products.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />

      {/* Product Table */}
      <div className="overflow-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border border-gray-300 bg-gray-200 p-2 text-left"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border border-gray-300 p-2 text-left"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-2 py-1 border border-gray-300 rounded"
        >
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-2 py-1 border border-gray-300 rounded"
        >
          Next
        </button>
      </div>
      {selectedProduct && (
        <UpdateProductModal
          isOpen={isModalOpen}
          onClose={closeModal}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default ManageProducts;
