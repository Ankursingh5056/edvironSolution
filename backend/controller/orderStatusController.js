const orderStatusModel = require("../Model/orderStatusSchema");

// 1. Create / Update Order Status
const updateOrderStatus = async (req, res) => {
  try {
    const {
      collect_id,
      order_amount,
      transaction_amount,
      payment_mode,
      payment_details,
      bank_reference,
      payment_message,
      status,
      error_message
    } = req.body;

    // Check if already status exists for this order
    let orderStatus = await orderStatusModel.findOne({ collect_id });

    if (orderStatus) {
      // update existing
      orderStatus.transaction_amount = transaction_amount || orderStatus.transaction_amount;
      orderStatus.payment_mode = payment_mode || orderStatus.payment_mode;
      orderStatus.payment_details = payment_details || orderStatus.payment_details;
      orderStatus.bank_reference = bank_reference || orderStatus.bank_reference;
      orderStatus.payment_message = payment_message || orderStatus.payment_message;
      orderStatus.status = status || orderStatus.status;
      orderStatus.error_message = error_message || orderStatus.error_message;
      orderStatus.payment_time = new Date();

      await orderStatus.save();
      return res.status(200).json({
        message: "Order status updated successfully",
        success: true,
        data: orderStatus,
      });
    }

    // create new status record
    const newOrderStatus = new orderStatusModel({
      collect_id,
      order_amount,
      transaction_amount,
      payment_mode,
      payment_details,
      bank_reference,
      payment_message,
      status,
      error_message,
      payment_time: new Date()
    });

    await newOrderStatus.save();

    res.status(201).json({
      message: "Order status created successfully",
      success: true,
      data: newOrderStatus,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// 2. Get Order Status by Order ID
const getOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const status = await orderStatusModel.findOne({ collect_id: orderId }).populate("collect_id");
    if (!status) {
      return res.status(404).json({ message: "Order status not found", success: false });
    }

    res.status(200).json({
      message: "Order status fetched successfully",
      success: true,
      data: status,
    });
  } catch (error) {
    console.error("Error fetching order status:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

module.exports = { updateOrderStatus, getOrderStatus };
