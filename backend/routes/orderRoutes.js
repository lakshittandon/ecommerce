const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const { newOrder,myOrders,getSingleOrder, getAllOrders, updateOrder, deleteOrder } = require('../controller/orderController');
const { get } = require('mongoose');



router.route('/order/new').post(isAuthenticatedUser,newOrder)
router.route('/order/:id').get(isAuthenticatedUser,authorizeRoles("admin"),getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser,myOrders);
router.route('/admin/orders').get(isAuthenticatedUser,authorizeRoles("admin"),getAllOrders);
router.route('/admin/orders/:id').get(isAuthenticatedUser,authorizeRoles("admin"),updateOrder).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteOrder);

module.exports = router ;