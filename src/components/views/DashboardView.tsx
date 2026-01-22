'use client';

import { useState } from 'react';
import StatsOverview from '@/components/dashboard/StatsOverview';
import EngagementChart from '@/components/dashboard/EngagementChart';
import ContentTypeChart from '@/components/dashboard/ContentTypeChart';
import TopPostsWidget from '@/components/dashboard/TopPostsWidget';
import TrendInsightsWidget from '@/components/dashboard/TrendInsightsWidget';
import SuggestionsWidget from '@/components/dashboard/SuggestionsWidget';
import HashtagsWidget from '@/components/dashboard/HashtagsWidget';
import TimingHeatmap from '@/components/dashboard/TimingHeatmap';
import CompetitorsListWidget from '@/components/dashboard/CompetitorsListWidget';
import AddCompetitorModal from '@/components/competitors/AddCompetitorModal';

export default function DashboardView() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
            Dashboard
          </h1>
          <p className="text-white/50 mt-1">
            Track your competitors and discover growth opportunities
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-white/40">Last updated</p>
          <p className="text-sm font-medium">Just now</p>
        </div>
      </div>

      {/* Stats Overview */}
      <StatsOverview />

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6">
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
