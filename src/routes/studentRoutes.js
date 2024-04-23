const express = require("express");
const router = express.Router();
// const bcrypt = require("bcryptjs"); // For password hashing (optional)
// const jwt = require("jsonwebtoken"); // For generating JWT tokens (optional)
const Student = require("../models/Student");

// POST route to login an existing student
// using first name as passsword for now
router.post("/login", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email is provided
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find the user by email
    const student = await Student.findOne({ where: { email } });

    // Check if user exists
    if (!student) {
      return res.status(401).json({ message: "User not found" });
    }

    // Return success response
    res.status(200).json({ message: "User found", user: student });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
});

// POST route to create a new student
router.post("/", async (req, res) => {
  const { username, email } = req.body;

  try {
    const newStudent = await Student.create({ username, email });
    res.status(201).json(newStudent);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Other routes...

module.exports = router;
