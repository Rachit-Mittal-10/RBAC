const mysql = require("mysql2");
const dotenv = require("dotenv").config();


// const dbConn = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT
// });

// dbConn.connect((err)=>{
//     if(err){
//         console.log(`DB Connection failed: ${err}`);
//         process.exit(1);
//     }

//     console.log("Connected to DB");
// });


const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
};

let dbConn = null;
let retries = process.env.DB_RETRIES;

function connectToDB() {
  dbConn = mysql.createConnection(config);

  dbConn.connect((err) => {
    if (err && retries > 0) {
      console.log(
        `DB Connection failed: ${err.message}. Retrying in ${process.env.DB_RETRY_TIME} miliseconds...`
      );
      setTimeout(connectToDB, process.env.DB_RETRY_TIME); // Retry connection in 5 seconds
    }
    else if(err && retries <= 0){
        console.log("Maximum Retries reached");
        process.exit(1);
    } 
    else {
      console.log("Connected to DB");
    }
  });
}

connectToDB();

module.exports = dbConn;