require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Product = require('./models/Product');
const likesRouter = require('./routes/likes');

const { authenticateUser } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;


// -------------------------------
// Clerk JWT Key Check
// -------------------------------
if (!process.env.CLERK_JWT_KEY) {
  console.error("❌ Missing CLERK_JWT_KEY");
  process.exit(1);
}

console.log("🔑 Clerk JWT Key Loaded");


// -------------------------------
// MongoDB
// -------------------------------
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/dealfinder")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));


// -------------------------------
// Middleware
// -------------------------------
app.use(cors());
app.use(express.json());


// -------------------------------
// Protected Like Routes
// -------------------------------
app.use("/api", likesRouter);


// -------------------------------
// PUBLIC ROUTES
// -------------------------------
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    const categories = ["all", ...new Set(products.map(p => p.category))];

    res.json({ products, categories });
  } catch (err) {
    res.status(500).json({ message: "Internal error" });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// -------------------------------
// ADMIN ROUTES (Clerk Auth Required)
// -------------------------------
app.post('/api/products', authenticateUser, async (req, res) => {

  // 🚨 DEBUG STEP: Print the full decoded object and the value being checked
  console.log("DECODED JWT (req.auth) RECEIVED:", req.auth);
  // 👇 CORRECTED: Accessing metadata directly from the decoded JWT payload
  console.log("EXPECTED ROLE PATH VALUE:", req.auth.metadata?.role);

  // ✔ Admin Role Check (CORRECTED)
  if (req.auth.metadata?.role !== "admin") {
    return res.status(403).json({ message: "Admin access only: Role mismatch" });
  }

  try {
    const newProduct = new Product(req.body);
    await newProduct.save();

    res.status(201).json({ message: "Product added", product: newProduct });

  } catch (err) {
    res.status(400).json({ message: "Failed to add", error: err.message });
  }
});


app.put('/api/products/:id', authenticateUser, async (req, res) => {

  // ✔ Admin Role Check (CORRECTED)
  if (req.auth.metadata?.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Not found" });

    res.json({ message: "Updated", product: updated });

  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
});


app.delete('/api/products/:id', authenticateUser, async (req, res) => {

  // ✔ Admin Role Check (CORRECTED)
  if (req.auth.metadata?.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });

    res.json({ message: "Deleted" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// -------------------------------
// Categories
// -------------------------------
app.get("/api/categories", (req, res) => {
  try {
    const categories = Product.schema.path("category").enumValues;
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});


// -------------------------------
// Start Server
// -------------------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


console.log("server is on")