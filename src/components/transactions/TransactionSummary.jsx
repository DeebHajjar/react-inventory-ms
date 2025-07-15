import { useTransactionsSummary } from "../../services/transactions/useTransactionsSummary"
import LoadingSpinner from "../common/LoadingSpinner"


export default function TransactionSummary() {
    const { data, isLoading, error } = useTransactionsSummary()
    const transactions = data?.results || data || []

    if (isLoading) return <div className="text-center py-8"><LoadingSpinner /></div>
    if (error) return <div className="text-center text-red-500 py-8">{error.message || 'Failed to load transactions summary'}</div>
    if (transactions.length === 0) return <div className="text-center py-8">No transactions found.</div>
  return (
    <div>
        <div className="bg-white dark:bg-gray-800 p-4 flex flex-col items-start">
          <h2 className="text-lg font-semibold mb-2">Transaction Summary</h2>
          <p className="text-gray-600 mb-1 dark:text-white">Total number of products in stock: {transactions.total_in}</p>
          <p className="text-gray-600 mb-1 dark:text-white">Total number of products out of stock: {transactions.total_out}</p>
          <p className="text-gray-600 mb-1 dark:text-white">Net change: {transactions.net_change}</p>
          <p className="text-gray-600 mb-1 dark:text-white">IN: {transactions.transactions_count.IN}</p>
          <p className="text-gray-600 mb-1 dark:text-white">OUT: {transactions.transactions_count.OUT}</p>
      </div>
    </div>
  )
}
