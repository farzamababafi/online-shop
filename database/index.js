const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const bodyParser = require("body-parser");
const commodityRoutes = require("./routes/commodityRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({ origin: "http://localhost:4200" }));
//
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Middleware
app.use(bodyParser.json());
//Cores

// Routes
app.use("/api/commodities", commodityRoutes);
app.use("/api/users", userRoutes);

// Connect to MongoDB
mongoose
  .connect("mongodb://admin:password@localhost:27017/shop?authSource=admin")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
