const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = "37cf1b54536b608d8808d643207e0c2c";

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  if (!city){
    return res.status(400).json({ error: "City parameter is required" });
  }

  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = await response.json();
    if (!response.ok) {
      return res.status(400).json({ error: data.message });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching weather" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));