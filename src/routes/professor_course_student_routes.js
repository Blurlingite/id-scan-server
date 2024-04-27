const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Professor_Course_Student = require('../models/Professor_Course_Student');
const Student = require('../models/Student');

// Define a route to get students for a specific professor, course abbreviation, course code, and course section
router.get('/getStudents', async (req, res) => {
  try {
    const professor_id = req.body.professor_id;
    const course_abbr = req.body.course_abbr;
    const course_code= req.body.course_code;
    const course_section = req.body.course_section;

    // Check if required parameters are provided
    if (!professor_id || !course_abbr || !course_code || !course_section) {
      return res.status(400).json({ error: 'Missing parameters' });
    }

    // Execute the query using Sequelize
    const students = await Professor_Course_Student.findAll({
      attributes: [],
      where: {
        professor_id: professor_id,
        course_abbr: course_abbr,
        course_code: course_code,
        course_section: course_section,
      },
      include: [
        {
          model: Student,
          attributes: ['student_id', 'first_name', 'last_name', 'email'],
        },
      ],
      raw: true, // Return raw data instead of Sequelize instances
    });

    // Extract relevant fields and remove duplicates
    const uniqueStudents = students.map(student => ({
      student_id: student['Student.student_id'],
      first_name: student['Student.first_name'],
      last_name: student['Student.last_name'],
      email: student['Student.email'],
    }));

    // Send the response
    res.json(uniqueStudents);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
