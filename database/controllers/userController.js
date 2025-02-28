const User = require("../models/user");

// Get all users
exports.getAllUsers = (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json({ error: err.message }));
};

// Get user by ID
exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

// Create new user
exports.createUser = (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((savedUser) => res.status(201).json(savedUser))
    .catch((err) => res.status(400).json({ error: err.message }));
};

// Update user
exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedUser) => {
      if (!updatedUser)
        return res.status(404).json({ message: "User not found" });
      res.json(updatedUser);
    })
    .catch((err) => res.status(400).json({ error: err.message }));
};

// Delete user
exports.deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((deletedUser) => {
      if (!deletedUser)
        return res.status(404).json({ message: "User not found" });
      res.json({ message: "User deleted" });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};
