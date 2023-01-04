const storeService = require('./storeService');

/**
 * * Function responsible for obtaining the list of stores
 * * registered in the system
 */
module.exports.getStores = async (req, res, next) => {
  await storeService
    .fetchStores()
    .then((payload) => {
      return res.status(200).json({
        status: 'success',
        message: 'Stores',
        data: { stores: payload },
      });
    })
    .catch((error) => {
      return (
        res
          .status(500)
          .send({ status: 'error', message: error.message, data: {} }) &&
        next(error)
      );
    });
};

/**
 * * Function responsible for obtaining the information of a store
 */
module.exports.getStore = async (req, res, next) => {
  const { id } = req.params;

  await storeService
    .fetchStore(id)
    .then((payload) => {
      return res.status(200).json({
        status: 'success',
        message: 'Store',
        data: { store: payload },
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

        // case 'EMAIL_NOT_FOUND':
        //   statusCode = 404;
        //   status = 'fail';
        //   break;

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
