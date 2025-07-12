"use client";

import { useBudgetStore } from "@/stores/budgetStore";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import AddBudgetModal from "./AddBudgets";
import monthOfName from "@/lib/monthOfName";
import UpdateBudget from "./UpdateBudgets";

export interface Budget {
  id: string;
  amount: number;
  month: number;
  year: number;
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
}

export default function Budgets() {
  const [showModal, setShowModal] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { budgets, getBudgets } = useBudgetStore();
  const [selectedBudget, setSelectedBudget] = useState<Budget>({
    id: "",
    amount: 0,
    month: 0,
    year: 0,
    categoryId: "",
    category: { id: "", name: "" },
  });

  useEffect(() => {
    try {
      getBudgets();
    } catch (error) {
      console.log("error when try getBudget -> ", error);
    } finally {
      setIsLoading(false);
    }
  }, [getBudgets]);

  console.log(budgets);
  return (
    <main className="w-full flex flex-col gap-5 max-h-screen px-4">
      <div className="flex justify-between px-3">
        <p className="text-3xl font-bold">Budgets</p>
        <button
          className="bg-sky-800 text-white border rounded-xl px-3 py-2 hover:bg-sky-900 cursor-pointer"
          onClick={() => setShowModal("add")}
        >
          Add Budgets
        </button>
      </div>

      <div className="flex gap-1 w-full overflow-y-auto">
        <div
          id="Budgets"
          className="bg-white pt-3 rounded-lg space-y-2 shadow-xl w-full"
        >
          {isLoading ? (
            <p className="text-center py-6 text-gray-500">Loading...</p>
          ) : (
            <table className="w-full table-auto overflow-y-auto">
              <thead>
                <tr className="border-b border-gray-500/30 rounded-xl">
                  <th className="text-left px-4 py-2">Category</th>
                  <th className="text-left px-4 py-2">Month</th>
                  <th className="text-left px-4 py-2">Year</th>
                  <th className="text-left px-4 py-2">Amount</th>
                  <th className="text-center px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {budgets.length > 0 ? (
                  budgets.map((items) => (
                    <tr key={items.id} className="border-b border-gray-500/30">
                      <td className="text-left px-4 py-3">
                        {items.category.name}
                      </td>
                      <td className="text-left px-4 py-3">
                        {monthOfName(items.month)}
                      </td>
                      <td className="text-left px-4 py-3">{items.year}</td>
                      <td className="text-left px-4 py-3 text-green-700 font-bold">
                        Rp. {items.amount}
                      </td>
                      <td className="text-center px-4 py-3">
                        <button
                          className="text-blue-600 cursor-pointer hover:text-blue-500/50"
                          onClick={() => {
                            setSelectedBudget({
                              id: items.id,
                              amount: items.amount,
                              month: items.month,
                              year: items.year,
                              categoryId: items.categoryId,
                              category: {
                                id: items.category.id,
                                name: items.category.name,
                              },
                            });
                            setShowModal("put");
                          }}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-500">
                      No Budgets found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        {showModal && showModal === "add" && (
          <AddBudgetModal showModal={showModal} setShowModal={setShowModal} />
        )}
        {showModal && showModal === "put" && (
          <UpdateBudget
            showModal={showModal}
            setShowModal={setShowModal}
            selectedBudget={selectedBudget}
            setSelectedBudget={setSelectedBudget}
          />
        )}
      </div>
    </main>
  );
}
