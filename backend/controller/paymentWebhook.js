const webhookModel = require("../Model/webHookSchema")
const orderModel = require("../Model/orderSchema")
const orderStatusModel = require("../Model/orderStatusSchema")

const paymentWebhook = async(req,res)=>{
    
    try {
        const orderId = req.body.order_id
        const order = await orderModel.findById(orderId)
        if(!order){
            return res.status(404).json({message : "order not found", success : false})
        }
        const newWebhook = new webhookModel({
            order_id : orderId || null ,
            payload : req.body,
            headers : req.headers
        });
        await newWebhook.save()

        await orderStatusModel.create({
      collect_id: orderId,
      order_amount: order.amount,
      transaction_amount: req.body.amount,
      payment_mode: req.body.payment_mode || "unknown",
      payment_details: req.body.payment_method || "UPI",
    //   bank_reference: req.body.payment_id || payment_id,
    //   payment_message: status === "success" ? "Payment successful" : "Payment failed",
    //   status: status === "success" ? "paid" : "failed",
      error_message: req.body.reason || null,
      payment_time: new Date(),
    });


        res.status(200).json({message : "webhook recieved and saved ", success : true})
    } catch (error) {
        console.log("Webhook error:", error);
    res.status(500).json({ message: "Internal Server Error" });
    }
}



module.exports = paymentWebhook