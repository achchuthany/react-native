const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticate = require("../middleware/authenticate");
const upload = require("../middleware/upload");
const {
  registerValidation,
  loginValidation,
  updateProfileValidation,
} = require("../utils/validators");
const { handleValidationErrors } = require("../utils/helpers");

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post(
  "/register",
  registerValidation,
  handleValidationErrors,
  authController.register
);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post(
  "/login",
  loginValidation,
  handleValidationErrors,
  authController.login
);

/**
 * @route   GET /api/auth/profile
 * @desc    Get logged-in user profile
 * @access  Private
 */
router.get("/profile", authenticate, authController.getProfile);

/**
 * @route   PUT /api/auth/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put(
  "/profile",
  authenticate,
  upload.single("avatar"),
  updateProfileValidation,
  handleValidationErrors,
  authController.updateProfile
);

module.exports = router;
