const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    school_id : {
        type: String
    },

    trustee_id : {
        type : String
    },
    student_info : {
        name : {
            type : String,
            id : String,
            email : String
        }
    },

    gateway_name : {
        type : String
    }


    


})



const orderModel = mongoose.model("order",orderSchema)

module.exports = orderModel