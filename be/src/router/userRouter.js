const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Example route for admins
router.get(
    "/admin", 
    authMiddleware, 
    roleMiddleware(["ADMIN","MODERATOR", "USER"]), 
    (req, res) => {
        res.json({ message: "Welcome Admin" });
});

router.get(
    "/moderator",
    authMiddleware,
    roleMiddleware(["MODERATOR","USER"]),
    (req,res) => {
        res.json({message: "Welcome Moderator"});
});

// Example route for users
router.get(
  "/user",
  authMiddleware,
  roleMiddleware(["USER"]),
  (req, res) => {
    res.json({ message: "Welcome User" });
  }
);

module.exports = router;
