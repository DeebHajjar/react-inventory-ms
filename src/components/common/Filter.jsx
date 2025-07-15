import { useCategories } from "../../services/categories/useCategories";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Filter({ onSuccess, onCancel }) {
  const { data: categoriesData, isLoading: loadingCategories } = useCategories();
  const categories = categoriesData?.results || categoriesData || [];
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [category, setCategory] = useState(params.get("category") || "");
  // Default values ​​for ordering
  const [sort, setSort] = useState(params.get("ordering")?.replace("-", "") || "price");
  const [order, setOrder] = useState(params.get("ordering")?.startsWith("-") ? "desc" : "asc");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(location.search);

    let ordering = sort;
    if (order === "desc") ordering = `-${sort}`;

    if (ordering) newParams.set("ordering", ordering); else newParams.delete("ordering");
    if (category) newParams.set("category", category); else newParams.delete("category");

    newParams.delete("sort");
    newParams.delete("order");

    navigate(`${location.pathname}?${newParams.toString()}`);
    if (onSuccess) onSuccess();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 items-start rounded-md shadow-sm">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="category" className="text-sm font-medium text-gray-700 dark:text-white">Category:</label>
          <select
            id="category"
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
          >
            <option value="">All Categories</option>
            {loadingCategories ? (
              <option value="" disabled>Loading...</option>
            ) : (
              categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))
            )}
          </select>
        </div>
        <h2 className="text-lg font-semibold">Ordering</h2>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="sort" className="text-sm font-medium text-gray-700 dark:text-white">Sort By:</label>
          <select
            id="sort"
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
          >
            <option value="price">Price</option>
            <option value="current_quantity">Quantity</option>
            <option value="created_at">Created at</option>
          </select>
          <select
            id="order"
            value={order}
            onChange={e => setOrder(e.target.value)}
            className="p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div className="flex gap-2 mt-2">
          <button type="submit" className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-700">Apply Filters</button>
          {onCancel && (
            <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-md hover:bg-gray-600 dark:hover:bg-gray-700">Cancel</button>
          )}
        </div>
      </form>
    </div>
  );
}