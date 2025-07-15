import ProductList from "../../components/products/ProductList"
import { useState } from 'react';
import Modal from '../../components/common/Modal';
import ProductForm from '../../components/products/ProductForm';
import { useLocation } from "react-router-dom";
import Filter from "../../components/common/Filter";


export default function ProductsPage() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search") || "";
  const category = params.get("category") || "";
  const ordering = params.get("ordering") || "";
  const filters = { search, category, ordering };

  return (
    <div>
      <div className="flex justify-end items-center my-4">
        <button
          className=" border-2 border-gray-500 px-4 py-2 mr-8 rounded hover:bg-gray-200 dark:hover:bg-gray-700 dark:border-gray-600"
          onClick={() => setOpenFilterModal(true)}
        >
          Filter
        </button>
        <button
          className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 mr-8 rounded hover:bg-blue-700 dark:hover:bg-blue-800"
          onClick={() => setOpenCreateModal(true)}
        >
          Create Product
        </button>
      </div>
        <ProductList filters={filters} />

      <Modal open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
        <ProductForm
          onSuccess={() => {
            setOpenCreateModal(false);
          }}
          onCancel={() => setOpenCreateModal(false)}
        />
      </Modal>
      {/* Filter modal */}
      <Modal open={openFilterModal} onClose={() => setOpenFilterModal(false)}>
        <Filter 
          onSuccess={() => {
            setOpenFilterModal(false);
          }}
          onCancel={() => setOpenFilterModal(false)}
        />
      </Modal>
    </div>
  )
}
