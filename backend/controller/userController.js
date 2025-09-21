const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const userModel = require("../Model/userSchema")
const userData = async(req,res)=>{
    try {
        
     const data = await userModel.find()
     console.log(data)
     if(data.length === 0){
        res.send("data not found")
     }
     
    res.json({
        message : "your data records",
        data : data,
        success : true

    })

   
    } catch (error) {
        console.log("Internal server error")
    }
}


const createUser = async(req,res)=>{
    try {
     const {name,email,password,role} = req.body
    if(!name || !email || ! password || !role){
        res.status(404).json({
            message:"all fileds are required password should me more than 7 character"
        })
    }
    const existingData = await userModel.findOne({email})
    if(existingData){
        res.status(404).json({
            message : "user is already created please login",
            success: false
        })
    }
    const hasPassword = await bcrypt.hash(password,10)
    const data = new userModel({
        name,
        email,
        password : hasPassword, 
        role 
    })
    
    await data.save()

    res.status(201).json({
        message : "user created successfully",
        data : data,
        success: true
    })

    } catch (error) {
       res.status(500).json({
        message : " internal server error",
        data : error
       })
    }
   
} 


module.exports = { userData,createUser}