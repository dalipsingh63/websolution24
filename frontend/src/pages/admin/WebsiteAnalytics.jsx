
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API_URL = "https://backend-2-ukog.onrender.com";

const FILTERS = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 Days", value: "last7" },
  { label: "Last 30 Days", value: "last30" },
  { label: "This Month", value: "month" },
  { label: "This Year", value: "year" },
  { label: "All Time", value: "all" },
  { label: "Custom Range", value: "custom" },
];

const numberFormat = (value) =>
  Number(value || 0).toLocaleString("en-IN");

const formatLabel = (value, interval) => {
  if (interval === "month") {
    const [year, month] = value.split("-");
    return new Date(Number(year), Number(month) - 1).toLocaleDateString(
      "en-IN",
      { month: "short", year: "2-digit" }
    );
  }

  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
};

function StatCard({ label, value, icon, description }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-[#11150F] p-5 transition duration-300 hover:-translate-y-1 hover:border-lime-400/40 hover:shadow-lg hover:shadow-lime-400/5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-400">{label}</p>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400/10 text-xl text-lime-400">
          {icon}
        </span>
      </div>

      <p className="mt-4 text-3xl font-bold tracking-tight text-white">
        {numberFormat(value)}
      </p>

      <p className="mt-2 text-xs text-gray-500">{description}</p>
    </div>
  );
}

