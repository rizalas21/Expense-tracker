export default function Budgets() {
  return (
    <main className="w-full flex flex-col gap-5 max-h-screen px-4">
      <div className="flex justify-between px-3">
        <p className="text-3xl font-bold">Transactions</p>
        <button className="bg-sky-800 text-white border rounded-xl px-3 py-2 hover:bg-sky-900 cursor-pointer">
          Add Transactions
        </button>
      </div>
      <div className="w-5/12 flex items-center justify-between gap-1 bg-white border border-gray-300 rounded-md px-3 py-1">
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

      <div className="flex gap-1 w-full overflow-y-auto">
        <div
          id="Transactions"
          className="bg-white px-5 py-3 rounded-lg space-y-2 shadow-xl w-full"
        >
          <table className="w-full table-auto overflow-y-auto">
            <thead>
              <tr className="border-b border-gray-500/30">
                <th className="text-left px-4 py-2">Date</th>
                <th className="text-left px-4 py-2">Description</th>
                <th className="text-left px-4 py-2">Amount</th>
                <th className="text-left px-4 py-2">Category</th>
                <th className="text-right px-4 py-2">Detail Transaction</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(8)].map((_, i) => (
                <tr key={i} className="border-b border-gray-500/30">
                  <td className="text-left px-4 py-2">4/2</td>
                  <td className="text-left px-4 py-2">Refund</td>
                  <td className="text-left px-4 py-2">$100</td>
                  <td className="text-left px-4 py-2">Refund</td>
                  <td className="text-center px-4 py-2">
                    <button className="text-blue-600 hover:underline">
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
    </main>
  );
}
