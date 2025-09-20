require("dotenv").config()
const express = require("express")
const Connection = require("./config/db") 


const app = express()


PORT = process.env.PORT || 3000
app.get("/test", (req,res)=>{
    res.send("api is working")
})



app.listen(PORT,()=>{
    console.log(`server is runnging on port ${PORT}`)
    Connection()
})