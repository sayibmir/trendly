'use client';

import { useStore } from '@/store/useStore';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Sparkles,
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'competitors', icon: Users, label: 'Competitors' },
  { id: 'analytics', icon: BarChart3, label: 'Analytics' },
  { id: 'reports', icon: FileText, label: 'Reports' },
  { id: 'settings', icon: Settings, label: 'Settings' },
] as const;

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar, activeView, setActiveView } = useStore();

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-[#0d0d14] border-r border-[--border] z-50 flex flex-col transition-all duration-300 ease-out ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[--coral] to-[--sunset] flex items-center justify-center flex-shrink-0">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        {sidebarOpen && (
          <div className="animate-fade-in">
            <h1 className="text-xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Trendly
            </h1>
            <p className="text-xs text-white/40">Competitor Intel</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-[--coral]/20 to-transparent text-[--coral]'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-[--coral]' : ''
                    }`}
                  />
                  {sidebarOpen && (
                    <span className="font-medium animate-fade-in">{item.label}</span>
                  )}
                  {isActive && sidebarOpen && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[--coral] animate-pulse-glow" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Pro Badge */}
      {sidebarOpen && (
        <div className="mx-3 mb-4 p-4 rounded-xl bg-gradient-to-br from-[--coral]/10 to-[--lavender]/10 border border-[--coral]/20 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[--coral]" />
            <span className="text-sm font-semibold">Upgrade to Pro</span>
          </div>
          <p className="text-xs text-white/50 mb-3">
            Unlock unlimited competitors & advanced analytics
          </p>
          <button className="w-full py-2 px-4 bg-gradient-to-r from-[--coral] to-[--sunset] rounded-lg text-sm font-semibold text-white hover:shadow-lg hover:shadow-[--coral]/25 transition-all">
            Upgrade Now
          </button>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[--card] border border-[--border] flex items-center justify-center text-white/60 hover:text-white hover:border-[--coral] transition-all"
      >
        {sidebarOpen ? (
          <ChevronLeft className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>
    </aside>
  );
}
