import React from "react";
import { Search, Filter } from "lucide-react";

interface SearchAndFiltersProps {
  activeTab: "experience" | "skills" | "achievements";
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterCategory: string;
  onFilterChange: (value: string) => void;
}

const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  activeTab,
  searchTerm,
  onSearchChange,
  filterCategory,
  onFilterChange,
}) => {
  return (
    <div className="flex space-x-4">
      <div className="relative">
        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder={`Search ${activeTab}...`}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label={`Search ${activeTab}`}
        />
      </div>

      {(activeTab === "skills" || activeTab === "achievements") && (
        <div className="relative">
          <Filter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            value={filterCategory}
            onChange={(e) => onFilterChange(e.target.value)}
            aria-label="Filter by category"
          >
            <option value="all">All Categories</option>
            {activeTab === "skills" ? (
              <>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="database">Database</option>
                <option value="tools">Tools</option>
                <option value="soft-skills">Soft Skills</option>
              </>
            ) : (
              <>
                <option value="certification">Certifications</option>
                <option value="award">Awards</option>
                <option value="project">Projects</option>
                <option value="recognition">Recognition</option>
                <option value="education">Education</option>
              </>
            )}
          </select>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilters;
