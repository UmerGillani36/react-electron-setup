import React, { useEffect, useState } from "react";
const App = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  console.log("data", data);
  const fetchData = () => {
    fetch("http://localhost:9000/api/getData")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  };
  // useEffect(() => {
  //   fetchData();
  // }, []);
  const handleSubmit = (event) => {
    fetch("http://localhost:9000/api/insertData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Inserted record with ID:", data.id);
        // Fetch updated data after successful insertion
        fetchData();
      })
      .catch((error) => console.error(error));

    // Reset the name input field
    setName("");
  };
  return (
    <div>
      <h1>SQLite3 Data</h1>
      <input
        type="text"
        placeholder="Enter the name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: "20px" }}
      />
      <button onClick={handleSubmit}>Insert Data</button>
      <ul>
        {data.length > 1 &&
          data?.map((item) => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  );
};

export default App;
