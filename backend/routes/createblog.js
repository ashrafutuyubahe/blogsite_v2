
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/authenticate');



router.get('/',verifyToken, (req, res) => {
 
  res.redirect('/createblog.html');
});

module.exports = router;
