const express = require("express");
const { Pool } = require("pg");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes

app.use("/students", studentRoutes); // Mount studentRoutes under the '/students' path

app.use("/", async (req, res) => {
  try {
    console.log("Welcome to localhost 3000");
    res.send("Welcome to localhost 3000");
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "IDScan",
  password: "1111",
  port: 5432, // Default PostgreSQL port
});

pool.connect((err, client, done) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected successfully to the database!");
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
