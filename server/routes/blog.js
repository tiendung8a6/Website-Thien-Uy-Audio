const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
  create,
  listAll,
  remove,
  read,
  update,
  list,
  blogsCount,
} = require("../controllers/blog"); // Import the Blog controller

// routes
router.post("/blog", authCheck, adminCheck, create);
router.get("/blogs/total", blogsCount);

router.get("/blogs/:count", listAll);
router.delete("/blog/:slug", authCheck, adminCheck, remove);
router.get("/blog/:slug", read);
router.put("/blog/:slug", authCheck, adminCheck, update);

router.post("/blogs", list);

module.exports = router;
