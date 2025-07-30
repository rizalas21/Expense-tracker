"use client";

import { useState } from "react";
import { useBudgetStore } from "@/stores/budgetStore";
import { Budget } from "../../budgets/page";
import Swal from "sweetalert2";

interface Props {
  showModal: string;
  setShowModal: (val: string) => void;
  selectedBudget: Budget;
  setSelectedBudget: (value: Budget) => void;
}

export default function UpdateBudget({
  showModal,
  setShowModal,
  selectedBudget,
  setSelectedBudget,
}: Props) {
  const [data, setData] = useState({
    amount: selectedBudget.amount,
    month: selectedBudget.month,
    year: selectedBudget.year,
    categoryId: selectedBudget.categoryId,
  });
  const { updateBudget, deleteBudget } = useBudgetStore();
  if (showModal !== "put") return null;
  console.log(
    "ini data selected nya bro -> ",
    selectedBudget,
    typeof data.amount
  );

  const handleChange = async (e: any) => {
    let { name, value } = e.target;
    if (name === "amount" || name === "month" || name === "year")
      value = Number(value);
    console.log("nama broo ", name, value);

    setData({ ...data, [name]: value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const res = await updateBudget(selectedBudget.id, {
        ...data,
      });
      setShowModal("");
      return Swal.fire({
        title: "Success!",
        text: "Budget has been updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error(error);
      setShowModal("");
      return Swal.fire({
        title: "Error!",
        text: "Failed to add budget.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: "Delete Budget?",
        text: `This action cannot be undone!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#aaa",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteBudget(selectedBudget.id);
        Swal.fire("Deleted!", "The budget has been deleted.", "success");
        setShowModal("");
        setData({
          amount: 0,
          month: 0,
          year: 0,
          categoryId: "",
        });
      }
    } catch (error) {
      console.error(error);
      setShowModal("");
      return Swal.fire({
        title: "Error!",
        text: "Failed to add budget.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <section className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Budget</h2>

        <form className="space-y-4" onSubmit={handleUpdate}>
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <p className="bg-slate-200 px-4 py-2 rounded text-gray-600 cursor-not-allowed">
              {selectedBudget.category.name}
            </p>
          </div>

          <div>
            <label className="block mb-1 font-medium">Amount</label>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-lg"
              defaultValue={selectedBudget.amount}
              name="amount"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Month</label>
            <select
              className="w-full px-4 py-2 border rounded-lg"
              defaultValue={selectedBudget.month}
              name="month"
              onChange={(e) => handleChange(e)}
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Year</label>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-lg"
              defaultValue={selectedBudget.year}
              name="year"
              onChange={(e) => handleChange(e)}
              min={2023}
              max={2100}
            />
          </div>

          <div className="flex justify-between pt-6">
            <button
              type="button"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              onClick={handleDelete}
            >
              Delete
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                onClick={() => setShowModal("")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-sky-800 text-white rounded-lg hover:bg-sky-900"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
