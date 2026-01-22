'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import StatsOverview from '@/components/dashboard/StatsOverview';
import EngagementChart from '@/components/dashboard/EngagementChart';
import ContentTypeChart from '@/components/dashboard/ContentTypeChart';
import TopPostsWidget from '@/components/dashboard/TopPostsWidget';
import TrendInsightsWidget from '@/components/dashboard/TrendInsightsWidget';
import SuggestionsWidget from '@/components/dashboard/SuggestionsWidget';
import HashtagsWidget from '@/components/dashboard/HashtagsWidget';
import TimingHeatmap from '@/components/dashboard/TimingHeatmap';
import CompetitorsListWidget from '@/components/dashboard/CompetitorsListWidget';
import ComparisonWidget from '@/components/dashboard/ComparisonWidget';
import GapAnalysisWidget from '@/components/dashboard/GapAnalysisWidget';
import AIInsightsWidget from '@/components/dashboard/AIInsightsWidget';
import AddCompetitorModal from '@/components/competitors/AddCompetitorModal';
import { User, TrendingUp, Users } from 'lucide-react';

export default function DashboardView() {
  const { userProfile } = useStore();
  const [showAddModal, setShowAddModal] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Page Header with User Profile */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {userProfile && (
            <img
              src={userProfile.avatar}
              alt={userProfile.displayName}
              className="w-14 h-14 rounded-xl ring-2 ring-[--coral]/30"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              {userProfile ? `Welcome, ${userProfile.displayName.split(' ')[0]}` : 'Dashboard'}
            </h1>
            <p className="text-white/50 mt-1">
              {userProfile 
                ? `@${userProfile.username} • ${formatNumber(userProfile.followers)} followers`
                : 'Track your competitors and discover growth opportunities'
              }
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-white/40">Last updated</p>
          <p className="text-sm font-medium">Just now</p>
        </div>
      </div>

      {/* User Stats Summary (if connected) */}
      {userProfile && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card card-coral p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[--coral]/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-[--coral]" />
              </div>
              <div>
                <p className="text-2xl font-bold">{formatNumber(userProfile.followers)}</p>
                <p className="text-xs text-white/50">Your Followers</p>
              </div>
            </div>
          </div>
          <div className="card card-ocean p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[--ocean]/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[--ocean]" />
              </div>
              <div>
                <p className="text-2xl font-bold">{userProfile.engagementRate}%</p>
                <p className="text-xs text-white/50">Your Engagement</p>
              </div>
            </div>
          </div>
          <div className="card card-mint p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[--mint]/20 flex items-center justify-center">
                <User className="w-5 h-5 text-[--mint]" />
              </div>
              <div>
                <p className="text-2xl font-bold">{formatNumber(userProfile.averageLikes)}</p>
                <p className="text-xs text-white/50">Avg Likes</p>
              </div>
            </div>
          </div>
          <div className="card card-lavender p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[--lavender]/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[--lavender]" />
              </div>
              <div>
                <p className={`text-2xl font-bold ${userProfile.growthRate >= 0 ? 'text-[--mint]' : 'text-[--coral]'}`}>
                  {userProfile.growthRate >= 0 ? '+' : ''}{userProfile.growthRate}%
                </p>
                <p className="text-xs text-white/50">Growth Rate</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Competitor Stats Overview */}
      <StatsOverview />

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Comparison Widget - You vs Competitors */}
        {userProfile && (
          <div className="col-span-12 lg:col-span-6">
            <ComparisonWidget />
          </div>
        )}

        {/* Gap Analysis */}
        {userProfile && (
          <div className="col-span-12 lg:col-span-6">
            <GapAnalysisWidget />
          </div>
        )}

        {/* Engagement Chart - Full Width */}
        <div className="col-span-12 lg:col-span-8">
          <EngagementChart />
        </div>

        {/* Competitors List */}
        <div className="col-span-12 lg:col-span-4">
          <CompetitorsListWidget onAddClick={() => setShowAddModal(true)} />
        </div>

        {/* Content Type Chart */}
        <div className="col-span-12 lg:col-span-6">
          <ContentTypeChart />
        </div>

        {/* Top Posts */}
        <div className="col-span-12 lg:col-span-6">
          <TopPostsWidget />
        </div>

        {/* AI Insights */}
        <div className="col-span-12">
          <AIInsightsWidget />
        </div>

        {/* Trend Insights */}
        <div className="col-span-12 lg:col-span-6">
          <TrendInsightsWidget />
        </div>

        {/* Suggestions */}
        <div className="col-span-12 lg:col-span-6">
          <SuggestionsWidget />
        </div>

        {/* Hashtags */}
        <div className="col-span-12 lg:col-span-4">
          <HashtagsWidget />
        </div>

        {/* Timing Heatmap */}
        <div className="col-span-12 lg:col-span-8">
          <TimingHeatmap />
        </div>
      </div>

      {/* Add Competitor Modal */}
      <AddCompetitorModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  );
}
