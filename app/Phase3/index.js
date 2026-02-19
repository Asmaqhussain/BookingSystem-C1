require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");

// Timestamp
function timestamp() {
  const now = new Date();
  return now.toISOString().replace("T", " ").replace("Z", "");
}

// --- Middleware ---
app.use(express.json());

// Serve everything in ./public as static assets
const publicDir = path.join(__dirname, "public");
app.use(express.static(publicDir));

// --- In-memory storage ---
let resources = [];
let nextId = 1;

// --- Views (HTML pages) ---
app.get("/", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.get("/resources", (req, res) => {
  res.sendFile(path.join(publicDir, "resources.html"));
});

// --- API ---
// GET /api/resources -> list resources
app.get("/api/resources", (req, res) => {
  res.json(resources);
});

// POST /api/resources -> create/update/delete based on "action"
app.post("/api/resources", (req, res) => {
  const {
    action = "",
    resourceId = null,
    resourceName = "",
    resourceDescription = "",
    resourceAvailable = false,
    resourcePrice = 0,
    resourcePriceUnit = "",
  } = req.body || {};

  const resourceAction = String(action).trim().toLowerCase();
  const name = String(resourceName).trim();
  const description = String(resourceDescription).trim();
  const available = Boolean(resourceAvailable);
  const price = Number.isFinite(Number(resourcePrice)) ? Number(resourcePrice) : 0;
  const unit = String(resourcePriceUnit || "").trim();

  console.log("The client's POST request ", `[${timestamp()}]`);
  console.log("--------------------------");
  console.log("Action ➡️ ", resourceAction);
  console.log("Name ➡️ ", name);
  console.log("Description ➡️ ", description);
  console.log("Availability ➡️ ", available);
  console.log("Price ➡️ ", price);
  console.log("Price unit ➡️ ", unit);
  console.log("--------------------------");

  if (resourceAction === "create") {
    const newResource = {
      id: nextId++,
      name,
      description,
      available,
      price,
      unit,
    };
    resources.push(newResource);
    return res.status(201).json(newResource);
  }

  if (resourceAction === "update") {
    const idNum = Number(resourceId);
    const idx = resources.findIndex((r) => r.id === idNum);
    if (idx === -1) return res.status(404).json({ error: "Resource not found" });

    resources[idx] = {
      ...resources[idx],
      name: name || resources[idx].name,
      description: description || resources[idx].description,
      available,
      price,
      unit: unit || resources[idx].unit,
    };

    return res.json(resources[idx]);
  }

  if (resourceAction === "delete") {
    const idNum = Number(resourceId);
    const idx = resources.findIndex((r) => r.id === idNum);
    if (idx === -1) return res.status(404).json({ error: "Resource not found" });

    const removed = resources.splice(idx, 1)[0];
    return res.json(removed);
  }

  return res.status(400).json({ error: "Unknown action" });
});

// --- Fallback 404 for unknown API routes ---
app.use("/api", (req, res) => {
  res.status(404).json({ error: "Not found" });
});

// --- Start server ---
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});