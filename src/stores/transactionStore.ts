import axios from "axios";
import { create } from "zustand";

// export interface Category {
//   id: string;
//   name: string;
//   createdAt: string;
//   updatedAt: string;
// }

export enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  date: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
}

type DeleteResult = { success: true } | { error: string };

interface TransactionState {
  transactions: Transaction[];
  getTransactions: () => Promise<void>;
  addTransaction: (data: Omit<Transaction, "id" | "category">) => Promise<void>;
  deleteTransaction: (id: string) => Promise<DeleteResult>;
  updateTransaction: (id: string, newName: string) => Promise<void>;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],

  getTransactions: async () => {
    try {
      const res = await axios.get("/api/transactions");
      console.log("res nya bro => ", res.data.data);
      if (res.status >= 400 || !Array.isArray(res.data)) return;
      set({ transactions: res.data });
    } catch (error) {
      console.error("Error fetching:", error);
    }
  },

  addTransaction: async (data) => {
    try {
      const res = await axios.post("/api/transactions", { data });
      console.log("data store transactions nya bro => ", data);
      set((state) => ({
        transactions: [res.data, ...state.transactions],
      }));
    } catch (error) {
      console.error("Error adding:", error);
    }
  },

  deleteTransaction: async (id) => {
    try {
      const checkBudgetRes = await axios.get("/api/transactions", {
        params: { categoryId: id },
      });

      const relatedBudgets = checkBudgetRes.data?.data;

      if (relatedBudgets.length > 0) {
        console.log("true bro");
        return {
          error:
            "❌ Cannot delete. This category is linked to existing budgets.",
        };
      }

      const res = await axios.delete(`/api/transactions/${id}`);

      if (res.status >= 400) {
        return {
          error: `❌ Failed to delete category: ${
            res.data?.error || "Unknown error"
          }`,
        };
      }

      set((state) => ({
        transactions: state.transactions.filter((item) => item.id !== id),
      }));

      return { success: true };
    } catch (error) {
      console.error("❌ Error deleting category:", error);

      if (axios.isAxiosError(error)) {
        return {
          error: `❌ ${
            error.response?.data?.error || error.message || "Axios error"
          }`,
        };
      }

      return {
        error: "❌ Unexpected error occurred while deleting category.",
      };
    }
  },

  updateTransaction: async (id, newName) => {
    try {
      await axios.put(`/api/categories/${id}`, {
        data: { name: newName },
      });
      set((state) => ({
        transactions: state.transactions.map((item) =>
          item.id === id ? { ...item, name: newName } : item
        ),
      }));
    } catch (error) {
      console.error("Error updating:", error);
    }
  },
}));
