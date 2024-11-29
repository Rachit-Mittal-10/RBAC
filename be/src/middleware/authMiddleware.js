const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const authMiddleWare = (req,res,next) => {
    // Get the token from http header
    const token = req.headers['authorization']?.split(' ')[1];
    if(!token){
        return res.status(403).json({message: "No Token Provided"});
    }
    // Verify the token
    jwt.verify(token,process.env.JWT_SECRET, (err,user) => {
        if (err){
            return res.status(403).json({message: "Invalid or Expired Token"});
        }
        req.user = user;
        next();
    });
};

module.exports = authMiddleWare;