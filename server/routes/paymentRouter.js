const {
  orderCreate,
  verifyPayment,
} = require('../controller/paymentController');

const router = require('express').Router();

router.post('/orders', orderCreate);

router.post('/verifyPayment', verifyPayment);
//routes for payment
module.exports = router;
