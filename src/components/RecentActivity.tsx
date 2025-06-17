
import React from 'react';
import { MessageCircle, UserPlus, Target, Bell } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'message',
      title: 'New message from Sarah Wilson',
      description: 'Asking about product features',
      time: '5 minutes ago',
      icon: MessageCircle,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: 2,
      type: 'contact',
      title: 'New contact registered',
      description: 'Mike Johnson joined via landing page',
      time: '12 minutes ago',
      icon: UserPlus,
      color: 'text-green-600 bg-green-100'
    },
    {
      id: 3,
      type: 'campaign',
      title: 'Campaign "Summer Sale" completed',
      description: '89% open rate, 12% click rate',
      time: '1 hour ago',
      icon: Target,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      id: 4,
      type: 'notification',
      title: 'System notification',
      description: 'Weekly analytics report ready',
      time: '2 hours ago',
      icon: Bell,
      color: 'text-orange-600 bg-orange-100'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200">
            <div className={`p-2 rounded-lg ${activity.color}`}>
              <activity.icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 truncate">
                {activity.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {activity.description}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 text-center text-sm text-purple-600 hover:text-purple-800 font-medium py-2 hover:bg-purple-50 rounded-lg transition-colors duration-200">
        View all activities
      </button>
    </div>
  );
};

export default RecentActivity;
