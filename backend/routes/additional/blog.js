const express = require("express");
const _ = require("lodash");
const auth = require("../../middlewares/auth");
const consumer = require("../../middlewares/auth/consumer");
const manager = require("../../middlewares/auth/manager");
const {
  validateBlog,
  Blog,
  validateComment,
} = require("../../models/additional/blog");

const router = express.Router();

//attention!
router.post("/add", [auth, manager], async (req, res) => {
  const { error } = validateBlog(req.body);
  if (error) return res.status(400).json({ message: error.message });

  await Blog.create(req.body);

  res.status(200).json({ text: "Blog added successfully!" });
});

//attention! get blog by tag
router.get("/tag/:name", async (req, res) => {
  const blogs = await Blog.find({
    tags: { $in: [req.params.name] },
    publish: true,
  }).sort({
    updatedAt: "desc",
  });

  if (!blogs.length) return res.status(400).json({ message: "blog not found" });

  res.status(200).json({
    array: _.map(
      blogs,
      _.partialRight(_.pick, ["_id", "title", "tags", "reactLength", "cover"])
    ),
  });
});

//attention! get trending blogs
router.get("/trending", async (req, res) => {
  const { size } = req.query;

  const limit = parseInt(size);

  const blogs = await Blog.find({ publish: true })
    .limit(limit)
    .sort({ reactLength: "desc" });

  if (blogs.length === 0)
    return res.status(404).json({ message: "Blog not found" });

  res.status(200).json({
    array: _.map(
      blogs,
      _.partialRight(_.pick, ["_id", "title", "tags", "reactLength", "cover"])
    ),
  });
});

//attention! get all blogs (pagination)
router.get("/", [auth, manager], async (req, res) => {
  const { pageNumber, pageSize } = req.query;

  const limit = parseInt(pageSize);
  const offset = (parseInt(pageNumber) - 1) * limit;

  const blogs = await Blog.find()
    .skip(offset)
    .limit(limit)
    .sort({ updatedAt: "desc" });

  if (blogs.length === 0)
    return res.status(404).json({ message: "Blog not found" });

  res.status(200).json({
    array: _.map(
      blogs,
      _.partialRight(_.pick, ["_id", "title", "tags", "reactLength", "cover"])
    ),
  });
});

//attention! get blog single blog details
router.get("/details/:_id", async (req, res) => {
  const blog = await Blog.findOne({
    _id: req.params._id,
    publish: true,
  });
  if (!blog) return res.status(400).json({ message: "blog not found" });

  res.status(200).json({ object: blog });
});

//attention! add comment to a blog
router.patch("/comment", [auth, consumer], async (req, res) => {
  const { error } = validateComment(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const blog = await Blog.findById(req.body._id);
  if (!blog) return res.status(404).json({ message: "blog not found" });

  blog.commentsMessage.push(_.pick(req.body, ["name", "email", "message"]));
  await blog.save();

  return res.status(200).json({ text: "comment added successfully" });
});

//attention! react to a blog
router.patch("/react", [auth, consumer], async (req, res) => {
  const blog = await Blog.findById(req.body._id);
  if (!blog) return res.status(404).json({ message: "blog not found" });

  const foundReact = blog.react.find(
    (id) => id.toString() === req.user._id.toString()
  );
  if (foundReact)
    return res.status(401).json({ message: "You have loved already" });

  blog.react.push(req.user._id);
  blog.set({ reactLength: blog.react.length });
  await blog.save();

  return res.status(200).json({ text: "Blog updated successfully -react" });
});

//attention!
router.patch("/update", [auth, manager], async (req, res) => {
  const blog = await Blog.findById(req.body._id);
  if (!blog) return res.status(404).json({ message: "blog not found" });

  blog.set({
    ..._.omit(req.body, ["_id", "updatedAt", "react"]),
    updatedAt: Date.now(),
  });
  await blog.save();

  return res.status(200).json({ text: "Blog updated successfully" });
});

//attention!
router.delete("/delete", [auth, manager], async (req, res) => {
  const blog = await Blog.findById(req.body._id);
  if (!blog) return res.status(404).json({ message: "blog not found" });

  await blog.remove();

  res.status(200).json({ text: "Blog deleted successfully" });
});

module.exports = router;
