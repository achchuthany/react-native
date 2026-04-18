const db = require("../config/database");

class Post {
  /**
   * Create a post for a user
   * @param {object} postData
   * @returns {Promise<object>}
   */
  static async create({ userId, title, content }) {
    const query = `
      INSERT INTO posts (user_id, title, content)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const result = await db.query(query, [userId, title, content]);
    return result.rows[0];
  }

  /**
   * List posts with optional user filter and comment count
   * @param {object} options
   * @returns {Promise<array>}
   */
  static async findAll({ userId, limit = 20, offset = 0 } = {}) {
    const values = [];
    let paramIndex = 1;

    let whereClause = "";
    if (userId) {
      whereClause = `WHERE p.user_id = $${paramIndex++}`;
      values.push(userId);
    }

    values.push(limit, offset);

    const query = `
      SELECT
        p.id,
        p.user_id,
        u.name AS author_name,
        u.email AS author_email,
        p.title,
        p.content,
        p.created_at,
        p.updated_at,
        COUNT(c.id)::int AS comments_count
      FROM posts p
      INNER JOIN users u ON u.id = p.user_id
      LEFT JOIN comments c ON c.post_id = p.id
      ${whereClause}
      GROUP BY p.id, u.name, u.email
      ORDER BY p.created_at DESC
      LIMIT $${paramIndex++} OFFSET $${paramIndex}
    `;

    const result = await db.query(query, values);
    return result.rows;
  }

  /**
   * Count posts with optional user filter
   * @param {string|undefined} userId
   * @returns {Promise<number>}
   */
  static async count(userId) {
    const query = userId
      ? "SELECT COUNT(*) FROM posts WHERE user_id = $1"
      : "SELECT COUNT(*) FROM posts";
    const result = userId
      ? await db.query(query, [userId])
      : await db.query(query);

    return parseInt(result.rows[0].count, 10);
  }

  /**
   * Find post by id
   * @param {string} postId
   * @returns {Promise<object|null>}
   */
  static async findById(postId) {
    const query = `
      SELECT
        p.id,
        p.user_id,
        u.name AS author_name,
        u.email AS author_email,
        p.title,
        p.content,
        p.created_at,
        p.updated_at
      FROM posts p
      INNER JOIN users u ON u.id = p.user_id
      WHERE p.id = $1
    `;

    const result = await db.query(query, [postId]);
    return result.rows[0] || null;
  }

  /**
   * Update a post owned by a user
   * @param {string} postId
   * @param {string} userId
   * @param {object} updates
   * @returns {Promise<object|null>}
   */
  static async update(postId, userId, updates) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    if (updates.title !== undefined) {
      fields.push(`title = $${paramCount++}`);
      values.push(updates.title);
    }

    if (updates.content !== undefined) {
      fields.push(`content = $${paramCount++}`);
      values.push(updates.content);
    }

    if (fields.length === 0) {
      throw new Error("No fields to update");
    }

    values.push(postId, userId);

    const query = `
      UPDATE posts
      SET ${fields.join(", ")}
      WHERE id = $${paramCount++} AND user_id = $${paramCount}
      RETURNING *
    `;

    const result = await db.query(query, values);
    return result.rows[0] || null;
  }

  /**
   * Delete a post owned by a user
   * @param {string} postId
   * @param {string} userId
   * @returns {Promise<object|null>}
   */
  static async delete(postId, userId) {
    const query = `
      DELETE FROM posts
      WHERE id = $1 AND user_id = $2
      RETURNING *
    `;

    const result = await db.query(query, [postId, userId]);
    return result.rows[0] || null;
  }

  /**
   * Create a comment for a post
   * @param {object} commentData
   * @returns {Promise<object>}
   */
  static async createComment({ postId, userId, content }) {
    const query = `
      INSERT INTO comments (post_id, user_id, content)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const result = await db.query(query, [postId, userId, content]);
    return result.rows[0];
  }

  /**
   * Find a comment in a post
   * @param {string} commentId
   * @param {string} postId
   * @returns {Promise<object|null>}
   */
  static async findCommentById(commentId, postId) {
    const query = `
      SELECT
        c.id,
        c.post_id,
        c.user_id,
        u.name AS author_name,
        u.email AS author_email,
        c.content,
        c.created_at,
        c.updated_at
      FROM comments c
      INNER JOIN users u ON u.id = c.user_id
      WHERE c.id = $1 AND c.post_id = $2
    `;

    const result = await db.query(query, [commentId, postId]);
    return result.rows[0] || null;
  }

  /**
   * Update a comment owned by a user
   * @param {string} commentId
   * @param {string} postId
   * @param {string} userId
   * @param {string} content
   * @returns {Promise<object|null>}
   */
  static async updateComment(commentId, postId, userId, content) {
    const query = `
      UPDATE comments
      SET content = $1
      WHERE id = $2 AND post_id = $3 AND user_id = $4
      RETURNING *
    `;

    const result = await db.query(query, [content, commentId, postId, userId]);
    return result.rows[0] || null;
  }

  /**
   * Delete a comment owned by a user
   * @param {string} commentId
   * @param {string} postId
   * @param {string} userId
   * @returns {Promise<object|null>}
   */
  static async deleteComment(commentId, postId, userId) {
    const query = `
      DELETE FROM comments
      WHERE id = $1 AND post_id = $2 AND user_id = $3
      RETURNING *
    `;

    const result = await db.query(query, [commentId, postId, userId]);
    return result.rows[0] || null;
  }

  /**
   * List comments for a post, optionally filtered by user
   * @param {object} options
   * @returns {Promise<array>}
   */
  static async findCommentsByPostId({
    postId,
    userId,
    limit = 50,
    offset = 0,
  }) {
    const values = [postId];
    let paramIndex = 2;

    let userFilter = "";
    if (userId) {
      userFilter = `AND c.user_id = $${paramIndex++}`;
      values.push(userId);
    }

    values.push(limit, offset);

    const query = `
      SELECT
        c.id,
        c.post_id,
        c.user_id,
        u.name AS author_name,
        u.email AS author_email,
        c.content,
        c.created_at,
        c.updated_at
      FROM comments c
      INNER JOIN users u ON u.id = c.user_id
      WHERE c.post_id = $1 ${userFilter}
      ORDER BY c.created_at ASC
      LIMIT $${paramIndex++} OFFSET $${paramIndex}
    `;

    const result = await db.query(query, values);
    return result.rows;
  }

  /**
   * Count comments in a post, optionally filtered by user
   * @param {string} postId
   * @param {string|undefined} userId
   * @returns {Promise<number>}
   */
  static async countCommentsByPostId(postId, userId) {
    const values = [postId];
    let query = "SELECT COUNT(*) FROM comments WHERE post_id = $1";

    if (userId) {
      query += " AND user_id = $2";
      values.push(userId);
    }

    const result = await db.query(query, values);
    return parseInt(result.rows[0].count, 10);
  }
}

module.exports = Post;
