const express = require("express");
const dotenv = require("dotenv").config();
const authRoutes = require("./router/authRouter");
const userRoutes = require("./router/userRouter");
const cors = require("cors");

const app = express();

//Middleware to parse JSON file
// app.use(cors());
app.use(express.json());

//Routes
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);

// Start the server
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
});
