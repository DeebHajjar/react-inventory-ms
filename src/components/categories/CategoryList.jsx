import { useInfiniteCategories } from '../../services/categories/useInfiniteCategories';
import LoadingSpinner from '../common/LoadingSpinner';
import CategoryCard from './CategoryCard';
import { useRef, useCallback, useEffect } from 'react';

export default function CategoryList({ search = "" }) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteCategories({ search });

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

  const categories = data
    ? data.pages.flatMap(page => page.results || [])
    : [];

  if (isLoading) return <div className="text-center py-8"><LoadingSpinner /></div>;
  if (error) return <div className="text-center text-red-500 py-8">{error.message || 'Failed to load categories'}</div>;

  return (
    <div>
      {categories.map(category => (
        <CategoryCard key={category.id} category={category} />
      ))}
      <div ref={loader} />
      {isFetchingNextPage && (
        <div>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}