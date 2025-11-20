import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const API_KEY = process.env.BS_API_KEY; // Render lo pondrá automáticamente

app.get("/battlelog", async (req, res) => {
  try {
    const tag = req.query.tag;

    const url = `https://api.brawlstars.com/v1/players/${encodeURIComponent(tag)}/battlelog`;

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${API_KEY}` }
    });

    const data = await response.json();
    res.json(data);
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ error: "proxy failed" });
  }
});

app.get("/", (req, res) => {
  res.send("Brawl Stars Proxy running OK");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Server running on port " + port);
});
