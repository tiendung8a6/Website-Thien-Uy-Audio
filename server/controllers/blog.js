const Blog = require("../models/blog");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title);
    const newBlog = await new Blog(req.body).save();
    res.json(newBlog);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Blog.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("BLOG UPDATE ERROR ----> ", err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.listAll = async (req, res) => {
  let blogs = await Blog.find({})
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(blogs);
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Blog.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Blog delete failed");
  }
};

exports.read = async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug }).exec();
  res.json(blog);
};

exports.list = async (req, res) => {
  try {
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 3; // Change this to the desired number of blogs per page

    const blogs = await Blog.find({})
      .skip((currentPage - 1) * perPage)
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(blogs);
  } catch (err) {
    console.log(err);
  }
};

exports.blogsCount = async (req, res) => {
  let total = await Blog.find({}).estimatedDocumentCount().exec();
  res.json(total);
};
