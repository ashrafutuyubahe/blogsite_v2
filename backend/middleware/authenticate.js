const jwt = require("jsonwebtoken");
const public_key= process.env.public_key

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token not provided" });
  }

  jwt.verify(token, public_key, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Unauthorized: Token expired" });
      } else {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }
    } else {
      const { useremail, username } = decoded;
      req.user = { useremail, username }; 
      next();
    }
  });
};

module.exports = verifyToken;
