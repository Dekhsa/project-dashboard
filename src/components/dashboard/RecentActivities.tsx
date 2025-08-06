import React from 'react';
import { Calendar, Eye, CheckCircle, Clock } from 'lucide-react';

interface Activity {
  id: number;
  action: string;
  time: string;
  type: string;
}

interface RecentActivitiesProps {
  activities: Activity[];
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'project':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'blog':
        return <Eye className="w-4 h-4 text-blue-500" />;
      case 'analytics':
        return <Calendar className="w-4 h-4 text-purple-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const badgeClasses = {
      project: 'bg-green-100 text-green-800',
      blog: 'bg-blue-100 text-blue-800',
      analytics: 'bg-purple-100 text-purple-800',
      default: 'bg-gray-100 text-gray-800'
    };
    
    return badgeClasses[type as keyof typeof badgeClasses] || badgeClasses.default;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              {getTypeIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">{activity.action}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-gray-500">{activity.time}</span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getTypeBadge(activity.type)}`}>
                  {activity.type}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;
