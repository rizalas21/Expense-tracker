"use client";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import AddTransaction from "../components/transactions/AddTransaction";
import { useTransactionStore } from "@/stores/transactionStore";
import { useCategoryStore } from "@/stores/categoryStore";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: "";
  date: "";
  categoryId: "";
}

export default function Transactions() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { transactions, getTransactions } = useTransactionStore();
  const { categories, getCategory } = useCategoryStore();
  const [selectedBudget, setSelectedBudget] = useState<Transaction>({
    id: "",
    title: "",
    amount: 0,
    type: "",
    date: "",
    categoryId: "",
  });

  useEffect(() => {
    try {
      getTransactions();
      getCategory();
    } catch (error) {
      console.log("error when try getTransactions -> ", error);
    } finally {
      setIsLoading(false);
    }
  }, [getTransactions, getCategory]);

  console.log("ini transactions nya bro => ", transactions);

  return (
    <main className="w-full flex flex-col gap-5 max-h-screen px-4">
      <div className="flex justify-between px-3">
        <p className="text-3xl font-bold">Transactions</p>
        <div className="relative w-[27%] flex items-center ml-20">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full pl-10 pr-4 py-2 rounded bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-200 border-b-1 border-opacity-25"
          />
        </div>
        <button
          className="bg-sky-800 text-white border rounded-xl px-3 py-2 hover:bg-sky-900 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          Add Transactions
        </button>
      </div>
      <section className="flex flex-wrap gap-4 w-full">
        <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-md px-3 py-2">
          <input
            type="date"
            className="text-sm px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-sky-500"
            name="startDate"
          />
          <span className="text-gray-500 text-sm">to</span>
          <input
            type="date"
            className="text-sm px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-sky-500"
            name="endDate"
          />
        </div>

        <select className="min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200">
          <option value="">Choose Category</option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <div className="flex gap-4">
          <button className="bg-green-100 text-green-700 font-semibold py-2 px-3 rounded-lg border border-green-300 shadow-sm hover:bg-green-200 hover:shadow-md transition duration-300">
            Income
          </button>
          <button className="bg-red-100 text-red-700 font-semibold py-2 px-3 rounded-lg border border-red-300 shadow-sm hover:bg-red-200 hover:shadow-md transition duration-300">
            Expense
          </button>
        </div>
      </section>

      <div className="flex gap-1 w-full">
        <div
          id="Transactions"
          className="bg-white px-5 py-3 rounded-lg space-y-2 shadow-xl w-full"
        >
          {isLoading ? (
            <p className="text-center py-6 text-gray-500">Loading...</p>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-gray-500/30">
                  <th className="text-center px-4 py-2">Date</th>
                  <th className="text-center px-4 py-2">Description</th>
                  <th className="text-center px-4 py-2">Amount</th>
                  <th className="text-center px-4 py-2">Category</th>
                  <th className="text-center px-4 py-2">Type</th>
                  <th className="text-center px-2 py-2">Detail Transaction</th>
                </tr>
              </thead>
              <tbody className=" overflow-y-auto">
                {transactions.length > 0 ? (
                  transactions.map((item) => (
                    <tr key={item.id} className="border-b border-gray-500/30">
                      <td className="text-center px-4 py-2">
                        {new Date(item.date).toLocaleString()}
                      </td>
                      <td className="text-center px-4 py-2">{item.title}</td>
                      <td className="text-center px-4 py-2">{item.amount}</td>
                      <td className="text-center px-4 py-2">
                        {item.category.name}
                      </td>
                      <td className="text-center px-4 py-2">{item.type}</td>
                      <td className="text-center px-4 py-2">
                        <button className="text-blue-600 hover:underline">
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-gray-500">
                      No Transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
          <div className="w-full flex justify-between text-sm font-medium py-2 px-2">
            <p className="text-green-700">Total Income: 450</p>
            <p className="text-red-700">Total Expense: 450</p>
          </div>
          <div className="w-full flex justify-end gap-1">
            <button className="border rounded-xl border-slate-300 px-3 py-2">
              &lt;
            </button>
            <button className="border rounded-xl border-slate-300 px-3 py-2">
              1
            </button>
            <button className="border rounded-xl border-slate-300 px-3 py-2">
              2
            </button>
            <button className="border rounded-xl border-slate-300 px-3 py-2">
              &gt;
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <AddTransaction showModal={showModal} setShowModal={setShowModal} />
      )}
    </main>
  );
}
