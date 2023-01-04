const express = require('express');

const controller = require('./userController');
const inputSanitor = require('./userValidator');
// const auth = require('../../middlewares/auth-middleware');

const router = express.Router();

/**
 * * Endpoint responsible for registering a user
 */
router.post(
  '/signup',
  inputSanitor.user,
  controller.signupAuth,
  controller.signupFirestore
);

/**
 * * Endpoint responsible for validating the login of a registered user
 */
router.post(
  '/signin',
  inputSanitor.profile,
  controller.signinAuth
  // controller.generateUserToken
);

/**
 * * Endpoint responsible for generating a password reset link
 * * from a registered user
 */
router.post(
  '/passwordReset',
  inputSanitor.profile,
  controller.generateUserPasswordResetLink
);

/**
 * * Endpoint responsible for generating a valid token for a registered user
 */
router.post('/token', controller.generateUserToken);

/**
 * * Endpoint responsible for obtaining the information of a registered user
 */
router.get(
  '/:uid',
  // auth.authMiddleware,
  inputSanitor.uid,
  controller.fetchUserFirestore
);

/**
 * * Endpoint responsible for modifying the information of a registered user
 */
router.post(
  '/:uid',
  // auth.authMiddleware,
  inputSanitor.uid,
  inputSanitor.profile,
  controller.updateUserAuth,
  controller.updateUserFirestore
);

module.exports = router;
