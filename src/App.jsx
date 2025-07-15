import './App.css';
import './index.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LowStockProducts from './components/products/LowStockProducts';
import OutOfStockProducts from './components/products/OutOfStockProducts';
import ProductTransactions from './components/products/ProductTransactions';
import AppLayout from './pages/AppLayout';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/products/ProductDetailPage';
import ProductsPage from './pages/products/ProductsPage';
import CategoriesPage from './pages/categories/CategoriesPage';
import TransactionsPage from './pages/transactions/TransactionsPage';
import NotificationsPage from './pages/NotificationsPage';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LowStockNotifier from './components/common/LowStockNotifier';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data is valid for 5 minutes by default.
      staleTime: 5 * 60 * 1000,
      // Re-fetch data when returning to the window
      refetchOnWindowFocus: false,
      // Retry on failure
      retry: (failureCount, error) => {
        // Retry when not retrying for 404 failed errors
        if (error?.message?.includes('404')) {
          return false;
        }
        // Retry up to 3 times for other errors.
        return failureCount < 3;
      },
      // Retry Delay retry up to 3 times for other errors
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      // Retry once for mutations
      retry: 1,
      // Delay retry for mutations
      retryDelay: 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/products/:id/transactions" element={<ProductTransactions />} />
            <Route path="/low-stock" element={<LowStockProducts />} />
            <Route path="/out-of-stock" element={<OutOfStockProducts />} />
            <Route path='/categories' element={<CategoriesPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={5000} />
      <LowStockNotifier />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
