export default function Categories() {
  return (
    <main className="w-full flex flex-col gap-5 max-h-screen px-4">
      <div className="px-3 space-y-5">
        <p className="text-3xl font-bold">Categories</p>
        <button className=" flex justify-center space-x-3 bg-blue-500 text-white border rounded-xl px-3 py-2 hover:bg-sky-900 cursor-pointer w-full">
          <p>+</p> <span>Add Category</span>
        </button>
      </div>

      <div className="flex gap-1 w-full overflow-y-auto">
        <div
          id="Categories"
          className="bg-white px-5 py-3 rounded-lg space-y-2 shadow-xl w-full"
        >
          <table className="w-full table-auto overflow-y-auto">
            <thead>
              <tr className="border-b border-gray-500/30">
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-center px-4 py-2">
                  Number of Transactions
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(8)].map((_, i) => (
                <tr key={i} className="border-b border-gray-500/30">
                  <td className="text-left px-4 py-2">Food</td>
                  <td className="text-center px-4 py-2">8</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white px-5 py-3 rounded-lg space-y-2 shadow-xl w-full">
        assalamualaikum
      </div>
    </main>
  );
}
