"use client";

import { useEffect, useState } from "react";
import { Budget } from "./page";
import { useCategoryStore } from "@/stores/categoryStore";
import { useBudgetStore } from "@/stores/budgetStore";
import Swal from "sweetalert2";

type AddBudget = {
  showModal: string;
  setShowModal: (value: string) => void;
};

export default function AddBudgetModal({ showModal, setShowModal }: AddBudget) {
  //   const { addBudget } = useBudgetStore();
  const { categories, getCategory } = useCategoryStore();
  const { addBudget } = useBudgetStore();
  const [data, setData] = useState({
    amount: 0,
    month: 0,
    year: 0,
    categoryId: "",
  });

  if (!showModal) return null;

  const handleChange = async (e: any) => {
    const { name, value } = e.target;
    const numField = ["amount", "month", "year"];

    setData({
      ...data,
      [name]: numField.includes(name) ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addBudget(data);
      setShowModal("");

      Swal.fire({
        title: "Success!",
        text: "Budget has been added successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      console.log("data nya nihh boss -> ", data);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add budget.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        await getCategory();
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, [getCategory]);

  return (
    <section className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Budget</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium">Amount</label>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-lg"
              onChange={(e) => handleChange(e)}
              placeholder="Enter amount (e.g. 400000)"
              name="amount"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Month</label>
            <select
              className="w-full px-4 py-2 border rounded-lg"
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
              name="year"
              onChange={(e) => handleChange(e)}
              min={2023}
              max={2100}
              defaultValue={new Date().getFullYear()}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              className="w-full px-4 py-2 border rounded-lg"
              name="categoryId"
              onChange={(e) => handleChange(e)}
              required
            >
              <option value="">-- Choose Category --</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
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
              Add Budget
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
