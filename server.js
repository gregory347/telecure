const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;

app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "telecure_user",
  password: "your_password",
  database: "telecure",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err.stack);
    return;
  }
  console.log("Connected to MySQL database");
});

app.get("/", (req, res) => {
  res.send("Hello, Telecure!");
});

app.get("/doctors", (req, res) => {
  db.query("SELECT * FROM doctors", (err, results) => {
    if (err) {
      res.status(500).send("Error fetching doctors: " + err);
      return;
    }
    res.json(results);
  });
});

app.post("/patients", (req, res) => {
  const { first_name, last_name, email, password, phone_number, gender, dob } =
    req.body;

  if (
    !first_name ||
    !last_name ||
    !email ||
    !password ||
    !phone_number ||
    !gender ||
    !dob
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query = `INSERT INTO patients (first_name, last_name, email, password, phone_number, gender, dob) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    query,
    [first_name, last_name, email, password, phone_number, gender, dob],
    (err, results) => {
      if (err) {
        res.status(500).send("Error creating patient: " + err);
        return;
      }
      res.json({
        message: "Patient created successfully",
        patient_id: results.insertId,
      });
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
