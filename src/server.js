const express = require("express");
const { Pool } = require("pg");
const studentRoutes = require("./routes/studentRoutes");
const professorRoutes = require("./routes/professorRoutes");
const courseRoutes = require("./routes/courseRoutes");
const professor_course_student_routes = require("./routes/professor_course_student_routes");

const os = require("os");

const app = express();

let ipAddress = "";

// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes

// get the ip address this server runs on
app.get("/api/get-ip", (req, res) => {
  const networkInterfaces = os.networkInterfaces();

  for (const interface of Object.values(networkInterfaces)) {
    for (const config of interface) {
      if (config.family === "IPv4" && !config.internal) {
        ipAddress = config.address;
        break;
      }
    }
    if (ipAddress) break;
  }

  res.json({ ip: ipAddress });
});

app.use("/students", studentRoutes); // Mount studentRoutes under the '/students' path
app.use("/professors", professorRoutes); 
app.use("/courses", courseRoutes); 
app.use("/professor_course_student_routes", professor_course_student_routes); 

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
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://${getLocalIP()}:${PORT}`);
});

function getLocalIP() {
  const os = require("os");
  const networkInterfaces = os.networkInterfaces();
  for (const interface of Object.values(networkInterfaces)) {
    for (const config of interface) {
      if (config.family === "IPv4" && !config.internal) {
        return config.address;
      }
    }
  }
}
