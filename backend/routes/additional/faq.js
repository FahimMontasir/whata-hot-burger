const express = require("express");
const _ = require("lodash");
const auth = require("../../middlewares/auth");
const consumer = require("../../middlewares/auth/consumer");
const admin = require("../../middlewares/auth/admin");
const { validateFAQ, FAQ } = require("../../models/additional/faq");

const router = express.Router();

//attention!
router.post("/add", [auth, consumer], async (req, res) => {
  const { error } = validateFAQ(req.body);
  if (error) return res.status(400).json({ message: error.message });

  await FAQ.create(req.body);

  res.status(200).json({ text: "sended successfully!" });
});

//attention!
router.get("/", async (req, res) => {
  // const faq = await FAQ.find({ isAdded: true }).sort({ updatedAt: "desc" });

  res.status(200).json({ array: "data!!!" });
});

//attention!
router.patch("/update", [auth, admin], async (req, res) => {
  const faq = await FAQ.findById(req.body._id);
  if (!faq) return res.status(404).json({ message: "faq not found" });

  faq.set({
    ..._.omit(req.body, ["_id", "updatedAt"]),
    updatedAt: Date.now(),
  });
  await faq.save();

  return res.status(200).json({ text: "faq updated successfully" });
});

//attention!
router.delete("/delete", [auth, admin], async (req, res) => {
  const faq = await FAQ.findById(req.body._id);
  if (!faq) return res.status(404).json({ message: "faq not found" });

  await faq.remove();

  res.status(200).json({ text: "faq deleted successfully" });
});

module.exports = router;
