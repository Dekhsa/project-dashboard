import React from "react";
import { Edit2, Trash2, MapPin, Calendar, Building2 } from "lucide-react";
import { Experience } from "../../types";

interface ExperienceCardProps {
  experience: Experience;
  onEdit: (experience: Experience) => void;
  onDelete: (id: string) => void;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  onEdit,
  onDelete,
}) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "work":
        return "bg-green-100 text-green-800";
      case "internship":
        return "bg-blue-100 text-blue-800";
      case "freelance":
        return "bg-purple-100 text-purple-800";
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
              {experience.position || "Unknown Position"}
            </h3>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(
                experience.type
              )}`}
            >
              {experience.type || "unknown"}
            </span>
          </div>
          <div className="flex items-center text-gray-600 mb-2">
            <Building2 className="w-4 h-4 mr-1" />
            <span className="font-medium">{experience.company || "Unknown Company"}</span>
            {experience.location && (
              <>
                <MapPin className="w-4 h-4 ml-4 mr-1" />
                <span>{experience.location}</span>
              </>
            )}
          </div>
          <div className="flex items-center text-gray-500 mb-3">
            <Calendar className="w-4 h-4 mr-1" />
            <span>
              {experience.startDate} -{" "}
              {experience.current ? "Present" : experience.endDate}
            </span>
          </div>
          <p className="text-gray-700 mb-3">{experience.description || "No description available"}</p>
          <div className="flex flex-wrap gap-2">
            {experience.technologies && Array.isArray(experience.technologies) && experience.technologies.length > 0 ? (
              experience.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {tech}
                </span>
              ))
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                No technologies specified
              </span>
            )}
          </div>
        </div>
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onEdit(experience)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            aria-label="Edit experience"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(experience.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Delete experience"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
