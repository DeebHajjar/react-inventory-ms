import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../../services/products/useProduct';
import LoadingSpinner from '../common/LoadingSpinner'
import ProductForm from './ProductForm';
import ProductDelete from './ProductDelete';
import TransactionForm from '../transactions/TransactionForm';
import Modal from '../common/Modal';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";


export default function ProductDetail({ productId }) {
  const { id: productId1 } = useParams();

  const navigate = useNavigate();

  const { data: product, isLoading, error } = useProduct(productId1);

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [transOpen, setTransOpen] = useState(false);

  if (isLoading) return <div className="text-center py-8"><LoadingSpinner /></div>;
  if (error) return <div className="text-center text-red-500 py-8">{error.message || 'Failed to load product details'}</div>;
  if (!product) return <div className="text-center py-8">Product not found</div>;

  return (
    <div>
        <h1 className="text-2xl font-bold text-center my-4">{product.name}</h1>
        <div className="max-w-2xl mx-auto p-4 bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700 rounded-lg">
            <div className="p-4">
                <p className="text-gray-700 dark:text-white mb-2"><strong>Description:</strong> {product.description}</p>
                <p className="text-gray-700 dark:text-white mb-2"><strong>SKU:</strong> {product.sku}</p>
                <p className="text-gray-700 dark:text-white mb-2"><strong>Price:</strong> ${product.price}</p>
                <p className="text-gray-700 dark:text-white mb-2"><strong>Cost Price:</strong> ${product.cost_price}</p>
                <p className="text-gray-700 dark:text-white mb-2"><strong>Quantity:</strong> {product.current_quantity}</p>
                <p className="text-gray-700 dark:text-white mb-2"><strong>Minimum Quantity:</strong> {product.min_quantity}</p>
                <p className="text-gray-700 dark:text-white mb-2"><strong>Stock:</strong> {product.stock_status}</p>
                <p className="text-gray-700 dark:text-white mb-2"><strong>Category:</strong> {product.category ? product.category.name : 'N/A'}</p>
                <p className="text-gray-700 dark:text-white mb-2"><strong>Created At:</strong> {new Date(product.created_at).toLocaleDateString()}</p>
                <p className="text-gray-700 dark:text-white mb-2"><strong>Updated At:</strong> {new Date(product.updated_at).toLocaleDateString()}</p>
                <p className="text-gray-700 dark:text-white mb-2"><strong>Profit Margin:</strong> {product.profit_margin}%</p>
            </div>
            <div className="flex justify-between items-center mt-4">
                <button
                    className="bg-green-600 dark:bg-green-700 text-white px-4 py-2 rounded hover:bg-green-700 dark:hover:bg-green-800"
                    onClick={() => setTransOpen(true)}
                    >
                    Add Transaction
                </button>
                <div className="flex gap-2">
                    <button
                        className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-800"
                        onClick={() => setEditOpen(true)}
                    >
                        <MdEdit />
                    </button>
                    <button 
                        className="bg-red-600 dark:bg-red-700 text-white px-4 py-2 rounded hover:bg-red-700 dark:hover:bg-red-800"
                        onClick={() => setDeleteOpen(true)}
                    >
                        <MdDelete />
                    </button>
                </div>

                </div>
            <Modal open={editOpen} onClose={() => setEditOpen(false)}>
                <ProductForm
                    product={product}
                    onSuccess={() => {
                        setEditOpen(false);
                    }}
                    onCancel={() => setEditOpen(false)}
                />
            </Modal>
            <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)}>
                <ProductDelete 
                    product={product}
                    onSuccess={() => {
                        setDeleteOpen(false);
                        navigate('/products');
                    }}
                    onCancel={() => setDeleteOpen(false)}
                />
            </Modal>

            <Modal open={transOpen} onClose={() => setTransOpen(false)}>
                <TransactionForm
                    productId={product.id}
                    onSuccess={() => setTransOpen(false)}
                    onCancel={() => setTransOpen(false)}
                />
            </Modal>
        </div>
    </div>
  )
}
