import { useInfiniteProducts } from '../../services/products/useInfiniteProducts';
import ProductCard from './ProductCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { useRef, useCallback, useEffect } from 'react';

export default function ProductList({ filters }) {

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteProducts(filters);

  // Ref for the loader element
  const loader = useRef();

  // Scroll control
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  // Connect the observer
  useEffect(() => {
    const option = { root: null, rootMargin: "20px", threshold: 1.0 };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  if (isLoading) return <div className="text-center py-8"><LoadingSpinner /></div>;
  if (error) return <div className="text-center text-red-500 py-8">{error.message || 'Failed to load products'}</div>;
  if (!data || data.pages.length === 0) return <div className="text-center py-8">No products found</div>;

  const products = data
    ? data.pages.flatMap(page => page.results || [])
    : [];

  return (
    <div className="container mx-auto">
      {data?.pages.map((page, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
          {page.results.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ))}
      <div ref={loader} />
      {isFetchingNextPage && <div>
        <LoadingSpinner />
        </div>}
    </div>
    
  );
}
