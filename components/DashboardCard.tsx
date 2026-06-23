type DashboardCardProps = {
  title: string;
  value: string | number;
  description?: string;
};

export default function DashboardCard({
  title,
  value,
  description
}: DashboardCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h2 className="mt-2 text-3xl font-bold text-gray-900">{value}</h2>
      {description && (
        <p className="mt-1 text-xs text-gray-500">{description}</p>
      )}
    </div>
  );
}