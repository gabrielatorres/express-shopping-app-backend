const express = require('express');

const controller = require('./itemController');
const inputSanitor = require('./itemValidator');

const router = express.Router();

/**
 * * Endpoint responsible for obtaining and returning the information
 * * of all store's items
 */
router.get('/storeId/:storeId', inputSanitor.storeId, controller.getStoreItems);

/**
 * * Endpoint responsible for obtaining and returning the information
 * * of a store's item
 */
router.get(
  '/code/:itemCode/storeId/:storeId',
  inputSanitor.store_itemCode,
  controller.getStoreItem
);

module.exports = router;
