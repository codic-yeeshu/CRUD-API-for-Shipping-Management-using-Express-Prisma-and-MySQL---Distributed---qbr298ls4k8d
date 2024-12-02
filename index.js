const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const shipping = require("./routes/shipping");
const { conn } = require("./db/config");
const app = express();
app.use(express.json());

app.use("/api/shipping", shipping);
app.get("/", (req, res) => {
  res.status(200).send("Hello WOrld");
});

conn();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
