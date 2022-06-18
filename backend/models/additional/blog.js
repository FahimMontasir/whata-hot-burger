const mongoose = require("mongoose");
const Joi = require("joi");

const Blog = mongoose.model(
  "Blog",
  new mongoose.Schema({
    title: {
      type: String,
      minlength: 5,
      maxlength: 80,
      required: true,
    },
    shortDescription: {
      type: String,
      minlength: 20,
      maxlength: 150,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    publish: {
      type: Boolean,
      required: true,
    },
    comments: {
      type: Boolean,
      required: true,
    },
    commentsMessage: {
      type: [
        {
          name: String,
          email: String,
          message: String,
          date: { type: Date, default: Date.now },
        },
      ],
    },
    react: Number,
    metaTitle: {
      type: String,
      minlength: 5,
      maxlength: 80,
      required: true,
    },
    metaDescription: {
      type: String,
      minlength: 20,
      maxlength: 150,
      required: true,
    },
    metaKeywords: {
      type: [String],
      required: true,
    },
  })
);

const validateBlog = (blog) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(80).required(),
    shortDescription: Joi.string().min(20).max(150).required(),
    content: Joi.string().required(),
    cover: Joi.string().required(),
    tags: Joi.array().items(Joi.string().required()).required(),
    publish: Joi.boolean().required(),
    comments: Joi.boolean().required(),
    metaTitle: Joi.string().min(5).max(80).required(),
    metaDescription: Joi.string().min(20).max(150).required(),
    metaKeywords: Joi.array().items(Joi.string().required()).required(),
  });
  return schema.validate(blog);
};

module.exports = { Blog, validateBlog };
