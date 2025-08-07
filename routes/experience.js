const express = require('express');
const router = express.Router();
const { experienceController, skillController, achievementController } = require('../controllers/experienceController');
const { validateExperience, validateSkill, validateAchievement } = require('../middleware/validation');

// Experience routes
router.get('/experiences', experienceController.getAllExperiences);
router.post('/experiences', validateExperience, experienceController.createExperience);
router.put('/experiences/:id', experienceController.updateExperience);
router.delete('/experiences/:id', experienceController.deleteExperience);

// Skills routes
router.get('/skills', skillController.getAllSkills);
router.post('/skills', validateSkill, skillController.createSkill);
router.put('/skills/:id', skillController.updateSkill);
router.delete('/skills/:id', skillController.deleteSkill);

// Achievements routes
router.get('/achievements', achievementController.getAllAchievements);
router.post('/achievements', validateAchievement, achievementController.createAchievement);
router.put('/achievements/:id', achievementController.updateAchievement);
router.delete('/achievements/:id', achievementController.deleteAchievement);

module.exports = router;
