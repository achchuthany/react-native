const Expense = require("../models/Expense");
const {
  createSuccessResponse,
  createErrorResponse,
} = require("../utils/helpers");
const { uploadImage, deleteImage } = require("../config/cloudinary");
const fs = require("fs").promises;
const path = require("path");
const os = require("os");

/**
 * Create a new expense
 * POST /api/expenses
 */
const createExpense = async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;
    const userId = req.user.id;

    let receiptUrl = null;
    let receiptPublicId = null;

    // Handle receipt image upload
    if (req.file) {
      // Write buffer to temporary file
      const tempFilePath = path.join(
        os.tmpdir(),
        `receipt-${Date.now()}-${req.file.originalname}`
      );
      await fs.writeFile(tempFilePath, req.file.buffer);

      try {
        // Upload to Cloudinary
        const result = await uploadImage(
          tempFilePath,
          "expense-tracker/receipts"
        );
        receiptUrl = result.url;
        receiptPublicId = result.publicId;
      } finally {
        // Clean up temporary file
        await fs.unlink(tempFilePath).catch(console.error);
      }
    }

    // Create expense
    const expense = await Expense.create({
      userId,
      amount,
      category,
      description,
      date,
      receiptUrl,
      receiptPublicId,
    });

    res
      .status(201)
      .json(createSuccessResponse(expense, "Expense created successfully"));
  } catch (error) {
    console.error("Create expense error:", error);
    res.status(500).json(createErrorResponse("Failed to create expense"));
  }
};

/**
 * Get all expenses for logged-in user
 * GET /api/expenses
 */
const getExpenses = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const offset = (page - 1) * limit;

    // Get expenses and total count
    const [expenses, totalCount] = await Promise.all([
      Expense.findByUserId(userId, limit, offset),
      Expense.countByUserId(userId),
    ]);

    res.status(200).json(
      createSuccessResponse(
        {
          expenses,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
            totalCount,
            limit,
          },
        },
        "Expenses retrieved successfully"
      )
    );
  } catch (error) {
    console.error("Get expenses error:", error);
    res.status(500).json(createErrorResponse("Failed to retrieve expenses"));
  }
};

/**
 * Get single expense by ID
 * GET /api/expenses/:id
 */
const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const expense = await Expense.findById(id, userId);

    if (!expense) {
      return res
        .status(404)
        .json(createErrorResponse("Expense not found", 404));
    }

    res
      .status(200)
      .json(createSuccessResponse(expense, "Expense retrieved successfully"));
  } catch (error) {
    console.error("Get expense error:", error);
    res.status(500).json(createErrorResponse("Failed to retrieve expense"));
  }
};

/**
 * Update an expense
 * PUT /api/expenses/:id
 */
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { amount, category, description, date } = req.body;

    // Check if expense exists
    const existingExpense = await Expense.findById(id, userId);
    if (!existingExpense) {
      return res
        .status(404)
        .json(createErrorResponse("Expense not found", 404));
    }

    const updates = {};

    if (amount !== undefined) updates.amount = amount;
    if (category) updates.category = category;
    if (description !== undefined) updates.description = description;
    if (date) updates.date = date;

    // Handle receipt image upload
    if (req.file) {
      // Write buffer to temporary file
      const tempFilePath = path.join(
        os.tmpdir(),
        `receipt-${Date.now()}-${req.file.originalname}`
      );
      await fs.writeFile(tempFilePath, req.file.buffer);

      try {
        // Upload to Cloudinary
        const result = await uploadImage(
          tempFilePath,
          "expense-tracker/receipts"
        );
        updates.receiptUrl = result.url;
        updates.receiptPublicId = result.publicId;

        // Delete old receipt if exists
        if (existingExpense.receipt_public_id) {
          try {
            await deleteImage(existingExpense.receipt_public_id);
          } catch (deleteError) {
            console.error("Error deleting old receipt:", deleteError);
          }
        }
      } finally {
        // Clean up temporary file
        await fs.unlink(tempFilePath).catch(console.error);
      }
    }

    if (Object.keys(updates).length === 0) {
      return res
        .status(400)
        .json(createErrorResponse("No fields to update", 400));
    }

    // Update expense
    const updatedExpense = await Expense.update(id, userId, updates);

    res
      .status(200)
      .json(
        createSuccessResponse(updatedExpense, "Expense updated successfully")
      );
  } catch (error) {
    console.error("Update expense error:", error);
    res.status(500).json(createErrorResponse("Failed to update expense"));
  }
};

/**
 * Delete an expense
 * DELETE /api/expenses/:id
 */
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const deletedExpense = await Expense.delete(id, userId);

    if (!deletedExpense) {
      return res
        .status(404)
        .json(createErrorResponse("Expense not found", 404));
    }

    // Delete receipt from Cloudinary if exists
    if (deletedExpense.receipt_public_id) {
      try {
        await deleteImage(deletedExpense.receipt_public_id);
      } catch (deleteError) {
        console.error("Error deleting receipt:", deleteError);
      }
    }

    res
      .status(200)
      .json(
        createSuccessResponse(
          { id: deletedExpense.id },
          "Expense deleted successfully"
        )
      );
  } catch (error) {
    console.error("Delete expense error:", error);
    res.status(500).json(createErrorResponse("Failed to delete expense"));
  }
};

/**
 * Get expense statistics
 * GET /api/expenses/stats
 */
const getStatistics = async (req, res) => {
  try {
    const userId = req.user.id;

    const stats = await Expense.getStatistics(userId);

    res
      .status(200)
      .json(createSuccessResponse(stats, "Statistics retrieved successfully"));
  } catch (error) {
    console.error("Get statistics error:", error);
    res.status(500).json(createErrorResponse("Failed to retrieve statistics"));
  }
};

module.exports = {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getStatistics,
};
