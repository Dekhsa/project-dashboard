// Blog Controller with Firebase Realtime Database
const { db } = require('../config/firebase');

const blogController = {
  // Get all blog posts
  getAllPosts: async (req, res) => {
    try {
      const postsRef = db.ref('blogPosts');
      const snapshot = await postsRef.once('value');
      const posts = [];
      
      snapshot.forEach((childSnapshot) => {
        posts.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      res.json({
        success: true,
        message: "Blog posts fetched successfully",
        data: posts
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Create new blog post
  createPost: async (req, res) => {
    try {
      const { title, content, excerpt, tags = [], published = false } = req.body;

      // Validation already handled by middleware
      const newPost = {
        title,
        content,
        excerpt,
        tags,
        published,
        author: 'Admin', // You can get this from user authentication later
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Save to Firebase
      const postsRef = db.ref('blogPosts');
      const newPostRef = await postsRef.push(newPost);

      res.status(201).json({
        success: true,
        message: "Blog post created successfully",
        data: {
          id: newPostRef.key,
          ...newPost
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Update blog post
  updatePost: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = {
        ...req.body,
        updatedAt: new Date().toISOString()
      };

      // Update in Firebase
      const postRef = db.ref(`blogPosts/${id}`);
      await postRef.update(updates);

      res.json({
        success: true,
        message: "Blog post updated successfully",
        data: { id, ...updates }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Delete blog post
  deletePost: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Delete from Firebase
      const postRef = db.ref(`blogPosts/${id}`);
      await postRef.remove();

      res.json({
        success: true,
        message: "Blog post created successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};

module.exports = blogController;
