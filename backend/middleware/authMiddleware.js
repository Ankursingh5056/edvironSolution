
const jwt = require("jsonwebtoken")
require("dotenv").config()

const authMiddleware = async(req,res,next)=>{
    const token = req.headers["authorization"];
    // console.log(token)
    if(!token){
       return  res.status(401).json({
            message : "Invalid token",
            success : false
        })
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1],process.env.JWT_SECRET)
        console.log(decoded)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({message: "invalid token"})
    }
}



module.exports = authMiddleware