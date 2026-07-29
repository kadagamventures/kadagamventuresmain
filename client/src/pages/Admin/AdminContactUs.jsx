import React, { useEffect } from "react";
import useAdminContactStore from "../../zustand/AdminContactStore";
import useAuthStore from "../../zustand/useAuthStore";

const AdminContactUs = () => {
  const {
    inquiries,
    loading,
    error,
    fetchAll,
    fetchServices,
    fetchProducts,
    filter,
  } = useAdminContactStore();

  const hasHydrated = useAuthStore.persist?.hasHydrated?.();

  useEffect(() => {
    if (hasHydrated) {
      fetchAll();
    }
  }, [hasHydrated, fetchAll]);

  if (!hasHydrated) return null;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header with background color */}
      <div className="mb-6  ">
        <h2 className="text-2xl font-semibold text-black">Contact Us</h2>
        <p className="text-black text-sm mt-1">
          Log enquiry details to maintain accurate communication records.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={fetchAll}
          className={`px-4 py-2 rounded-md text-sm ${
            filter === "all"
              ? "bg-black text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          All
        </button>

        <button
          onClick={fetchServices}
          className={`px-4 py-2 rounded-md text-sm ${
            filter === "services"
              ? "bg-black text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Services
        </button>

        <button
          onClick={fetchProducts}
          className={`px-4 py-2 rounded-md text-sm ${
            filter === "products"
              ? "bg-black text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Products
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          {/* Table Head */}
          <thead
            style={{ backgroundColor: "#405BAA1F" }}
            className="text-black text-sm"
          >
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Phone no</th>
              <th className="p-4">Email Id</th>
              <th className="p-4">Type</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-sm">
            {loading && (
              <tr>
                <td colSpan="4" className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            )}

            {error && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-red-500">
                  {error}
                </td>
              </tr>
            )}

            {!loading &&
              inquiries?.map((item) => (
                <tr key={item.id} className=" hover:bg-gray-50 transition">
                  <td className="p-4">{item.fullName}</td>
                  <td className="p-4">{item.contactNumber}</td>
                  <td className="p-4">{item.email}</td>
                  <td className="p-4 capitalize">{item.inquiryAbout}</td>
                </tr>
              ))}

            {!loading && inquiries?.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-400">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminContactUs;
