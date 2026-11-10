
import express from "express";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = express.Router();

const getAnalyticsClient = () => {
  const email = process.env.GA_CLIENT_EMAIL;
  const privateKey = process.env.GA_PRIVATE_KEY;

  if (!email || !privateKey) {
    throw new Error("Google Analytics credentials are missing");
  }

  return new BetaAnalyticsDataClient({
    credentials: {
      client_email: email,
      private_key: privateKey.replace(/\\n/g, "\n"),
    },
  });
};

const getMetric = (row, index) =>
  Number(row?.metricValues?.[index]?.value || 0);

router.get("/overview", requireAdmin, async (req, res) => {
  try {
    const propertyId = process.env.GA_PROPERTY_ID;

    if (!propertyId) {
      return res.status(500).json({
        success: false,
        message: "Google Analytics Property ID is not configured",
      });
    }

    const client = getAnalyticsClient();
    const property = `properties/${propertyId}`;

    const [
      overviewReport,
      todayReport,
      realtimeReport,
      dailyReport,
      trafficReport,
      pagesReport,
    ] = await Promise.all([
      client.runReport({
        property,
        dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
        metrics: [
          { name: "activeUsers" },
          { name: "screenPageViews" },
          { name: "sessions" },
        ],
      }),

      client.runReport({
        property,
        dateRanges: [{ startDate: "today", endDate: "today" }],
        metrics: [{ name: "activeUsers" }],
      }),

      client.runRealtimeReport({
        property,
        metrics: [{ name: "activeUsers" }],
      }),

      client.runReport({
        property,
        dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
        dimensions: [{ name: "date" }],
        metrics: [{ name: "activeUsers" }],
        orderBys: [{ dimension: { dimensionName: "date" } }],
      }),

      client.runReport({
        property,
        dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
        dimensions: [{ name: "sessionDefaultChannelGroup" }],
        metrics: [{ name: "sessions" }],
        orderBys: [
          { metric: { metricName: "sessions" }, desc: true },
        ],
        limit: 10,
      }),

      client.runReport({
        property,
        dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }],
        orderBys: [
          { metric: { metricName: "screenPageViews" }, desc: true },
        ],
        limit: 10,
      }),
    ]);

    const overviewRow = overviewReport[0]?.rows?.[0];

    return res.status(200).json({
      success: true,
      data: {
        totalVisitors: getMetric(overviewRow, 0),
        pageViews: getMetric(overviewRow, 1),
        sessions: getMetric(overviewRow, 2),
        todayVisitors: getMetric(todayReport[0]?.rows?.[0], 0),
        activeUsers: getMetric(realtimeReport[0]?.rows?.[0], 0),

        dailyVisitors: (dailyReport[0]?.rows || []).map((row) => ({
          date: row.dimensionValues?.[0]?.value || "",
          visitors: getMetric(row, 0),
        })),

        trafficSources: (trafficReport[0]?.rows || []).map((row) => ({
          source: row.dimensionValues?.[0]?.value || "Other",
          sessions: getMetric(row, 0),
        })),

        topPages: (pagesReport[0]?.rows || []).map((row) => ({
          page: row.dimensionValues?.[0]?.value || "/",
          views: getMetric(row, 0),
        })),
      },
    });
  } catch (error) {
    console.error("Google Analytics API error:", error.message);

    return res.status(502).json({
      success: false,
      message: "Unable to load website analytics. Please check the Analytics configuration.",
    });
  }
});

export default router;
