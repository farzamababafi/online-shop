const Commodity = require("../models/commodity");
const fs = require("fs");
const path = require("path");
// Get all commodities
exports.getAllCommodities = (req, res) => {
  Commodity.find()
    .then((commodities) => res.json(commodities))
    .catch((err) => res.status(500).json({ error: err.message }));
};
exports.getCommoditiesByGroup = (req, res) => {
  Commodity.aggregate([
    {
      $group: {
        _id: "$category", // Group by category field
        count: { $sum: 1 }, // Count the number of occurrences for each category
      },
    },
    {
      $project: {
        _id: 0, // Optionally, remove the _id field
        category: "$_id", // Rename _id to category
        count: 1, // Include the count field
      },
    },
  ])
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: "Server error" });
    });
};

// Get commodity by ID
exports.getCommodityById = (req, res) => {
  Commodity.findById(req.params.id)
    .then((commodity) => {
      if (!commodity)
        return res.status(404).json({ message: "Commodity not found" });
      res.json(commodity);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

// Create new commodity
exports.createCommodity = (req, res) => {
  const commodity = new Commodity({
    ...req.body,
    image: req.file ? req.file.filename : null,
  });
  commodity
    .save()
    .then((savedCommodity) => res.status(201).json(savedCommodity))
    .catch((err) => res.status(400).json({ error: err.message }));
};

// Update commodity
exports.updateCommodity = (req, res) => {
  Commodity.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedCommodity) => {
      if (!updatedCommodity)
        return res.status(404).json({ message: "Commodity not found" });
      res.json(updatedCommodity);
    })
    .catch((err) => res.status(400).json({ error: err.message }));
};

// Delete commodity
exports.deleteCommodity = (req, res) => {
  Commodity.findByIdAndDelete(req.params.id)
    .then((deletedCommodity) => {
      if (!deletedCommodity) {
        return res.status(404).json({ message: "Commodity not found" });
      }

      // Check if the commodity has an associated image
      if (deletedCommodity.image) {
        const imagePath = path.join(
          __dirname,
          "../uploads",
          deletedCommodity.image
        );

        // Delete the image file from the filesystem
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Error deleting image:", err.message);
          } else {
            console.log("Image deleted:", deletedCommodity.image);
          }
        });
      }

      res.json({ message: "Commodity deleted " });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};
