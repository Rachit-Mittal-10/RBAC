const dbConn = require("../config/mysql-db");
const bcrypt = require("bcryptjs");


class User{
    static async create(username, password, email){
        try{
            const hashedPassword = await bcrypt.hash(password,10);
            const [result] = await dbConn.promise().query(
                "INSERT INTO users(username,password,email) VALUES (?,?,?);",
                [username,hashedPassword,email]
            );
            return result;
        }
        catch(err){
            throw err;
        }
    }
    static async findByUsername(username){
        try{
            const [result] = await dbConn.promise().query(
                "SELECT * FROM users WHERE username = ?",
                [username]
            );
            return result[0];
        }
        catch(err){
            throw err;
        }
    }
    static async findByEmail(email){
        try{
            const [result] = await dbConn.promise().query(
                "SELECT * FROM users WHERE email = ?",
                [email]
            );
            return result;
        }
        catch(err){
            throw err;
        }
    }
};

module.exports = User;