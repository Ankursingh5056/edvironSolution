const mongoose = require("mongoose")



const webhookSchema = new mongoose.Schema({
    order_id: {
        type : mongoose.Schema.Types.ObjectId, ref :"order"
    },
    payload : 
    {
        type : Object
    },
    headers: 
    {
        type : Object
    },
    receivedAt:{
        type : Date,
        default: Date.now
    }
})


const webhookModel = mongoose.model("webhook",webhookSchema)
module.exports = webhookModel