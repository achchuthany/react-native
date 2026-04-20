const db = require("../config/database");

class Product {
  /**
   * Create a product for a user
   * @param {object} productData
   * @returns {Promise<object>}
   */
  static async create({
    userId,
    name,
    description,
    price,
    category,
    imageUrl,
    stock,
    status,
  }) {
    const query = `
      INSERT INTO products (user_id, name, description, price, category, image_url, stock, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;

    const result = await db.query(query, [
      userId,
      name,
      description || null,
      price,
      category,
      imageUrl || null,
      stock ?? 0,
      status || "active",
    ]);

    return result.rows[0];
  }

  /**
   * List products with optional filters
   * @param {object} options
   * @returns {Promise<array>}
   */
  static async findAll({
    userId,
    search,
    category,
    minPrice,
    maxPrice,
    status,
    limit = 20,
    offset = 0,
  } = {}) {
    const values = [];
    const whereParts = [];

    if (userId) {
      values.push(userId);
      whereParts.push(`p.user_id = $${values.length}`);
    }

    if (search) {
      values.push(`%${search}%`);
      whereParts.push(
        `(p.name ILIKE $${values.length} OR COALESCE(p.description, '') ILIKE $${values.length})`,
      );
    }

    if (category) {
      values.push(category);
      whereParts.push(`p.category = $${values.length}`);
    }

    if (minPrice !== undefined) {
      values.push(minPrice);
      whereParts.push(`p.price >= $${values.length}`);
    }

    if (maxPrice !== undefined) {
      values.push(maxPrice);
      whereParts.push(`p.price <= $${values.length}`);
    }

    if (status) {
      values.push(status);
      whereParts.push(`p.status = $${values.length}`);
    }

    const whereClause =
      whereParts.length > 0 ? `WHERE ${whereParts.join(" AND ")}` : "";

    values.push(limit, offset);
    const limitParam = values.length - 1;
    const offsetParam = values.length;

    const query = `
      SELECT
        p.id,
        p.user_id,
        u.name AS seller_name,
        u.email AS seller_email,
        p.name,
        p.description,
        p.price,
        p.category,
        p.image_url,
        p.stock,
        p.status,
        p.created_at,
        p.updated_at
      FROM products p
      INNER JOIN users u ON u.id = p.user_id
      ${whereClause}
      ORDER BY p.created_at DESC
      LIMIT $${limitParam} OFFSET $${offsetParam}
    `;

    const result = await db.query(query, values);
    return result.rows;
  }

  /**
   * Count products with optional filters
   * @param {object} options
   * @returns {Promise<number>}
   */
  static async count({
    userId,
    search,
    category,
    minPrice,
    maxPrice,
    status,
  } = {}) {
    const values = [];
    const whereParts = [];

    if (userId) {
      values.push(userId);
      whereParts.push(`user_id = $${values.length}`);
    }

    if (search) {
      values.push(`%${search}%`);
      whereParts.push(
        `(name ILIKE $${values.length} OR COALESCE(description, '') ILIKE $${values.length})`,
      );
    }

    if (category) {
      values.push(category);
      whereParts.push(`category = $${values.length}`);
    }

    if (minPrice !== undefined) {
      values.push(minPrice);
      whereParts.push(`price >= $${values.length}`);
    }

    if (maxPrice !== undefined) {
      values.push(maxPrice);
      whereParts.push(`price <= $${values.length}`);
    }

    if (status) {
      values.push(status);
      whereParts.push(`status = $${values.length}`);
    }

    const whereClause =
      whereParts.length > 0 ? `WHERE ${whereParts.join(" AND ")}` : "";

    const query = `SELECT COUNT(*) FROM products ${whereClause}`;
    const result = await db.query(query, values);

    return parseInt(result.rows[0].count, 10);
  }

  /**
   * Find product by id
   * @param {string} productId
   * @returns {Promise<object|null>}
   */
  static async findById(productId) {
    const query = `
      SELECT
        p.id,
        p.user_id,
        u.name AS seller_name,
        u.email AS seller_email,
        p.name,
        p.description,
        p.price,
        p.category,
        p.image_url,
        p.stock,
        p.status,
        p.created_at,
        p.updated_at
      FROM products p
      INNER JOIN users u ON u.id = p.user_id
      WHERE p.id = $1
    `;

    const result = await db.query(query, [productId]);
    return result.rows[0] || null;
  }

  /**
   * Update a product owned by a user
   * @param {string} productId
   * @param {string} userId
   * @param {object} updates
   * @returns {Promise<object|null>}
   */
  static async update(productId, userId, updates) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    if (updates.name !== undefined) {
      fields.push(`name = $${paramCount++}`);
      values.push(updates.name);
    }

    if (updates.description !== undefined) {
      fields.push(`description = $${paramCount++}`);
      values.push(updates.description);
    }

    if (updates.price !== undefined) {
      fields.push(`price = $${paramCount++}`);
      values.push(updates.price);
    }

    if (updates.category !== undefined) {
      fields.push(`category = $${paramCount++}`);
      values.push(updates.category);
    }

    if (updates.imageUrl !== undefined) {
      fields.push(`image_url = $${paramCount++}`);
      values.push(updates.imageUrl);
    }

    if (updates.stock !== undefined) {
      fields.push(`stock = $${paramCount++}`);
      values.push(updates.stock);
    }

    if (updates.status !== undefined) {
      fields.push(`status = $${paramCount++}`);
      values.push(updates.status);
    }

    if (fields.length === 0) {
      throw new Error("No fields to update");
    }

    values.push(productId, userId);

    const query = `
      UPDATE products
      SET ${fields.join(", ")}
      WHERE id = $${paramCount++} AND user_id = $${paramCount}
      RETURNING *
    `;

    const result = await db.query(query, values);
    return result.rows[0] || null;
  }

  /**
   * Delete a product owned by a user
   * @param {string} productId
   * @param {string} userId
   * @returns {Promise<object|null>}
   */
  static async delete(productId, userId) {
    const query = `
      DELETE FROM products
      WHERE id = $1 AND user_id = $2
      RETURNING *
    `;

    const result = await db.query(query, [productId, userId]);
    return result.rows[0] || null;
  }

  /**
   * List available categories with counts
   * @returns {Promise<array>}
   */
  static async listCategories() {
    const query = `
      SELECT category, COUNT(*)::int AS count
      FROM products
      GROUP BY category
      ORDER BY category ASC
    `;

    const result = await db.query(query);
    return result.rows;
  }
}

module.exports = Product;
