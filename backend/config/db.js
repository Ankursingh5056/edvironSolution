const mongoose = require("mongoose")
// require("dotenv").config()
const mongoUri = process.env.MONGO_URI
console.log(mongoUri)
async function ConnectionDB(){
try {
   await  mongoose.connect(mongoUri)
    console.log("database connected successfully")
} catch (error) {
    console.log("not able to connet DB",error)
}
}


module.exports = ConnectionDB