function TrendChart({ trend = [], interval = "day" }) {
  const width = 760;
  const height = 260;
  const left = 42;
  const right = 18;
  const top = 20;
  const bottom = 42;

  const values = trend.map((item) => Number(item.visitors || 0));
  const maxValue = Math.max(...values, 1);
  const chartWidth = width - left - right;
  const chartHeight = height - top - bottom;

  const points = trend.map((item, index) => {
    const x =
      trend.length === 1
        ? left + chartWidth / 2
        : left + (index / (trend.length - 1)) * chartWidth;

    const y =
      top + chartHeight - (Number(item.visitors || 0) / maxValue) * chartHeight;

    return { x, y, ...item };
  });

  const linePoints = points.map((point) => `${point.x},${point.y}`).join(" ");
  const areaPath =
    points.length > 0
      ? `M ${points[0].x} ${height - bottom} L ${points
          .map((point) => `${point.x} ${point.y}`)
          .join(" L ")} L ${points[points.length - 1].x} ${
          height - bottom
        } Z`
      : "";

  const labelIndexes = points
    .map((_, index) => index)
    .filter(
      (index) =>
        index === 0 ||
        index === points.length - 1 ||
        index % Math.max(1, Math.ceil(points.length / 5)) === 0
    );

  if (!trend.length) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-500">
        No visitor trend data available for this period.
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-white">
            Unique Visitors
          </p>
          <p className="text-xs text-gray-500">
            {interval === "month" ? "Month-wise" : "Day-wise"} visitor activity
          </p>
        </div>
        <span className="rounded-full border border-lime-400/20 bg-lime-400/10 px-3 py-1 text-xs text-lime-300">
          {numberFormat(values.reduce((sum, value) => sum + value, 0))} visitor-days
        </span>
      </div>

      <div className="w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full"
          role="img"
          aria-label="Unique visitors trend chart"
        >
          {[0, 1, 2, 3, 4].map((step) => {
            const y = top + (chartHeight / 4) * step;
            const value = Math.round(maxValue * (4 - step) / 4);

            return (
              <g key={step}>
                <line
                  x1={left}
                  y1={y}
                  x2={width - right}
                  y2={y}
                  stroke="#293024"
                  strokeDasharray="4 5"
                />
                <text
                  x={left - 9}
                  y={y + 4}
                  textAnchor="end"
                  fill="#858B80"
                  fontSize="11"
                >
                  {value}
                </text>
              </g>
            );
          })}

          <defs>
            <linearGradient id="visitorAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#B5F542" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#B5F542" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path d={areaPath} fill="url(#visitorAreaGradient)" />

          <polyline
            points={linePoints}
            fill="none"
            stroke="#B5F542"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {points.map((point, index) => (
            <circle
              key={point.date}
              cx={point.x}
              cy={point.y}
              r={points.length > 35 ? 2 : 4}
              fill="#B5F542"
              stroke="#11150F"
              strokeWidth="2"
            >
              <title>
                {formatLabel(point.date, interval)}: {point.visitors} visitors
              </title>
            </circle>
          ))}

          {labelIndexes.map((index) => (
            <text
              key={index}
              x={points[index].x}
              y={height - 13}
              textAnchor="middle"
              fill="#858B80"
              fontSize="11"
            >
              {formatLabel(points[index].date, interval)}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}

function TrafficSources({ sources = [] }) {
  const colors = [
    "#B5F542",
    "#75C943",
    "#3E9B6D",
    "#65A9A0",
    "#A78BFA",
    "#F59E0B",
    "#EC718D",
    "#60A5FA",
    "#C084FC",
    "#9CA3AF",
  ];

  const total = sources.reduce(
    (sum, item) => sum + Number(item.sessions || 0),
    0
  );

  let currentAngle = 0;

  const gradient = sources.length
    ? sources
        .map((item, index) => {
          const percentage =
            total > 0 ? (Number(item.sessions || 0) / total) * 100 : 0;

          const start = currentAngle;
          currentAngle += percentage;

          return `${colors[index % colors.length]} ${start}% ${currentAngle}%`;
        })
        .join(", ")
    : "#293024 0% 100%";

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row">
      <div className="relative h-44 w-44 shrink-0">
        <div
          className="h-full w-full rounded-full"
          style={{
            background: `conic-gradient(${gradient})`,
          }}
        />
        <div className="absolute inset-5 flex flex-col items-center justify-center rounded-full bg-[#11150F]">
          <span className="text-2xl font-bold text-white">
            {numberFormat(total)}
          </span>
          <span className="text-xs text-gray-500">Visitors</span>
        </div>
      </div>

      <div className="w-full space-y-3">
        {sources.length ? (
          sources.map((item, index) => {
            const percentage =
              total > 0
                ? (Number(item.sessions || 0) / total) * 100
                : 0;

            return (
              <div
                key={item.source}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{
                      backgroundColor: colors[index % colors.length],
                    }}
                  />
                  <span className="truncate text-gray-300">
                    {item.source}
                  </span>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <span className="text-gray-500">
                    {percentage.toFixed(1)}%
                  </span>
                  <span className="w-10 text-right font-semibold text-white">
                    {numberFormat(item.sessions)}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-500">No traffic source data yet.</p>
        )}
      </div>
    </div>
  );
}

export default function WebsiteAnalytics() {
  const [data, setData] = useState(null);
  const [range, setRange] = useState("last30");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const customDateError = useMemo(() => {
    if (range !== "custom") return "";

    if (!fromDate || !toDate) {
      return "Please select both start and end dates.";
    }

    if (fromDate > toDate) {
      return "Start date cannot be after end date.";
    }

    return "";
  }, [range, fromDate, toDate]);

  useEffect(() => {
    if (customDateError) {
      setLoading(false);
      setError("");
      setData(null);
      return;
    }

    const controller = new AbortController();

    const fetchAnalytics = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("adminToken");

        const params = { range };

        if (range === "custom") {
          params.from = fromDate;
          params.to = toDate;
        }

        const response = await axios.get(
          `${API_URL}/api/analytics/overview`,
          {
            params,
            headers: token
              ? { Authorization: `Bearer ${token}` }
              : {},
            signal: controller.signal,
          }
        );

        setData(response.data.data);
      } catch (err) {
        if (err.code === "ERR_CANCELED") return;

        setError(
          err.response?.data?.message ||
            "Analytics load nahi ho paayi. Admin login check karein."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchAnalytics();

    return () => controller.abort();
  }, [range, fromDate, toDate, refreshKey, customDateError]);

  const stats = [
    {
      label: "Total Visitors",
      value: data?.totalVisitors,
      icon: "👥",
      description: "Unique visitors in selected period",
    },
    {
      label: "Page Views",
      value: data?.pageViews,
      icon: "📄",
      description: "Total page views in selected period",
    },
    {
      label: "Today's Visitors",
      value: data?.todayVisitors,
      icon: "📅",
      description: "Unique visitors today (IST)",
    },
    {
      label: "Active Now",
      value: data?.activeUsers,
      icon: "🟢",
      description: "Visitors active in last 5 minutes",
    },
  ];

  const periodLabel =
    FILTERS.find((item) => item.value === range)?.label || "Analytics";

  return (
    <div className="min-h-screen space-y-6 bg-[#090B08] p-3 text-white sm:p-5 lg:p-7">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-lime-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-400">
              DS Digital Studio
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Website <span className="text-lime-400">Analytics</span>
          </h1>

          <p className="mt-1 text-sm text-gray-400">
            Understand your website traffic and visitor activity.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setRefreshKey((value) => value + 1)}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-lime-400/30 bg-lime-400/10 px-4 py-2.5 text-sm font-semibold text-lime-300 transition hover:bg-lime-400/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span>↻</span> Refresh Data
        </button>
      </div>

      {/* Date Filters */}
      <section className="rounded-2xl border border-white/10 bg-[#11150F] p-4 sm:p-5">
        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-white">Report Period</h2>
            <p className="text-xs text-gray-500">
              Select a period to update all analytics.
            </p>
          </div>
          <span className="w-fit rounded-full border border-lime-400/20 bg-lime-400/10 px-3 py-1 text-xs text-lime-300">
            {periodLabel}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setRange(filter.value)}
              className={`rounded-lg border px-3 py-2 text-xs font-medium transition sm:text-sm ${
                range === filter.value
                  ? "border-lime-400 bg-lime-400 text-[#090B08]"
                  : "border-white/10 bg-[#090B08] text-gray-300 hover:border-lime-400/40 hover:text-lime-300"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {range === "custom" && (
          <div className="mt-4 grid grid-cols-1 gap-3 border-t border-white/10 pt-4 sm:grid-cols-2">
            <label className="space-y-2 text-xs text-gray-400">
              From Date
              <input
                type="date"
                value={fromDate}
                onChange={(event) => setFromDate(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#090B08] px-3 py-3 text-sm text-white outline-none focus:border-lime-400"
              />
            </label>

            <label className="space-y-2 text-xs text-gray-400">
              To Date
              <input
                type="date"
                value={toDate}
                onChange={(event) => setToDate(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#090B08] px-3 py-3 text-sm text-white outline-none focus:border-lime-400"
              />
            </label>

            {customDateError && (
              <p className="text-sm text-amber-400 sm:col-span-2">
                {customDateError}
              </p>
            )}
          </div>
        )}
      </section>

      {/* Error */}
      {error && (
        <div className="flex flex-col gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300 sm:flex-row sm:items-center sm:justify-between">
          <p>{error}</p>
          <button
            type="button"
            onClick={() => setRefreshKey((value) => value + 1)}
            className="font-semibold underline"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="relative">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <StatCard key={item.label} {...item} />
          ))}
        </div>

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-[#090B08]/70 backdrop-blur-[2px]">
            <div className="flex items-center gap-3 rounded-xl border border-lime-400/20 bg-[#11150F] px-4 py-3 text-sm text-lime-300">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-lime-400/30 border-t-lime-400" />
              Updating analytics...
            </div>
          </div>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <section className="rounded-2xl border border-white/10 bg-[#11150F] p-4 sm:p-5 xl:col-span-2">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-white">
                Traffic Growth
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                Visitor trend for {periodLabel.toLowerCase()}
              </p>
            </div>

            <span className="rounded-lg bg-lime-400/10 px-3 py-1.5 text-xs font-semibold text-lime-300">
              {data?.trendInterval === "month" ? "MONTHLY VIEW" : "DAILY VIEW"}
            </span>
          </div>

          {loading && !data ? (
            <div className="flex h-64 items-center justify-center text-sm text-gray-500">
              Loading graph...
            </div>
          ) : (
            <TrendChart
              trend={data?.trend || data?.dailyVisitors || []}
              interval={data?.trendInterval || "day"}
            />
          )}
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#11150F] p-4 sm:p-5">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white">
              Traffic Sources
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Visitor sources for selected period
            </p>
          </div>

          <TrafficSources sources={data?.trafficSources || []} />
        </section>
      </div>

      {/* Top Pages */}
      <section className="rounded-2xl border border-white/10 bg-[#11150F] p-4 sm:p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-white">Top Pages</h2>
            <p className="mt-1 text-xs text-gray-500">
              Most viewed pages for selected period
            </p>
          </div>
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-400">
            Top 10
          </span>
        </div>

        {data?.topPages?.length ? (
          <div className="space-y-4">
            {data.topPages.map((item, index) => {
              const maxViews = Math.max(
                ...data.topPages.map((page) => Number(page.views || 0)),
                1
              );

              const percentage =
                (Number(item.views || 0) / maxViews) * 100;

              return (
                <div key={item.page}>
                  <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-lime-400/10 text-xs font-bold text-lime-300">
                        {index + 1}
                      </span>
                      <span className="break-all text-gray-300">
                        {item.page}
                      </span>
                    </div>

                    <span className="shrink-0 font-semibold text-white">
                      {numberFormat(item.views)} views
                    </span>
                  </div>

                  <div className="ml-10 h-1.5 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-lime-400 transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="py-8 text-center text-sm text-gray-500">
            No page view data for this period.
          </p>
        )}
      </section>

      {/* Footer note */}
      <div className="flex flex-col gap-1 border-t border-white/10 pt-4 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
        <p>DS Digital Studio · Website Performance</p>
        <p>Visitor dates use India Standard Time (IST).</p>
      </div>
    </div>
  );
}
