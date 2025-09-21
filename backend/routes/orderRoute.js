const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const orderRoute = express.Router()

const {addOrder} = require("../controller/orderController")
orderRoute.post("/addorder", authMiddleware,addOrder)

module.exports = orderRoute