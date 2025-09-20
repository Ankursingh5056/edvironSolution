const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
   id :{},
   name:{
    type : String
   },
   
   email : {
    type: String,
    required : true,
    unique : true,
    trim : true,
    lowercase: true
   },

   password : {
    type : String ,
    required : true,
    minlength: 8
   },
   role :{
    type : String,
    enum: ["admin", "school", "trustee"],
    default : "school"
   }
},{timestamps:true})


const userModel = mongoose.model("user",userSchema)


module.exports = userModel