import { useMemo, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { ReviewApi } from "../../../../redux/features/reviews/reviews";
import { TReview } from "@/type/global.type";

const AllReviews = () => {
  const {
    data: reviewsData,
    isLoading,
    isError,
  } = ReviewApi.useGetAllreviewsQuery([]);
  const [filter, setFilter] = useState("");
  console.log(reviewsData);

  // Always call useMemo to define columns, even if reviewsData is not available yet
  const columnHelper = useMemo(() => createColumnHelper<TReview>(), []);

  const columns = useMemo(
    () => [
      columnHelper.accessor("_id", {
        header: "Review Id",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("user", {
        header: "User",
        cell: (info) => info.getValue()?.name || "N/A",
      }),
      columnHelper.accessor("product", {
        header: "Product",
        cell: (info) => info.getValue()?.name || "N/A",
      }),
      columnHelper.accessor("product", {
        header: "Product Image",
        cell: (info) => (
          <img
            src={info.getValue().images[0]} // Fallback to a default image if image is not available
            alt="Review Image"
            className="w-20 h-20 object-cover rounded-lg"
          />
        ),
      }),
      columnHelper.accessor("order", {
        header: "Order ID",
        cell: (info) => info.getValue()?._id,
      }),
      columnHelper.accessor("rating", {
        header: "Rating",
        cell: (info) => `${info.getValue()} / 5`,
      }),
      columnHelper.accessor("comment", {
        header: "Comment",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("createdAt", {
        header: "Date",
        cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      }),
      columnHelper.accessor("image", {
        header: "Image",
        cell: (info) => (
          <img
            src={info.getValue() || "default-image.jpg"} // Fallback to a default image if image is not available
            alt="Review Image"
            className="w-20 h-20 object-cover rounded-lg"
          />
        ),
      }),
    ],
    [columnHelper]
  );

  // Memoize the table data once it's available
  const reviews = useMemo(
    () => (reviewsData?.data || []) as TReview[],
    [reviewsData]
  );

  const data = useMemo(
    () =>
      reviews.map((review: TReview) => ({
        _id: review._id, // Ensure _id is included

        user: review.user,
        product: review.product,
        order: review.order,
        rating: review.rating,
        comment: review.comment,
        createdAt: new Date(review.createdAt), // Ensure this is a Date object if necessary
        updatedAt: new Date(review.createdAt), // Ensure this is a Date object if necessary
        shop: review.shop || undefined, // Provide default or undefined if not available
        image: review.image || "", // Provide default empty string if image is missing
      })),
    [reviews]
  );

  // Create table instance unconditionally
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter: filter,
    },
    onGlobalFilterChange: setFilter,
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Error state
  if (isError || !reviewsData) {
    return (
      <div className="text-center text-xl mt-10 text-red-500">
        Failed to load reviews. Try again later.
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">All Reviews</h1>
      <input
        type="text"
        placeholder="Search..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 px-4 py-2 border rounded-lg w-full"
      />
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
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
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllReviews;
