
import React from 'react';
import { TrendingUp, TrendingDown, Users, MessageCircle, Target, DollarSign } from 'lucide-react';

const DashboardStats = () => {
  const stats = [
    {
      title: 'Total Conversations',
      value: '2,847',
      change: '+12.5%',
      trending: 'up',
      icon: MessageCircle,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active Contacts',
      value: '18,429',
      change: '+8.2%',
      trending: 'up',
      icon: Users,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Campaign Performance',
      value: '94.2%',
      change: '-2.1%',
      trending: 'down',
      icon: Target,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Revenue Generated',
      value: '$47,892',
      change: '+23.8%',
      trending: 'up',
      icon: DollarSign,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <div className={`flex items-center text-sm font-medium ${
              stat.trending === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.trending === 'up' ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {stat.change}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
