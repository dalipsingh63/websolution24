import Service from "../models/Service.js";

// CREATE SERVICE
export const createService = async (req, res) => {
  try {
    const {
      title,
      text,
      features,
      image,
      icon,
      accent,
      link,
      status,
      isActive,
      order,
    } = req.body;

    if (!title || !text || !icon) {
      return res.status(400).json({
        success: false,
        message: "Title, text and icon are required",
      });
    }

    const service = await Service.create({
      title,
      text,
      features: Array.isArray(features) ? features : [],
      image: image || "",
      icon,
      accent,
      link,
      status,
      isActive,
      order,
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    console.error("Create Service Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create service",
    });
  }
};


// GET ALL SERVICES
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      services,
    });
  } catch (error) {
    console.error("Get All Services Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch services",
    });
  }
};


// GET ACTIVE SERVICES
export const getActiveServices = async (req, res) => {
  try {
    const services = await Service.find({
      isActive: true,
      status: "Published",
    }).sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      services,
    });
  } catch (error) {
    console.error("Get Active Services Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch active services",
    });
  }
};


// GET SINGLE SERVICE
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    console.error("Get Service By ID Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch service",
    });
  }
};


// UPDATE SERVICE
export const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    const {
      title,
      text,
      features,
      image,
      icon,
      accent,
      link,
      status,
      isActive,
      order,
    } = req.body;

    service.title = title ?? service.title;
    service.text = text ?? service.text;

    service.features = Array.isArray(features)
      ? features
      : service.features;

    service.image = image ?? service.image ?? "";
    service.icon = icon ?? service.icon;
    service.accent = accent ?? service.accent;
    service.link = link ?? service.link;
    service.status = status ?? service.status;
    service.isActive = isActive ?? service.isActive;
    service.order = order ?? service.order;

    await service.save();

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      service,
    });
  } catch (error) {
    console.error("Update Service Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update service",
    });
  }
};


// DELETE SERVICE
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Delete Service Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete service",
    });
  }
};