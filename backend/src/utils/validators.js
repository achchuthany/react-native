const { body, query, param } = require("express-validator");

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
      "Invalid category. Must be one of: food, transport, shopping, bills, entertainment, health, other",
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
      "Invalid category. Must be one of: food, transport, shopping, bills, entertainment, health, other",
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

/**
 * Validation rules for creating post
 */
const createPostValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Title must be between 3 and 200 characters")
    .trim(),
  body("content")
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ min: 3, max: 5000 })
    .withMessage("Content must be between 3 and 5000 characters")
    .trim(),
];

/**
 * Validation rules for listing posts
 */
const listPostsValidation = [
  query("userId")
    .optional()
    .isUUID()
    .withMessage("userId must be a valid UUID"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("page must be a positive integer")
    .toInt(),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("limit must be an integer between 1 and 100")
    .toInt(),
];

/**
 * Validation rules for creating comment
 */
const createCommentValidation = [
  param("postId").isUUID().withMessage("postId must be a valid UUID"),
  body("content")
    .notEmpty()
    .withMessage("Comment content is required")
    .isLength({ min: 1, max: 2000 })
    .withMessage("Comment content must be between 1 and 2000 characters")
    .trim(),
];

/**
 * Validation rules for updating post
 */
const updatePostValidation = [
  param("postId").isUUID().withMessage("postId must be a valid UUID"),
  body("title")
    .optional()
    .isLength({ min: 3, max: 200 })
    .withMessage("Title must be between 3 and 200 characters")
    .trim(),
  body("content")
    .optional()
    .isLength({ min: 3, max: 5000 })
    .withMessage("Content must be between 3 and 5000 characters")
    .trim(),
];

/**
 * Validation rules for deleting post
 */
const deletePostValidation = [
  param("postId").isUUID().withMessage("postId must be a valid UUID"),
];

/**
 * Validation rules for updating comment
 */
const updateCommentValidation = [
  param("postId").isUUID().withMessage("postId must be a valid UUID"),
  param("commentId").isUUID().withMessage("commentId must be a valid UUID"),
  body("content")
    .notEmpty()
    .withMessage("Comment content is required")
    .isLength({ min: 1, max: 2000 })
    .withMessage("Comment content must be between 1 and 2000 characters")
    .trim(),
];

/**
 * Validation rules for deleting comment
 */
const deleteCommentValidation = [
  param("postId").isUUID().withMessage("postId must be a valid UUID"),
  param("commentId").isUUID().withMessage("commentId must be a valid UUID"),
];

/**
 * Validation rules for listing comments
 */
const listCommentsValidation = [
  param("postId").isUUID().withMessage("postId must be a valid UUID"),
  query("userId")
    .optional()
    .isUUID()
    .withMessage("userId must be a valid UUID"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("page must be a positive integer")
    .toInt(),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("limit must be an integer between 1 and 100")
    .toInt(),
];

module.exports = {
  registerValidation,
  loginValidation,
  updateProfileValidation,
  createExpenseValidation,
  updateExpenseValidation,
  createPostValidation,
  listPostsValidation,
  createCommentValidation,
  listCommentsValidation,
  updatePostValidation,
  deletePostValidation,
  updateCommentValidation,
  deleteCommentValidation,
};
