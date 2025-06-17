
import React from 'react';
import DashboardStats from '../components/DashboardStats';
import LiveChat from '../components/LiveChat';
import RecentActivity from '../components/RecentActivity';
import QuickActions from '../components/QuickActions';

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your customer engagement.</p>
      </div>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LiveChat />
        </div>
        <div className="space-y-6">
          <QuickActions />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
