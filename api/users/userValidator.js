/* eslint-disable consistent-return */
/* eslint-disable security/detect-non-literal-fs-filename */
const { body, param, validationResult } = require('express-validator');

/**
 * * Sanitización de usuario antes de inicio de registro
 */
exports.user = [
  body('phoneNumber')
    .exists({ checkNull: true })
    .withMessage('phoneNumber is required and must not be null')
    .notEmpty()
    .withMessage('phoneNumber must not be empty')
    .isString()
    .withMessage('phoneNumber must be a string value')
    .trim()
    // .isMobilePhone('any' /* , { strictMode: true } */)
    // .withMessage('phoneNumber must be a valid phone')
    .isLength({ min: 11, max: 15 })
    .withMessage('phoneNumber length must be between 11 and 15'), // E.164 International Rule

  body('firstName')
    .exists({ checkNull: true })
    .withMessage('firstName is required and must not be null')
    .notEmpty()
    .withMessage('firstName must not be empty')
    .isString()
    .withMessage('firstName must be a string value')
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage('phoneNumber length must be between 1 and 30'),

  body('lastName')
    .exists({ checkNull: true })
    .withMessage('lastName is required and must not be null')
    .notEmpty()
    .withMessage('lastName must not be empty')
    .isString()
    .withMessage('lastName must be a string value')
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage('lastName length must be between 1 and 30'),

  body('email')
    .exists({ checkNull: true })
    .withMessage('email is required and must not be null')
    .notEmpty()
    .withMessage('email must not be empty')
    .isString()
    .withMessage('email must be a string value')
    .trim()
    .isEmail()
    .normalizeEmail({ all_lowercase: true })
    .isLength({ min: 1, max: 250 })
    .withMessage('email length must be between 1 and 250'),

  body('id')
    .exists({ checkNull: true })
    .withMessage('id is required and must not be null')
    .notEmpty()
    .withMessage('id must not be empty')
    .isString()
    .withMessage('id must be a string value')
    .trim()
    .isLength({ min: 8, max: 8 })
    .withMessage('id length must be 8'),

  body('password', 'password is required and must be a length 6 valid value')
    .exists({ checkNull: true })
    .withMessage('password is required and must not be null')
    .notEmpty()
    .withMessage('password must not be empty')
    .isString()
    .withMessage('password must be a string value')
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      returnScore: true,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    })
    .withMessage(
      'password min length must be 6, almost contain 1 uppercase, 1 lowercase and 1 number'
    ),
  // .isLength({ min: 6, max: 6 }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ status: 'fail', errors: errors.array() });
    next();
  },
];

/**
 * * Store id sanitization
 */
exports.uid = [
  param('uid', 'uid is required and must be a valid value')
    // .exists({ checkNull: true })
    .default()
    .notEmpty()
    .isString()
    .trim(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ status: 'fail', errors: errors.array() });
    next();
  },
];

/**
 * * Profile Data sanitization
 */
exports.profile = [
  body('phoneNumber')
    .optional(true)
    .isString()
    .withMessage('phoneNumber must be a string value')
    .trim()
    // .isMobilePhone('any' /* , { strictMode: true } */)
    // .withMessage('phoneNumber must be a valid phone')
    .isLength({ min: 11, max: 15 })
    .withMessage('phoneNumber length must be between 11 and 15'), // E.164 International Rule

  body('email', 'email is required and must be a valid value')
    .optional(true)
    .isString()
    .trim()
    .isEmail()
    .normalizeEmail({ all_lowercase: true })
    .isLength({ min: 0, max: 250 }),

  body('password', 'password is required and must be a length 6 valid value')
    .optional(true)
    .isString()
    .withMessage('password must be a string value')
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      returnScore: true,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    })
    .withMessage(
      'password min length must be 6, almost contain 1 uppercase, 1 lowercase and 1 number'
    ),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ status: 'fail', errors: errors.array() });
    next();
  },
];
