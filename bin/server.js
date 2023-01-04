// const http = require('http');
// const https = require('https');
// const fs = require('fs');
const NODE_ENV = process.env.NODE_ENV || 'development';
require('dotenv').config({
  path: `./config/.env.${NODE_ENV}`,
});

const app = require('./app');

// Get port from environment and store in Express.
const port = process.env.PORT || 3000;
const host = process.env.HOST;
app.set('port', port);
app.set('host', host);
app.set('enviroment', NODE_ENV);
app.set('appName', 'Caja Movil API');
app.set('appVersion', '1.0.0');

// Create HTTP server.
// let server;
// let options;

// if (enviroment === 'development') {
//   server = http.createServer(app);
// } else {
//   const cert = fs.readFileSync;
//   options = {
//     key: cert(process.env.CERT_KEY).toString(),
//     cert: cert(process.env.CERT).toString(),
//   };
//   server = https.createServer(options, app);
// }

app.listen(port, host, () =>
  // eslint-disable-next-line
  console.log(`${app.get('appName')} ${NODE_ENV} started on port: ${host}:${port}`)
);
