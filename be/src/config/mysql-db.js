const mysql = require("mysql2");
const dotenv = require("dotenv").config();


const dbConn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

dbConn.connect((err)=>{
    if(err){
        console.log(`DB Connection failed: ${err}`);
        process.exit(1);
    }

    console.log("Connected to DB");
});

module.exports = dbConn;