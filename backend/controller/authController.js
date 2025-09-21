require("dotenv").config()
const userModel = require("../Model/userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
// const { validate } = require("../Model/orderSchema")
const login = async(req, res) => {
    try {
        const {email,password} = req.body
        if(!email || !password){
           return  res.status(400).json({
                message : "email or password required",
                success : false
            })
        }

        const user = await userModel.findOne({email})
        // console.log(user)
        if(!user){
            return   res.status(401).json({
                message : "user not found in database",
                success : false
            })
        }
        const isMatch = await  bcrypt.compare(password,user.password)
        console.log(isMatch)
        if(!isMatch){
           return  res.status(404).json({
                message: "Invalid credentials",
                success : false
            })
        }


        const token =   jwt.sign(
            {_id : user._id , email: user.email},
            process.env.JWT_SECRET,
            {expiresIn : "1h"}
        );
        res.status(200).json({
            message :  "login successfully",
            success : true,
            token : token
        })
        

    } catch (error) {
        res.status(501).json({
            message : "internal server error",
            data : error
        })
        console.log(error)
    }
}



module.exports = login