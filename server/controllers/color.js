const Color = require("../models/color");
const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    res.json(await new Color({ name, slug: slugify(name) }).save());
  } catch (err) {
    // console.log(err);
    res.status(400).send("Tạo màu thất bại");
  }
};

exports.list = async (req, res) =>
  res.json(await Color.find({}).sort({ createdAt: -1 }).exec());

exports.read = async (req, res) => {
  let color = await Color.findOne({ slug: req.params.slug }).exec();
  res.json({
    color,
  });
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const colorToUpdate = await Color.findOne({ slug: req.params.slug }).exec();
    if (!colorToUpdate) {
      return res.status(404).send("Không tìm thấy màu");
    }
    const updated = await Color.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    await Product.updateMany(
      { color: colorToUpdate.name }, 
      { $set: { color: name } } 
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Chỉnh sửa màu thất bại!");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Color.findOneAndDelete({ slug: req.params.slug });
    await Product.updateMany(
      { color: deleted.name },
      { $unset: { color: "" } }
    );
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Xóa màu thất bại");
  }
};


