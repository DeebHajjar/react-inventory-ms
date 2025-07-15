import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.id}`} className="w-full">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md shadow-gray-200 dark:shadow-gray-700 p-4 flex flex-col items-start hover:shadow-lg transition-shadow cursor-pointer">
          <h2 className="text-lg dark:text-white font-semibold mb-2">{product.name}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-1">SKU: {product.sku}</p>
          <p className="text-gray-600 dark:text-gray-300 mb-1">Category: {product.category_name}</p>
          <p className="text-gray-800 dark:text-white font-bold mb-2">${product.price}</p>
          <p className="text-sm text-gray-500 dark:text-gray-300">Stock: {product.stock_status}</p>
      </div>
    </Link>
  );
}
