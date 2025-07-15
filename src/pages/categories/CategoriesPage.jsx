import CategoryList from "../../components/categories/CategoryList"
import { useState } from 'react';
import Modal from '../../components/common/Modal';
import CategoryForm from '../../components/categories/CategoryForm';
import { useLocation } from "react-router-dom";


export default function CategoriesPage() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search") || "";
  

  return (
    <div>
        <div className="flex justify-end items-center mb-4">
        <button
          className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 mt-8 mr-0 rounded hover:bg-blue-700 dark:hover:bg-blue-800"
          onClick={() => setOpen(true)}
        >
          Add a new category
        </button>
      </div>

      <div className="">
        <CategoryList search={search} />
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <CategoryForm
          onSuccess={() => {
            setOpen(false);
          }}
          onCancel={() => setOpen(false)}
        />
      </Modal>
    </div>
  )
}
