"use client";
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function Dashboard() {
  const pieData = [
    { name: "Exponse", value: 2000 },
    { name: "espense", value: 300 },
  ];

  const COLORS = ["#1D4ED8", "#64748b"]; // Warna tiap potongan

  return (
    <main className="w-full flex flex-col gap-4">
      <p className="text-3xl font-bold">Dashboard</p>
      <div className="grid sm:grid-cols-2 gap-1 w-full">
        <div id="analytics" className="flex flex-col w-11/12 space-y-3">
          <div
            id="balance"
            className="bg-white px-5 py-3 rounded-lg space-y-2 shadow-xl"
          >
            <p className="font-semibold text-xl">Balance</p>
            <p className="font-bold text-3xl">$ 1,200.00</p>
            <div className="flex justify-between">
              <p>Total Income</p>
              <p>$3,500.00</p>
            </div>
            <div className="flex justify-between">
              <p>Total Expenses</p>
              <p>$2,500.00</p>
            </div>
          </div>

          <div
            id="income"
            className="bg-white px-5 py-3 rounded-lg space-y-2 shadow-xl"
          >
            <p className="font-semibold text-xl">Income</p>
            <div className="w-full h-8/12 flex items-center gap-4">
              {/* Chart di kiri */}
              <div className="w-1/2 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      stroke="none"
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Label/keterangan di kanan */}
              <div className="w-1/2 space-y-1">
                {pieData.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      ></div>
                      <span>{item.name}</span>
                    </div>
                    <span className="font-semibold">
                      ${item.value.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <p>Total Income</p>
              <p>$3,500.00</p>
            </div>
          </div>

          <div
            id="Income-Sources"
            className="bg-white px-5 py-3 rounded-lg space-y-2 shadow-xl"
          >
            <p className="font-semibold text-xl">Income Sources</p>
            <div className="flex justify-between">
              <p>Salary</p>
              <p>$2,000.00</p>
            </div>
            <div className="flex justify-between">
              <p>Refund</p>
              <p>$300.00</p>
            </div>
            <div className="flex justify-between">
              <p>Freelance</p>
              <p>$1,200.00</p>
            </div>
          </div>
        </div>

        <div id="history" className="flex flex-col w-11/12 space-y-4">
          <div
            id="Transactions"
            className="bg-white px-5 py-3 rounded-lg space-y-2 shadow-xl w-full"
          >
            <p className="font-semibold text-xl">Recent Transactions</p>
            <table className="w-full">
              <thead>
                <tr className="border-b-1 border-gray-500/50">
                  <th className="text-left px-4 py-2">Date</th>
                  <th className="text-left px-4 py-2">Description</th>
                  <th className="text-right px-4 py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2">4/2</td>
                  <td className="px-4 py-2">Refund</td>
                  <td className="px-4 py-2 text-right">+$300.00</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">4/2</td>
                  <td className="px-4 py-2">Grocery Shopping</td>
                  <td className="px-4 py-2 text-right">-$5.00</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">4/2</td>
                  <td className="px-4 py-2">Credit Card</td>
                  <td className="px-4 py-2 text-right">-$45.00</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">4/2</td>
                  <td className="px-4 py-2">Concession</td>
                  <td className="px-4 py-2 text-right">-$0.50</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">4/2</td>
                  <td className="px-4 py-2">Freck Pay</td>
                  <td className="px-4 py-2 text-right">-$3.50</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">4/2</td>
                  <td className="px-4 py-2">Loan Refund It</td>
                  <td className="px-4 py-2 text-right">Expense</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            id="Transactions"
            className="bg-white px-5 py-3 rounded-lg space-y-2 shadow-xl w-full"
          >
            <p className="font-semibold text-xl">Budget Overview</p>
            <div className="grid grid-cols-1">
              <p>Category 1</p>
              <p>chart</p>
            </div>
            <div className="grid grid-cols-1">
              <p>Category 2</p>
              <p>chart</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
