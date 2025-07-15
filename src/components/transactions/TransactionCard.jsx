
export default function TransactionCard({ transaction }) {
  return (
    <div>
        <div className="max-w-2xl mx-auto p-4">
            <ul className="space-y-4">
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
            </ul>
        </div>
    </div>
  )
}
