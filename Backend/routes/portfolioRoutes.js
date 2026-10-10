import express from "express";
import { createPortfolio, getAllPortfolios, getPublicPortfolios, getPortfolioById, updatePortfolio, deletePortfolio } from "../controllers/portfolioController.js";
import uploadImage from "../middleware/uploadImage.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = express.Router();

// Public portfolio page only receives published, active projects.
router.get("/public", getPublicPortfolios);
router.post("/", requireAdmin, uploadImage.single("image"), createPortfolio);
router.get("/", requireAdmin, getAllPortfolios);
router.get("/:id", requireAdmin, getPortfolioById);
router.put("/:id", requireAdmin, uploadImage.single("image"), updatePortfolio);
router.delete("/:id", requireAdmin, deletePortfolio);

export default router;
