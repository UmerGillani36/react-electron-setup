const sqlite3 = require("sqlite3").verbose();

exports.handler = (event, context, callback) => {
  const db = new sqlite3.Database("./data.db");
  const query = "SELECT * FROM my_table";

  db.all(query, (err, rows) => {
    db.close();
    if (err) {
      console.error(err.message);
      return callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          error: "Failed to fetch data from the database.",
        }),
      });
    } else {
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(rows),
      });
    }
  });
};
