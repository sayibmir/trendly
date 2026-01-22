'use client';

import { useStore } from '@/store/useStore';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import DashboardView from '@/components/views/DashboardView';
import CompetitorsView from '@/components/views/CompetitorsView';
import SettingsView from '@/components/views/SettingsView';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';

export default function Home() {
  const { sidebarOpen, activeView, isOnboarded } = useStore();

  if (!isOnboarded) {
    return <OnboardingFlow />;
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'competitors':
        return <CompetitorsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[--background] bg-grid bg-gradient-radial">
      <Sidebar />
      <Header />
      <main className={`pt-20 pb-8 px-6 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {renderView()}
      </main>
    </div>
  );
}
