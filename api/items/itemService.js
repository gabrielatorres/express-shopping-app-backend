const itemDAL = require('./itemDAL');

/**
 * * Function responsible of obtaining the data of all the items from a store
 * @param {String} storeId Unique store identifier in firebase
 * @returns {Array} Items Array
 */
module.exports.getStoreItemsData = async (storeId) => {
  const items = await itemDAL.readStoreItemsFirestore(storeId);
  const exchangeRate = await itemDAL.readExchangeRateFirestore(storeId);

  const list = items.map((x) => {
    x.localPrice = parseFloat((x.price * exchangeRate).toFixed(2));
    return x;
  });

  return list;
};

/**
 * * Function responsible of obtaining the data of an item from a store
 * @param {String} storeId Unique store identifier in firebase
 * @param {String} itemCode Item identifier in store
 * @returns {Object} Item JSON
 */
module.exports.getItemData = async (storeId, itemCode) => {
  const item = await itemDAL.readStoreItemFirestore(storeId, itemCode);
  const exchangeRate = await itemDAL.readExchangeRateFirestore(storeId);

  item.localPrice = parseFloat((item.price * exchangeRate).toFixed(2));

  return item;
};
