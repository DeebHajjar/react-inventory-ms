import { useDeleteProduct } from '../../services/products/useDeleteProduct';

export default function ProductDelete({ product, onCancel, onSuccess }) {
    const deleteProduct = useDeleteProduct();
    const handleDelete = (productId) => {
        deleteProduct.mutate(productId, {
            onSuccess: () => {
                onSuccess && onSuccess();
            },
            onError: (error) => {
                console.error(`Error deleting product: ${error.message}`);
            }
        });
    }
  return (
    <div>
        <p className="text-red-600 mb-2">Are you sure you want to delete this product?</p>
        <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={() => handleDelete(product.id)}
        >
            Delete Product
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
