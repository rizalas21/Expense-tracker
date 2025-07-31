import { useCategoryStore } from "@/stores/categoryStore";
import {
  Transaction,
  TransactionType,
  useTransactionStore,
} from "@/stores/transactionStore";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type AddTransactionsModalProps = {
  showModal: string;
  setShowModal: (value: string) => void;
};

export default function AddTransaction({
  showModal,
  setShowModal,
}: AddTransactionsModalProps) {
  const { addTransaction } = useTransactionStore();
  const { categories, getCategory } = useCategoryStore();
  const [data, setData] = useState<Omit<Transaction, "id" | "category">>({
    title: "",
    amount: 0,
    type: TransactionType.INCOME,
    date: new Date().toISOString(),
    categoryId: "",
  });

  const handleChange = (e: any) => {
    let { name, value } = e.target;
    if (name === "amount") return setData({ ...data, amount: Number(value) });

    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(
      "data kalo dirubah bro => ",
      { ...data },
      "data murni nya bro => ",
      data
    );
    e.preventDefault();
    await addTransaction(data);
    setShowModal("");
  };

  if (showModal !== "add") return null;
  console.log("data nihh bro -> ", data);

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
    <section className="flex items-center justify-center h-screen w-screen fixed left-0 top-0 bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center text-black">
          Add Transaction
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="border border-gray-300 px-3 py-2 rounded-lg"
            name="title"
            type="text"
            placeholder="Title"
            value={data.title}
            onChange={(e) => handleChange(e)}
            required
          />

          <input
            className="border border-gray-300 px-3 py-2 rounded-lg"
            name="amount"
            type="number"
            placeholder="Amount"
            value={data.amount}
            onChange={(e) => handleChange(e)}
            required
          />

          {/* Type: Toggle Buttons */}
          <div className="flex gap-2">
            <button
              type="button"
              name=""
              onClick={(e) =>
                setData({ ...data, type: TransactionType.INCOME })
              }
              className={`flex-1 px-4 py-2 rounded-lg border ${
                data.type === "INCOME"
                  ? "bg-green-500 text-white"
                  : "bg-white text-black border-gray-300"
              }`}
            >
              Income
            </button>
            <button
              type="button"
              onClick={(e) =>
                setData({ ...data, type: TransactionType.EXPENSE })
              }
              className={`flex-1 px-4 py-2 rounded-lg border ${
                data.type === "EXPENSE"
                  ? "bg-red-500 text-white"
                  : "bg-white text-black border-gray-300"
              }`}
            >
              Expense
            </button>
          </div>

          {/* Simpan type ke hidden input */}

          <input
            className="border border-gray-300 px-3 py-2 rounded-lg"
            name="date"
            type="datetime-local"
            onChange={(e) => handleChange(e)}
            defaultValue={new Date().toISOString()}
            required
          />

          <select
            name="categoryId"
            required
            className="border border-gray-300 px-3 py-2 rounded-lg"
            onChange={(e) => handleChange(e)}
          >
            <option value="">Select Category</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <input type="hidden" name="userId" value="current-user-id" />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => setShowModal("")}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
