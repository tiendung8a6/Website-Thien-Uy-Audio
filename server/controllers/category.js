const Category = require("../models/category");
const Product = require("../models/product");
const Sub = require("../models/sub");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.name);
    const newCategory = await new Category(req.body).save();
    res.json(newCategory);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.list = async (req, res) =>
  res.json(await Category.find({}).sort({ createdAt: -1 }).exec());

exports.read = async (req, res) => {
  let category = await Category.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ category }).populate("category").exec();

  res.json({
    category,
    products,
  });
};

exports.update = async (req, res) => {
  const { name, images } = req.body; 
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, images, slug: slugify(name) }, 
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Chỉnh sửa danh mục thất bại!");
  }
};

// exports.remove = async (req, res) => {
//   try {
//     const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
//     res.json(deleted);
//   } catch (err) {
//     res.status(400).send("Category delete failed");
//   }
// };

//update code -> add delete products
exports.remove = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    await Product.deleteMany({ category });

    const deleted = await Category.findOneAndDelete({ slug: req.params.slug });

    res.json(deleted);
  } catch (err) {
    res.status(400).send("Category delete failed");
  }
};


exports.getSubs = (req, res) => {
  Sub.find({ parent: req.params._id }).exec((err, subs) => {
    if (err) console.log(err);
    res.json(subs);
  });
};
