import { useState } from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { PaymentApi } from "../../../../redux/features/Payment/payment";
import { TPayment } from "@/type/global.type";
import ClipLoader from "react-spinners/ClipLoader";

const AllTransactionsAdmin = () => {
  const { data, isLoading, error } = PaymentApi.useGetAllpaymentsQuery([]);
  const [filterText, setFilterText] = useState("");

  const payments = data?.data || [];

  const columnHelper = createColumnHelper<TPayment>();

  const columns = [
    columnHelper.accessor("transactionId", {
      header: "Transaction ID",
      cell: (info) => (
        <span className="text-blue-500 font-medium">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor((row) => row.user?.email, {
      id: "userEmail",
      header: "User Email",
      cell: (info) => info.getValue() || "N/A",
    }),
    columnHelper.accessor((row) => row.user?.name, {
      id: "name",
      header: "User Name",
      cell: (info) => info.getValue() || "N/A",
    }),
    columnHelper.accessor("order", {
      header: "Order ID",
      cell: (info) => info.getValue()?.toString() || "N/A",
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
      cell: (info) => `$${info.getValue().toFixed(2)}`,
    }),
    columnHelper.accessor("method", {
      header: "Method",
      cell: (info) => info.getValue()?.toString() || "N/A",
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            info.getValue() === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {info.getValue().toUpperCase()}
        </span>
      ),
    }),
    columnHelper.accessor("createdAt", {
      header: "Date",
      cell: (info) => new Date(info.getValue()).toLocaleDateString() || "N/A",
    }),
  ];

  const table = useReactTable({
    data: payments,
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
    return (
      <div className="flex items-center">
        <ClipLoader
          color="#e93b16"
          loading={isLoading}
          size={40} // Adjust size for better alignment
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <span className="ml-2">Loading Orders ..</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-4">Error fetching transactions</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">All Transactions</h1>
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

export default AllTransactionsAdmin;
