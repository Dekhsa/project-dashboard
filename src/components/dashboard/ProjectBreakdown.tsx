import React from "react";

interface ProjectStatus {
  status: string;
  count: number;
  percentage: number;
  color: string;
}

interface ProjectBreakdownProps {
  projectBreakdown: ProjectStatus[];
  completionPercentage: number;
}

const ProjectBreakdown: React.FC<ProjectBreakdownProps> = ({
  projectBreakdown,
  completionPercentage,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Project Overview
      </h2>

      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Overall Completion
          </span>
          <span className="text-sm font-bold text-gray-900">
            {completionPercentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`bg-green-500 h-2 rounded-full transition-all duration-300`}
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Project Status Breakdown */}
      <div className="space-y-4">
        {projectBreakdown.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <span className="text-sm font-medium text-gray-700">
                {item.status}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                {item.count} projects
              </span>
              <span className="text-sm font-bold text-gray-900">
                {item.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Progress Bar */}
      <div className="mt-4">
        <div className="flex w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          {projectBreakdown.map((item, index) => (
            <div
              key={index}
              className={`${item.color} transition-all duration-300`}
              style={{ width: `${item.percentage}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectBreakdown;
