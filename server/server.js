const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const packageRoutes = require("./routes/packageRoutes");
dotenv.config({ path: require("path").resolve(__dirname, "../.env") });
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/packages", packageRoutes);
connectDB();

app.get("/", (req, res) => {
  res.json({
    message: "OM SAI Planner API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});