const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Adjust path as necessary

const SECRET_KEY = "your_secret_key";
exports.login = (req, res) => {
  const { username, password } = req.body;

  // Validate user
  User.findOne({ username })
    .then((user) => {
      if (!user || password !== user.password) {
        // Use hashed password check in production
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate a token
      const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });
      res.json({ token });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
};
