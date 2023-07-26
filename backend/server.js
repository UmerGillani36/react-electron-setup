const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const port = 9000;

// Initialize the SQLite3 database
const db = new sqlite3.Database("./data.db");
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS my_table (id INTEGER PRIMARY KEY, name TEXT)`
  );
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route to fetch data from the database
app.post("/api/insertData", (req, res) => {
  console.log("req", req.body);
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required." });
  }

  const insertQuery = "INSERT INTO my_table (name) VALUES (?)";
  db.run(insertQuery, name, function (err) {
    if (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ error: "Failed to insert data into the database." });
    }

    // Return the inserted record's ID
    res.status(201).json({ id: this.lastID });
  });
});

app.get("/api/getData", (req, res) => {
  const query = "SELECT * FROM my_table";
  db.all(query, (err, rows) => {
    if (err) {
      console.error(err.message);
      res
        .status(500)
        .json({ error: "Failed to fetch data from the database." });
    } else {
      console.log("rows", rows);
      res.status(200).json(rows);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
