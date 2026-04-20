const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authenticate = require("../middleware/authenticate");
const {
  createProductValidation,
  listProductsValidation,
  getProductValidation,
  updateProductValidation,
  deleteProductValidation,
} = require("../utils/validators");
const { handleValidationErrors } = require("../utils/helpers");

/**
 * @route   POST /api/products
 * @desc    Create a product for logged-in user
 * @access  Private
 */
router.post(
  "/",
  authenticate,
  createProductValidation,
  handleValidationErrors,
  productController.createProduct,
);

/**
 * @route   GET /api/products
 * @desc    Get products with optional filters
 * @access  Private
 */
router.get(
  "/",
  authenticate,
  listProductsValidation,
  handleValidationErrors,
  productController.getProducts,
);

/**
 * @route   GET /api/products/categories
 * @desc    Get product categories with counts
 * @access  Private
 */
router.get("/categories", authenticate, productController.getProductCategories);

/**
 * @route   GET /api/products/:productId
 * @desc    Get single product
 * @access  Private
 */
router.get(
  "/:productId",
  authenticate,
  getProductValidation,
  handleValidationErrors,
  productController.getProductById,
);

/**
 * @route   PUT /api/products/:productId
 * @desc    Update product for logged-in user
 * @access  Private
 */
router.put(
  "/:productId",
  authenticate,
  updateProductValidation,
  handleValidationErrors,
  productController.updateProduct,
);

/**
 * @route   DELETE /api/products/:productId
 * @desc    Delete product for logged-in user
 * @access  Private
 */
router.delete(
  "/:productId",
  authenticate,
  deleteProductValidation,
  handleValidationErrors,
  productController.deleteProduct,
);

module.exports = router;
