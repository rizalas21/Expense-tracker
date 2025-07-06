import { create } from "zustand";

const useTransactionStore = create((set) => ({
  transactions: [],
  setTransactions: (data: any) => set({ transactions: data }),
  addTransactions: (transaction: any) =>
    set((state: any) => ({
      transactions: [transaction, ...state.transactions],
    })),
}));

export default useTransactionStore;
