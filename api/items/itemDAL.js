const admin = require('firebase-admin');

const db = admin.firestore();

/**
 * * Query to read the data of all the items of a store in Firestore
 * @param {String} storeId Unique store identifier in firebase
 * @returns {Array} Registered Items
 */
module.exports.readStoreItemsFirestore = async (storeId) => {
  // Create a reference to the items collection
  const itemsRef = db.collection('items');

  // Create a query against the collection
  const items = await itemsRef.where('storeId', '==', storeId).get();

  if (items.empty) throw new Error('NOT_FOUND'); // No matching documents
  const arr = [];
  items.forEach((doc) => {
    arr.push(doc.data());
  });

  return arr;
};

/**
 * * Query to read item data in Firestore
 * @param {String} itemCode Item identifier in store
 * @param {String} storeId Unique store identifier in firebase
 * @returns {Object} Registered Item
 */
module.exports.readStoreItemFirestore = async (storeId, itemCode) => {
  // Create a reference to the items collection
  const itemsRef = db.collection('items');

  // Create a query against the collection
  const items = await itemsRef
    .where('code', '==', itemCode)
    .where('storeId', '==', storeId)
    .get();

  if (items.empty) throw new Error('NOT_FOUND'); // No matching documents
  let item;
  items.forEach((doc) => {
    item = doc.data();
  });

  return item;
};

/**
 * * Query to read the exchange rate of a store in Firestore
 * @param {String} storeId Unique store identifier in firebase
 * @returns {Number} Registered Local Exchange Rate Value
 */
module.exports.readExchangeRateFirestore = async (storeId) => {
  // Create a reference to the items collection
  const exchangeRef = db.collection('exchange-rate');

  // Create a query against the collection
  const data = await exchangeRef.where('storeId', '==', storeId).get();

  if (data.empty) throw new Error('NOT_FOUND'); // No matching documents
  let exchangeRate;
  data.forEach((doc) => {
    exchangeRate = doc.data();
  });

  return exchangeRate.rate;
};
