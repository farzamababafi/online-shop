const jwt = require("jsonwebtoken");

const SECRET_KEY = "your_secret_key"; // Use the same secret as in the controller

exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Get token from Bearer scheme

  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.userId = decoded.id; // Set the user ID in the request for later use
    next();
  });
};
