const admin = require('firebase-admin');

const db = admin.firestore();

// #region Firestore
/**
 * * Query to create a new user in Firestore
 * @param {String} phoneNumber User phone number
 * @param {String} firstName User First Name
 * @param {String} lastName User Last Name
 * @param {String} email User Email
 * @param {String} id User National Identification Number
 * @param {String} uid User Unique Id in Firebase Auth
 * @returns {JSON} User
 */
module.exports.createUserFirestore = async (
  phoneNumber,
  firstName,
  lastName,
  email,
  id,
  uid
) => {
  const user = db.collection('users').doc(uid);

  const response = await user
    .set(
      {
        id,
        phoneNumber,
        firstName,
        lastName,
        email,
      },
      { merge: true }
    )
    .catch((error) => {
      throw error;
    });

  return response;
};

/**
 * * Query to read a user's data in Firestore
 * @param {String} uid User Unique Id in Firebase Auth
 * @returns {JSON} User
 */
module.exports.readUserFirestore = async (uid) => {
  const userRef = await db.collection('users').doc(uid);
  const user = await userRef
    .get()
    .then((doc) => {
      if (doc.exists) return doc.data();

      const error = {
        code: 'users/user-not-found',
        message: 'NOT_FOUND',
      };
      throw error;
    })
    .catch((error) => {
      throw error;
    });

  return user;
};

/**
 * * Query to update a user's data in Firestore
 * @param {String} uid User Unique Id in Firebase Auth
 * @returns {JSON} User
 */
module.exports.updateUserFirestore = async (uid, phoneNumber, email) => {
  const userRef = await db.collection('users').doc(uid);

  if (phoneNumber)
    userRef.update({ phoneNumber }).catch((error) => {
      throw error;
    });

  if (email)
    await userRef.update({ email }).catch((error) => {
      throw error;
    });

  return uid;
};

// #endregion

// #region AUTH

/**
 * * Query to create a new Auth user
 * @param {String} firstName User First Name
 * @param {String} lastName User Last Name
 * @param {String} email User Email
 * @param {String} password User password
 * @returns {String} User Unique Id in Firebase Auth
 */
module.exports.createUserAuth = async (
  firstName,
  lastName,
  email,
  password
) => {
  const response = await admin
    .auth()
    .createUser({
      email,
      emailVerified: false,
      password,
      displayName: `${firstName} ${lastName}`,
      disabled: false,
    })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      return userRecord.uid;
    })
    .catch((error) => {
      throw error;
    });

  return response;
};

/**
 * * Query to generate a valid JWT for user sessions
 * @param {String} uid User Unique Id in Firebase Auth
 * @returns {JSON} JWT
 */
module.exports.createFirebaseToken = async (uid) => {
  const response = await admin
    .auth()
    .createCustomToken(uid)
    .then((token) => {
      // See the token reference doc for the contents of userRecord.
      return token;
    })
    .catch((error) => {
      throw error;
    });

  return response;
};

/**
 * * Query to generate a valid link to restart the user password
 * @param {String} email User email
 * @returns {String} Reset password link
 */
module.exports.createPasswordResetLink = async (email) => {
  const response = await admin
    .auth()
    .generatePasswordResetLink(email)
    .then((resetLink) => {
      // See the token reference doc for the contents of userRecord.
      return resetLink;
    })
    .catch((error) => {
      throw error;
    });

  return response;
};

/**
 * * Query to retrieve user data by unique identifier
 * @param {String} uid User Unique Id in Firebase Auth
 * @returns {JSON} User
 */
module.exports.readUserByUid = async (uid) => {
  const response = await admin
    .auth()
    .getUser(uid)
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      return userRecord.toJSON();
    })
    .catch((error) => {
      throw error;
    });

  return response;
};

/**
 * * Query to retrieve user data by email
 * @param {String} email User email
 * @returns {JSON} User
 */
module.exports.readUserByEmail = async (email) => {
  const response = await admin
    .auth()
    .getUserByEmail(email)
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      return userRecord.toJSON();
    })
    .catch((error) => {
      throw error;
    });

  return response;
};

/**
 * * Query to modify the data of a registered user
 * @param {String} uid User Unique Id in Firebase Auth
 * @param {String} email User email
 * @param {String} password User password
 * @returns {JSON} User
 */
module.exports.updateUserAuth = async (uid, email, password) => {
  const response = await admin
    .auth()
    .updateUser(uid, {
      email,
      password,
      disabled: false,
    })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      return userRecord.uid;
    })
    .catch((error) => {
      throw error;
    });

  return response;
};

/**
 * * Query to delete a user
 * @param {String} uid User Unique Id in Firebase Auth
 * @returns {Boolean} Confirmation
 */
module.exports.deleteUser = async (uid) => {
  const response = await admin
    .auth()
    .deleteUser(uid)
    .then(() => {
      return true;
    })
    .catch((error) => {
      throw error;
    });

  return response;
};

// #endregion
