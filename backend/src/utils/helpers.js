const { validationResult } = require("express-validator");

/**
 * Middleware to handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((err) => ({
        field: err.path || err.param,
        message: err.msg,
      })),
    });
  }

  next();
};

/**
 * Create a standard error response
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 * @returns {object} Error response object
 */
const createErrorResponse = (message, statusCode = 500) => {
  return {
    success: false,
    message,
    statusCode,
  };
};

/**
 * Create a standard success response
 * @param {object} data - Response data
 * @param {string} message - Success message
 * @returns {object} Success response object
 */
const createSuccessResponse = (data, message = "Success") => {
  return {
    success: true,
    message,
    data,
  };
};

/**
 * Async handler to wrap async route handlers
 * @param {Function} fn - Async function
 * @returns {Function} Express middleware
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = {
  handleValidationErrors,
  createErrorResponse,
  createSuccessResponse,
  asyncHandler,
};
