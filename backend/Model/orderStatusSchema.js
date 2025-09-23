const mongoose = require("mongoose")



const orderStatusSchema = new mongoose.Schema({
    collect_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "order",
        required: true
    },
    order_amount: {
        type: Number
    },
    transaction_amount :{
        type : Number
    },
    payment_mode : {
        type : String
    },
    payment_details :{
        type : String,
        enum: ["UPI", "Card", "NetBanking", "Wallet", "Cash"],
    },
    bank_reference : {
        type : String
    },
    payment_message :{
        type : String
    },
    status : {
        type: String,
        enum: ["pending", "processing", "paid", "failed", "cancelled", "completed"],
        default: "pending"
    },

    error_message :{
        type : String
    },
    payment_time :{
        type : Date,
        defauld: Date.now()
    }
})



const orderStatusModel = mongoose.model("orderStatus",orderStatusSchema)

module.exports = orderStatusModel