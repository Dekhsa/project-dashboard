// Experience Controller with Firebase Realtime Database
const { db } = require('../config/firebase');

const experienceController = {
  // Get all experiences
  getAllExperiences: async (req, res) => {
    try {
      const experiencesRef = db.ref('experiences');
      const snapshot = await experiencesRef.once('value');
      const experiences = [];
      
      snapshot.forEach((childSnapshot) => {
        experiences.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      res.json({
        success: true,
        message: "Experiences fetched successfully",
        data: experiences
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Create new experience
  createExperience: async (req, res) => {
    try {
      const { company, position, location, startDate, endDate, current, description, technologies, type } = req.body;

      const newExperience = {
        company,
        position,
        location,
        startDate,
        endDate: current ? null : endDate,
        current: current || false,
        description,
        technologies: technologies || [],
        type: type || 'work'
      };

      // Save to Firebase
      const experiencesRef = db.ref('experiences');
      const newExperienceRef = await experiencesRef.push(newExperience);

      res.status(201).json({
        success: true,
        message: "Experience created successfully",
        data: {
          id: newExperienceRef.key,
          ...newExperience
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Update experience
  updateExperience: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      // Update in Firebase
      const experienceRef = db.ref(`experiences/${id}`);
      await experienceRef.update(updates);

      res.json({
        success: true,
        message: "Experience updated successfully",
        data: { id, ...updates }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Delete experience
  deleteExperience: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Delete from Firebase
      const experienceRef = db.ref(`experiences/${id}`);
      await experienceRef.remove();

      res.json({
        success: true,
        message: "Experience deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

// Skills Controller
const skillController = {
  // Get all skills
  getAllSkills: async (req, res) => {
    try {
      const skillsRef = db.ref('skills');
      const snapshot = await skillsRef.once('value');
      const skills = [];
      
      snapshot.forEach((childSnapshot) => {
        skills.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      res.json({
        success: true,
        message: "Skills fetched successfully",
        data: skills
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Create new skill
  createSkill: async (req, res) => {
    try {
      const { name, category, level, yearsOfExperience, description } = req.body;

      const newSkill = {
        name,
        category,
        level,
        yearsOfExperience: yearsOfExperience || 0,
        description
      };

      // Save to Firebase
      const skillsRef = db.ref('skills');
      const newSkillRef = await skillsRef.push(newSkill);

      res.status(201).json({
        success: true,
        message: "Skill created successfully",
        data: {
          id: newSkillRef.key,
          ...newSkill
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Update skill
  updateSkill: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      // Update in Firebase
      const skillRef = db.ref(`skills/${id}`);
      await skillRef.update(updates);

      res.json({
        success: true,
        message: "Skill updated successfully",
        data: { id, ...updates }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Delete skill
  deleteSkill: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Delete from Firebase
      const skillRef = db.ref(`skills/${id}`);
      await skillRef.remove();

      res.json({
        success: true,
        message: "Skill deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

// Achievements Controller
const achievementController = {
  // Get all achievements
  getAllAchievements: async (req, res) => {
    try {
      const achievementsRef = db.ref('achievements');
      const snapshot = await achievementsRef.once('value');
      const achievements = [];
      
      snapshot.forEach((childSnapshot) => {
        achievements.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      res.json({
        success: true,
        message: "Achievements fetched successfully",
        data: achievements
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Create new achievement
  createAchievement: async (req, res) => {
    try {
      const { title, description, date, category, issuer, credentialId, credentialUrl, skills, featured } = req.body;

      const newAchievement = {
        title,
        description,
        date,
        category,
        issuer,
        credentialId,
        credentialUrl,
        skills: skills || [],
        featured: featured || false
      };

      // Save to Firebase
      const achievementsRef = db.ref('achievements');
      const newAchievementRef = await achievementsRef.push(newAchievement);

      res.status(201).json({
        success: true,
        message: "Achievement created successfully",
        data: {
          id: newAchievementRef.key,
          ...newAchievement
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Update achievement
  updateAchievement: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      // Update in Firebase
      const achievementRef = db.ref(`achievements/${id}`);
      await achievementRef.update(updates);

      res.json({
        success: true,
        message: "Achievement updated successfully",
        data: { id, ...updates }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Delete achievement
  deleteAchievement: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Delete from Firebase
      const achievementRef = db.ref(`achievements/${id}`);
      await achievementRef.remove();

      res.json({
        success: true,
        message: "Achievement deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

module.exports = {
  experienceController,
  skillController,
  achievementController
};
