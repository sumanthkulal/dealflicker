// routes/likes.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// ✅ Import your middleware
const { authenticateUser } = require("../middleware/auth");

// ----------------------------------------------------
// GET /api/user-favorites : Fetch user's saved favorites
// ----------------------------------------------------
router.get("/user-favorites", authenticateUser, async (req, res) => {
  const userId = req.userId; // ✔ Use req.userId from middleware

  try {
    const likedProducts = await Product.find({ likedBy: userId }).select("_id");
    const favoriteIds = likedProducts.map((product) => product._id.toString());

    res.status(200).json({ favoriteIds });
  } catch (error) {
    console.error("Error fetching user favorites:", error);
    res.status(500).json({ message: "Could not retrieve favorites." });
  }
});

// ----------------------------------------------------
// POST /api/toggle-like : Add / remove like
// ----------------------------------------------------
router.post("/toggle-like", authenticateUser, async (req, res) => {
  const userId = req.userId; // ✔ Use req.userId from middleware
  const { productId } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ message: "Product not found." });

    const isLiked = product.likedBy.includes(userId);

    const update = isLiked
      ? { $pull: { likedBy: userId }, $inc: { likeCount: -1 } }
      : { $addToSet: { likedBy: userId }, $inc: { likeCount: 1 } };

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      update,
      { new: true }
    );

    // -----------------------------
    // ✅ Log full info to console
    // -----------------------------
    console.log("====================================");
    console.log("🔥 Product Like/Unlike Event 🔥");
    console.log("User ID       :", userId);
    console.log("Product ID    :", productId);
    console.log("Action        :", isLiked ? "Unliked" : "Liked");
    console.log("New Like Count:", updatedProduct.likeCount);
    console.log("Product Name  :", updatedProduct.name);
    console.log("Product Price :", updatedProduct.price);
    console.log("====================================");

    res.status(200).json({
      isLiked: !isLiked,
      newCount: updatedProduct.likeCount,
    });
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ message: "Error processing like." });
  }
});

module.exports = router;
