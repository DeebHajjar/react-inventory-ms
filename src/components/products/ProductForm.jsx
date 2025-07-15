import { useEffect, useState, useMemo } from 'react';
import { useCategories } from '../../services/categories/useCategories';
import { useCreateProduct } from '../../services/products/useCreateProduct';
import { useUpdateProduct } from '../../services/products/useUpdateProduct';
import { useProducts } from '../../services/products/useProducts';
import LoadingSpinner from '../common/LoadingSpinner';
import { useForm } from 'react-hook-form';
import ProductFormItem from './ProductFormItem';


export default function ProductForm({ product, onSuccess, onCancel }) {
  const { 
    register, 
    handleSubmit, 
    setValue, 
    watch, 
    formState: { errors, isSubmitting } 
  } = useForm({
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      sku: product?.sku || '',
      price: product?.price || '',
      costPrice: product?.cost_price || '',
      currentQuantity: product?.current_quantity || '',
      minQuantity: product?.min_quantity || '',
      category: product?.category ? product.category.id : ''
    }
  });

  const { data: categoriesData, isLoading: loadingCategories } = useCategories();
  const categories = categoriesData?.results || categoriesData || [];

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  // SKU validation logic
  const [skuToCheck, setSkuToCheck] = useState('');
  const { 
    data: searchResults, 
    isLoading: isCheckingSku 
  } = useProducts(
    { search: skuToCheck },
    { enabled: !!skuToCheck && skuToCheck.length > 0 }
  );
  const [error, setError] = useState(null);

  // SKU validation memo
  const sku = watch('sku');
  const skuValidation = useMemo(() => {
    if (!sku || !skuToCheck || sku !== skuToCheck) {
      return { isValid: true, message: '' };
    }
    if (!searchResults) {
      return { isValid: true, message: '' };
    }
    const products = searchResults.results || searchResults || [];
    const exactMatch = products.find(p =>
      p.sku.toLowerCase() === sku.toLowerCase() &&
      (!product || p.id !== product.id)
    );
    if (exactMatch) {
      return {
        isValid: false,
        message: 'This SKU already exists, please use another SKU.'
      };
    } else if (products.length > 0) {
      return {
        isValid: true,
        message: 'The SKU is available for use'
      };
    } else {
      return {
        isValid: true,
        message: 'The SKU is available for use'
      };
    }
  }, [sku, skuToCheck, searchResults, product]);

  // Debounce SKU check
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (sku && sku.trim() !== '') {
        if (product && product.sku === sku) {
          setSkuToCheck('');
        } else {
          setSkuToCheck(sku.trim());
        }
      } else {
        setSkuToCheck('');
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [sku, product]);


  // Fill form when editing
  useEffect(() => {
    if (product) {
      setValue('name', product.name || '');
      setValue('description', product.description || '');
      setValue('sku', product.sku || '');
      setValue('price', product.price || '');
      setValue('costPrice', product.cost_price || '');
      setValue('currentQuantity', product.current_quantity || '');
      setValue('minQuantity', product.min_quantity || '');
      setValue('category', product.category ? product.category.id : '');
    }
  }, [product, setValue]);

  // Form submit
  const onSubmit = data => {
    setError(null);

    if (!skuValidation.isValid) {
      setError('Please correct the product code (SKU) before proceeding.');
      return;
    }

    const dataToSend = {
      name: data.name,
      description: data.description,
      sku: data.sku,
      price: String(data.price),
      cost_price: String(data.costPrice),
      current_quantity: Number(data.currentQuantity),
      min_quantity: Number(data.minQuantity),
      category_id: Number(data.category),
    };

    if (product) {
      updateProduct.mutate(
        { id: product.id, data: dataToSend },
        {
          onSuccess: () => {
            onSuccess && onSuccess();
          },
          onError: err => setError(err.message || 'An error occurred while updating'),
        }
      );
    } else {
      createProduct.mutate(dataToSend, {
        onSuccess: () => {
          onSuccess && onSuccess();
        },
        onError: err => setError(err.message || 'An error occurred while adding.'),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 p-6 rounded shadow-md dark:shadow-gray-700 max-w-2xl mx-auto">
      {error && <div className="text-red-500 mb-2 p-2 bg-red-50 rounded">{error}</div>}

      <div className="mb-3">
        <label className="block mb-1 font-medium dark:text-white">Product Name</label>
        <input
          type="text"
          {...register('name', { required: 'Product name is required' })}
          className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
        />
        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
      </div>

      <ProductFormItem
        label="Description"
        type="text"
        name="description"
        register={register}
        error={errors.description}
        />

      <div className="mb-3">
        <label className="block mb-1 font-medium dark:text-white">SKU (Product code)</label>
        <div className="relative">
          <input
            type="text"
            {...register('sku', { required: 'SKU is required' })}
            className={`w-full border rounded px-3 py-2 pr-10 dark:bg-gray-800 dark:text-white ${
              !skuValidation.isValid ? 'border-red-500' :
              skuValidation.message && skuValidation.isValid ? 'border-green-500' : ''
            }`}
          />
          {isCheckingSku && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <LoadingSpinner small />
            </div>
          )}
        </div>
        {skuValidation.message && (
          <div className={`text-sm mt-1 ${
            skuValidation.isValid ? 'text-green-600' : 'text-red-600'
          }`}>
            {skuValidation.message}
          </div>
        )}
        {errors.sku && <span className="text-red-500">{errors.sku.message}</span>}
      </div>

      <ProductFormItem
        label="Price"
        name="price"
        type="number"
        register={register}
        required="Price is required"
        error={errors.price}
        step="0.01"
        min="0"
      />

      <ProductFormItem
        label="Cost Price"
        name="costPrice"
        type="number"
        register={register}
        required="Cost price is required"
        error={errors.costPrice}
        step="0.01"
        min="0"
      />

      <ProductFormItem
        label="Current Quantity"
        name="currentQuantity"
        type="number"
        register={register}
        error={errors.currentQuantity}
        step="1"
        min="0"
      />

      <ProductFormItem
        label="Minimum Quantity"
        name="minQuantity"
        type="number"
        register={register}
        error={errors.minQuantity}
        step="1"
        min="0"
      />

      <ProductFormItem
        label="Category"
        name="category"
        type="select"
        register={register}
        required="Category is required"
        error={errors.category}
        options={categories}
        loading={loadingCategories}
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className={`px-4 py-2 rounded text-white ${
            (createProduct.isLoading || updateProduct.isLoading || !skuValidation.isValid)
              ? 'bg-gray-400 dark:bg-gray-700 cursor-not-allowed'
              : 'bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800'
          }`}
          disabled={createProduct.isLoading || updateProduct.isLoading || !skuValidation.isValid}
        >
          {(createProduct.isLoading || updateProduct.isLoading || isSubmitting) ? (
            <LoadingSpinner small />
          ) : (
            product ? 'Update' : 'Create'
          )}
        </button>
        {onCancel && (
          <button
            type="button"
            className="bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-white px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
            onClick={onCancel}
            disabled={createProduct.isLoading || updateProduct.isLoading}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
