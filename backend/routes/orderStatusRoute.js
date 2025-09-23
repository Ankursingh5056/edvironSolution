const express = require("express");
const { updateOrderStatus, getOrderStatus } = require("../controller/orderStatusController");
const orderStatus = express.Router();

// Create/Update status
orderStatus.post("/orderstatus", updateOrderStatus);

// Get status by orderId
orderStatus.get("/:orderId", getOrderStatus);

module.exports = orderStatus;
