const Product = require("../models/Product");
const {
  createSuccessResponse,
  createErrorResponse,
} = require("../utils/helpers");

/**
 * Create a new product
 * POST /api/products
 */
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, imageUrl, stock, status } =
      req.body;
    const userId = req.user.id;

    const product = await Product.create({
      userId,
      name,
      description,
      price,
      category,
      imageUrl,
      stock,
      status,
    });

    res
      .status(201)
      .json(createSuccessResponse(product, "Product created successfully"));
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json(createErrorResponse("Failed to create product"));
  }
};

/**
 * Get products with optional filters
 * GET /api/products
 */
const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const offset = (page - 1) * limit;

    const filters = {
      userId: req.query.userId,
      search: req.query.search,
      category: req.query.category,
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice,
      status: req.query.status,
    };

    if (
      filters.minPrice !== undefined &&
      filters.maxPrice !== undefined &&
      filters.minPrice > filters.maxPrice
    ) {
      return res
        .status(400)
        .json(
          createErrorResponse("minPrice cannot be greater than maxPrice", 400),
        );
    }

    const [products, totalCount] = await Promise.all([
      Product.findAll({ ...filters, limit, offset }),
      Product.count(filters),
    ]);

    res.status(200).json(
      createSuccessResponse(
        {
          products,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
            totalCount,
            limit,
          },
        },
        "Products retrieved successfully",
      ),
    );
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json(createErrorResponse("Failed to retrieve products"));
  }
};

/**
 * Get product by id
 * GET /api/products/:productId
 */
const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json(createErrorResponse("Product not found", 404));
    }

    res
      .status(200)
      .json(createSuccessResponse(product, "Product retrieved successfully"));
  } catch (error) {
    console.error("Get product error:", error);
    res.status(500).json(createErrorResponse("Failed to retrieve product"));
  }
};

/**
 * Update product
 * PUT /api/products/:productId
 */
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;
    const { name, description, price, category, imageUrl, stock, status } =
      req.body;

    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res
        .status(404)
        .json(createErrorResponse("Product not found", 404));
    }

    if (existingProduct.user_id !== userId) {
      return res
        .status(403)
        .json(
          createErrorResponse(
            "You are not allowed to update this product",
            403,
          ),
        );
    }

    const updates = {};

    if (name !== undefined) updates.name = name;
    if (description !== undefined) updates.description = description;
    if (price !== undefined) updates.price = price;
    if (category !== undefined) updates.category = category;
    if (imageUrl !== undefined) updates.imageUrl = imageUrl;
    if (stock !== undefined) updates.stock = stock;
    if (status !== undefined) updates.status = status;

    if (Object.keys(updates).length === 0) {
      return res
        .status(400)
        .json(createErrorResponse("No fields to update", 400));
    }

    const updatedProduct = await Product.update(productId, userId, updates);

    res
      .status(200)
      .json(
        createSuccessResponse(updatedProduct, "Product updated successfully"),
      );
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json(createErrorResponse("Failed to update product"));
  }
};

/**
 * Delete product
 * DELETE /api/products/:productId
 */
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res
        .status(404)
        .json(createErrorResponse("Product not found", 404));
    }

    if (existingProduct.user_id !== userId) {
      return res
        .status(403)
        .json(
          createErrorResponse(
            "You are not allowed to delete this product",
            403,
          ),
        );
    }

    const deletedProduct = await Product.delete(productId, userId);

    res
      .status(200)
      .json(
        createSuccessResponse(
          { id: deletedProduct.id },
          "Product deleted successfully",
        ),
      );
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json(createErrorResponse("Failed to delete product"));
  }
};

/**
 * List product categories
 * GET /api/products/categories
 */
const getProductCategories = async (req, res) => {
  try {
    const categories = await Product.listCategories();

    res
      .status(200)
      .json(
        createSuccessResponse(
          categories,
          "Product categories retrieved successfully",
        ),
      );
  } catch (error) {
    console.error("Get product categories error:", error);
    res
      .status(500)
      .json(createErrorResponse("Failed to retrieve product categories"));
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductCategories,
};
