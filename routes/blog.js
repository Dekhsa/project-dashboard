// Blog Routes
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { validateBlogPost } = require('../middleware/validation');

// GET /api/blog - Get all blog posts
router.get('/', blogController.getAllPosts);

// POST /api/blog - Create new blog post
router.post('/', validateBlogPost, blogController.createPost);

module.exports = router;
