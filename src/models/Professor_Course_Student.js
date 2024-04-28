const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Student = require("../models/Student");

const Professor_Course_Student = sequelize.define(
  "Professor_Course_Student",
  {
    professor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    course_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "professor_course_student", // Define the table's name
    timestamps: false, // Disable createdAt and updatedAt timestamps
  }
);

Professor_Course_Student.belongsTo(Student, { foreignKey: 'student_id' }); // Define the association between ProfessorCourseStudent and Student

module.exports = Professor_Course_Student;
