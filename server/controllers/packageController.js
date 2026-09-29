const Package = require("../models/Package");

// GET /api/packages
const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find().sort({ packageNumber: 1 });

    res.status(200).json({
      success: true,
      count: packages.length,
      packages,
    });
  } catch (error) {
    console.error("Error fetching packages:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch packages.",
    });
  }
};

// GET /api/packages/:id
const getPackageById = async (req, res) => {
  try {
    const packageData = await Package.findOne({
      $or: [
        { id: req.params.id },
        { packageNumber: req.params.id },
      ],
    });

    if (!packageData) {
      return res.status(404).json({
        success: false,
        message: "Package not found.",
      });
    }

    res.status(200).json({
      success: true,
      package: packageData,
    });
  } catch (error) {
    console.error("Error fetching package:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch package.",
    });
  }
};

module.exports = {
  getAllPackages,
  getPackageById,
};