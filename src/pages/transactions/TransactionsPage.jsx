import TransactionList from "../../components/transactions/TransactionList"
import TransactionSummary from "../../components/transactions/TransactionSummary"

export default function TransactionsPage() {
  return (
    <div>
      <div className="flex flex-wrap mt-8 space-y-4">
        <div className="h-[70vh] overflow-y-auto min-w-[650px] max-w-32 flex-1 bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700 rounded-lg p-4 mx-10 my-3.5">
          <h1 className="text-2xl font-bold text-center my-4">Transactions History</h1>
          <TransactionList />
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700 rounded-lg p-4 h-fit min-w-[260px] self-start mx-10">
          <TransactionSummary />
        </div>
      </div>
    </div>
  )
}
