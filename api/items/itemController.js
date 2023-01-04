const itemService = require('./itemService');

/**
 * * Function responsible for obtaining all items from a store
 */
module.exports.getStoreItems = async (req, res, next) => {
  const { storeId } = req.params;

  await itemService
    .getStoreItemsData(storeId)
    .then((payload) => {
      return res.status(200).json({
        status: 'success',
        message: 'Items',
        data: { item: payload },
      });
    })
    .catch((error) => {
      let statusCode = 500;
      let status = 'error';
      switch (error.message) {
        case 'NOT_FOUND':
          statusCode = 404;
          status = 'fail';
          break;

        default:
          break;
      }

      return (
        res
          .status(statusCode)
          .send({ status, message: error.message, data: {} }) && next(error)
      );
    });
};

/**
 * * Function responsible for obtaining an item from a store
 */
module.exports.getStoreItem = async (req, res, next) => {
  const { storeId, itemCode } = req.params;

  await itemService
    .getItemData(storeId, itemCode)
    .then((payload) => {
      return res.status(200).json({
        status: 'success',
        message: 'Item',
        data: { item: payload },
      });
    })
    .catch((error) => {
      let statusCode = 500;
      let status = 'error';
      switch (error.message) {
        case 'NOT_FOUND':
          statusCode = 404;
          status = 'fail';
          break;

        default:
          break;
      }

      return (
        res
          .status(statusCode)
          .send({ status, message: error.message, data: {} }) && next(error)
      );
    });
};
