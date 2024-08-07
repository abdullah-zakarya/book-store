const userController = require('../controller/userController');
const authController = require('./../controller/authController');
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
