import Lead from "../models/Lead.js";

// CREATE LEAD
export const createLead = async (req, res) => {
  try {
    const { name, phone, email, service, message } = req.body;

    if (typeof name !== "string" || typeof phone !== "string" || !name.trim() || !phone.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name and phone are required",
      });
    }

    if (name.length > 120 || phone.length > 30 || (email && String(email).length > 254) || (service && String(service).length > 120) || (message && String(message).length > 3000)) {
      return res.status(400).json({ success: false, message: "Please shorten the submitted details" });
    }

    const lead = await Lead.create({
      name: name.trim(),
      phone: phone.trim(),
      email: typeof email === "string" ? email.trim() : undefined,
      service: typeof service === "string" ? service.trim() : undefined,
      message: typeof message === "string" ? message.trim() : undefined,
    });

    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      lead,
    });
  } catch (error) {
    console.error("Create Lead Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while creating lead",
    });
  }
};

// GET ALL LEADS
export const getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      leads,
    });
  } catch (error) {
    console.error("Get Leads Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching leads",
    });
  }
};

// GET SINGLE LEAD
export const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      lead,
    });
  } catch (error) {
    console.error("Get Lead Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching lead",
    });
  }
};

// UPDATE LEAD
export const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      lead,
    });
  } catch (error) {
    console.error("Update Lead Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while updating lead",
    });
  }
};

// DELETE LEAD
export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    console.error("Delete Lead Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while deleting lead",
    });
  }
};