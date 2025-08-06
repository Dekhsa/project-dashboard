// Project Routes
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { validateProject } = require('../middleware/validation');

// GET /api/projects - Get all projects
router.get('/', projectController.getAllProjects);

// POST /api/projects - Create new project
router.post('/', validateProject, projectController.createProject);

// PUT /api/projects/:id - Update project
router.put('/:id', validateProject, projectController.updateProject);

// DELETE /api/projects/:id - Delete project
router.delete('/:id', projectController.deleteProject);

module.exports = router;
