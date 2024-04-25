const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Student = sequelize.define(
  "Student",
  {
    // Define schema attributes
    student_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Validates email format
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    }
  },
  {
    // Additional model options
    tableName: "students", // Define the table's name
    timestamps: false, // Disable createdAt and updatedAt timestamps
  }
);

module.exports = Student;
