import { useCategoryStore } from "@/stores/categoryStore";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Swal from "sweetalert2";

export type AddCategoriesModalProps = {
  showModal: string;
  setShowModal: (value: string) => void;
};

export default function AddCategories({
  showModal,
  setShowModal,
}: AddCategoriesModalProps) {
  const [data, setData] = useState({
    name: "",
  });
  const { addCategory } = useCategoryStore();

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addCategory(data.name);
    setShowModal("");
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Category has been successfully added!", // ganti sesuai aksi: added, updated, deleted
      showConfirmButton: false,
      timer: 1500,
    });
  };
  console.log(data);
  if (!showModal) return null;

  return (
    <section className="flex items-center justify-center h-screen w-screen fixed left-0 top-0 bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center text-black">
          Add Transaction
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="border border-gray-300 px-3 py-2 rounded-lg"
            name="name"
            type="text"
            placeholder="Name"
            value={data.name}
            onChange={(e) => handleChange(e)}
            required
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => setShowModal("")}
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
