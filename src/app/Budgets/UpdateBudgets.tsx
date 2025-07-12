"use client";

import { useState } from "react";
import { useBudgetStore } from "@/stores/budgetStore";
import { Budget } from "./page";
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
  const { updateBudget, deleteBudget } = useBudgetStore();
  if (showModal !== "put") return null;
  console.log("ini data selected nya bro -> ", selectedBudget);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    // await updateBudget(selectedBudget.id, {
    //   amount,
    //   month,
    //   year,
    // });
    setShowModal("");
  };

  const handleDelete = async () => {
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
      //   await deleteBudget(selectedBudget.id);
      Swal.fire("Deleted!", "The budget has been deleted.", "success");
      setShowModal("");
      setSelectedBudget({
        id: "",
        amount: 0,
        month: 0,
        year: 0,
        categoryId: "",
        category: {
          id: "",
          name: "",
        },
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
              //   onChange={(e) => setAmount(Number(e.target.value))}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Month</label>
            <select
              className="w-full px-4 py-2 border rounded-lg"
              defaultValue={selectedBudget.month}
              //   onChange={(e) => setMonth(Number(e.target.value))}
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
              //   onChange={(e) => setYear(Number(e.target.value))}
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
