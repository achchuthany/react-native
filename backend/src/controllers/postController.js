const Post = require("../models/Post");
const {
  createSuccessResponse,
  createErrorResponse,
} = require("../utils/helpers");

/**
 * Create a new post
 * POST /api/posts
 */
const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    const post = await Post.create({ userId, title, content });

    res
      .status(201)
      .json(createSuccessResponse(post, "Post created successfully"));
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json(createErrorResponse("Failed to create post"));
  }
};

/**
 * Get all posts with optional user filter
 * GET /api/posts?userId=<uuid>&page=1&limit=20
 */
const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const offset = (page - 1) * limit;

    const targetUserId = req.query.userId;

    const [posts, totalCount] = await Promise.all([
      Post.findAll({ userId: targetUserId, limit, offset }),
      Post.count(targetUserId),
    ]);

    res.status(200).json(
      createSuccessResponse(
        {
          posts,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
            totalCount,
            limit,
          },
        },
        "Posts retrieved successfully",
      ),
    );
  } catch (error) {
    console.error("Get posts error:", error);
    res.status(500).json(createErrorResponse("Failed to retrieve posts"));
  }
};

/**
 * Update a post owned by logged-in user
 * PUT /api/posts/:postId
 */
const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;
    const { title, content } = req.body;

    const existingPost = await Post.findById(postId);
    if (!existingPost) {
      return res.status(404).json(createErrorResponse("Post not found", 404));
    }

    if (existingPost.user_id !== userId) {
      return res
        .status(403)
        .json(
          createErrorResponse("You are not allowed to update this post", 403),
        );
    }

    const updates = {};
    if (title !== undefined) updates.title = title;
    if (content !== undefined) updates.content = content;

    if (Object.keys(updates).length === 0) {
      return res
        .status(400)
        .json(createErrorResponse("No fields to update", 400));
    }

    const updatedPost = await Post.update(postId, userId, updates);

    res
      .status(200)
      .json(createSuccessResponse(updatedPost, "Post updated successfully"));
  } catch (error) {
    console.error("Update post error:", error);
    res.status(500).json(createErrorResponse("Failed to update post"));
  }
};

/**
 * Delete a post owned by logged-in user
 * DELETE /api/posts/:postId
 */
const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const existingPost = await Post.findById(postId);
    if (!existingPost) {
      return res.status(404).json(createErrorResponse("Post not found", 404));
    }

    if (existingPost.user_id !== userId) {
      return res
        .status(403)
        .json(
          createErrorResponse("You are not allowed to delete this post", 403),
        );
    }

    const deletedPost = await Post.delete(postId, userId);

    res
      .status(200)
      .json(
        createSuccessResponse(
          { id: deletedPost.id },
          "Post deleted successfully",
        ),
      );
  } catch (error) {
    console.error("Delete post error:", error);
    res.status(500).json(createErrorResponse("Failed to delete post"));
  }
};

/**
 * Add a comment to a post
 * POST /api/posts/:postId/comments
 */
const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json(createErrorResponse("Post not found", 404));
    }

    const comment = await Post.createComment({ postId, userId, content });

    res
      .status(201)
      .json(createSuccessResponse(comment, "Comment created successfully"));
  } catch (error) {
    console.error("Create comment error:", error);
    res.status(500).json(createErrorResponse("Failed to create comment"));
  }
};

/**
 * Get comments for a post with optional user filter
 * GET /api/posts/:postId/comments?userId=<uuid>&page=1&limit=50
 */
const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 50;
    const offset = (page - 1) * limit;

    const targetUserId = req.query.userId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json(createErrorResponse("Post not found", 404));
    }

    const [comments, totalCount] = await Promise.all([
      Post.findCommentsByPostId({
        postId,
        userId: targetUserId,
        limit,
        offset,
      }),
      Post.countCommentsByPostId(postId, targetUserId),
    ]);

    res.status(200).json(
      createSuccessResponse(
        {
          post,
          comments,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
            totalCount,
            limit,
          },
        },
        "Comments retrieved successfully",
      ),
    );
  } catch (error) {
    console.error("Get comments error:", error);
    res.status(500).json(createErrorResponse("Failed to retrieve comments"));
  }
};

/**
 * Update a comment owned by logged-in user
 * PUT /api/posts/:postId/comments/:commentId
 */
const updateComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json(createErrorResponse("Post not found", 404));
    }

    const existingComment = await Post.findCommentById(commentId, postId);
    if (!existingComment) {
      return res
        .status(404)
        .json(createErrorResponse("Comment not found", 404));
    }

    if (existingComment.user_id !== userId) {
      return res
        .status(403)
        .json(
          createErrorResponse(
            "You are not allowed to update this comment",
            403,
          ),
        );
    }

    const updatedComment = await Post.updateComment(
      commentId,
      postId,
      userId,
      content,
    );

    res
      .status(200)
      .json(
        createSuccessResponse(updatedComment, "Comment updated successfully"),
      );
  } catch (error) {
    console.error("Update comment error:", error);
    res.status(500).json(createErrorResponse("Failed to update comment"));
  }
};

/**
 * Delete a comment owned by logged-in user
 * DELETE /api/posts/:postId/comments/:commentId
 */
const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json(createErrorResponse("Post not found", 404));
    }

    const existingComment = await Post.findCommentById(commentId, postId);
    if (!existingComment) {
      return res
        .status(404)
        .json(createErrorResponse("Comment not found", 404));
    }

    if (existingComment.user_id !== userId) {
      return res
        .status(403)
        .json(
          createErrorResponse(
            "You are not allowed to delete this comment",
            403,
          ),
        );
    }

    const deletedComment = await Post.deleteComment(commentId, postId, userId);

    res
      .status(200)
      .json(
        createSuccessResponse(
          { id: deletedComment.id },
          "Comment deleted successfully",
        ),
      );
  } catch (error) {
    console.error("Delete comment error:", error);
    res.status(500).json(createErrorResponse("Failed to delete comment"));
  }
};

module.exports = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
};
