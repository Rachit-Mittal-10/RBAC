const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const Role = require("../model/role");
const User = require("../model/user");
const dotenv = require("dotenv").config();

const router = express.Router();

// Register User
router.post("/register", async (req,res) => {
    const {username,password,email} = req.body;
    try{
        await User.create(username,password,email);
        res.status(201).json({message: "User Created Successfully"});
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
});

router.post("/login", async (req,res) => {
    const {username, password} = req.body;
    try{
        const user = await User.findByUsername(username);
        if(!user){
            return res.status(404).json({message: "User Not Found"});
        }

        const isMatch = bcrypt.compare(password, user.password);

        if(isMatch){
            const token = jwt.sign({id:user.id,role:user.role},process.env.JWT_SECRET,{expiresIn: "1h"});
            return res.json({token});
        }
        else{
            return res.status(400).json({message: "Invalid Credentials"});
        }
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
});

module.exports = router;