// Blog Controller
const blogController = {
  // Get all blog posts
  getAllPosts: async (req, res) => {
    try {
      res.json({
        success: true,
        message: "Blog posts fetched successfully"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Create new blog post
  createPost: async (req, res) => {
    try {
      const { title, content, excerpt, tags, published } = req.body;
      
      // Validation
      if (!title || !content) {
        return res.status(400).json({
          success: false,
          message: "Title and content are required"
        });
      }

      res.status(201).json({
        success: true,
        message: "Blog post created successfully"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = blogController;
