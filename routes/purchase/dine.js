const express = require("express");
const _ = require("lodash");
const { validateId } = require("../../helper/validate");
const auth = require("../../middlewares/auth");
const manager = require("../../middlewares/auth/manager");
const consumer = require("../../middlewares/auth/consumer");
const { validateDine, Dine } = require("../../models/purchase/dine");

const router = express.Router();

//attention!
router.post("/add", [auth, manager], async (req, res) => {
  const { error } = validateDine(req.body);
  if (error) return res.status(400).json({ message: error.message });

  await Dine.create(req.body);

  res.status(200).json({ text: "Dine created successfully" });
});

//attention! get all dine
router.get("/", async (req, res) => {
  const { pageNumber, pageSize } = req.query;

  const limit = parseInt(pageSize);
  const offset = (parseInt(pageNumber) - 1) * limit;

  const dines = await Dine.find()
    .skip(offset)
    .limit(limit)
    .sort({ updatedAt: "desc" });

  if (dines.length === 0)
    return res.status(404).json({ message: "dine not found" });

  res.status(200).json({
    array: dines,
  });
});

//attention!
router.patch("/update", [auth, manager], async (req, res) => {
  const dine = await Dine.findById(req.body._id);
  if (!dine) return res.status(404).json({ message: "dine not found" });

  dine.set({
    ..._.omit(req.body, ["_id", "updatedAt"]),
    updatedAt: Date.now(),
  });
  await dine.save();

  return res.status(200).json({ text: "dine Updated successfully" });
});

//attention! book a dine
router.patch("/bookDine", [auth, consumer], async (req, res) => {
  const dine = await Dine.findById(req.body._id);
  if (!dine) return res.status(404).json({ message: "dine not found" });

  dine.set({ isAvailable: req.body.isAvailable });
  await dine.save();

  return res.status(200).json({ text: "dine Updated successfully" });
});

//attention!
router.delete("/delete", [auth, manager], async (req, res) => {
  const { error } = validateId({ _id: req.body._id });
  if (error) return res.status(400).json({ message: error.message });

  const dine = await Dine.findById(req.body._id);
  if (!dine) return res.status(404).json({ message: "dine not found" });

  await dine.remove();

  res.status(200).json({ text: "dine deleted successfully" });
});

module.exports = router;
