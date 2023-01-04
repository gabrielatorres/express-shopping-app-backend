const { request, response } = require('express');
const userService = require('./userService');

/**
 * * Responsible for managing the verification of a user for login
 */
module.exports.signinAuth = async (req = request, res = response, next) => {
  const { email, password } = req.body;

  await userService
    .signinUser(email, password)
    .then((payload) => {
      return res.status(200).json({
        status: 'success',
        message: 'User logged in successfully',
        data: { user: payload.user, token: payload.token },
      });
    })
    .catch((error) => {
      let statusCode = 500;
      let status = 'error';
      switch (error.message) {
        case 'INVALID_PASSWORD':
          statusCode = 401;
          status = 'fail';
          break;

        case 'EMAIL_NOT_FOUND':
          statusCode = 404;
          status = 'fail';
          break;

        default:
          break;
      }

      return (
        res
          .status(statusCode)
          .send({ status, message: error.message, data: {} }) && next(error)
      );
    });
};

/**
 * * Responsible for managing data and responses when registering a user's
 * * authentication data in firebase
 */
module.exports.signupAuth = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  await userService
    .signupUserAuth(firstName, lastName, email, password)
    .then((userRecord) => {
      req.body.uid = userRecord;
      // return res.status(200).json(userRecord);
      next();
    })
    .catch((error) => {
      let statusCode = 500;
      let status = 'error';
      switch (error.code) {
        case 'auth/email-already-exists':
        case 'auth/phone-number-already-exists':
          statusCode = 409;
          status = 'fail';
          break;

        default:
          break;
      }

      return (
        res
          .status(statusCode)
          .send({ status, message: error.message, data: {} }) && next(error)
      );
    });
};

/**
 * * Responsible for managing data and responses when registering a user's
 * * data in firestore
 */
module.exports.signupFirestore = async (req, res, next) => {
  const { phoneNumber, firstName, lastName, email, id, uid } = req.body;

  await userService
    .signupUserFirestore(phoneNumber, firstName, lastName, email, id, uid)
    .then((payload) => {
      return res.status(201).json({
        status: 'success',
        message: 'User created successfully',
        data: { user: payload.user, token: payload.token },
      });
    })
    .catch((error) => {
      return (
        res
          .status(500)
          .send({ status: 'error', message: error.message, data: {} }) &&
        next(error)
      );
    });
};

/**
 * * Responsible for managing the generation and return of
 * * a user token in firebase for auth processes
 */
module.exports.generateUserToken = async (req, res, next) => {
  const { uid } = req.body;

  await userService
    .tokenAuth(uid)
    .then((token) => {
      return res.status(200).send({
        status: 'success',
        message: 'Custom Token created successfully',
        data: { token },
      });
    })
    .catch((error) => {
      return (
        res
          .status(500)
          .send({ status: 'error', message: error.message, data: {} }) &&
        next(error)
      );
    });
};

/**
 * * Responsible for managing the generation and return of
 * * a link to restore user password in firebase
 */
module.exports.generateUserPasswordResetLink = async (req, res, next) => {
  const { email } = req.body;

  await userService
    .resetPasswordAuth(email)
    .then((resetLink) => {
      return res.status(200).send({
        status: 'success',
        message: 'Reset Link created successfully',
        data: { resetLink },
      });
    })
    .catch((error) => {
      let statusCode = 500;
      let status = 'error';
      switch (error.code) {
        case 'auth/email-not-found':
          statusCode = 409;
          status = 'fail';
          break;

        default:
          break;
      }

      return (
        res
          .status(statusCode)
          .send({ status, message: error.message, data: {} }) && next(error)
      );
    });
};

/**
 * * Responsible for managing and returning the information of a user
 * * registered in Firestore
 */
module.exports.fetchUserFirestore = async (req, res, next) => {
  const { uid } = req.params;

  await userService
    .getUserFirestore(uid)
    .then((payload) => {
      return res.status(200).json({
        status: 'success',
        message: 'User',
        data: { user: payload },
      });
    })
    .catch((error) => {
      let statusCode = 500;
      let status = 'error';
      switch (error.code) {
        case 'users/user-not-found':
          statusCode = 404;
          status = 'fail';
          break;

        default:
          break;
      }

      return (
        res
          .status(statusCode)
          .send({ status, message: error.message, data: {} }) && next(error)
      );
    });
};

/**
 * * Responsible for managing the updating user AUTH data
 */
module.exports.updateUserAuth = async (req, res, next) => {
  const { uid } = req.params;
  const { email, password } = req.body;

  await userService
    .setUserAuth(uid, email, password)
    .then(() => {
      next();
    })
    .catch((error) => {
      let statusCode = 500;
      let status = 'error';
      switch (error.code) {
        case 'users/user-not-found':
        case 'auth/user-not-found':
          statusCode = 404;
          status = 'fail';
          break;

        default:
          break;
      }
      return (
        res
          .status(statusCode)
          .send({ status, message: error.message, data: {} }) && next(error)
      );
    });
};

/**
 * * Responsible for managing the update of user data on Firestore
 */
module.exports.updateUserFirestore = async (req, res, next) => {
  const { uid } = req.params;
  const { phoneNumber, email } = req.body;

  await userService
    .setUserFirestore(uid, phoneNumber, email)
    .then(() => {
      return res.status(201).json({
        status: 'success',
        message: 'User has been updated Successfully',
        data: {},
      });
    })
    .catch((error) => {
      let statusCode = 500;
      let status = 'error';
      switch (error.code) {
        case 'users/user-not-found':
          statusCode = 404;
          status = 'fail';
          break;

        default:
          break;
      }

      return (
        res
          .status(statusCode)
          .send({ status, message: error.message, data: {} }) && next(error)
      );
    });
};
