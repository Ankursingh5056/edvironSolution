const orderModel = require("../Model/orderSchema")
const addOrder = async(req,res)=>{
    try {
        const user_id = req.user._id;
        const {school_id,trustee_id,student_info, gateway_name } = req.body
        if( !school_id || !trustee_id || !student_info || !gateway_name){
            res.status(404).json({
                message: "all fileds are required",
                success : false
            })
        }

        const newData = new orderModel({user_id,school_id,trustee_id,student_info, gateway_name})
        await newData.save()
        res.status(201).json({
            message : "order created successfully",
            data : newData
        })
    } catch (error) {
        res.status(501).json({
            message: "internal server error",
            error : error
        })
    }
}

module.exports = {addOrder}