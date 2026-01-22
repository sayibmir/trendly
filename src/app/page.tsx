'use client';

import { useStore } from '@/store/useStore';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import DashboardView from '@/components/views/DashboardView';
import CompetitorsView from '@/components/views/CompetitorsView';
import AnalyticsView from '@/components/views/AnalyticsView';
import ReportsView from '@/components/views/ReportsView';
import SettingsView from '@/components/views/SettingsView';

export default function Home() {
  const { sidebarOpen, activeView } = useStore();

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'competitors':
        return <CompetitorsView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[--background] bg-grid bg-gradient-radial">
      {/* Sidebar */}
      <Sidebar />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main
        className={`pt-20 pb-8 px-6 transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        {renderView()}
      </main>
    </div>
  );
}
