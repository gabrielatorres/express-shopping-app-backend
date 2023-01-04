const admin = require("firebase-admin");
// const credentials = require("./firebase_credentials.json");

const serviceAccount = JSON.parse(process.env.FIREBASE_CREDS);

admin.initializeApp({
  // credential: admin.credential.cert(credentials),
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB,
});

module.exports = admin;