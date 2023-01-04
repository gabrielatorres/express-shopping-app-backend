/* eslint-disable consistent-return */
const firebase = require('../config/firebase/firebase-admin');

/**
 * *Función encargada de conectar con servicio de autenticación de firebase
 */
module.exports.authMiddleware = (req, res, next) => {
  const headerToken = req.headers.authorization;
  if (!headerToken)
    return res.status(401).send({ message: 'No token provided' });

  if (headerToken && headerToken.split(' ')[0] !== 'Bearer')
    return res.status(401).send({ message: 'Invalid token' });

  const token = headerToken.split(' ')[1];
  firebase
    .auth()
    .verifyIdToken(token)
    .then(() => next())
    // .catch((error) => res.send({ message: 'Could not authorize' }).status(403));
    .catch((error) => {
      return res.status(403).json({ message: error.message }) && next(error);
    });
};
