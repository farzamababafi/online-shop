const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const commodityController = require("../controllers/commodityController");
const isAuth = require("../middleware/is-auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set the destination folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Set the file name
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/; // Allowed image file types
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"));
  }
};

// Initialize multer with the storage configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
  fileFilter: fileFilter,
});

router.get("/dashboard", commodityController.getCommoditiesByGroup);
router.get("/", commodityController.getAllCommodities);
router.get("/:id", commodityController.getCommodityById);

router.post(
  "/",
  isAuth.verifyToken,
  upload.single("image"),
  commodityController.createCommodity
);
router.put("/:id", isAuth.verifyToken, commodityController.updateCommodity);
router.delete("/:id", isAuth.verifyToken, commodityController.deleteCommodity);

module.exports = router;
