import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Budgets() {
  return (
    <main className="w-full flex flex-col gap-5 max-h-screen px-4">
      <div className="flex justify-between px-3">
        <p className="text-3xl font-bold">Budgets</p>
        <button className="bg-sky-800 text-white border rounded-xl px-3 py-2 hover:bg-sky-900 cursor-pointer">
          Add Budgets
        </button>
      </div>

      <div className="flex gap-1 w-full overflow-y-auto">
        <div
          id="Budgets"
          className="bg-white pt-3 rounded-lg space-y-2 shadow-xl w-full"
        >
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
              {[...Array(8)].map((_, i) => (
                <tr key={i} className="border-b border-gray-500/30">
                  <td className="text-left px-4 py-3">Groceries</td>
                  <td className="text-left px-4 py-3">April</td>
                  <td className="text-left px-4 py-3">2025</td>
                  <td className="text-left px-4 py-3 text-green-700 font-bold">
                    $4,000
                  </td>
                  <td className="text-center px-4 py-3">
                    <button className="text-blue-600 cursor-pointer hover:text-blue-500/50">
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
