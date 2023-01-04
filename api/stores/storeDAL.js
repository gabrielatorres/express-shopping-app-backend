const admin = require('firebase-admin');

const db = admin.firestore();

/**
 * * Query to read the stores data in Firestore
 * @returns {Array} List of Stores
 */
module.exports.readStores = async () => {
  // Create a reference to the stores collection
  const storesRef = db.collection('stores');

  // Create a query against the collections
  const stores = await storesRef.get();

  // Array to save the list of recovered stores
  const arr = [];
  stores.forEach((doc) => {
    const data = doc.data();
    // Attach the unique ID of the store
    data.uid = doc.id;
    arr.push(data);
  });

  return arr;
};

/**
 * * Query to read the store data
 * @param {String} storeId Unique store identifier in firebase
 * @returns {JSON} Store object
 */
module.exports.readStore = async (storeId) => {
  // Create a reference to the stores collection
  const storeRef = db.collection('stores').doc(storeId);

  // Create a query against the collections
  const store = await storeRef.get();

  return store.data();
};
