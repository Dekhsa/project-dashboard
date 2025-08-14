import React from "react";
import { Edit2, Trash2, Star } from "lucide-react";
import { Skill } from "../../types";

interface SkillCardProps {
  skill: Skill;
  onEdit: (skill: Skill) => void;
  onDelete: (id: string) => void;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, onEdit, onDelete }) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-yellow-100 text-yellow-800";
      case "intermediate":
        return "bg-blue-100 text-blue-800";
      case "advanced":
        return "bg-green-100 text-green-800";
      case "expert":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "frontend":
        return "bg-blue-100 text-blue-800";
      case "backend":
        return "bg-green-100 text-green-800";
      case "database":
        return "bg-purple-100 text-purple-800";
      case "tools":
        return "bg-orange-100 text-orange-800";
      case "soft-skills":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderStars = (level: string) => {
    const stars = {
      beginner: 1,
      intermediate: 2,
      advanced: 3,
      expert: 4,
    };
    const count = stars[level as keyof typeof stars] || 1;

    return (
      <div className="flex">
        {[...Array(4)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < count ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{skill.name || "Unnamed Skill"}</h3>
        <div className="flex space-x-1">
          <button
            onClick={() => onEdit(skill)}
            className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
            aria-label="Edit skill"
          >
            <Edit2 className="w-3 h-3" />
          </button>
          <button
            onClick={() => onDelete(skill.id)}
            className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            aria-label="Delete skill"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
              skill.category || "tools"
            )}`}
          >
            {(skill.category || "tools").replace("-", " ")}
          </span>
          {renderStars(skill.level || "beginner")}
        </div>

        <div className="flex justify-between items-center">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelColor(
              skill.level || "beginner"
            )}`}
          >
            {skill.level || "beginner"}
          </span>
          <span className="text-sm text-gray-500">
            {skill.yearsOfExperience || 0} year
            {(skill.yearsOfExperience || 0) !== 1 ? "s" : ""}
          </span>
        </div>

        {skill.description && (
          <p className="text-sm text-gray-600">{skill.description}</p>
        )}
      </div>
    </div>
  );
};

export default SkillCard;
