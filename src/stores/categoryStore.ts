import axios from "axios";
import { create } from "zustand";

export interface Category {
  id: string;
  name: string;
}

type DeleteResult = { success: true } | { error: string };

interface CategoryState {
  categories: Category[];
  getCategory: () => Promise<void>;
  addCategory: (data: string) => Promise<void>;
  deleteCategory: (id: string) => Promise<DeleteResult>;
  updateCategory: (id: string, newName: string) => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],

  getCategory: async () => {
    try {
      const res = await axios.get("/api/categories");
      if (res.status >= 400 || !Array.isArray(res.data)) return;
      set({ categories: res.data });
    } catch (error) {
      console.error("Error fetching:", error);
    }
  },

  addCategory: async (data) => {
    try {
      const res = await axios.post("/api/categories", { data });
      set((state) => ({
        categories: [res.data, ...state.categories],
      }));
    } catch (error) {
      console.error("Error adding:", error);
    }
  },

  deleteCategory: async (id) => {
    try {
      const checkBudgetRes = await axios.get("/api/budgets", {
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

      const res = await axios.delete(`/api/categories/${id}`);

      if (res.status >= 400) {
        return {
          error: `❌ Failed to delete category: ${
            res.data?.error || "Unknown error"
          }`,
        };
      }

      set((state) => ({
        categories: state.categories.filter((item) => item.id !== id),
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

  updateCategory: async (id, newName) => {
    try {
      await axios.put(`/api/categories/${id}`, {
        data: { name: newName },
      });
      set((state) => ({
        categories: state.categories.map((item) =>
          item.id === id ? { ...item, name: newName } : item
        ),
      }));
    } catch (error) {
      console.error("Error updating:", error);
    }
  },
}));
