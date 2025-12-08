const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const authenticate = require("../middleware/authenticate");
const upload = require("../middleware/upload");
const {
  createExpenseValidation,
  updateExpenseValidation,
} = require("../utils/validators");
const { handleValidationErrors } = require("../utils/helpers");

/**
 * @route   GET /api/expenses/stats
 * @desc    Get expense statistics for logged-in user
 * @access  Private
 */
router.get("/stats", authenticate, expenseController.getStatistics);

/**
 * @route   POST /api/expenses
 * @desc    Create a new expense
 * @access  Private
 */
router.post(
  "/",
  authenticate,
  upload.single("receipt"),
  createExpenseValidation,
  handleValidationErrors,
  expenseController.createExpense
);

/**
 * @route   GET /api/expenses
 * @desc    Get all expenses for logged-in user
 * @access  Private
 */
router.get("/", authenticate, expenseController.getExpenses);

/**
 * @route   GET /api/expenses/:id
 * @desc    Get single expense by ID
 * @access  Private
 */
router.get("/:id", authenticate, expenseController.getExpenseById);

/**
 * @route   PUT /api/expenses/:id
 * @desc    Update an expense
 * @access  Private
 */
router.put(
  "/:id",
  authenticate,
  upload.single("receipt"),
  updateExpenseValidation,
  handleValidationErrors,
  expenseController.updateExpense
);

/**
 * @route   DELETE /api/expenses/:id
 * @desc    Delete an expense
 * @access  Private
 */
router.delete("/:id", authenticate, expenseController.deleteExpense);

module.exports = router;
