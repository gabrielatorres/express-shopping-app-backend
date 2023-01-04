/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
// const morgan = require('morgan');
const firebase = require('../config/firebase/firebase-admin');

const app = express();

// #region Middlewares
// app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/cool', (req, res) => res.send(cool()));

// CORS
// eslint-disable-next-line consistent-return
app.use((req, res, next) => {
  // Inclusión de header en respuesta y Orígenes permitidos
  res.header('Access-Control-Allow-Origin', '*');
  // Headers permitidos para requests recibidos
  res.header('Access-Control-Allow-Headers', `Content-Type`);
  // Métodos HTTP permitidos
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST');
    return res.status(200).json({});
  }
  next();
});
// #endregion

// #region Routing

app.get('/', (req, res, next) => {
  res.status(200).send('OK');
  next();
});

const userAPI = require('../api/users/userAPI');
const itemAPI = require('../api/items/itemAPI');
const storeAPI = require('../api/stores/storeAPI');

app.use('/api/users', userAPI);
app.use('/api/items', itemAPI);
app.use('/api/stores', storeAPI);

// app.use('*', (req, res, next) => {
//   const err = new Error();
//   err.status = 404;
//   next(err);
// });

// app.use((err, req, res, next) => {
//   if (err.status === 404) {
//     const data = {
//       title: '404 Not Found',
//       content: 'Oops, page not found!',
//     };
//     res.send(err.status, data);
//   } else {
//     return next();
//   }
// });

// #endregion

module.exports = app;
