const storeDAL = require('./storeDAL');

/**
 * * Function responsible for obtaining the list of stores
 * @returns {Array} List of Store type objects
 */
module.exports.fetchStores = async () => {
  const stores = storeDAL.readStores();
  return stores;
};

/**
 * * Function responsible for obtaining store data
 * @param {String} id Unique store identifier in firebase
 * @returns {JSON} Store type object
 */
module.exports.fetchStore = async (id) => {
  const store = await storeDAL.readStore(id);

  if (!store) throw new Error('NOT_FOUND');

  return store;
};
