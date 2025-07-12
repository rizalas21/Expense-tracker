import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { Category } from "@/app/categories/page";
import axios from "axios";
import { useCategoryStore } from "@/stores/categoryStore";
import Swal from "sweetalert2";

export type DelCategoriesModalProps = {
  showModal: string;
  setShowModal: (value: string) => void;
  category: Category;
};

export default function DeleteCategory({
  showModal,
  setShowModal,
  category,
}: DelCategoriesModalProps) {
  if (showModal !== "del") return null;
  const { deleteCategory } = useCategoryStore();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await deleteCategory(category.id);
    console.log("deleteCategory result =>", result);

    if ("error" in result) {
      return Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: result.error,
      });
    }

    setShowModal("");
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Category has been successfully deleted!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <section className="flex items-center justify-center h-screen w-screen fixed left-0 top-0 bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-md animate-fadeIn">
        <div className="flex flex-col items-center text-center">
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="text-red-500 text-6xl mb-4"
          />
          <h2 className="text-2xl font-bold mb-2 text-black">
            Delete Category
          </h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this category? This action cannot be
            undone.
          </p>
        </div>

        <form
          className="flex flex-col gap-4 items-center"
          onSubmit={(e) => handleSubmit(e)}
        >
          <p className="text-center bg-slate-200 px-3 py-2 rounded text-gray-600 cursor-not-allowed">
            " {category.name} "
          </p>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition cursor-pointer"
              onClick={() => setShowModal("")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition cursor-pointer"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
