import { Category } from "@/app/categories/page";
import { useCategoryStore } from "@/stores/categoryStore";
import {
  faEdit,
  faExclamationTriangle,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";

export type updateCategoriesModalProps = {
  showModal: string;
  setShowModal: (value: string) => void;
  category: Category;
  setCategory: (value: Category) => void;
};

export default function UpdateCategory({
  showModal,
  setShowModal,
  category,
  setCategory,
}: updateCategoriesModalProps) {
  if (showModal !== "put") return null;
  const { updateCategory } = useCategoryStore();
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setCategory({ ...category, [name]: value });
  };
  console.log(category);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateCategory(category.id, category.name);
    setShowModal("");
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Category has been successfully updated!",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  return (
    <section className="flex items-center justify-center h-screen w-screen fixed left-0 top-0 bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-md animate-scaleIn">
        <div className="flex flex-col items-center text-center">
          <FontAwesomeIcon
            icon={faEdit}
            className="text-blue-500 text-6xl mb-4 animate-pulse"
          />
          <h2 className="text-3xl font-extrabold mb-2 text-gray-900">
            Update Category
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Please update the category name below.
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            name="name"
            value={category.name}
            onChange={(e) => handleChange(e)}
            className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter new category name"
            required
          />

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition cursor-pointer"
              onClick={() => setShowModal("")}
            >
              <FontAwesomeIcon icon={faTimes} />
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
            >
              <FontAwesomeIcon icon={faSave} />
              Update
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
