
import mongoose from "mongoose";

const analyticsVisitSchema = new mongoose.Schema(
  {
    visitorId: {
      type: String,
      required: true,
      maxlength: 100,
      index: true,
    },
    page: {
      type: String,
      required: true,
      maxlength: 500,
    },
    source: {
      type: String,
      default: "Direct",
      maxlength: 200,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    versionKey: false,
  }
);

analyticsVisitSchema.index({ createdAt: -1 });
analyticsVisitSchema.index({ page: 1, createdAt: -1 });

const AnalyticsVisit =
  mongoose.models.AnalyticsVisit ||
  mongoose.model("AnalyticsVisit", analyticsVisitSchema);

export default AnalyticsVisit;
