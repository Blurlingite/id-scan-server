const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

router.get('/', async (req, res) => {
    try {
      const courses = await Course.findAll();
      res.json(courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  module.exports = router;