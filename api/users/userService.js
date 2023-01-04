const axios = require('axios');
const userDAL = require('./userDAL');

/**
 * * Function responsible for validating user login
 * @param {String} email User email
 * @param {String} password User password
 * @returns {JSON} payload with user data and customToken for login
 */
module.exports.signinUser = async (email, password) => {
  const config = {
    method: 'post',
    url: `${process.env.FIREBASE_API_URL}${process.env.FIREBASE_APIKEY}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({ email, password }),
  };

  // Call to Firebase API for Authentication Process
  const uid = await axios(config)
    .then((response) => {
      const { localId } = response.data;
      return localId;
    })
    .catch((error) => {
      throw error.response.data.error;
    });

  const token = await this.tokenAuth(uid);
  const user = await userDAL.readUserFirestore(uid);
  user.uid = uid;

  const payload = {
    user,
    token,
  };

  return payload;
};

/**
 * * Function responsible for creating a user in Firebase Auth
 * @param {String} firstName User First Name
 * @param {String} lastName User Last Name
 * @param {String} email User Email
 * @param {String} password User password
 * @returns {String} User Unique Id
 */
module.exports.signupUserAuth = async (
  firstName,
  lastName,
  email,
  password
) => {
  const uid = userDAL.createUserAuth(firstName, lastName, email, password);
  return uid;
};

/**
 * * Function responsible for creating a user in firestore
 * @param {String} phoneNumber User phone number
 * @param {String} firstName User First Name
 * @param {String} lastName User Last Name
 * @param {String} email User Email
 * @param {String} id User National Identification Number
 * @param {String} uid User Unique Id in Firebase Auth
 * @returns {JSON} payload with user data and customToken for login
 */
module.exports.signupUserFirestore = async (
  phoneNumber,
  firstName,
  lastName,
  email,
  id,
  uid
) => {
  await userDAL.createUserFirestore(
    phoneNumber,
    firstName,
    lastName,
    email,
    id,
    uid
  );

  const token = await this.tokenAuth(uid);

  const payload = {
    user: {
      phoneNumber,
      firstName,
      lastName,
      email,
      id,
      uid,
    },
    token,
  };

  return payload;
};

/**
 * * Function responsible for generating an user auth token
 * @param {String} uid User Unique Id in Firebase Auth
 * @returns {String} Unique Auth token
 */
module.exports.tokenAuth = async (uid) => {
  const token = userDAL.createFirebaseToken(uid);
  return token;
};

/**
 * * Function responsible for generating a user reset password link
 * @param {String} email User Email
 * @returns {String} emailLink
 */
module.exports.resetPasswordAuth = async (email) => {
  const resetLink = userDAL.createPasswordResetLink(email);
  return resetLink;
};

/**
 * * Function responsible for obtaining Firestore user data
 * @param {String} uid User Unique Id in Firebase Auth
 * @returns {String} Firestore user data
 */
module.exports.getUserFirestore = async (uid) => {
  const userData = userDAL.readUserFirestore(uid);
  return userData;
};

/**
 * * Function responsible for updating AUTH user data
 * @param {String} uid User Unique Id in Firebase Auth
 * @returns {JSON} Firestore user data
 */
module.exports.setUserAuth = async (uid, email, password) => {
  const userData = userDAL.updateUserAuth(uid, email, password);
  return userData;
};

/**
 * * Function responsible for updating Firestore user data
 * @param {String} uid User Unique Id in Firebase Auth
 * @returns {Object} Timestamp of update
 */
module.exports.setUserFirestore = async (uid, email, password) => {
  const userData = userDAL.updateUserFirestore(uid, email, password);
  return userData;
};
