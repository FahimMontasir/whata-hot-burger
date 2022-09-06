const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const {
  AdminAndManager,
  validateAdminAndManager,
  validateAdminAndMLogin,
} = require("../../models/user/adminAndManager");
const { validateChangePass } = require("../../models/user/consumer");
//utils
const generateJwt = require("../../helper/generateJwt");
const generateHash = require("../../helper/generateHash");
const { validateId } = require("../../helper/validate");
//middlewares
const auth = require("../../middlewares/auth");
const admin = require("../../middlewares/auth/admin");
const manager = require("../../middlewares/auth/manager");

const router = express.Router();

//attention!creating an manager/admin
router.post("/register", [auth, admin], async (req, res) => {
  const { error } = validateAdminAndManager(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const { email, password } = req.body;

  let user = await AdminAndManager.findOne({ email });
  if (user)
    return res.status(400).json({ message: "User already registered." });

  user = new AdminAndManager(
    _.pick(req.body, [
      "_id",
      "token",
      "type",
      "managerialPosition",
      "name",
      "email",
      "contactNo",
      "photoUrl",
      "dateOfBirth",
    ])
  );
  user.password = await generateHash(password);
  await user.save();

  res.status(201).json({ text: "Account created successfully!" });
});

//attention!
router.post("/login", async (req, res) => {
  const { error } = validateAdminAndMLogin(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const { email, password } = req.body;

  const user = await AdminAndManager.findOne({ email });
  if (!user)
    return res
      .status(404)
      .json({ message: "Invalid phone number or password" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res
      .status(404)
      .json({ message: "Invalid phone number or password" });

  const token = generateJwt(
    _.pick(user, ["_id", "type", "managerialPosition"])
  );

  res.status(200).json({ text: token });
});

//attention! change password
router.patch("/changePass", [auth, manager], async (req, res) => {
  const { error } = validateChangePass(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const { _id, oldPassword, newPassword } = req.body;

  const user = await AdminAndManager.findById(_id);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (req.user.type === "admin") {
    const hashedNewPassword = await generateHash(newPassword);

    user.set({ password: hashedNewPassword, updatedAt: Date.now() });
    await user.save();

    res.status(200).json({ text: "Password changed successfully -admin" });
  } else {
    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword)
      return res.status(404).json({ message: "Invalid old password" });

    const hashedNewPassword = await generateHash(newPassword);

    user.set({ password: hashedNewPassword, updatedAt: Date.now() });
    await user.save();

    res.status(200).json({ text: "Password changed successfully" });
  }
});

// attention! get admin/manager by id
router.get("/:_id", [auth, manager], async (req, res) => {
  const { error } = validateId({ _id: req.params._id });
  if (error) return res.status(400).json({ message: error.message });

  const user = await AdminAndManager.findById(req.params._id);

  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json({ object: _.omit(user.toObject(), ["password"]) });
});

//attention! update manager data
router.patch("/update", [auth, manager], async (req, res) => {
  const user = await AdminAndManager.findById(req.body._id);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (req.user.type === "admin") {
    user.set({
      ..._.omit(req.body, ["_id", "password", "updatedAt", "createdAt"]),
      updatedAt: Date.now(),
    });
    await user.save();

    return res.status(200).json({ text: "Updated successfully -admin" });
  } else {
    const manager = await AdminAndManager.findById(req.user._id);
    manager.set({
      ..._.omit(req.body, [
        "_id",
        "password",
        "type",
        "managerialPosition",
        "updatedAt",
        "createdAt",
      ]),
      updatedAt: Date.now(),
    });
    await manager.save();

    return res.status(200).json({ text: "Updated successfully -manager" });
  }
});

//attention! delete manager
router.delete("/delete", [auth, admin], async (req, res) => {
  const user = await AdminAndManager.findById(req.body._id);
  if (!user) return res.status(404).json({ message: "User not found" });

  await user.remove();

  res.status(200).json({ text: "User Deleted successfully" });
});

//attention! get all manager/admin at a time
router.get("/", [auth, admin], async (req, res) => {
  const { pageNumber, pageSize } = req.query;

  const limit = parseInt(pageSize);
  const offset = (parseInt(pageNumber) - 1) * limit;

  const users = await AdminAndManager.find()
    .skip(offset)
    .limit(limit)
    .sort({ createdAt: "desc" });

  if (users.length === 0)
    return res.status(404).json({ message: "User not found" });

  res.status(200).json({
    array: _.map(
      users,
      _.partialRight(_.pick, [
        "_id",
        "type",
        "managerialPosition",
        "name",
        "contactNo",
        "email",
        "photoUrl",
        "dateOfBirth",
        "createdAt",
        "updatedAt",
      ])
    ),
  });
});

//attention! get admin/manager by phone number | name | email
router.get("/search/query", [auth, admin], async (req, res) => {
  const { contactNo, name, email } = req.query;

  const users = await AdminAndManager.find()
    .or([
      { contactNo },
      { name: { $regex: name || "121lkdjf2424lk", $options: "/.*.*/i" } },
      { email },
    ])
    .sort({ createdAt: "desc" });

  if (users.length === 0)
    return res.status(404).json({ message: "No result found" });

  res.status(200).json({ array: users });
});

module.exports = router;
