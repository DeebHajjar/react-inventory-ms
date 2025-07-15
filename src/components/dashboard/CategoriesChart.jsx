import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { useCategories } from "../../services/categories/useCategories";

export default function CategoriesChart() {
  const { data: categoriesData, isLoading, error } = useCategories();

  // Data preparation: Sort the categories by number of products and take only the first 5
  const chartData = (categoriesData?.results || categoriesData || [])
    .map(cat => ({
      name: cat.name,
      productsCount: cat.products_count || cat.products?.length || 0,
    }))
    .sort((a, b) => b.productsCount - a.productsCount)
    .slice(0, 5);

  if (isLoading) return <div className="text-center py-8">Loading categories chart...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error.message || "Failed to load chart"}</div>;

  return (
    <div className=" h-96 bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-700 p-4 mx-3">
      <h2 className="text-2xl font-bold text-center">Top 5 Categories by Products</h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="productsCount" fill="#3182ce" name="Products Count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
