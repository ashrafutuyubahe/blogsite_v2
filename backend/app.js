const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const dbconnection = require("./models/dbconnection");
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT;
const Registerusers= require('./routes/registerusers');
const handleLoign= require('./routes/userlogin');
const authenticateuser= require('./routes/createblog');
const cors=  require('cors');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "front-end")));

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "front-end", "index.html"));
});



app.use('/register',Registerusers);
app.use('/login',handleLoign)
app.use('/authenticate',authenticateuser);
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}...`);
});
