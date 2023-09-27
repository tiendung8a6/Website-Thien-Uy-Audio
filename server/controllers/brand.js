const Brand = require("../models/brand");
const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    res.json(await new Brand({ name, slug: slugify(name) }).save());
  } catch (err) {
    // console.log(err);
    res.status(400).send("Tạo thương hiệu thất bại");
  }
};

exports.list = async (req, res) =>
  res.json(await Brand.find({}).sort({ createdAt: -1 }).exec());

exports.read = async (req, res) => {
  let brand = await Brand.findOne({ slug: req.params.slug }).exec();
  res.json({
    brand,
  });
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const brandToUpdate = await Brand.findOne({ slug: req.params.slug }).exec();
    if (!brandToUpdate) {
      return res.status(404).send("Không tìm thấy thương hiệu");
    }
    const updated = await Brand.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    await Product.updateMany(
      { brand: brandToUpdate.name }, 
      { $set: { brand: name } } 
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Chỉnh sửa danh mục thất bại!");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Brand.findOneAndDelete({ slug: req.params.slug });
    await Product.updateMany(
      { brand: deleted.name },
      { $unset: { brand: "" } }
    );
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Xóa thương hiệu thất bại");
  }
};


