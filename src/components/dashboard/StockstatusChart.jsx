import { PieChart, Pie, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { useProducts } from '../../services/products/useProducts';
import { useLowStockProducts } from '../../services/products/useLowStockProducts';
import { useOutOfStockProducts } from '../../services/products/useOutOfStockProducts';



export default function StockstatusChart() {
    const { data: lowStockData, isLoading: isLowStockLoading } = useLowStockProducts();
    const { data: outOfStockData, isLoading: isOutOfStockLoading } = useOutOfStockProducts();
    const { data: productsData, isLoading: isProductsLoading } = useProducts();

    if (isLowStockLoading || isOutOfStockLoading || isProductsLoading) {
        return <div className="text-center py-8">Loading stock status chart...</div>;
    }
    if (!lowStockData || !outOfStockData || !productsData) {
        return <div className="text-center text-red-500 py-8">Failed to load stock status data</div>;
    }
    const chartData = [
        {
            name: "Low Stock",
            fill: "#e4cd05",
            value: lowStockData.count - outOfStockData.count || 0,
        },
        {
            name: "Out of Stock",
            fill: "red",
            value: outOfStockData.count || 0,
        },
        {
            name: "In Stock",
            fill: "green",
            value: productsData.count - (lowStockData.count),
        },
    ];

  return (
    <div className="h-96 bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-700 p-4 mx-3">
        <h2 className='text-2xl font-bold text-center'>Stock Status Chart</h2>
        <div className="mt-6">
            <div className="bg-gray-200 dark:bg-gray-700 h-64 flex items-center justify-center">
            <ResponsiveContainer>
                <PieChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    />
                </PieChart>
            </ResponsiveContainer>
            </div>
        </div>
    </div>
  )
}
