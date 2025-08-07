import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Experience, Skill, Achievement } from "../types";
import {
  TabNavigation,
  ExperienceCard,
  SkillCard,
  AchievementCard,
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

  // Wrapper functions for edit handlers to match component expectations
  const handleEditExperience = (experience: Experience) => {
    // This will need to be implemented with a modal or form
    console.log("Edit experience:", experience);
    // For now, just pass the full object as update data
    handleUpdateExperience(experience.id, experience);
  };

  const handleEditSkill = (skill: Skill) => {
    // This will need to be implemented with a modal or form
    console.log("Edit skill:", skill);
    // For now, just pass the full object as update data
    handleUpdateSkill(skill.id, skill);
  };

  const handleEditAchievement = (achievement: Achievement) => {
    // This will need to be implemented with a modal or form
    console.log("Edit achievement:", achievement);
    // For now, just pass the full object as update data
    handleUpdateAchievement(achievement.id, achievement);
  };

  // CRUD handlers for experiences

  const handleUpdateExperience = async (
    id: string,
    data: Partial<Experience>
  ) => {
    try {
      await experienceAPI.update(id, data);
      await fetchExperiences();
      setExperienceError(null);
    } catch (err) {
      setExperienceError("Failed to update experience");
      console.error("Error updating experience:", err);
    }
  };

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

  // CRUD handlers for skills

  const handleUpdateSkill = async (id: string, data: Partial<Skill>) => {
    try {
      await skillsAPI.update(id, data);
      await fetchSkills();
      setSkillsError(null);
    } catch (err) {
      setSkillsError("Failed to update skill");
      console.error("Error updating skill:", err);
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

  // CRUD handlers for achievements

  const handleUpdateAchievement = async (
    id: string,
    data: Partial<Achievement>
  ) => {
    try {
      await achievementsAPI.update(id, data);
      await fetchAchievements();
      setAchievementsError(null);
    } catch (err) {
      setAchievementsError("Failed to update achievement");
      console.error("Error updating achievement:", err);
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
        </div>

        {/* Tab Navigation */}
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </Layout>
  );
};

export default ExperienceSkills;
