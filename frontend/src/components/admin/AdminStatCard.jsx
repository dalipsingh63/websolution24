export default function AdminStatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconClass = "bg-lime-400/10 text-lime-400",
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        
        <div>
          <p className="text-sm font-semibold text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-black text-slate-900">
            {value}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            {subtitle}
          </p>
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          {Icon && <Icon className="text-xl" />}
        </div>

      </div>
    </div>
  );
}