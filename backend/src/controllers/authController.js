const User = require("../models/User");
const { generateToken } = require("../utils/jwt");
const {
  createSuccessResponse,
  createErrorResponse,
} = require("../utils/helpers");
const { uploadImage, deleteImage } = require("../config/cloudinary");
const fs = require("fs").promises;
const path = require("path");
const os = require("os");

/**
 * Register a new user
 * POST /api/auth/register
 */
const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res
        .status(409)
        .json(createErrorResponse("Email already registered", 409));
    }

    // Create new user
    const user = await User.create({ email, password, name });

    // Generate JWT token
    const token = generateToken(user.id);

    res.status(201).json(
      createSuccessResponse(
        {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            avatar_url: user.avatar_url,
          },
          token,
        },
        "User registered successfully"
      )
    );
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json(createErrorResponse("Failed to register user"));
  }
};

/**
 * Login user
 * POST /api/auth/login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return res
        .status(401)
        .json(createErrorResponse("Invalid email or password", 401));
    }

    // Verify password
    const isValidPassword = await User.verifyPassword(password, user.password);
    if (!isValidPassword) {
      return res
        .status(401)
        .json(createErrorResponse("Invalid email or password", 401));
    }

    // Generate JWT token
    const token = generateToken(user.id);

    res.status(200).json(
      createSuccessResponse(
        {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            avatar_url: user.avatar_url,
          },
          token,
        },
        "Login successful"
      )
    );
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json(createErrorResponse("Failed to login"));
  }
};

/**
 * Get logged-in user profile
 * GET /api/auth/profile
 */
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json(createErrorResponse("User not found", 404));
    }

    res.status(200).json(
      createSuccessResponse(
        {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar_url: user.avatar_url,
          created_at: user.created_at,
        },
        "Profile retrieved successfully"
      )
    );
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json(createErrorResponse("Failed to retrieve profile"));
  }
};

/**
 * Update user profile
 * PUT /api/auth/profile
 */
const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;
    const updates = {};

    if (name) {
      updates.name = name;
    }

    // Handle avatar upload
    if (req.file) {
      // Write buffer to temporary file
      const tempFilePath = path.join(
        os.tmpdir(),
        `avatar-${Date.now()}-${req.file.originalname}`
      );
      await fs.writeFile(tempFilePath, req.file.buffer);

      try {
        // Upload to Cloudinary
        const result = await uploadImage(
          tempFilePath,
          "expense-tracker/avatars"
        );
        updates.avatar_url = result.url;

        // Delete old avatar if exists
        const currentUser = await User.findById(req.user.id);
        if (currentUser.avatar_url) {
          // Extract public_id from URL and delete
          // Note: This is a simplified approach, you might want to store public_id in DB
          try {
            const urlParts = currentUser.avatar_url.split("/");
            const publicIdWithExt = urlParts.slice(-2).join("/");
            const publicId = publicIdWithExt.replace(/\.[^/.]+$/, "");
            await deleteImage(publicId);
          } catch (deleteError) {
            console.error("Error deleting old avatar:", deleteError);
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

    // Update user
    const updatedUser = await User.update(req.user.id, updates);

    res.status(200).json(
      createSuccessResponse(
        {
          id: updatedUser.id,
          email: updatedUser.email,
          name: updatedUser.name,
          avatar_url: updatedUser.avatar_url,
        },
        "Profile updated successfully"
      )
    );
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json(createErrorResponse("Failed to update profile"));
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
};
