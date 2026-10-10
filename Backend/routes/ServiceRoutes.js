import express from "express";
import { createService, getAllServices, getActiveServices, getServiceById, updateService, deleteService } from "../controllers/ServiceController.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = express.Router();

// Public page only receives active, published services.
router.get("/active", getActiveServices);
router.post("/", requireAdmin, createService);
router.get("/", requireAdmin, getAllServices);
router.get("/:id", requireAdmin, getServiceById);
router.put("/:id", requireAdmin, updateService);
router.delete("/:id", requireAdmin, deleteService);

export default router;
