// Project Dashboard - Main Entry Point
require('dotenv').config();

console.log("Welcome to Project Dashboard!");

// Basic server setup
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? false : 'http://localhost:3000',
  credentials: true
}));

// Serve React app from build folder (for production)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));

  // Serve React app for all non-API routes
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
} else {
  // Development mode - serve basic API only
  app.get("/", (req, res) => {
    res.json({
      message: "Project Dashboard API Server",
      status: "Development Mode",
      frontend: "React app running on http://localhost:3000",
      api: "API server running on http://localhost:3001"
    });
  });
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Project Dashboard API is running!",
    timestamp: new Date().toISOString()
  });
});

// Mock data for development
const mockProjects = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform built with React and Node.js',
    status: 'active',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-15',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    progress: 75
  },
  {
    id: '2',
    title: 'Mobile App',
    description: 'Cross-platform mobile application using React Native',
    status: 'completed',
    createdAt: '2023-12-01',
    updatedAt: '2024-01-05',
    technologies: ['React Native', 'Firebase', 'Redux'],
    progress: 100
  }
];

const mockBlogPosts = [
  {
    id: '1',
    title: 'Getting Started with React',
    content: 'React is a powerful JavaScript library for building user interfaces...',
    excerpt: 'Learn the basics of React and start building amazing applications.',
    author: 'Admin',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    tags: ['React', 'JavaScript', 'Tutorial'],
    published: true
  }
];

// API endpoints
app.get("/api/projects", (req, res) => {
  res.json({ 
    success: true,
    data: mockProjects,
    total: mockProjects.length
  });
});

app.post("/api/projects", (req, res) => {
  const newProject = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0]
  };
  mockProjects.push(newProject);
  res.status(201).json({ 
    success: true,
    data: newProject,
    message: "Project created successfully"
  });
});

app.put("/api/projects/:id", (req, res) => {
  const { id } = req.params;
  const projectIndex = mockProjects.findIndex(p => p.id === id);
  
  if (projectIndex === -1) {
    return res.status(404).json({ 
      success: false, 
      message: "Project not found" 
    });
  }
  
  mockProjects[projectIndex] = {
    ...mockProjects[projectIndex],
    ...req.body,
    updatedAt: new Date().toISOString().split('T')[0]
  };
  
  res.json({ 
    success: true,
    data: mockProjects[projectIndex],
    message: "Project updated successfully"
  });
});

app.delete("/api/projects/:id", (req, res) => {
  const { id } = req.params;
  const projectIndex = mockProjects.findIndex(p => p.id === id);
  
  if (projectIndex === -1) {
    return res.status(404).json({ 
      success: false, 
      message: "Project not found" 
    });
  }
  
  mockProjects.splice(projectIndex, 1);
  res.json({ 
    success: true,
    message: "Project deleted successfully"
  });
});

app.get("/api/blog", (req, res) => {
  res.json({ 
    success: true,
    data: mockBlogPosts,
    total: mockBlogPosts.length
  });
});

app.post("/api/blog", (req, res) => {
  const newPost = {
    id: Date.now().toString(),
    ...req.body,
    author: 'Admin',
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0]
  };
  mockBlogPosts.push(newPost);
  res.status(201).json({ 
    success: true,
    data: newPost,
    message: "Blog post created successfully"
  });
});

app.get("/api/stats", (req, res) => {
  const stats = {
    totalVisitors: 8500,
    totalProjects: mockProjects.length,
    completedProjects: mockProjects.filter(p => p.status === 'completed').length,
    totalBlogPosts: mockBlogPosts.length,
    publishedPosts: mockBlogPosts.filter(p => p.published).length,
    monthlyVisitors: 2400
  };
  
  res.json({ 
    success: true,
    data: stats
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'API endpoint not found' 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Project Dashboard server running on http://localhost:${PORT}`);
});
