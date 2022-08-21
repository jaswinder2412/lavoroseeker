const jwt = require("jsonwebtoken");

const sign = "JaswinderJatt";

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = JSON.stringify(jwt.verify(token,sign));   
    req.user = decoded
   
  } catch (err) {
    console.log(err)
    return res.status(401).send(err);
  }
  return next();
};

module.exports = verifyToken;