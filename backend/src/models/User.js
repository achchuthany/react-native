const db = require("../config/database");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

class User {
  /**
   * Create a new user
   * @param {object} userData - User data (email, password, name)
   * @returns {Promise<object>} Created user (without password)
   */
  static async create({ email, password, name }) {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const query = `
      INSERT INTO users (email, password, name)
      VALUES ($1, $2, $3)
      RETURNING id, email, name, avatar_url, created_at
    `;

    const result = await db.query(query, [email, hashedPassword, name]);
    return result.rows[0];
  }

  /**
   * Find user by email
   * @param {string} email - User email
   * @returns {Promise<object|null>} User object or null
   */
  static async findByEmail(email) {
    const query = `
      SELECT id, email, password, name, avatar_url, created_at
      FROM users
      WHERE email = $1
    `;

    const result = await db.query(query, [email]);
    return result.rows[0] || null;
  }

  /**
   * Find user by ID
   * @param {string} userId - User ID
   * @returns {Promise<object|null>} User object (without password) or null
   */
  static async findById(userId) {
    const query = `
      SELECT id, email, name, avatar_url, created_at
      FROM users
      WHERE id = $1
    `;

    const result = await db.query(query, [userId]);
    return result.rows[0] || null;
  }

  /**
   * Update user profile
   * @param {string} userId - User ID
   * @param {object} updates - Fields to update (name, avatar_url)
   * @returns {Promise<object>} Updated user
   */
  static async update(userId, updates) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    if (updates.name) {
      fields.push(`name = $${paramCount++}`);
      values.push(updates.name);
    }

    if (updates.avatar_url !== undefined) {
      fields.push(`avatar_url = $${paramCount++}`);
      values.push(updates.avatar_url);
    }

    if (fields.length === 0) {
      throw new Error("No fields to update");
    }

    values.push(userId);

    const query = `
      UPDATE users
      SET ${fields.join(", ")}
      WHERE id = $${paramCount}
      RETURNING id, email, name, avatar_url, created_at
    `;

    const result = await db.query(query, values);
    return result.rows[0];
  }

  /**
   * Verify password
   * @param {string} plainPassword - Plain text password
   * @param {string} hashedPassword - Hashed password from database
   * @returns {Promise<boolean>} True if password matches
   */
  static async verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  /**
   * Check if email exists
   * @param {string} email - Email to check
   * @returns {Promise<boolean>} True if email exists
   */
  static async emailExists(email) {
    const query = "SELECT id FROM users WHERE email = $1";
    const result = await db.query(query, [email]);
    return result.rows.length > 0;
  }
}

module.exports = User;
