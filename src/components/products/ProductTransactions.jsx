import { useParams } from 'react-router-dom';
import { useProductTransactions } from '../../services/products/useProductTransactions';

export default function ProductTransactions() {
  // react-router-dom v6
  const { id: transProductId } = useParams();

  const { data, isLoading, error } = useProductTransactions(transProductId);

  const transactions = data?.results || data || [];

  if (error) return <div className="text-center text-red-500 py-8">{error.message || 'Failed to load product transactions'}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-4">Product Transactions</h1>
      <div className="max-w-2xl mx-auto p-4 dark:bg-gray-800 shadow-md dark:shadow-gray-700 rounded-lg">
        {transactions.length === 0 ? (
          <p className="text-gray-500 dark:text-white text-center">No transactions found for this product.</p>
        ) : (
          <ul className="space-y-4">
            {transactions.map(transaction => (
              <li key={transaction.id} className="border-b pb-2">
                <h2 className="text-xl font-semibold">
                  {transaction.transaction_type_display || transaction.transaction_type}
                </h2>
                <p className="text-gray-700 dark:text-white">Product Name: {transaction.product_name}</p>
                <p className="text-gray-700 dark:text-white">Quantity: {transaction.quantity}</p>
                <p className="text-gray-700 dark:text-white">
                  Date: {transaction.transaction_date ? new Date(transaction.transaction_date).toLocaleDateString() : ''}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
