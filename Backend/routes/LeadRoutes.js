import express from "express";
import { createLead, getAllLeads, getLeadById, updateLead, deleteLead } from "../controllers/LeadController.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = express.Router();

// Public contact form can create a lead. Lead records are admin-only.
router.post("/", createLead);
router.get("/", requireAdmin, getAllLeads);
router.get("/:id", requireAdmin, getLeadById);
router.put("/:id", requireAdmin, updateLead);
router.delete("/:id", requireAdmin, deleteLead);

export default router;
