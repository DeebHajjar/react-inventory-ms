import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateCategory } from '../../services/categories/useUpdateCategory';
import { useCreateCategory } from '../../services/categories/useCreateCategory'
import LoadingSpinner from '../common/LoadingSpinner';

export default function CategoryForm({ category, onSuccess, onCancel }) {
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      name: category?.name || '',
      description: category?.description || ''
    }
  });

  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (category) {
      setValue('name', category.name || '');
      setValue('description', category.description || '');
    }
  }, [category, setValue]);

  const onSubmit = data => {
    setError(null);
    if (category) {
      updateCategory.mutate(
        { id: category.id, data: data },
        {
          onSuccess: () => onSuccess && onSuccess(),
          onError: err => setError(err.message || 'An error occurred while editing'),
        }
      );
    } else {
      createCategory.mutate(data, {
        onSuccess: () => onSuccess && onSuccess(),
        onError: err => setError(err.message || 'An error occurred while adding.'),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 p-6 rounded shadow-md dark:shadow-gray-700 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">{category ? 'Edit category' : 'Add a category'}</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="mb-3">
        <label className="block mb-1 font-medium dark:text-white">Category Name</label>
        <input
          type="text"
          {...register('name', { required: 'Category name is required' })}
          className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
        />
        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium dark:text-white">Description</label>
        <input
          type="text"
          {...register('description')}
          className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-800"
          disabled={createCategory.isLoading || updateCategory.isLoading || isSubmitting}
        >
          {(createCategory.isLoading || updateCategory.isLoading || isSubmitting)
            ? <LoadingSpinner small />
            : category ? 'Edit' : 'Add'}
        </button>
        {onCancel && (
          <button
            type="button"
            className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
            onClick={onCancel}
            disabled={createCategory.isLoading || updateCategory.isLoading || isSubmitting}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
