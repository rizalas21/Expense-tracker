import axios from "axios";
import { create } from "zustand";

export interface Category {
  id: string;
  name: string;
}

interface CategoryState {
  categories: Category[];
  getCategory: () => void;
  addCategory: (data: string) => void;
  deleteCategory: (id: string) => void;
  updateCategory: (id: string, newName: string) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  getCategory: async () => {
    try {
      const res = await axios.get("/api/categories");
      if (res.status >= 400 || !Array.isArray(res.data)) return null;
      set({ categories: res.data });
    } catch (error) {
      console.error("Error fetching:", error);
    }
  },
  addCategory: async (data) => {
    try {
      console.log("data bro ->", data);
      const res = await axios.post("/api/categories", {
        data,
      });
      console.log("response nya bro -> ", res);
      set((state) => ({
        categories: [res.data, ...state.categories],
      }));
    } catch (error) {
      console.error("Error adding:", error);
    }
  },
  deleteCategory: async (id) => {
    try {
      await axios.delete(`/api/categories/${id}`);
      set((state) => ({
        categories: state.categories.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting:", error);
    }
  },
  updateCategory: async (id, newName) => {
    try {
      await axios.put(`/api/categories/${id}`, { data: { id, name: newName } });
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
