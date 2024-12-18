const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
// app.use(cors()); //ReactJs
app.use(
  cors({
    origin: "http://localhost:5173", // Allow Vite's frontend
  })
);

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/login-score-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Schema and Model
const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  score: { type: Number, default: 0 },
});

const User = mongoose.model("User", UserSchema);

// Route: Add user ID
app.post("/api/login", async (req, res) => {
  const { userId } = req.body;
  try {
    let user = await User.findOne({ userId });
    //eti user payena bane naya user banaune
    if (!user) {
      user = new User({ userId });
      await user.save();
    }
    res.status(200).json({ message: "User logged in", user });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});

// Route: Increase score
app.post("/api/increase-score", async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { userId },
      { $inc: { score: 1 } },
      { new: true } //updated docs will be returned
    );
    res.status(200).json({ message: "Score increased", user });
  } catch (error) {
    res.status(500).json({ error: "Error updating score" });
  }
});

// Route: Get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
