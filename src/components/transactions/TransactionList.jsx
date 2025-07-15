import { useInfiniteTransactions } from "../../services/transactions/useInfiniteTransactions"
import TransactionCard from "./TransactionCard"
import LoadingSpinner from "../common/LoadingSpinner"
import { useRef, useCallback, useEffect } from 'react';


export default function TransactionList() {
    const {
        data: transactions,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error,
    } = useInfiniteTransactions();

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

    

    if (isLoading) return <div className="text-center py-8"><LoadingSpinner /></div>
    if (error) return <div className="text-center text-red-500 py-8">{error.message || 'Failed to load transactions'}</div>
    if (transactions.length === 0) return <div className="text-center py-8">No transactions found.</div>


  return (
    <div>
        <div className="max-w-2xl mx-auto p-4 bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700 rounded-lg">
            <ul className="space-y-4">
                {transactions.pages.map((page, i) => (
                    <div key={i}>
                        {page.results.map(transaction => (
                            <TransactionCard key={transaction.id} transaction={transaction} />
                        ))}
                    </div>
                ))}
                <div ref={loader} />
                {isFetchingNextPage && <div className="text-center py-4"><LoadingSpinner /></div>}
            </ul>
        </div>
    </div>
  )
}
