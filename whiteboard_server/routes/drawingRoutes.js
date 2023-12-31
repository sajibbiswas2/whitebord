// routes/drawingRoutes.js

const express = require("express");
const router = express.Router();
const Drawing = require('../models/drawing')
// post drawing
router.post("/", async (req, res) => {
  try {
    const drawing = new Drawing(req.body);
    await drawing.save();
    res.status(201).send(drawing);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// get all drawing
router.get("/", async (req, res) => {
  try {
    const drawings = await Drawing.find();
    res.send(drawings);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// get drawing by id
router.get("/:id", async (req, res) => {
  try {
    const drawing = await Drawing.findById(req.params.id);
    if (!drawing) {
      return res.status(404).send("Drawing not found");
    }
    res.send(drawing);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// update drawing by id
router.put("/:id", async (req, res) => {
  try {
    const drawing = await Drawing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!drawing) {
      return res.status(404).send("Drawing not found");
    }
    res.send(drawing);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// delete drawing by id
router.delete("/:id", async (req, res) => {
  try {
    const drawing = await Drawing.findByIdAndDelete(req.params.id);
    if (!drawing) {
      return res.status(404).send("Drawing not found");
    }
    res.send(drawing);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
