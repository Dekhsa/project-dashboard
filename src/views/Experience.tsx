import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Plus } from "lucide-react";
import { Experience, Skill, Achievement } from "../types";
import {
  TabNavigation,
  ExperienceCard,
  SkillCard,
  AchievementCard,
  ExperienceModal,
  SkillModal,
  AchievementModal,
} from "../components/experience";
import { experienceAPI, skillsAPI, achievementsAPI } from "../utils/api";

// FILTER REMOVED - Cache bust 20250807-3 - NO MORE FILTERS
const ExperienceSkills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "experience" | "skills" | "achievements"
  >("experience");
  // State for experiences
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [experienceLoading, setExperienceLoading] = useState(true);
  const [experienceError, setExperienceError] = useState<string | null>(null);

  // State for skills
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [skillsError, setSkillsError] = useState<string | null>(null);

  // State for achievements
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [achievementsLoading, setAchievementsLoading] = useState(true);
  const [achievementsError, setAchievementsError] = useState<string | null>(
    null
  );

  // Modal states
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showAchievementModal, setShowAchievementModal] = useState(false);

  // Editing states
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);

  // Form data states
  const [experienceFormData, setExperienceFormData] = useState({
    company: "",
    position: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
    technologies: "",
    type: "work" as "work" | "internship" | "freelance",
  });

  const [skillFormData, setSkillFormData] = useState({
    name: "",
    category: "frontend" as "frontend" | "backend" | "database" | "tools" | "soft-skills",
    level: "beginner" as "beginner" | "intermediate" | "advanced" | "expert",
    yearsOfExperience: 0,
    description: "",
  });

  const [achievementFormData, setAchievementFormData] = useState({
    title: "",
    description: "",
    date: "",
    category: "certification" as "certification" | "award" | "project" | "recognition" | "education",
    issuer: "",
    credentialId: "",
    credentialUrl: "",
    skills: "",
    featured: false,
  });

  useEffect(() => {
    fetchExperiences();
    fetchSkills();
    fetchAchievements();
  }, []);

  const fetchExperiences = async () => {
    try {
      setExperienceLoading(true);
      const response = await experienceAPI.getAll();
      // Defensive array check to prevent filter errors
      const experiencesData = Array.isArray(response.data) ? response.data : [];
      setExperiences(experiencesData);
      setExperienceError(null);
    } catch (err) {
      setExperienceError("Failed to load experiences");
      console.error("Error fetching experiences:", err);
      // Set empty array on error to prevent filter issues
      setExperiences([]);
    } finally {
      setExperienceLoading(false);
    }
  };

  const fetchSkills = async () => {
    try {
      setSkillsLoading(true);
      const response = await skillsAPI.getAll();
      // Defensive array check to prevent filter errors
      const skillsData = Array.isArray(response.data) ? response.data : [];
      setSkills(skillsData);
      setSkillsError(null);
    } catch (err) {
      setSkillsError("Failed to load skills");
      console.error("Error fetching skills:", err);
      // Set empty array on error to prevent filter issues
      setSkills([]);
    } finally {
      setSkillsLoading(false);
    }
  };

  const fetchAchievements = async () => {
    try {
      setAchievementsLoading(true);
      const response = await achievementsAPI.getAll();
      // Defensive array check to prevent filter errors
      const achievementsData = Array.isArray(response.data)
        ? response.data
        : [];
      setAchievements(achievementsData);
      setAchievementsError(null);
    } catch (err) {
      setAchievementsError("Failed to load achievements");
      console.error("Error fetching achievements:", err);
      // Set empty array on error to prevent filter issues
      setAchievements([]);
    } finally {
      setAchievementsLoading(false);
    }
  };

  // Form reset functions
  const resetExperienceForm = () => {
    setExperienceFormData({
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      technologies: "",
      type: "work",
    });
    setEditingExperience(null);
    setShowExperienceModal(false);
  };

  const resetSkillForm = () => {
    setSkillFormData({
      name: "",
      category: "frontend",
      level: "beginner",
      yearsOfExperience: 0,
      description: "",
    });
    setEditingSkill(null);
    setShowSkillModal(false);
  };

  const resetAchievementForm = () => {
    setAchievementFormData({
      title: "",
      description: "",
      date: "",
      category: "certification",
      issuer: "",
      credentialId: "",
      credentialUrl: "",
      skills: "",
      featured: false,
    });
    setEditingAchievement(null);
    setShowAchievementModal(false);
  };

  // Edit handlers
  const handleEditExperience = (experience: Experience) => {
    setEditingExperience(experience);
    setExperienceFormData({
      company: experience.company,
      position: experience.position,
      location: experience.location,
      startDate: experience.startDate,
      endDate: experience.endDate || "",
      current: experience.current,
      description: experience.description,
      technologies: experience.technologies.join(", "),
      type: experience.type,
    });
    setShowExperienceModal(true);
  };

  const handleEditSkill = (skill: Skill) => {
    setEditingSkill(skill);
    setSkillFormData({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      yearsOfExperience: skill.yearsOfExperience,
      description: skill.description || "",
    });
    setShowSkillModal(true);
  };

  const handleEditAchievement = (achievement: Achievement) => {
    setEditingAchievement(achievement);
    setAchievementFormData({
      title: achievement.title,
      description: achievement.description,
      date: achievement.date,
      category: achievement.category,
      issuer: achievement.issuer || "",
      credentialId: achievement.credentialId || "",
      credentialUrl: achievement.credentialUrl || "",
      skills: achievement.skills?.join(", ") || "",
      featured: achievement.featured,
    });
    setShowAchievementModal(true);
  };

  // Create/Update handlers
  const handleExperienceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const techArray = experienceFormData.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter((tech) => tech);

      const experienceData = {
        company: experienceFormData.company,
        position: experienceFormData.position,
        location: experienceFormData.location,
        startDate: experienceFormData.startDate,
        endDate: experienceFormData.current ? undefined : experienceFormData.endDate,
        current: experienceFormData.current,
        description: experienceFormData.description,
        technologies: techArray,
        type: experienceFormData.type,
      };

      if (editingExperience) {
        await experienceAPI.update(editingExperience.id, experienceData);
      } else {
        await experienceAPI.create(experienceData);
      }

      await fetchExperiences();
      resetExperienceForm();
      setExperienceError(null);
    } catch (err) {
      setExperienceError("Failed to save experience");
      console.error("Error saving experience:", err);
    }
  };

  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const skillData = {
        name: skillFormData.name,
        category: skillFormData.category,
        level: skillFormData.level,
        yearsOfExperience: skillFormData.yearsOfExperience,
        description: skillFormData.description,
      };

      if (editingSkill) {
        await skillsAPI.update(editingSkill.id, skillData);
      } else {
        await skillsAPI.create(skillData);
      }

      await fetchSkills();
      resetSkillForm();
      setSkillsError(null);
    } catch (err) {
      setSkillsError("Failed to save skill");
      console.error("Error saving skill:", err);
    }
  };

  const handleAchievementSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const skillsArray = achievementFormData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill);

      const achievementData = {
        title: achievementFormData.title,
        description: achievementFormData.description,
        date: achievementFormData.date,
        category: achievementFormData.category,
        issuer: achievementFormData.issuer || undefined,
        credentialId: achievementFormData.credentialId || undefined,
        credentialUrl: achievementFormData.credentialUrl || undefined,
        skills: skillsArray.length > 0 ? skillsArray : undefined,
        featured: achievementFormData.featured,
      };

      if (editingAchievement) {
        await achievementsAPI.update(editingAchievement.id, achievementData);
      } else {
        await achievementsAPI.create(achievementData);
      }

      await fetchAchievements();
      resetAchievementForm();
      setAchievementsError(null);
    } catch (err) {
      setAchievementsError("Failed to save achievement");
      console.error("Error saving achievement:", err);
    }
  };

  // Delete handlers
  const handleDeleteExperience = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      try {
        await experienceAPI.delete(id);
        await fetchExperiences();
        setExperienceError(null);
      } catch (err) {
        setExperienceError("Failed to delete experience");
        console.error("Error deleting experience:", err);
      }
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        await skillsAPI.delete(id);
        await fetchSkills();
        setSkillsError(null);
      } catch (err) {
        setSkillsError("Failed to delete skill");
        console.error("Error deleting skill:", err);
      }
    }
  };

  const handleDeleteAchievement = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this achievement?")) {
      try {
        await achievementsAPI.delete(id);
        await fetchAchievements();
        setAchievementsError(null);
      } catch (err) {
        setAchievementsError("Failed to delete achievement");
        console.error("Error deleting achievement:", err);
      }
    }
  };

  const renderTabContent = () => {
    const currentLoading =
      activeTab === "experience"
        ? experienceLoading
        : activeTab === "skills"
        ? skillsLoading
        : achievementsLoading;

    const currentError =
      activeTab === "experience"
        ? experienceError
        : activeTab === "skills"
        ? skillsError
        : achievementsError;

    if (currentLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading {activeTab}...</span>
        </div>
      );
    }

    if (currentError) {
      return (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {currentError}
        </div>
      );
    }

    switch (activeTab) {
      case "experience":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiences.map((experience) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                onEdit={handleEditExperience}
                onDelete={handleDeleteExperience}
              />
            ))}
            {experiences.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                No experiences found.
              </div>
            )}
          </div>
        );

      case "skills":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                onEdit={handleEditSkill}
                onDelete={handleDeleteSkill}
              />
            ))}
            {skills.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                No skills found.
              </div>
            )}
          </div>
        );

      case "achievements":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                onEdit={handleEditAchievement}
                onDelete={handleDeleteAchievement}
              />
            ))}
            {achievements.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                No achievements found.
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const getAddButtonText = () => {
    switch (activeTab) {
      case "experience":
        return "New Experience";
      case "skills":
        return "New Skill";
      case "achievements":
        return "New Achievement";
      default:
        return "Add New";
    }
  };

  const handleAddClick = () => {
    switch (activeTab) {
      case "experience":
        setShowExperienceModal(true);
        break;
      case "skills":
        setShowSkillModal(true);
        break;
      case "achievements":
        setShowAchievementModal(true);
        break;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Experience & Skills
            </h1>
            <p className="text-gray-600">
              Manage your professional experience, skills, and achievements
            </p>
          </div>
          <button
            onClick={handleAddClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>{getAddButtonText()}</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        {renderTabContent()}

        {/* Modals */}
        <ExperienceModal
          isOpen={showExperienceModal}
          onClose={resetExperienceForm}
          onSubmit={handleExperienceSubmit}
          formData={experienceFormData}
          setFormData={setExperienceFormData}
          editingItem={editingExperience}
        />

        <SkillModal
          isOpen={showSkillModal}
          onClose={resetSkillForm}
          onSubmit={handleSkillSubmit}
          formData={skillFormData}
          setFormData={setSkillFormData}
          editingItem={editingSkill}
        />

        <AchievementModal
          isOpen={showAchievementModal}
          onClose={resetAchievementForm}
          onSubmit={handleAchievementSubmit}
          formData={achievementFormData}
          setFormData={setAchievementFormData}
          editingItem={editingAchievement}
        />
      </div>
    </Layout>
  );
};

export default ExperienceSkills;
