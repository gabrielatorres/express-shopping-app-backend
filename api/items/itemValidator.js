/* eslint-disable consistent-return */
/* eslint-disable security/detect-non-literal-fs-filename */
const { param, validationResult } = require('express-validator');

/**
 * * Store id sanitization
 */
exports.storeId = [
  param('storeId')
    .exists({ checkNull: true })
    .withMessage('storeId is required and must not be null')
    .notEmpty()
    .withMessage('storeId must not be empty')
    .isString()
    .withMessage('storeId must be a string value')
    .trim(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ status: 'fail', errors: errors.array() });
    next();
  },
];

/**
 * * Store id and Item Code sanitization
 */
exports.store_itemCode = [
  param('itemCode')
    .exists({ checkNull: true })
    .withMessage('itemCode is required and must not be null')
    .notEmpty()
    .withMessage('itemCode must not be empty')
    .isString()
    .withMessage('itemCode must be a string value')
    .trim(),

  param('storeId')
    .exists({ checkNull: true })
    .withMessage('storeId is required and must not be null')
    .notEmpty()
    .withMessage('storeId must not be empty')
    .isString()
    .withMessage('storeId must be a string value')
    .trim(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ status: 'fail', errors: errors.array() });
    next();
  },
];
