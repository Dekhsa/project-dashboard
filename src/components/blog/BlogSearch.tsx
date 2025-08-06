import React from 'react';
import { Search } from 'lucide-react';

interface BlogSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const BlogSearch: React.FC<BlogSearchProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative">
      <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search blog posts..."
        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-auto"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search blog posts"
      />
    </div>
  );
};

export default BlogSearch;
