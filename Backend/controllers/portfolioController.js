import Portfolio from "../models/Portfolio.js";
import cloudinary from "../utils/cloudinary.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

// CREATE PORTFOLIO
export const createPortfolio = async (req, res) => {
  try {

    const {
      title,
      category,
      description,
      liveUrl,
      status,
      isActive,
    } = req.body;

    if (!title || !category) {
      return res.status(400).json({
        success: false,
        message: "Title and category are required",
      });
    }

    let image = {
      url: "",
      publicId: "",
    };

    // Upload image to Cloudinary
    if (req.file) {
      const result = await uploadToCloudinary(
        req.file.buffer,
        "websolution/portfolio"
      );

      image = {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }

    const portfolio = await Portfolio.create({
      title,
      category,
      description,
      liveUrl,
      status,
      isActive,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Portfolio created successfully",
      portfolio,
    });
  } catch (error) {
    console.error("Create Portfolio Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create portfolio",
    });
  }
};

// GET PUBLIC PORTFOLIOS (published + active only)
export const getPublicPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ status: "Published", isActive: true }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, portfolios });
  } catch (error) {
    console.error("Get Public Portfolios Error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch portfolios" });
  }
};

// GET ALL PORTFOLIOS
export const getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      portfolios,
    });
  } catch (error) {
    console.error("Get All Portfolios Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch portfolios",
    });
  }
};

// GET SINGLE PORTFOLIO
export const getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    res.status(200).json({
      success: true,
      portfolio,
    });
  } catch (error) {
    console.error("Get Portfolio Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch portfolio",
    });
  }
};

// UPDATE PORTFOLIO
export const updatePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    const {
      title,
      category,
      description,
      liveUrl,
      status,
      isActive,
    } = req.body;

    portfolio.title = title ?? portfolio.title;
    portfolio.category = category ?? portfolio.category;
    portfolio.description =
      description ?? portfolio.description;
    portfolio.liveUrl = liveUrl ?? portfolio.liveUrl;
    portfolio.status = status ?? portfolio.status;
    portfolio.isActive = isActive ?? portfolio.isActive;

    // If new image is uploaded
    if (req.file) {
      // Delete old image from Cloudinary
      if (portfolio.image?.publicId) {
        await cloudinary.uploader.destroy(
          portfolio.image.publicId,
          {
            resource_type: "image",
          }
        );
      }

      // Upload new image
      const result = await uploadToCloudinary(
        req.file.buffer,
        "websolution/portfolio"
      );

      portfolio.image = {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }

    await portfolio.save();

    res.status(200).json({
      success: true,
      message: "Portfolio updated successfully",
      portfolio,
    });
  } catch (error) {
    console.error("Update Portfolio Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update portfolio",
    });
  }
};

// DELETE PORTFOLIO
export const deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    // Delete image from Cloudinary first
    if (portfolio.image?.publicId) {
      await cloudinary.uploader.destroy(
        portfolio.image.publicId,
        {
          resource_type: "image",
        }
      );
    }

    // Delete document from MongoDB
    await Portfolio.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Portfolio and its image deleted successfully",
    });
  } catch (error) {
    console.error("Delete Portfolio Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete portfolio",
    });
  }
};