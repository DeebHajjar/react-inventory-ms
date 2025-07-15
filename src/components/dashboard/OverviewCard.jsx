

export default function OverviewCard({ title, value, icon, color = "bg-blue-500" }) {
  return (
    <div className={`flex items-center gap-4 p-4 rounded-lg shadow-md ${color} text-white min-w-[200px] min-h-[100px]`}>
      <div className="text-3xl">
        {icon}
      </div>
      <div>
        <div className="text-lg font-semibold">{title}</div>
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </div>
  );
}
