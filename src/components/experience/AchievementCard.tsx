import React from "react";
import {
  Edit2,
  Trash2,
  Star,
  Building2,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { Achievement } from "../../types";

interface AchievementCardProps {
  achievement: Achievement;
  onEdit: (achievement: Achievement) => void;
  onDelete: (id: string) => void;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  onEdit,
  onDelete,
}) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "certification":
        return "bg-green-100 text-green-800";
      case "award":
        return "bg-yellow-100 text-yellow-800";
      case "project":
        return "bg-blue-100 text-blue-800";
      case "recognition":
        return "bg-purple-100 text-purple-800";
      case "education":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {achievement.title}
            </h3>
            {achievement.featured && (
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
            )}
          </div>

          <div className="flex items-center text-gray-600 mb-2">
            {achievement.issuer && (
              <>
                <Building2 className="w-4 h-4 mr-1" />
                <span className="font-medium mr-4">{achievement.issuer}</span>
              </>
            )}
            <Calendar className="w-4 h-4 mr-1" />
            <span>
              {new Date(achievement.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </span>
          </div>

          <p className="text-gray-700 mb-3">{achievement.description}</p>

          <div className="flex items-center space-x-4 mb-3">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
                achievement.category
              )}`}
            >
              {achievement.category}
            </span>

            {achievement.credentialId && (
              <span className="text-sm text-gray-500">
                ID: {achievement.credentialId}
              </span>
            )}

            {achievement.credentialUrl && (
              <a
                href={achievement.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Verify
              </a>
            )}
          </div>

          {achievement.skills && achievement.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {achievement.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onEdit(achievement)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            aria-label="Edit achievement"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(achievement.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Delete achievement"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;
