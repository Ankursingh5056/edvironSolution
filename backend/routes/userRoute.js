

const express = require("express")
// const {userData}  = require("../controller/userController")
const { userData, createUser } = require("../controller/userController")
const userRoute = express.Router()


// const userModel = require("../Model/userSchema")



userRoute.get("/userdetails",userData)
userRoute.post("/adddata",createUser)
// userRoute.get("/userdetails",async(req,res)=>{
//     try {
        
//      const data = await userModel.find()
//      if(!data){
//         res.send("data not found")
//      }
//      else{
//         res.send("congrats you get data")
//      }
//     } catch (error) {
//         console.log("Internal server error")
//     }
// })


module.exports = userRoute