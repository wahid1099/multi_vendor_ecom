import { ShopApi } from "../../../../redux/features/shop/shopApi";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Swal from "sweetalert2";

import { TShop } from "@/type/global.type";

const AllShopsTable = () => {
  const { data, isLoading, isError } = ShopApi.useGetAllShopsQuery([]);
  const shops = data?.data || [];
  const [blacklistShop] = ShopApi.useBlackListShopMutation();

  const columnHelper = createColumnHelper<TShop>();
  const columns = [
    columnHelper.accessor("name", {
      header: "Shop Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: (info) => info.getValue() || "No description",
    }),
    columnHelper.accessor("vendorId", {
      header: "Vendor ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("isBlacklisted", {
      header: "Blacklisted",
      cell: (info) =>
        info.getValue() ? (
          <span className="text-red-500 font-bold">Yes</span>
        ) : (
          <span className="text-green-500 font-bold">No</span>
        ),
    }),
    columnHelper.accessor("createdAt", {
      header: "Created At",
      cell: (info) =>
        new Date(info.getValue()).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <button
          onClick={() => handleBlacklist(row.original)}
          className={`px-4 py-1 rounded ${
            row.original.isBlacklisted
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
        >
          {row.original.isBlacklisted ? "Remove Blacklist" : "Blacklist"}
        </button>
      ),
    }),
  ];

  const table = useReactTable({
    data: shops || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleBlacklist = async (shop: TShop) => {
    const action = shop.isBlacklisted ? "remove from blacklist" : "blacklist";
    const confirmResult = await Swal.fire({
      title: `Are you sure you want to ${action} this shop?`,
      text: shop.name,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    });

    if (confirmResult.isConfirmed) {
      try {
        await blacklistShop(shop._id).unwrap();
        Swal.fire(
          "Success",
          `Shop has been ${
            shop.isBlacklisted ? "removed from blacklist" : "blacklisted"
          }!`,
          "success"
        );
      } catch {
        Swal.fire("Error", "Something went wrong. Please try again.", "error");
      }
    }
  };

  if (isLoading) return <p>Loading shops...</p>;
  if (isError) return <p>Failed to load shops.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Shops</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border border-gray-300 px-4 py-2 text-left"
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
              <tr key={row.id} className="even:bg-gray-100">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border border-gray-300 px-4 py-2"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllShopsTable;
