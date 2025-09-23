const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const orderRoute = express.Router()

const {addOrder, getAllOrder, getOrderById, deleteOrder} = require("../controller/orderController")
const paymentWebhook = require("../controller/paymentWebhook")




orderRoute.post("/addorder", authMiddleware,addOrder)
orderRoute.get("/allorder", authMiddleware,getAllOrder)
orderRoute.post("/webhook", authMiddleware,paymentWebhook)
orderRoute.get("/order/:id", authMiddleware,getOrderById)
orderRoute.delete("/order/:id", authMiddleware,deleteOrder)

module.exports = orderRoute