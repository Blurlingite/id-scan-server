const express = require("express");
const router = express.Router();
// const bcrypt = require("bcryptjs"); // For password hashing (optional)
// const jwt = require("jsonwebtoken"); // For generating JWT tokens (optional)
const Professor = require("../models/Professor");


// POST route to login an existing professor
router.post("/login", async (req, res) => {
    try {
      const { professor_id, email, password } = req.body;
  
        // Check if email is provided
        if (!professor_id) {
            return res.status(400).json({ message: "Email is required" });
        }
        // Check if email is provided
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
  
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }
  
        // Find the user by email
        const professor = await Professor.findOne({ where: { professor_id, email, password } });
  
        // Check if user exists
        if (!professor) {
            return res.status(401).json({ message: "Professor not found" });
        }
  
        // Return success response
        res.status(200).json({ message: "Professor found", user: professor });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "An error occurred during login" });
    }
  });

  module.exports = router;
