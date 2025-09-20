require("dotenv").config()
const express = require("express")
const app = express()
const Connection = require("./config/db") 
const userRouter = require("./routes/userRoute")
app.use(express.json());


PORT = process.env.PORT || 3000
app.get("/test", (req,res)=>{
    res.send("api is working")
})

app.use("/api",userRouter)

app.listen(PORT,()=>{
    console.log(`server is runnging on port ${PORT}`)
    Connection()
})