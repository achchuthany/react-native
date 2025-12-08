const { body } = require("express-validator");

/**
 * Validation rules for user registration
 */
const registerValidation = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail()
    .trim(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .trim(),
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 255 })
    .withMessage("Name must be between 2 and 255 characters")
    .trim(),
];

/**
 * Validation rules for user login
 */
const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail()
    .trim(),
  body("password").notEmpty().withMessage("Password is required").trim(),
];

/**
 * Validation rules for profile update
 */
const updateProfileValidation = [
  body("name")
    .optional()
    .isLength({ min: 2, max: 255 })
    .withMessage("Name must be between 2 and 255 characters")
    .trim(),
];

/**
 * Validation rules for creating expense
 */
const createExpenseValidation = [
  body("amount")
    .isFloat({ min: 0.01, max: 99999999.99 })
    .withMessage("Amount must be a positive number with max 2 decimal places")
    .toFloat(),
  body("category")
    .isIn([
      "food",
      "transport",
      "shopping",
      "bills",
      "entertainment",
      "health",
      "other",
    ])
    .withMessage(
      "Invalid category. Must be one of: food, transport, shopping, bills, entertainment, health, other"
    ),
  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description must not exceed 500 characters")
    .trim(),
  body("date")
    .isDate()
    .withMessage("Invalid date format. Use YYYY-MM-DD")
    .custom((value) => {
      const inputDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (inputDate > today) {
        throw new Error("Date cannot be in the future");
      }
      return true;
    }),
];

/**
 * Validation rules for updating expense
 */
const updateExpenseValidation = [
  body("amount")
    .optional()
    .isFloat({ min: 0.01, max: 99999999.99 })
    .withMessage("Amount must be a positive number with max 2 decimal places")
    .toFloat(),
  body("category")
    .optional()
    .isIn([
      "food",
      "transport",
      "shopping",
      "bills",
      "entertainment",
      "health",
      "other",
    ])
    .withMessage(
      "Invalid category. Must be one of: food, transport, shopping, bills, entertainment, health, other"
    ),
  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description must not exceed 500 characters")
    .trim(),
  body("date")
    .optional()
    .isDate()
    .withMessage("Invalid date format. Use YYYY-MM-DD")
    .custom((value) => {
      if (value) {
        const inputDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (inputDate > today) {
          throw new Error("Date cannot be in the future");
        }
      }
      return true;
    }),
];

module.exports = {
  registerValidation,
  loginValidation,
  updateProfileValidation,
  createExpenseValidation,
  updateExpenseValidation,
};
