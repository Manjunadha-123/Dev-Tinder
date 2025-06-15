const Auth = (req,res,next)=>{
    console.log("Authentication middleware called");
    const token = "xyz";
    const Authentication = token === "xyz";
    if(!Authentication){
        res.status(401).send("Unauthorized access");
    }
    else{
        next();
    }
}

module.exports = {Auth};