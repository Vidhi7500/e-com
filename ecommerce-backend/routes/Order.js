const express = require('express');
const { createOrder, updateOrder, fetchOrdersByUser, deleteOrder, fetchAllOrders } = require('../controller/Order');

const router = express.Router();

router
  .post("/", createOrder)
  .get("/own/", fetchOrdersByUser)
  .delete("/:id", deleteOrder)
  .patch("/:id", updateOrder)
  .get('/', fetchAllOrders)

exports.router = router;