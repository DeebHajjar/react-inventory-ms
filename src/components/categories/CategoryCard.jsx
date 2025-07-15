import Modal from '../../components/common/Modal';
import { useState } from 'react';
import CategoryForm from '../../components/categories/CategoryForm';
import CategoryDelete from '../../components/categories/CategoryDelete';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export default function CategoryCard({ category }) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-700 my-4 p-4 flex flex-row items-start hover:shadow-lg dark:hover:shadow-gray-700 transition-shadow">
      <div>
        <h2 className="text-lg font-semibold mb-2">{category.name}</h2>
        <p className="text-gray-600 dark:text-white mb-1">Description: {category.description}</p>
        <p className="text-gray-800 dark:text-white font-bold mb-2">Products: {category.products_count}</p>
      </div>
      <div className="ml-auto flex flex-col gap-2">
        <button
          className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-800"
          onClick={() => setEditOpen(true)}
        >
          <MdEdit />
        </button>
        <button 
          className="bg-red-600 dark:bg-red-700 text-white px-4 py-2 rounded hover:bg-red-700 dark:hover:bg-red-800 mt-2"
          onClick={() => setDeleteOpen(true)}
        >
          <MdDelete />
        </button>
      </div>

      {/* edite window */}
      <Modal open={editOpen} onClose={() => setEditOpen(false)}>
        <CategoryForm
          category={category}
          onSuccess={() => {
            setEditOpen(false);
          }}
          onCancel={() => setEditOpen(false)}
        />
      </Modal>

      {/* delete window */}
      <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <CategoryDelete 
          category={category}
          onSuccess={() => {
            setDeleteOpen(false);
          }}
          onCancel={() => setDeleteOpen(false)}
        />
      </Modal>
    </div>
  );
}
