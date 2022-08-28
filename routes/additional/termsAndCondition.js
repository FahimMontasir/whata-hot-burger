const express = require("express");
const _ = require("lodash");
const auth = require("../../middlewares/auth");
const admin = require("../../middlewares/auth/admin");
const {
  validateTermsCondition,
  TermsCondition,
} = require("../../models/additional/termsAndCondition");

const router = express.Router();

//attention!
router.post("/add", [auth, admin], async (req, res) => {
  const { error } = validateTermsCondition(req.body);
  if (error) return res.status(400).json({ message: error.message });

  await TermsCondition.create(req.body);

  res.status(200).json({ text: "Terms and Condition added successfully!" });
});

//attention!
router.get("/", async (req, res) => {
  const data = await TermsCondition.findOne();

  res.status(200).json({ object: data });
});

//attention!
router.patch("/update", async (req, res) => {
  const termsCondition = await TermsCondition.findById(req.body._id);
  if (!termsCondition)
    return res.status(404).json({ message: "Terms and Condition not found" });

  termsCondition.set({
    ..._.omit(req.body, ["_id", "updatedAt"]),
    updatedAt: Date.now(),
  });
  await termsCondition.save();

  return res
    .status(200)
    .json({ text: "Terms and Condition Updated successfully" });
});

module.exports = router;
