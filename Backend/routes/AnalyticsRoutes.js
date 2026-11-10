
import express from "express";
import AnalyticsVisit from "../models/AnalyticsVisit.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = express.Router();

const IST_OFFSET = 330 * 60 * 1000;

const getISTDayStart = (date = new Date()) => {
  const istDate = new Date(date.getTime() + IST_OFFSET);

  return new Date(
    Date.UTC(
      istDate.getUTCFullYear(),
      istDate.getUTCMonth(),
      istDate.getUTCDate()
    ) - IST_OFFSET
  );
};

const getSource = (referrer) => {
  if (!referrer) return "Direct";

  try {
    const host = new URL(referrer).hostname
      .replace(/^www\./, "")
      .toLowerCase();

    if (host.includes("google")) return "Google";
    if (host.includes("instagram")) return "Instagram";
    if (host.includes("facebook")) return "Facebook";
    if (host.includes("linkedin")) return "LinkedIn";
    if (host.includes("youtube")) return "YouTube";

    return host || "Other";
  } catch {
    return "Other";
  }
};

// Public API: website visitor tracking
router.post("/track", async (req, res) => {
  try {
    const { visitorId, page, referrer } = req.body || {};

    if (
      typeof visitorId !== "string" ||
      visitorId.length < 10 ||
      visitorId.length > 100 ||
      typeof page !== "string" ||
      !page.startsWith("/") ||
      page.length > 500
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid visitor data",
      });
    }

    await AnalyticsVisit.create({
      visitorId,
      page,
      source: getSource(
        typeof referrer === "string" ? referrer : ""
      ),
    });

    return res.status(201).json({
      success: true,
      message: "Visit recorded",
    });
  } catch (error) {
    console.error("Visitor tracking error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to record visit",
    });
  }
});

// Admin API: analytics dashboard
router.get("/overview", requireAdmin, async (req, res) => {
  try {
    const now = new Date();
    const todayStart = getISTDayStart(now);
    const thirtyDaysStart = new Date(
      todayStart.getTime() - 29 * 24 * 60 * 60 * 1000
    );
    const activeSince = new Date(now.getTime() - 5 * 60 * 1000);

    const [
      totalPageViews,
      totalVisitorIds,
      todayVisitorIds,
      activeVisitorIds,
      dailyRows,
      sourceRows,
      pageRows,
    ] = await Promise.all([
      AnalyticsVisit.countDocuments(),

      AnalyticsVisit.distinct("visitorId"),

      AnalyticsVisit.distinct("visitorId", {
        createdAt: { $gte: todayStart },
      }),

      AnalyticsVisit.distinct("visitorId", {
        createdAt: { $gte: activeSince },
      }),

      AnalyticsVisit.aggregate([
        {
          $match: {
            createdAt: { $gte: thirtyDaysStart },
          },
        },
        {
          $group: {
            _id: {
              date: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$createdAt",
                  timezone: "Asia/Kolkata",
                },
              },
              visitorId: "$visitorId",
            },
          },
        },
        {
          $group: {
            _id: "$_id.date",
            visitors: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),

      AnalyticsVisit.aggregate([
        {
          $match: {
            createdAt: { $gte: thirtyDaysStart },
          },
        },
        {
          $group: {
            _id: {
              source: "$source",
              visitorId: "$visitorId",
            },
          },
        },
        {
          $group: {
            _id: "$_id.source",
            visitors: { $sum: 1 },
          },
        },
        { $sort: { visitors: -1 } },
        { $limit: 10 },
      ]),

      AnalyticsVisit.aggregate([
        {
          $match: {
            createdAt: { $gte: thirtyDaysStart },
          },
        },
        {
          $group: {
            _id: "$page",
            views: { $sum: 1 },
          },
        },
        { $sort: { views: -1 } },
        { $limit: 10 },
      ]),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        totalVisitors: totalVisitorIds.length,
        pageViews: totalPageViews,
        todayVisitors: todayVisitorIds.length,
        activeUsers: activeVisitorIds.length,

        dailyVisitors: dailyRows.map((row) => ({
          date: row._id,
          visitors: row.visitors,
        })),

        trafficSources: sourceRows.map((row) => ({
          source: row._id || "Other",
          sessions: row.visitors,
        })),

        topPages: pageRows.map((row) => ({
          page: row._id || "/",
          views: row.views,
        })),
      },
    });
  } catch (error) {
    console.error("Website analytics error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to load website analytics",
    });
  }
});

export default router;
