const express = require("express");
const router = express.Router();
// const bcrypt = require("bcryptjs"); // For password hashing (optional)
// const jwt = require("jsonwebtoken"); // For generating JWT tokens (optional)
const Student = require("../models/Student");

// POST route to login an existing student
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email is provided
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Find the user by email
    const student = await Student.findOne({ where: { email, password } });

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
router.post("/register", async (req, res) => {
  const { first_name, last_name, email, password } =
    req.body;

  try {
    // Create a new student instance with the provided data
    const newStudent = await Student.create({
      first_name,
      last_name,
      email,
      password,
    });

    // Respond with the newly created student data
    res.status(201).json(newStudent);
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
