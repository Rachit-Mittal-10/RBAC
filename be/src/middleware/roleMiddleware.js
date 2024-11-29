const Role = require("../model/role");

// This is an HOC(Higher Order Component)
const roleMiddleware = (roles) => {
    return async (req, res, next) => {
        try{
            const { user } = req;
            const role = await Role.findByName(user.role);
            if(roles.includes(role.name)){
                next();
            }
            else{
                return res.status(403).json({message: "Access Denied"});
            }
        }
        catch(err){
            return res.status(500).json({message: "Internal Server Error"});
        }
    };
};

module.exports = roleMiddleware;
