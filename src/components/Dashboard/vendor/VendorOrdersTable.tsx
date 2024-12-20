import { useMemo, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { OrderApi } from "../../../redux/features/order/order";
import { TOrder } from "@/type/global.type";

const VendorOrdersTable = () => {
  const [filterText, setFilterText] = useState("");

  const { data, isLoading, error } = OrderApi.useGetVendorordersQuery([]);
  const orders = useMemo(() => (data?.data || []) as TOrder[], [data]);
  console.log(data);
  const columnHelper = createColumnHelper<TOrder>();
  const columns = useMemo(
    () => [
      columnHelper.accessor("_id", {
        header: "Order ID",
        cell: (info) => (
          <span className="text-blue-500 font-medium">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor((row) => row.items[0]?.product?.images[0], {
        id: "productImage",
        header: "Product Image",
        cell: (info) => (
          <img
            src={info.getValue() || "https://via.placeholder.com/50"}
            alt="Product"
            className="w-12 h-12 object-cover rounded border"
          />
        ),
      }),
      columnHelper.accessor((row) => row.items[0]?.product?.name, {
        id: "productName",
        header: "Product Name",
        cell: (info) => info.getValue() || "N/A",
      }),
      columnHelper.accessor((row) => row.items[0]?.quantity, {
        id: "quantity",
        header: "Quantity",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("totalAmount", {
        header: "Total Amount",
        cell: (info) => `$${info.getValue().toFixed(2)}`,
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => (
          <select
            defaultValue={info.getValue()}
            className="px-2 py-1 rounded text-xs font-medium border"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
        ),
      }),
      columnHelper.accessor("paymentType", {
        header: "Payment Type",
        cell: (info) =>
          info.getValue() === "COD" ? (
            "Cash on Delivery"
          ) : (
            <>
              Online Payment
              <br />
              <span className="text-sm text-gray-500">
                Transaction ID: {info.row.original.payment?._id || "N/A"}
              </span>
            </>
          ),
      }),
      columnHelper.accessor("createdAt", {
        header: "Order Date",
        cell: (info) => new Date(info.getValue()).toLocaleDateString() || "N/A",
      }),
    ],
    [columnHelper]
  );

  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter: filterText,
    },
    onGlobalFilterChange: setFilterText,
  });

  if (isLoading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4">Error fetching orders</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Vendor Orders</h1>
      <input
        type="text"
        className="w-full mb-4 p-2 border rounded-md"
        placeholder="Search Orders..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-left px-4 py-2 border-b font-medium text-gray-600"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
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
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 border-b text-gray-700"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
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
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default VendorOrdersTable;
