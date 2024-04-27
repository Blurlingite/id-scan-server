const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Course = sequelize.define(
  "Course",
  {
    // Define schema attributes
    course_abbr: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true, // course_abbr as part of the composite primary key
    },
    course_code: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true, // course_code as part of the composite primary key
    },
    course_section: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true, // course_section as part of the composite primary key
    },
    course_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    professor_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    // Additional model options
    tableName: "course", // Define the table's name
    timestamps: false, // Disable createdAt and updatedAt timestamps
  }
);

module.exports = Course;
