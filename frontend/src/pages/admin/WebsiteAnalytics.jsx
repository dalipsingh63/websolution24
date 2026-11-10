
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://backend-2-ukog.onrender.com";

export default function WebsiteAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const response = await axios.get(
          `${API_URL}/api/analytics/overview`,
          {
            headers: token
              ? { Authorization: `Bearer ${token}` }
              : {},
          }
        );

        setData(response.data.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Analytics load nahi ho paayi. Admin login check karein."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-600">Loading analytics...</div>;
  }

  if (error) {
    return (
      <div className="rounded-xl bg-red-50 p-5 text-red-700">
        {error}
      </div>
    );
  }

  if (!data) return null;

  const stats = [
    { label: "Total Visitors", value: data.totalVisitors },
    { label: "Page Views", value: data.pageViews },
    { label: "Today's Visitors", value: data.todayVisitors },
    { label: "Active Users", value: data.activeUsers },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Website Analytics
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Real visitor activity from your website
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {Number(item.value || 0).toLocaleString("en-IN")}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-gray-200 bg-white p-5">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Traffic Sources (Last 30 Days)
          </h2>

          {data.trafficSources?.length ? (
            <div className="space-y-4">
              {data.trafficSources.map((item) => (
                <div key={item.source}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-gray-700">{item.source}</span>
                    <span className="font-semibold">{item.sessions}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-lime-500"
                      style={{
                        width: `${
                          (item.sessions /
                            Math.max(
                              ...data.trafficSources.map((x) => x.sessions),
                              1
                            )) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No traffic data yet.</p>
          )}
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-5">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Top Pages (Last 30 Days)
          </h2>

          {data.topPages?.length ? (
            <div className="space-y-3">
              {data.topPages.map((item) => (
                <div
                  key={item.page}
                  className="flex justify-between gap-4 border-b border-gray-100 pb-3 text-sm"
                >
                  <span className="break-all text-gray-700">{item.page}</span>
                  <span className="font-semibold text-gray-900">
                    {item.views} views
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No page views yet.</p>
          )}
        </section>
      </div>

      <section className="rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Daily Visitors (Last 30 Days)
        </h2>

        {data.dailyVisitors?.length ? (
          <div className="space-y-2">
            {data.dailyVisitors.map((item) => (
              <div
                key={item.date}
                className="flex items-center justify-between gap-4 border-b border-gray-100 py-2 text-sm"
              >
                <span className="text-gray-600">{item.date}</span>
                <span className="font-semibold text-gray-900">
                  {item.visitors} visitors
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No daily visitor data yet.</p>
        )}
      </section>
    </div>
  );
}
