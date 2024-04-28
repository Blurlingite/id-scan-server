const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Student = require("../models/Student");
const Professor = require("../models/Professor");
const Course = require("../models/Course");

const Professor_Course_Student = sequelize.define(
  "Professor_Course_Student",
  {
    professor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,      
      primaryKey: true,
    },
    course_code: {
      type: DataTypes.STRING,
      allowNull: false,      
      primaryKey: true,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    tableName: "professor_course_student", // Define the table's name
    timestamps: false, // Disable createdAt and updatedAt timestamps
  }
);

Professor_Course_Student.belongsTo(Student, { foreignKey: 'student_id' }); // Define the association between ProfessorCourseStudent and Student
Professor_Course_Student.belongsTo(Professor, { foreignKey: 'professor_id' });
Professor_Course_Student.belongsTo(Course, { foreignKey: 'course_code' });


module.exports = Professor_Course_Student;
