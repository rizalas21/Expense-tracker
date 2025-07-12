import axios from "axios";
import { create } from "zustand";

export interface Budget {
  id: string;
  amount: number;
  month: number;
  year: number;
  categoryId: string;
  userId: string;
  category: {
    id: string;
    name: string;
  };
}

interface BudgetState {
  budgets: Budget[];
  getBudgets: () => void;
  addBudget: (data: Omit<Budget, "id" | "category" | "userId">) => void;
  deleteBudget: (id: string) => void;
  updateBudget: (id: string, data: Omit<Budget, "id" | "category">) => void;
}

export const useBudgetStore = create<BudgetState>((set) => ({
  budgets: [],

  getBudgets: async () => {
    try {
      const res = await axios.get("/api/budgets");
      if (res.status >= 400 || !Array.isArray(res.data?.data)) return null;
      set({ budgets: res.data.data });
    } catch (error) {
      console.error("Error fetching budgets:", error);
      return null;
    }
  },

  addBudget: async (data) => {
    try {
      const res = await axios.post("/api/budgets", { data });
      set((state) => ({
        budgets: [res.data, ...state.budgets],
      }));
    } catch (error) {
      console.error("Error adding budget:", error);
    }
  },

  deleteBudget: async (id) => {
    try {
      await axios.delete(`/api/budgets/${id}`);
      set((state) => ({
        budgets: state.budgets.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting budget:", error);
    }
  },

  updateBudget: async (id, data) => {
    try {
      const res = await axios.put(`/api/budgets/${id}`, data);
      set((state) => ({
        budgets: state.budgets.map((item) =>
          item.id === id ? res.data : item
        ),
      }));
    } catch (error) {
      console.error("Error updating budget:", error);
    }
  },
}));
