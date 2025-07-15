import OverviewCard from "./OverviewCard"
import CategoriesChart from "./CategoriesChart";
import StockstatusChart from "./StockstatusChart";
import LoadingSpinner from "../common/LoadingSpinner";
import { FaBox, FaTags } from "react-icons/fa";
import { MdAnnouncement } from "react-icons/md";
import { PiExclamationMarkFill } from "react-icons/pi";
import { useCategories } from '../../services/categories/useCategories';
import { useProducts } from '../../services/products/useProducts';
import { useLowStockProducts } from '../../services/products/useLowStockProducts';
import { useOutOfStockProducts } from '../../services/products/useOutOfStockProducts';



export default function Dashboard() {
  const { data, isLoading, error } = useProducts();
  const { data: categoriesData } = useCategories();
  const { data: lowStockProducts } = useLowStockProducts();
  const { data: outOfStockProducts } = useOutOfStockProducts();

  if (isLoading) return <div className="text-center py-8"><LoadingSpinner /></div>;
  if (error) return <div className="text-center text-red-500 py-8">{error.message || 'Failed to load data'}</div>;


  return (
    <div>
        <h2 className='text-2xl font-bold text-center mb-8 mt-4'>Overview</h2>
        <div className="flex flex-wrap justify-around gap-4 mt-6">
            <OverviewCard
                title="Total Products"
                value={data.count}
                icon={<FaBox />}
                color="bg-blue-500"
            />
            <OverviewCard
                title="Total Categories"
                value={categoriesData?.count}
                icon={<FaTags />}
                color="bg-green-500"
            />
            <OverviewCard
                title="Low Stock"
                value={lowStockProducts?.count}
                icon={<MdAnnouncement />}
                color="bg-yellow-500"
            />
            <OverviewCard
                title="Out of Stock"
                value={outOfStockProducts?.count}
                icon={<PiExclamationMarkFill />}
                color="bg-red-500"
            />
      </div>
      <h2 className='text-2xl font-bold text-center mt-6'>Charts</h2>
      <div className="grid grid-flow-col grid-cols-1 md:grid-cols-2 mt-8">
        <CategoriesChart />
        <StockstatusChart />
      </div>
    </div>
  )
}

