import { useState } from "react";
import { useForm } from "react-hook-form";
import { couponApi } from "../../../../redux/features/coupon/coupon";
import Swal from "sweetalert2";
import { TCoupon } from "@/type/global.type";
import ClipLoader from "react-spinners/ClipLoader";

const CreateCoupon = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<TCoupon | null>(null);
  const { register, handleSubmit, reset } = useForm();

  // RTK Query Hooks
  const [createCoupon] = couponApi.useCreateCouponMutation();
  const {
    data: couponsData,
    refetch,
    error,
    isLoading,
  } = couponApi.useGetAllCouponQuery([]);
  const [updateCoupon] = couponApi.useUpdateCouponMutation();
  const [deleteCoupon] = couponApi.useDeleteCouponMutation();

  console.log(couponsData);
  // Fallback for coupons
  const coupons = Array.isArray(couponsData?.data) ? couponsData.data : [];

  // Open Modal
  const openModal = (coupon: TCoupon | null = null) => {
    setEditingCoupon(coupon);
    setIsModalOpen(true);
    if (coupon) {
      reset(coupon);
    } else {
      reset();
    }
  };

  // Close Modal
  const closeModal = () => {
    setEditingCoupon(null);
    setIsModalOpen(false);
  };

  // Handle Create/Update Coupon
  const onSubmit = async (data: Partial<TCoupon>) => {
    try {
      if (editingCoupon) {
        await updateCoupon({
          id: editingCoupon._id,
          CouponData: data,
        }).unwrap();
        Swal.fire("Success", "Coupon updated successfully", "success");
      } else {
        await createCoupon(data).unwrap();
        Swal.fire("Success", "Coupon created successfully", "success");
      }
      refetch(); // Refresh coupon list
      closeModal();
    } catch {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  // Handle Delete Coupon
  const handleDelete = async (id: string) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      try {
        await deleteCoupon(id).unwrap();
        Swal.fire("Deleted!", "Coupon has been deleted.", "success");
        refetch();
      } catch {
        Swal.fire("Error", "Something went wrong", "error");
      }
    }
  };

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
        <span className="ml-2">Loading coupons ..</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-4">Error fetching coupons</div>;
  }
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Coupons</h1>
      <button
        onClick={() => openModal()}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Add Coupon
      </button>

      {/* Coupon Table */}
      <div className="mt-6">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Code</th>
              <th className="border p-2">Discount (%)</th>
              <th className="border p-2">Valid From</th>
              <th className="border p-2">Valid Until</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.length > 0 ? (
              coupons.map((coupon: TCoupon) => (
                <tr key={coupon._id}>
                  <td className="border p-2">{coupon.code}</td>
                  <td className="border p-2">{coupon.discount}</td>
                  <td className="border p-2">
                    {new Date(coupon.validFrom).toLocaleDateString()}
                  </td>
                  <td className="border p-2">
                    {new Date(coupon.validUntil).toLocaleDateString()}
                  </td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() => openModal(coupon)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(coupon._id!)}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center border p-4">
                  No coupons available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">
              {editingCoupon ? "Edit Coupon" : "Add Coupon"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700">Code</label>
                <input
                  {...register("code")}
                  type="text"
                  className="w-full border p-2 rounded"
                  placeholder="Coupon Code"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Discount (%)</label>
                <input
                  {...register("discount")}
                  type="number"
                  className="w-full border p-2 rounded"
                  placeholder="Discount"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Valid From</label>
                <input
                  {...register("validFrom")}
                  type="date"
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Valid Until</label>
                <input
                  {...register("validUntil")}
                  type="date"
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCoupon;
