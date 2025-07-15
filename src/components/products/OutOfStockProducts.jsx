import { useOutOfStockProducts } from '../../services/products/useOutOfStockProducts';
import LoadingSpinner from '../common/LoadingSpinner';

export default function OutOfStockProducts() {
  const { data: outOfStockProducts, isLoading, error } = useOutOfStockProducts();

  if (isLoading) return <div className="text-center py-8"><LoadingSpinner /></div>;
  if (error) return <div className="text-center text-red-500 py-8">{error.message || 'Failed to load low stock products'}</div>;
  if (!outOfStockProducts || outOfStockProducts.length === 0) return <div className="text-center py-8">No low stock products found</div>;

  const products = outOfStockProducts.results || [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-4">Out of Stock Products</h1>
      <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
        <ul className="space-y-4">
          {products.map(product => (
            <li key={product.id} className="border-b pb-2">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-700">SKU: {product.sku}</p>
              <p className="text-gray-700">Price: {product.price}</p>
              <p className="text-gray-700">Current Quantity: {product.current_quantity}</p>
              <p className="text-gray-700">Category Name: {product.category_name}</p>
              <p className="text-gray-700">
                Stock Status:{" "}
                <span className={product.stock_status === 'out_of_stock' ? 'text-red-600 font-bold' : 'text-orange-500 font-bold'}>
                  {product.stock_status.replace(/_/g, ' ')}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
