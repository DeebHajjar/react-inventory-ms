import { useDeleteCategory } from '../../services/categories/useDeleteCategory';
import { toast } from "react-toastify";

export default function CategoryDelete({ category, onCancel, onSuccess }) {

    const deleteCategory = useDeleteCategory();
    const handleDelete = async (id) => {
        try {
            await deleteCategory.mutateAsync(id);
        } catch (error) {
            toast.error("You cannot delete a category that contains products.");
        }
    };

  return (
    <div>
        <p className="text-red-600 mb-2">Are you sure you want to delete this category?</p>
        <button
            className="bg-red-600 dark:bg-red-700 text-white px-4 py-2 rounded hover:bg-red-700 dark:hover:bg-red-800"
            onClick={() => handleDelete(category.id)}
        >
            Delete Category
        </button>
        <button
            className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600 ml-2"
            onClick={onCancel}
        >
            Cancel
        </button>
    </div>
  )
}
