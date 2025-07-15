export default function ProductFormItem({
  label,
  name,
  type = 'text',
  register,
  required,
  error,
  options,
  loading,
  ...rest
}) {
  return (
    <div className="mb-3 dark:bg-gray-800 dark:text-white">
      <label className="block mb-1 font-medium dark:text-white">{label}</label>
      {type === 'select' ? (
        loading ? (
          <div>Loading...</div>
        ) : (
          <select
            {...register(name, required ? { required } : {})}
            className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
            {...rest}
          >
            <option value="">Choice {label}</option>
            {options && options.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.name}</option>
            ))}
          </select>
        )
      ) : (
        <input
          type={type}
          {...register(name, required ? { required } : {})}
          className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
          {...rest}
        />
      )}
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
}
