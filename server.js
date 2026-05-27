const express = require("express");
const cors = require("cors");
const { db } = require("./config/firebase");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Express + Firestore backend is running");
});

// Create user
app.post("/api/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    const docRef = await db.collection("users").add({
      name,
      email,
      createdAt: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      id: docRef.id,
    });
  } catch (error) {
    console.error("Create user error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create user",
    });
  }
});

// Get all users
app.get("/api/users", async (req, res) => {
  try {
    const snapshot = await db.collection("users").get();

    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Get users error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get users",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});