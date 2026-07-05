const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const policyRoutes = require("./routes/policyRoutes");
const accessRoutes = require("./routes/accessRoutes");
dotenv.config();
console.log(process.env.JWT_SECRET);

connectDB();

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/access", accessRoutes);

app.get("/", (req, res) => {
  res.send("Network Access Logger Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});