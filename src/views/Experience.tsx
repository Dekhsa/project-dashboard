import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Plus } from 'lucide-react';
import { Experience, Skill, Achievement } from '../types';
import { 
  TabNavigation, 
  SearchAndFilters, 
  ExperienceCard, 
  SkillCard, 
  AchievementCard 
} from '../components/experience';

const ExperienceSkills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'experience' | 'skills' | 'achievements'>('experience');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Mock data for experiences
  const [experiences] = useState<Experience[]>([
    {
      id: '1',
      company: 'Tech Solutions Inc.',
      position: 'Senior Frontend Developer',
      location: 'San Francisco, CA',
      startDate: '2022-01',
      current: true,
      description: 'Leading frontend development team, building scalable React applications with TypeScript and modern development practices.',
      technologies: ['React', 'TypeScript', 'Next.js', 'TailwindCSS'],
      type: 'work'
    },
    {
      id: '2',
      company: 'Digital Agency Pro',
      position: 'Full Stack Developer',
      location: 'Remote',
      startDate: '2020-06',
      endDate: '2021-12',
      current: false,
      description: 'Developed and maintained multiple client websites and web applications using MERN stack.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      type: 'work'
    },
    {
      id: '3',
      company: 'StartupXYZ',
      position: 'Frontend Developer Intern',
      location: 'New York, NY',
      startDate: '2020-01',
      endDate: '2020-05',
      current: false,
      description: 'Assisted in building user interfaces for mobile and web applications.',
      technologies: ['React', 'JavaScript', 'CSS3', 'HTML5'],
      type: 'internship'
    }
  ]);

  // Mock data for skills
  const [skills] = useState<Skill[]>([
    {
      id: '1',
      name: 'React',
      category: 'frontend',
      level: 'expert',
      yearsOfExperience: 4,
      description: 'Building scalable React applications with modern practices'
    },
    {
      id: '2',
      name: 'TypeScript',
      category: 'frontend',
      level: 'advanced',
      yearsOfExperience: 3,
      description: 'Type-safe JavaScript development'
    },
    {
      id: '3',
      name: 'Node.js',
      category: 'backend',
      level: 'advanced',
      yearsOfExperience: 3,
      description: 'Server-side JavaScript development'
    },
    {
      id: '4',
      name: 'MongoDB',
      category: 'database',
      level: 'intermediate',
      yearsOfExperience: 2,
      description: 'NoSQL database design and implementation'
    }
  ]);

  // Mock data for achievements
  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'AWS Certified Developer',
      description: 'Certified in developing and maintaining applications on AWS platform.',
      date: '2023-06',
      category: 'certification',
      issuer: 'Amazon Web Services',
      credentialUrl: 'https://aws.amazon.com/verification',
      featured: true
    },
    {
      id: '2',
      title: 'Best Innovation Award',
      description: 'Recognized for developing an innovative user interface that improved user engagement by 40%.',
      date: '2023-03',
      category: 'award',
      issuer: 'Tech Solutions Inc.',
      featured: true
    },
    {
      id: '3',
      title: 'React Conference Speaker',
      description: 'Delivered a talk on "Building Scalable React Applications with TypeScript".',
      date: '2023-09',
      category: 'recognition',
      issuer: 'React Conference 2023',
      featured: false
    }
  ]);

  const handleEdit = (item: Experience | Skill | Achievement) => {
    // Handle edit functionality
    console.log('Edit:', item);
  };

  const handleDelete = (id: string) => {
    // Handle delete functionality
    console.log('Delete:', id);
  };

  const filteredExperiences = experiences.filter(exp =>
    exp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exp.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSkills = skills.filter(skill =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory === 'all' || skill.category === filterCategory)
  );

  const filteredAchievements = achievements.filter(achievement =>
    achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory === 'all' || achievement.category === filterCategory)
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'experience':
        return (
          <div className="grid gap-6">
            {filteredExperiences.map((experience) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        );
      case 'skills':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        );
      case 'achievements':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAchievements.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
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
            <h1 className="text-2xl font-bold text-gray-900">Experience & Skills</h1>
            <p className="text-gray-600">Manage your professional experience, skills, and achievements</p>
          </div>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add {activeTab}</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Search and Filters */}
        <SearchAndFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterCategory={filterCategory}
          onFilterChange={setFilterCategory}
          activeTab={activeTab}
        />

        {/* Content */}
        {renderContent()}
      </div>
    </Layout>
  );
};

export default ExperienceSkills;