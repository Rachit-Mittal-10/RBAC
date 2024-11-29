const dbConn = require("../config/mysql-db");

class Role{
    static async findByName(name){
        try{
            const [result] = await dbConn.promise().query(
                "SELECT * FROM role WHERE name = ?",
                [name]
            );
        }
        catch(err){
            throw err;
        }
    }
}

module.exports = Role;