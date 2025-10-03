import React, { useState } from "react";
import { useParams } from "react-router";

const SupplierDetails = () => {
  const { id } = useParams();

  const [purchaseHistory, setPurchaseHistory] = useState([
    { id: 1, date: "2025-08-02", name: "Order A", amount: 5000 },
    { id: 2, date: "2025-08-07", name: "Order B", amount: 2300 },
  ]);

  const [paidAmounts, setPaidAmounts] = useState([
    { id: 1, date: "2025-08-04", name: "Payment X", amount: 2500 },
  ]);

  // ✅ Totals
  const totalPurchase = purchaseHistory.reduce((sum, r) => sum + r.amount, 0);
  const totalPaid = paidAmounts.reduce((sum, r) => sum + r.amount, 0);
  const totalPending = totalPurchase - totalPaid; // 🔥 Formula applied

  // ✅ Handlers
  const handleUpdate = (type, id) => {
    alert(`Update ${type} entry with ID: ${id}`);
  };

  const handleAdd = (type) => {
    const newName = prompt(`Enter ${type} name:`);
    const newAmount = prompt(`Enter ${type} amount:`);
    if (newName && newAmount) {
      const newEntry = {
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        name: newName,
        amount: parseFloat(newAmount),
      };
      if (type === "purchase") setPurchaseHistory([...purchaseHistory, newEntry]);
      if (type === "paid") setPaidAmounts([...paidAmounts, newEntry]);
    }
  };

  // ✅ Reusable Table Component
  const renderTable = (title, data, type) => {
    const total = data.reduce((sum, row) => sum + row.amount, 0);

    return (
      <div className="bg-white shadow-lg rounded-xl p-6 mb-6 max-w-4xl mx-auto">
        <h2 className="text-lg font-semibold mb-3">{title}</h2>

        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{row.date}</td>
                  <td className="border px-4 py-2">{row.name}</td>
                  <td className="border px-4 py-2">₹{row.amount}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      onClick={() => handleUpdate(type, row.id)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 font-semibold">
                <td className="border px-4 py-2" colSpan="2">
                  Total
                </td>
                <td className="border px-4 py-2">₹{total}</td>
                <td className="border px-4 py-2"></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* ✅ Add New Entry Button at Bottom */}
        <div className="flex justify-end mt-4">
          <button
            onClick={() => handleAdd(type)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + Add New {title}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-green-100 p-8">
      <h1 className="text-2xl font-bold text-center mb-8">
        Supplier Details - {id}
      </h1>

      {/* ✅ Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
        <div className="bg-white p-6 shadow rounded-lg text-center">
          <h3 className="text-gray-600">Total Orders</h3>
          <p className="text-xl font-bold text-blue-600">₹{totalPurchase}</p>
        </div>
        <div className="bg-white p-6 shadow rounded-lg text-center">
          <h3 className="text-gray-600">Total Paid</h3>
          <p className="text-xl font-bold text-green-600">₹{totalPaid}</p>
        </div>
        <div className="bg-white p-6 shadow rounded-lg text-center">
          <h3 className="text-gray-600">Total Pending</h3>
          <p className="text-xl font-bold text-red-600">₹{totalPending}</p>
        </div>
      </div>

      {/* ✅ Detailed Tables */}
      {renderTable("Purchase History", purchaseHistory, "purchase")}
      {renderTable("Paid Amounts", paidAmounts, "paid")}
      {/* {renderTable("Pending Amounts", pendingAmounts, "pending", true)} */}

    </div>
  );
};

export default SupplierDetails;
