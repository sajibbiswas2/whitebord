const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3000;
const connectDB = require("./config/database");
const drawingRoutes = require("./routes/drawingRoutes");
// Connect to database
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/drawing", drawingRoutes);

app.listen(port, () => {
  console.log(`white board app listening on port ${port}`);
});
