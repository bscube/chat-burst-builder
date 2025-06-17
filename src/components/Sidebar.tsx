
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageCircle, 
  Users, 
  Megaphone, 
  BarChart3, 
  Settings,
  Bell
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: MessageCircle, label: 'Live Chat', path: '/chat' },
    { icon: Users, label: 'Contacts', path: '/contacts' },
    { icon: Megaphone, label: 'Campaigns', path: '/campaigns' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white w-64 min-h-screen flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Interakt Pro
        </h1>
        <p className="text-slate-400 text-sm mt-1">Customer Engagement</p>
      </div>
      
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`
                }
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">JD</span>
          </div>
          <div>
            <p className="text-white font-medium">John Doe</p>
            <p className="text-slate-400 text-xs">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
