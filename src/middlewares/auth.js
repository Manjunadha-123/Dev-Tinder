const jwt = require("jsonwebtoken");
const User  = require("../models/user");

const Auth = async (req,res,next)=>{

    try {
        const {token} = req.cookies;
        if(!token){
            throw new Error("Token is not valid!!!!");
        }

        const decodedObj = await jwt.verify(token,"DEV@Tinder$790");

        const {_id} = decodedObj;
        const user = await User.findById(_id);

        if(!user){
            throw new Error("User not Found");
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(400).send("Error: "+err.message);
    }



    // console.log("Authentication middleware called");
    // const token = "xyz";
    // const Authentication = token === "xyz";
    // if(!Authentication){
    //     res.status(401).send("Unauthorized access");
    // }
    // else{
    //     next();
    // }
}

module.exports = {Auth};