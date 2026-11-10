
import express from "express";
import AnalyticsVisit from "../models/AnalyticsVisit.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = express.Router();

const IST_OFFSET = 330 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

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

const getISTDateParts = (date = new Date()) => {
  const istDate = new Date(date.getTime() + IST_OFFSET);

  return {
    year: istDate.getUTCFullYear(),
    month: istDate.getUTCMonth() + 1,
    day: istDate.getUTCDate(),
  };
};

const getISTStart = (year, month, day = 1) => {
  return new Date(
    Date.UTC(year, month - 1, day) - IST_OFFSET
  );
};

const parseDate = (value) => {
  if (
    typeof value !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(value)
  ) {
    return null;
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  if (date.toISOString().slice(0, 10) !== value) {
    return null;
  }

  return value;
};

const getDateRange = (range, from, to) => {
  const now = new Date();
  const todayStart = getISTDayStart(now);
  const today = getISTDateParts(now);

  let startDate;
  let endDate = new Date(todayStart.getTime() + DAY_MS);

  switch (range) {
    case "today":
      startDate = todayStart;
      break;

    case "yesterday":
      startDate = new Date(todayStart.getTime() - DAY_MS);
      endDate = todayStart;
      break;

    case "last7":
      startDate = new Date(todayStart.getTime() - 6 * DAY_MS);
      break;

    case "last30":
      startDate = new Date(todayStart.getTime() - 29 * DAY_MS);
      break;

    case "month":
      startDate = getISTStart(today.year, today.month, 1);
      break;

    case "year":
      startDate = getISTStart(today.year, 1, 1);
      break;

    case "custom": {
      const validFrom = parseDate(from);
      const validTo = parseDate(to);

      if (!validFrom || !validTo || validFrom > validTo) {
        return { error: "Please select a valid date range." };
      }

      startDate = new Date(
        `${validFrom}T00:00:00.000Z`
      );
      startDate = new Date(startDate.getTime() - IST_OFFSET);

      const toDate = new Date(
        `${validTo}T00:00:00.000Z`
      );

      endDate = new Date(
        toDate.getTime() - IST_OFFSET + DAY_MS
      );

      if (startDate > now) {
        return { error: "Future dates are not allowed." };
      }

      return {
        startDate,
        endDate,
        label: "Custom Date Range",
      };
    }

    case "all":
      startDate = null;
      endDate = now;
      break;

    default:
      return { error: "Invalid analytics date filter." };
  }

  return {
    startDate,
    endDate,
    label: range,
  };
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

// Admin API: filtered analytics dashboard
router.get("/overview", requireAdmin, async (req, res) => {
  try {
    const {
      range = "last30",
      from,
      to,
    } = req.query;

    const period = getDateRange(range, from, to);

    if (period.error) {
      return res.status(400).json({
        success: false,
        message: period.error,
      });
    }

    const { startDate, endDate } = period;

    const match = {
      createdAt: {
        $lte: endDate,
        ...(startDate ? { $gte: startDate } : {}),
      },
    };

    const now = new Date();
    const todayStart = getISTDayStart(now);
    const activeSince = new Date(now.getTime() - 5 * 60 * 1000);

    const todayMatch = {
      createdAt: {
        $gte: todayStart,
        $lte: now,
      },
    };

    const activeMatch = {
      createdAt: {
        $gte: activeSince,
        $lte: now,
      },
    };

    const duration = startDate
      ? endDate.getTime() - startDate.getTime()
      : Infinity;

    const trendInterval =
      range === "year" ||
      range === "all" ||
      duration > 90 * DAY_MS
        ? "month"
        : "day";

    const dateFormat =
      trendInterval === "month" ? "%Y-%m" : "%Y-%m-%d";

    const [
      totalPageViews,
      totalVisitorIds,
      todayVisitorIds,
      activeVisitorIds,
      trendRows,
      sourceRows,
      pageRows,
    ] = await Promise.all([
      AnalyticsVisit.countDocuments(match),

      AnalyticsVisit.distinct("visitorId", match),

      AnalyticsVisit.distinct("visitorId", todayMatch),

      AnalyticsVisit.distinct("visitorId", activeMatch),

      AnalyticsVisit.aggregate([
        { $match: match },
        {
          $group: {
            _id: {
              period: {
                $dateToString: {
                  format: dateFormat,
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
            _id: "$_id.period",
            visitors: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),

      AnalyticsVisit.aggregate([
        { $match: match },
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
        { $match: match },
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

    const trend = trendRows.map((row) => ({
      date: row._id,
      visitors: row.visitors,
    }));

    return res.status(200).json({
      success: true,
      data: {
        totalVisitors: totalVisitorIds.length,
        pageViews: totalPageViews,

        // Today's visitors always means the current IST day.
        todayVisitors: todayVisitorIds.length,

        // Active users always means visitors active in the last 5 minutes.
        activeUsers: activeVisitorIds.length,

        trend,
        trendInterval,

        // Kept for compatibility with the existing dashboard.
        dailyVisitors:
          trendInterval === "day" ? trend : [],

        trafficSources: sourceRows.map((row) => ({
          source: row._id || "Other",
          sessions: row.visitors,
        })),

        topPages: pageRows.map((row) => ({
          page: row._id || "/",
          views: row.views,
        })),

        period: {
          range,
          from: startDate
            ? new Date(startDate.getTime() + IST_OFFSET)
                .toISOString()
                .slice(0, 10)
            : null,
          to: new Date(endDate.getTime() - 1 + IST_OFFSET)
            .toISOString()
            .slice(0, 10),
        },
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
