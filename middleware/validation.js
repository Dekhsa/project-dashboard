// Validation Middleware
const validateProject = (req, res, next) => {
  const { title, description } = req.body;
  
  if (!title || !description) {
    return res.status(400).json({
      success: false,
      message: "Title and description are required"
    });
  }
  
  if (title.length < 3) {
    return res.status(400).json({
      success: false,
      message: "Title must be at least 3 characters long"
    });
  }
  
  next();
};

const validateBlogPost = (req, res, next) => {
  const { title, content } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: "Title and content are required"
    });
  }
  
  if (title.length < 3) {
    return res.status(400).json({
      success: false,
      message: "Title must be at least 3 characters long"
    });
  }
  
  next();
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Something went wrong!'
  });
};

// 404 middleware
const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
};

module.exports = {
  validateProject,
  validateBlogPost,
  errorHandler,
  notFound
};
