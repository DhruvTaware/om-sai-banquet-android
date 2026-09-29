const express = require("express");

const {
  getAllPackages,
  getPackageById,
} = require("../controllers/packageController");

const router = express.Router();

// GET /api/packages
router.get("/", getAllPackages);

// GET /api/packages/:id
router.get("/:id", getPackageById);

module.exports = router;