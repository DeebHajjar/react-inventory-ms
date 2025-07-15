export default function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700 p-6 w-full max-w-3xl relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute  top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
          onClick={onClose}
        >✖️</button>
        {children}
      </div>
    </div>
  );
}
