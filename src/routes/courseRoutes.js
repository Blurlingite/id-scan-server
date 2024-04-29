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

  // get all courses by professor_id
  router.get('/:professor_id', async (req, res) => {
    try {
      const professor_id = req.params.professor_id;
  
      // Assuming you have a Course model with a 'professor_id' column
      const courses = await Course.findAll({ where: { professor_id: professor_id } });
  
      res.json(courses);
    } catch (error) {
      console.error('Error fetching courses by professor_id:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  

  module.exports = router;