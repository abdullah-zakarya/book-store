const userController = require('../controller/userController');
const authController = require('./../controller/authController');
const saleConroller = require('./../controller/saleController');
const express = require('express');

const router = express.Router();

// for every one
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.post('/resetPassword/:token', authController.resetPassword);

// for lonin users
router.use(authController.isLogin);
router.patch('/updateMe', authController.updateMe);
router.delete('/deleteMe', authController.deleteMe);
router.patch('/updatePassword', authController.updatePassword);
router.get('/me', authController.showMe);
router.post('/me/buyAllFromCart', saleConroller.buyAllFromCart);
router.delete('/me/cleanCart', saleConroller.cleanCart);
router.delete('me/cart/:id', saleConroller.deleteFromCart);

// for admin
router.use(authController.restrictTo('admin'));
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
