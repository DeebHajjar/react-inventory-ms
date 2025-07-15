import { useForm } from 'react-hook-form';
import { useCreateTransaction } from "../../services/transactions/useCreateTransaction";
import LoadingSpinner from "../common/LoadingSpinner";

export default function TransactionForm({ productId, onSuccess, onCancel }) {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, reset 
  } = useForm({
    defaultValues: {
      transactionType: '',
      quantity: ''
    }
  });

  const createTransaction = useCreateTransaction();

  const onSubmit = (data) => {
    createTransaction.mutate(
      {
        product_id: Number(productId),
        transaction_type: data.transactionType,
        quantity: Number(data.quantity)
      },
      {
        onSuccess: () => {
          reset();
          onSuccess && onSuccess();
        }
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 p-6 rounded shadow-md dark:shadow-gray-700 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Transaction</h2>

      <div className="mb-3">
        <label className="block mb-1 font-medium dark:text-white">Transaction Type</label>
        <select
          {...register('transactionType', { required: 'Transaction type is required' })}
          className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
        >
          <option value="">Choose Type</option>
          <option value="IN">IN</option>
          <option value="OUT">OUT</option>
          <option value="ADJ">ADJ (Adjustment)</option>
        </select>
        {errors.transactionType && <span className="text-red-500">{errors.transactionType.message}</span>}
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-medium dark:text-white">Quantity</label>
        <input
          type="number"
          min="1"
          {...register('quantity', { required: 'Quantity is required', min: 1 })}
          className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
        />
        {errors.quantity && <span className="text-red-500">{errors.quantity.message}</span>}
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-800"
          disabled={createTransaction.isLoading || isSubmitting}
        >
          {createTransaction.isLoading || isSubmitting ? <LoadingSpinner small /> : 'Add'}
        </button>
        {onCancel && (
          <button
            type="button"
            className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
            onClick={onCancel}
            disabled={createTransaction.isLoading || isSubmitting}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
