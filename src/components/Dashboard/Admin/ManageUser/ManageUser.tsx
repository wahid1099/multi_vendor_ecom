import { useMemo, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import Swal from "sweetalert2";
import { userApi } from "../../../../redux/features/user/userApi";
import { TUser } from "@/type/global.type";

const ManageUsers = () => {
  const { data: response, isLoading, error } = userApi.useGetAllUsersQuery({});
  const users = response?.data || [];

  const [suspendVendor] = userApi.useSuspendVednorMutation();
  const [toggleUserDeletion] = userApi.useToggleUserDeletationMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // State for search input
  const [search, setSearch] = useState("");

  const columnHelper = createColumnHelper<TUser>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("_id", {
        header: "User ID",
        cell: (info) => info.getValue(),
      }),
      columnHelper.display({
        id: "profile",
        header: "Profile",
        cell: (props) => (
          <div className="flex items-center">
            <img
              src={props.row.original.profileImage}
              alt={props.row.original.name}
              className="rounded-full mr-2"
              width="40"
              height="40"
            />
            <div>
              <div className="font-bold">{props.row.original.name}</div>
              <small className="text-gray-500">
                @{props.row.original.username}
              </small>
            </div>
          </div>
        ),
      }),
      columnHelper.display({
        id: "contact",
        header: "Contact",
        cell: (props) => (
          <div>
            <div>{props.row.original.email}</div>
            <small className="text-gray-500">{props.row.original.phone}</small>
          </div>
        ),
      }),
      columnHelper.accessor("role", {
        header: "Role",
        cell: (info) => (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("lastLoginAt", {
        header: "Lastlogin",
        cell: (info) => {
          const date = new Date(info.getValue());
          const formattedDate = date.toLocaleString(); // You can customize this format further
          return (
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-400 text-white	">
              {formattedDate}
            </span>
          );
        },
      }),

      columnHelper.display({
        id: "status",
        header: "Status",
        cell: (props) => (
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              props.row.original.isDeleted
                ? "bg-red-100 text-red-800"
                : props.row.original.isSuspended
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {props.row.original.isDeleted
              ? "Deleted"
              : props.row.original.isSuspended
              ? "Suspended"
              : "Active"}
          </span>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (props) => (
          <div className="flex gap-2">
            {props.row.original.role === "Customer" && (
              <button
                className="px-3 py-1 text-sm font-medium text-red-700 bg-red-100 rounded hover:bg-red-200"
                onClick={
                  () =>
                    props.row.original.isDeleted
                      ? handleOpenModal("recover", props.row.original._id) // Recover deleted user
                      : handleOpenModal("delete", props.row.original._id) // Delete user
                }
              >
                {props.row.original.isDeleted ? "Recover" : "Delete"}
              </button>
            )}
            {props.row.original.role === "Vendor" && (
              <button
                className="px-3 py-1 text-sm font-medium text-yellow-700 bg-yellow-100 rounded hover:bg-yellow-200"
                onClick={
                  () =>
                    props.row.original.isSuspended
                      ? handleOpenModal("unsuspend", props.row.original._id) // Unsuspend vendor
                      : handleOpenModal("suspend", props.row.original._id) // Suspend vendor
                }
              >
                {props.row.original.isSuspended ? "Unsuspend" : "Suspend"}
              </button>
            )}
          </div>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter: search,
    },
    onGlobalFilterChange: setSearch,
  });

  const handleOpenModal = (action: string, userId: string) => {
    setCurrentAction(action);
    setCurrentUserId(userId);
    setIsModalOpen(true);
  };
  const handleActionConfirm = async () => {
    if (currentAction && currentUserId) {
      try {
        if (currentAction === "suspend") {
          await suspendVendor(currentUserId); // Suspend Vendor
        } else if (currentAction === "unsuspend") {
          // Logic for unsuspending the vendor
          await suspendVendor(currentUserId); // Assuming the same mutation for both suspend and unsuspend
        } else if (currentAction === "delete") {
          await toggleUserDeletion(currentUserId); // Delete User
        } else if (currentAction === "recover") {
          // Logic to recover the deleted user
          await toggleUserDeletion(currentUserId); // Assuming the same mutation for both delete and recover
        }

        Swal.fire({
          icon: "success",
          title: "Success",
          text: `User has been ${currentAction}ed!`,
          showConfirmButton: false,
          timer: 1500,
        });
        setIsModalOpen(false);
      } catch {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsModalOpen(false);
      }
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center p-5">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="m-5 p-4 text-red-700 bg-red-100 rounded" role="alert">
        Error loading users. Please try again later.
      </div>
    );

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 bg-blue-600 rounded-t-lg">
          <h2 className="text-xl font-bold text-white">Manage Users</h2>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
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
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Modal for confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to {currentAction} this user?
            </h3>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 text-white bg-red-500 rounded"
                onClick={handleActionConfirm}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 text-white bg-gray-500 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
