const express = require("express");
const _ = require("lodash");
const auth = require("../../middlewares/auth");
const consumer = require("../../middlewares/auth/consumer");
const admin = require("../../middlewares/auth/admin");
const { validateInvoice, Invoice } = require("../../models/purchase/invoice");
const { validateId } = require("../../helper/validate");

const router = express.Router();

//attention!
router.post("/add", [auth, consumer], async (req, res) => {
  const { error } = validateInvoice(req.body);
  if (error) return res.status(400).json({ message: error.message });

  if (req.user._id.toString() !== req.body.userId.toString())
    return res.status(401).json({ message: "unauthorized user" });

  await Invoice.create(req.body);

  res.status(200).json({ text: "Purchased successful!" });
});

//attention! get all invoices at a time by admin (pagination)
router.get("/", [auth, admin], async (req, res) => {
  const { pageNumber, pageSize } = req.query;

  const limit = parseInt(pageSize);
  const offset = (parseInt(pageNumber) - 1) * limit;

  const invoices = await Invoice.find()
    .skip(offset)
    .limit(limit)
    .sort({ createdAt: "desc" });

  if (invoices.length === 0)
    return res.status(404).json({ message: "Invoice not found" });

  res.status(200).json({
    array: invoices,
  });
});

//attention! all invoices by consumer id
router.get("/:_id", [auth, consumer], async (req, res) => {
  let data;

  if (req.user.type === "admin") {
    data = await Invoice.find({ userId: req.params._id }).sort({
      createdAt: "desc",
    });
  } else {
    data = await Invoice.find({ userId: req.user._id }).sort({
      createdAt: "desc",
    });
  }

  if (!data.length)
    return res.status(400).json({ message: "Invoice not found" });

  res.status(200).json({ array: data });
});

//attention!
router.patch("/update", [auth, admin], async (req, res) => {
  const invoice = await Invoice.findById(req.body._id);
  if (!invoice) return res.status(404).json({ message: "invoice not found" });

  invoice.set({
    ..._.omit(req.body, ["_id", "updatedAt"]),
    updatedAt: Date.now(),
  });
  await invoice.save();

  return res.status(200).json({ text: "invoice Updated successfully" });
});

//attention!
router.delete("/delete", [auth, admin], async (req, res) => {
  const { error } = validateId({ _id: req.body._id });
  if (error) return res.status(400).json({ message: error.message });

  const invoice = await Invoice.findById(req.body._id);
  if (!invoice) return res.status(404).json({ message: "invoice not found" });

  await invoice.remove();

  res.status(200).json({ text: "invoice deleted successfully" });
});

module.exports = router;
