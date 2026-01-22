'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import ComparisonWidget from '@/components/dashboard/ComparisonWidget';
import SuggestionsWidget from '@/components/dashboard/SuggestionsWidget';
import CompetitorsListWidget from '@/components/dashboard/CompetitorsListWidget';
import AddCompetitorModal from '@/components/competitors/AddCompetitorModal';
import { TrendingUp, Users } from 'lucide-react';

export default function DashboardView() {
  const { userProfile, competitors } = useStore();
  const [showAddModal, setShowAddModal] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const trackedCount = competitors.filter(c => c.isTracked).length;

  return (
    <div className="space-y-6">
      {/* Header */}
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
              {userProfile ? `Hi, ${userProfile.displayName.split(' ')[0]}` : 'Dashboard'}
            </h1>
            <p className="text-white/50 mt-1">
              {userProfile && `@${userProfile.username} • ${formatNumber(userProfile.followers)} followers`}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      {userProfile && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-[--coral]" />
              <div>
                <p className="text-2xl font-bold">{formatNumber(userProfile.followers)}</p>
                <p className="text-xs text-white/50">Followers</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-[--ocean]" />
              <div>
                <p className="text-2xl font-bold">{userProfile.engagementRate}%</p>
                <p className="text-xs text-white/50">Engagement</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-[--mint]" />
              <div>
                <p className="text-2xl font-bold">{trackedCount}</p>
                <p className="text-xs text-white/50">Competitors</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className={`w-5 h-5 ${userProfile.growthRate >= 0 ? 'text-[--mint]' : 'text-[--coral]'}`} />
              <div>
                <p className={`text-2xl font-bold ${userProfile.growthRate >= 0 ? 'text-[--mint]' : 'text-[--coral]'}`}>
                  {userProfile.growthRate >= 0 ? '+' : ''}{userProfile.growthRate}%
                </p>
                <p className="text-xs text-white/50">Growth</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-6">
        {/* Competitors List */}
        <div className="col-span-12 lg:col-span-4">
          <CompetitorsListWidget onAddClick={() => setShowAddModal(true)} />
        </div>

        {/* Comparison */}
        <div className="col-span-12 lg:col-span-8">
          {userProfile && trackedCount > 0 ? (
            <ComparisonWidget />
          ) : (
            <div className="card h-full flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <Users className="w-12 h-12 text-white/20 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Add Competitors</h3>
                <p className="text-white/50 text-sm mb-4">
                  Track competitors to see how you compare
                </p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="btn-primary"
                >
                  Add Competitor
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Suggestions */}
        <div className="col-span-12">
          <SuggestionsWidget />
        </div>
      </div>

      <AddCompetitorModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  );
}
