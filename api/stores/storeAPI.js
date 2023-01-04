const express = require('express');

const controller = require('./storeController');

const router = express.Router();

/**
 * * Endpoint responsible for obtaining and returning the information
 * * from the list of registered stores
 */
router.get('/', controller.getStores);

/**
 * * Endpoint responsible for obtaining and returning the information
 * * from a registered store
 */
router.get('/:id', controller.getStore);

module.exports = router;
