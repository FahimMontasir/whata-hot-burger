const express = require("express");
const _ = require("lodash");
const { validateDemo, Demo } = require("../models/boilerplate");

const router = express.Router();

//attention!
router.post("/add", async (req, res) => {
  const { error } = validateDemo(req.body);
  if (error) return res.status(400).json({ message: error.message });

  await Demo.create(req.body);

  res.status(200).json({ text: "added successfully!" });
});

//attention!
router.get("/", async (req, res) => {
  const data = await Demo.find().sort("name");

  res.status(200).json({ array: data });
});

//attention!
router.patch("/update", async (req, res) => {});

module.exports = router;
