import { useEffect } from "react";
import { toast } from "react-toastify";
import { useLowStockProducts } from "../../services/products/useLowStockProducts";

const STORAGE_KEY = "notifiedLowStockProducts";

function getNotifiedSet() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? new Set(JSON.parse(data)) : new Set();
  } catch {
    return new Set();
  }
}

function saveNotifiedSet(set) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)));
}

export default function LowStockNotifier() {
  const { data: lowStockProducts } = useLowStockProducts({
    refetchInterval: 10000,
  });

  useEffect(() => {
    if (lowStockProducts && Array.isArray(lowStockProducts.results)) {
      const notifiedSet = getNotifiedSet();

      lowStockProducts.results.forEach(product => {
        let key;
        if (product.stock_status === "out_of_stock") {
          key = `out-of-stock-${product.id}`;
          if (!notifiedSet.has(key)) {
            toast.error(
              `The product "${product.name}" is OUT OF STOCK!`,
              { toastId: key }
            );
            notifiedSet.add(key);
          }
        } else {
          key = `low-stock-${product.id}`;
          if (!notifiedSet.has(key)) {
            toast.warn(
              `The product "${product.name}" is LOW STOCK (${product.current_quantity})`,
              { toastId: key }
            );
            notifiedSet.add(key);
          }
        }
      });

      saveNotifiedSet(notifiedSet);
    }
  }, [lowStockProducts]);

  return null;
}
