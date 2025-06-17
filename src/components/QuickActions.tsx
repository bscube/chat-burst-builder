
import React from 'react';
import { Plus, Send, Users, BarChart } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      title: 'Start Campaign',
      description: 'Create new marketing campaign',
      icon: Send,
      color: 'from-blue-500 to-blue-600',
      action: () => console.log('Start campaign clicked')
    },
    {
      title: 'Add Contact',
      description: 'Import or add new contact',
      icon: Users,
      color: 'from-green-500 to-green-600',
      action: () => console.log('Add contact clicked')
    },
    {
      title: 'View Analytics',
      description: 'Check performance metrics',
      icon: BarChart,
      color: 'from-purple-500 to-purple-600',
      action: () => console.log('View analytics clicked')
    },
    {
      title: 'Create Template',
      description: 'Design message template',
      icon: Plus,
      color: 'from-orange-500 to-orange-600',
      action: () => console.log('Create template clicked')
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className="p-4 text-left border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 hover:border-gray-300 group"
          >
            <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${action.color} mb-3 group-hover:scale-110 transition-transform duration-200`}>
              <action.icon className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
            <p className="text-sm text-gray-600">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
