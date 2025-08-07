// Validation Middleware
const validateProject = (req, res, next) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      success: false,
      message: "Title and description are required",
    });
  }

  if (title.length < 3) {
    return res.status(400).json({
      success: false,
      message: "Title must be at least 3 characters long",
    });
  }

  next();
};

const validateBlogPost = (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: "Title and content are required",
    });
  }

  if (title.length < 3) {
    return res.status(400).json({
      success: false,
      message: "Title must be at least 3 characters long",
    });
  }

  next();
};

const validateExperience = (req, res, next) => {
  const { company, position, startDate } = req.body;

  if (!company || !position || !startDate) {
    return res.status(400).json({
      success: false,
      message: "Company, position, and start date are required",
    });
  }

  next();
};

const validateSkill = (req, res, next) => {
  const { name, category, level } = req.body;

  if (!name || !category || !level) {
    return res.status(400).json({
      success: false,
      message: "Name, category, and level are required",
    });
  }

  const validCategories = ['frontend', 'backend', 'database', 'tools', 'soft-skills'];
  const validLevels = ['beginner', 'intermediate', 'advanced', 'expert'];

  if (!validCategories.includes(category)) {
    return res.status(400).json({
      success: false,
      message: "Invalid category",
    });
  }

  if (!validLevels.includes(level)) {
    return res.status(400).json({
      success: false,
      message: "Invalid level",
    });
  }

  next();
};

const validateAchievement = (req, res, next) => {
  const { title, description, date, category } = req.body;

  if (!title || !description || !date || !category) {
    return res.status(400).json({
      success: false,
      message: "Title, description, date, and category are required",
    });
  }

  const validCategories = ['certification', 'award', 'project', 'recognition', 'education'];
  
  if (!validCategories.includes(category)) {
    return res.status(400).json({
      success: false,
      message: "Invalid category",
    });
  }

  next();
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong!",
  });
};

// 404 middleware
const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
};

module.exports = {
  validateProject,
  validateBlogPost,
  validateExperience,
  validateSkill,
  validateAchievement,
  errorHandler,
  notFound,
};
