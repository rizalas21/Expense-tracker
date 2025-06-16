type AddTransactionsModalProps = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
};

export default function AddTransaction({
  showModal,
  setShowModal,
}: AddTransactionsModalProps) {
  if (!showModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle input values di sini
    setShowModal(false);
  };

  return (
    <section className="flex items-center justify-center h-screen w-screen fixed left-0 top-0 bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center text-black">
          Add Transaction
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="title"
            type="text"
            placeholder="Title"
            required
            className="border border-gray-300 px-3 py-2 rounded-lg"
          />

          <input
            name="amount"
            type="number"
            placeholder="Amount"
            required
            className="border border-gray-300 px-3 py-2 rounded-lg"
          />

          <select
            name="type"
            required
            className="border border-gray-300 px-3 py-2 rounded-lg"
          >
            <option value="">Select Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <input
            name="date"
            type="date"
            required
            className="border border-gray-300 px-3 py-2 rounded-lg"
          />

          <select
            name="categoryId"
            required
            className="border border-gray-300 px-3 py-2 rounded-lg"
          >
            <option value="">Select Category</option>
            {/* TODO: Map daftar kategori dari props atau state */}
            <option value="cat1">Food</option>
            <option value="cat2">Transport</option>
            <option value="cat3">Salary</option>
          </select>

          {/* userId diset otomatis, bisa hidden input */}
          <input
            type="hidden"
            name="userId"
            value="current-user-id" // Ganti dengan ID dari session
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
