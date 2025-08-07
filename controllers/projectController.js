// Project Controller with Firebase Realtime Database
const { db } = require('../config/firebase');

const projectController = {
  // Get all projects
  getAllProjects: async (req, res) => {
    try {
      const projectsRef = db.ref('projects');
      const snapshot = await projectsRef.once('value');
      const projects = [];
      
      snapshot.forEach((childSnapshot) => {
        projects.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      res.json({
        success: true,
        message: "Projects fetched successfully",
        data: projects
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Create new project
  createProject: async (req, res) => {
    try {
      const { title, description, status = 'active', technologies = [], progress = 0 } = req.body;

      // Validation already handled by middleware
      const newProject = {
        title,
        description,
        status,
        technologies,
        progress,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Save to Firebase
      const projectsRef = db.ref('projects');
      const newProjectRef = await projectsRef.push(newProject);

      res.status(201).json({
        success: true,
        message: "Project created successfully",
        data: {
          id: newProjectRef.key,
          ...newProject
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Update project
  updateProject: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = {
        ...req.body,
        updatedAt: new Date().toISOString()
      };

      // Update in Firebase
      const projectRef = db.ref(`projects/${id}`);
      await projectRef.update(updates);

      res.json({
        success: true,
        message: "Project updated successfully",
        data: { id, ...updates }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Delete project
  deleteProject: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Delete from Firebase
      const projectRef = db.ref(`projects/${id}`);
      await projectRef.remove();

      res.json({
        success: true,
        message: "Project deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};

module.exports = projectController;
