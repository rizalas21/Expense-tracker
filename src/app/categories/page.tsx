"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import AddCategories from "../components/Categories/AddCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import DeleteCategory from "../components/Categories/DeleteCategory";
import { useCategoryStore } from "@/stores/categoryStore";
import UpdateCategory from "../components/Categories/UpdateCategory";

export interface Category {
  id: string;
  name: string;
}

export default function Categories() {
  const [showModal, setShowModal] = useState("");
  const [category, setCategory] = useState<Category>({ id: "", name: "" });
  const [isLoading, setIsLoading] = useState(true);
  const {
    categories,
    getCategory,
    addCategory,
    deleteCategory,
    updateCategory,
  } = useCategoryStore();

  useEffect(() => {
    try {
      getCategory();
    } catch (error) {
      console.log("error when getCategory");
    } finally {
      setIsLoading(false);
    }
  }, [getCategory]);
  console.log(categories);
  return (
    <main className="w-full flex flex-col gap-5 max-h-screen px-4 py-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-3xl font-bold text-gray-800">Categories</p>
        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={() => setShowModal("add")}
        >
          <span className="text-xl">+</span> <span>Add Category</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-xl shadow-lg w-full overflow-x-auto animate-fadeIn">
        {isLoading ? (
          <p className="text-center py-6 text-gray-500">Loading...</p>
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left px-4 py-3 text-gray-700">Category</th>
                <th className="text-center px-4 py-3 text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((item: Category, index: Number) => (
                  <tr
                    key={item.id ?? index}
                    className="border-b border-gray-200 hover:bg-gray-100 transition"
                  >
                    <td className="text-left px-4 py-3 text-gray-800">
                      {item.name}
                    </td>
                    <td className="text-center px-4 py-3 flex justify-center gap-4">
                      <button
                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        onClick={() => {
                          setShowModal("put");
                          setCategory({ id: item.id, name: item.name });
                        }}
                      >
                        <FontAwesomeIcon icon={faPenAlt} />
                      </button>
                      <button
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        onClick={() => {
                          setShowModal("del");
                          setCategory({ id: item.id, name: item.name });
                        }}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="text-center py-6 text-gray-500">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      {/* Modal */}
      {showModal && showModal === "add" && (
        <AddCategories showModal={showModal} setShowModal={setShowModal} />
      )}
      {showModal && showModal === "del" && (
        <DeleteCategory
          showModal={showModal}
          setShowModal={setShowModal}
          category={category}
        />
      )}
      {showModal && showModal === "put" && (
        <UpdateCategory
          showModal={showModal}
          setShowModal={setShowModal}
          category={category}
          setCategory={setCategory}
        />
      )}
    </main>
  );
}
