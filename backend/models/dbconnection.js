const mongoose = require("mongoose");

const dbconnection = mongoose
  .connect("mongodb://localhost:27017/Ashify", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

// password = "v6KLLc9EoqzyanmX";
// const mongodb_URL = "mongodb+srv://tuyubaheashrafu2023:v6KLLc9EoqzyanmX@cluster0.r9bxg1y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

module.exports = dbconnection;
