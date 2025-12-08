const db = require("../config/database");

const VALID_CATEGORIES = [
  "food",
  "transport",
  "shopping",
  "bills",
  "entertainment",
  "health",
  "other",
];

class Expense {
  /**
   * Create a new expense
   * @param {object} expenseData - Expense data
   * @returns {Promise<object>} Created expense
   */
  static async create({
    userId,
    amount,
    category,
    description,
    date,
    receiptUrl,
    receiptPublicId,
  }) {
    const query = `
      INSERT INTO expenses (user_id, amount, category, description, date, receipt_url, receipt_public_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;

    const result = await db.query(query, [
      userId,
      amount,
      category,
      description || null,
      date,
      receiptUrl || null,
      receiptPublicId || null,
    ]);

    return result.rows[0];
  }

  /**
   * Get all expenses for a user with pagination
   * @param {string} userId - User ID
   * @param {number} limit - Number of records per page
   * @param {number} offset - Number of records to skip
   * @returns {Promise<array>} Array of expenses
   */
  static async findByUserId(userId, limit = 50, offset = 0) {
    const query = `
      SELECT * FROM expenses
      WHERE user_id = $1
      ORDER BY date DESC, created_at DESC
      LIMIT $2 OFFSET $3
    `;

    const result = await db.query(query, [userId, limit, offset]);
    return result.rows;
  }

  /**
   * Get total count of user expenses
   * @param {string} userId - User ID
   * @returns {Promise<number>} Total count
   */
  static async countByUserId(userId) {
    const query = "SELECT COUNT(*) FROM expenses WHERE user_id = $1";
    const result = await db.query(query, [userId]);
    return parseInt(result.rows[0].count);
  }

  /**
   * Find expense by ID and user ID
   * @param {string} expenseId - Expense ID
   * @param {string} userId - User ID
   * @returns {Promise<object|null>} Expense object or null
   */
  static async findById(expenseId, userId) {
    const query = `
      SELECT * FROM expenses
      WHERE id = $1 AND user_id = $2
    `;

    const result = await db.query(query, [expenseId, userId]);
    return result.rows[0] || null;
  }

  /**
   * Update an expense
   * @param {string} expenseId - Expense ID
   * @param {string} userId - User ID
   * @param {object} updates - Fields to update
   * @returns {Promise<object>} Updated expense
   */
  static async update(expenseId, userId, updates) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    if (updates.amount !== undefined) {
      fields.push(`amount = $${paramCount++}`);
      values.push(updates.amount);
    }

    if (updates.category) {
      fields.push(`category = $${paramCount++}`);
      values.push(updates.category);
    }

    if (updates.description !== undefined) {
      fields.push(`description = $${paramCount++}`);
      values.push(updates.description);
    }

    if (updates.date) {
      fields.push(`date = $${paramCount++}`);
      values.push(updates.date);
    }

    if (updates.receiptUrl !== undefined) {
      fields.push(`receipt_url = $${paramCount++}`);
      values.push(updates.receiptUrl);
    }

    if (updates.receiptPublicId !== undefined) {
      fields.push(`receipt_public_id = $${paramCount++}`);
      values.push(updates.receiptPublicId);
    }

    if (fields.length === 0) {
      throw new Error("No fields to update");
    }

    values.push(expenseId, userId);

    const query = `
      UPDATE expenses
      SET ${fields.join(", ")}
      WHERE id = $${paramCount++} AND user_id = $${paramCount}
      RETURNING *
    `;

    const result = await db.query(query, values);
    return result.rows[0];
  }

  /**
   * Delete an expense
   * @param {string} expenseId - Expense ID
   * @param {string} userId - User ID
   * @returns {Promise<object|null>} Deleted expense or null
   */
  static async delete(expenseId, userId) {
    const query = `
      DELETE FROM expenses
      WHERE id = $1 AND user_id = $2
      RETURNING *
    `;

    const result = await db.query(query, [expenseId, userId]);
    return result.rows[0] || null;
  }

  /**
   * Get expense statistics for a user
   * @param {string} userId - User ID
   * @returns {Promise<object>} Statistics object
   */
  static async getStatistics(userId) {
    // Total expenses and amount
    const totalQuery = `
      SELECT 
        COUNT(*) as total_count,
        COALESCE(SUM(amount), 0) as total_amount
      FROM expenses
      WHERE user_id = $1
    `;

    // Breakdown by category
    const categoryQuery = `
      SELECT 
        category,
        COUNT(*) as count,
        COALESCE(SUM(amount), 0) as total
      FROM expenses
      WHERE user_id = $1
      GROUP BY category
      ORDER BY total DESC
    `;

    const [totalResult, categoryResult] = await Promise.all([
      db.query(totalQuery, [userId]),
      db.query(categoryQuery, [userId]),
    ]);

    return {
      total: {
        count: parseInt(totalResult.rows[0].total_count),
        amount: parseFloat(totalResult.rows[0].total_amount),
      },
      byCategory: categoryResult.rows.map((row) => ({
        category: row.category,
        count: parseInt(row.count),
        total: parseFloat(row.total),
      })),
    };
  }

  /**
   * Validate category
   * @param {string} category - Category to validate
   * @returns {boolean} True if valid
   */
  static isValidCategory(category) {
    return VALID_CATEGORIES.includes(category);
  }
}

module.exports = Expense;
