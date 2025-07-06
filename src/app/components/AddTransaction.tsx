import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";

type AddTransactionsModalProps = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
};

export default function AddTransaction({
  showModal,
  setShowModal,
}: AddTransactionsModalProps) {
  const { data: session } = useSession();
  const [data, setData] = useState({
    title: "",
    amount: "",
    type: "",
    user: session?.user?.email,
    date: null,
    category: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post("/api/transactions", {
      ...data,
      amount: Number(data.amount),
    });
    setShowModal(false);
    console.log("response nya nihh bro dari add transactions -> ", res);
    return res;
  };

  if (!showModal) return null;
  console.log(
    "data nihh bro -> ",
    data,
    "session data bro -> ",
    session?.user?.email
  );

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
              onClick={(e) => setData({ ...data, type: "INCOME" })}
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
              onClick={(e) => setData({ ...data, type: "EXPENSE" })}
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
            name="category"
            required
            className="border border-gray-300 px-3 py-2 rounded-lg"
            onChange={(e) => handleChange(e)}
          >
            <option value="">Select Category</option>
            <option value="Groceries">Groceries</option>
            <option value="cat2">Transport</option>
            <option value="cat3">Salary</option>
          </select>

          <input
            type="hidden"
            name="userId"
            value="current-user-id" // ganti dari session
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
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
