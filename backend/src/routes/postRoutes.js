const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authenticate = require("../middleware/authenticate");
const {
  createPostValidation,
  createCommentValidation,
  listPostsValidation,
  listCommentsValidation,
  updatePostValidation,
  deletePostValidation,
  updateCommentValidation,
  deleteCommentValidation,
} = require("../utils/validators");
const { handleValidationErrors } = require("../utils/helpers");

/**
 * @route   POST /api/posts
 * @desc    Create a post for logged-in user
 * @access  Private
 */
router.post(
  "/",
  authenticate,
  createPostValidation,
  handleValidationErrors,
  postController.createPost,
);

/**
 * @route   GET /api/posts
 * @desc    Get posts with optional user filter
 * @access  Private
 */
router.get(
  "/",
  authenticate,
  listPostsValidation,
  handleValidationErrors,
  postController.getPosts,
);

/**
 * @route   PUT /api/posts/:postId
 * @desc    Update a post for logged-in user
 * @access  Private
 */
router.put(
  "/:postId",
  authenticate,
  updatePostValidation,
  handleValidationErrors,
  postController.updatePost,
);

/**
 * @route   DELETE /api/posts/:postId
 * @desc    Delete a post for logged-in user
 * @access  Private
 */
router.delete(
  "/:postId",
  authenticate,
  deletePostValidation,
  handleValidationErrors,
  postController.deletePost,
);

/**
 * @route   POST /api/posts/:postId/comments
 * @desc    Add comment to a post for logged-in user
 * @access  Private
 */
router.post(
  "/:postId/comments",
  authenticate,
  createCommentValidation,
  handleValidationErrors,
  postController.createComment,
);

/**
 * @route   GET /api/posts/:postId/comments
 * @desc    Get comments for a post with optional user filter
 * @access  Private
 */
router.get(
  "/:postId/comments",
  authenticate,
  listCommentsValidation,
  handleValidationErrors,
  postController.getCommentsByPost,
);

/**
 * @route   PUT /api/posts/:postId/comments/:commentId
 * @desc    Update a comment for logged-in user
 * @access  Private
 */
router.put(
  "/:postId/comments/:commentId",
  authenticate,
  updateCommentValidation,
  handleValidationErrors,
  postController.updateComment,
);

/**
 * @route   DELETE /api/posts/:postId/comments/:commentId
 * @desc    Delete a comment for logged-in user
 * @access  Private
 */
router.delete(
  "/:postId/comments/:commentId",
  authenticate,
  deleteCommentValidation,
  handleValidationErrors,
  postController.deleteComment,
);

module.exports = router;
