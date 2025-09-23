const orderModel = require("../Model/orderSchema");

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


const getAllOrder = async(req,res)=>{
    try {
        const data = await orderModel.find()
        if(data.length ===0){
            return res.status(404).json({
                message : "no order data  found in Db",
                success : false,
            })
        }
        res.status(200).json({
            message : "all order details",
            data : data
        })
    } catch (error) {
        console.log(error)
        res.status(501).json({message: "internal server error"})
    }
}

const getOrderById = async(req,res)=>{
    try {
        const id = req.params.id
        const user = await orderModel.findById(id).lean()
        if(!user){
           return  res.status(404).json({
                message : "order not found",
                success : false
            })
        }
        // res.send(user)

        res.status(200).json({
            message : "order data found by id",
            success : true,
            data : user
        })
    } catch (error) {
        console.log("error in order find by id ",error)
        res.status(404).json({mesaage : "internal server error "})
    }
}

deleteOrder = async(req,res)=>{
    try {
        const id = req.params.id;
        const order = await orderModel.find({id})
       
        if(order.length ===0){
           return  res.status(404).json({
                message : "order not found",
                success : false
            })
        }
        await orderModel.findByIdAndDelete(id)
        res.send("data delete successfully")
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "internal server error not able to delete data  "
        })
    }
}




module.exports = {addOrder , getAllOrder,getOrderById,deleteOrder}