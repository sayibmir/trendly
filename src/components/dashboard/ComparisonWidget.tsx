'use client';

import { useStore } from '@/store/useStore';
import { ComparisonMetric } from '@/types';
import {
  Users,
  Heart,
  MessageCircle,
  TrendingUp,
  Zap,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from 'lucide-react';

export default function ComparisonWidget() {
  const { userProfile, competitors } = useStore();
  const trackedCompetitors = competitors.filter((c) => c.isTracked);

  if (!userProfile) {
    return (
      <div className="card h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/50 mb-2">Connect your account to see comparisons</p>
          <button className="btn-primary text-sm">Connect Instagram</button>
        </div>
      </div>
    );
  }

  // Calculate comparison metrics
  const competitorAvg = (key: keyof typeof userProfile) => {
    if (trackedCompetitors.length === 0) return 0;
    const sum = trackedCompetitors.reduce((acc, c) => acc + (c[key as keyof typeof c] as number), 0);
    return sum / trackedCompetitors.length;
  };

  const topCompetitor = (key: keyof typeof userProfile) => {
    if (trackedCompetitors.length === 0) return 0;
    return Math.max(...trackedCompetitors.map((c) => c[key as keyof typeof c] as number));
  };

  const getStatus = (user: number, avg: number): 'ahead' | 'behind' | 'on-par' => {
    const diff = ((user - avg) / avg) * 100;
    if (diff > 10) return 'ahead';
    if (diff < -10) return 'behind';
    return 'on-par';
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return Math.round(num).toString();
  };

  const metrics: ComparisonMetric[] = [
    {
      metric: 'Followers',
      user: userProfile.followers,
      competitorAvg: competitorAvg('followers'),
      topCompetitor: topCompetitor('followers'),
      difference: competitorAvg('followers') > 0 
        ? ((userProfile.followers - competitorAvg('followers')) / competitorAvg('followers')) * 100 
        : 0,
      status: getStatus(userProfile.followers, competitorAvg('followers')),
    },
    {
      metric: 'Engagement Rate',
      user: userProfile.engagementRate,
      competitorAvg: competitorAvg('engagementRate'),
      topCompetitor: topCompetitor('engagementRate'),
      difference: competitorAvg('engagementRate') > 0
        ? ((userProfile.engagementRate - competitorAvg('engagementRate')) / competitorAvg('engagementRate')) * 100
        : 0,
      status: getStatus(userProfile.engagementRate, competitorAvg('engagementRate')),
    },
    {
      metric: 'Avg Likes',
      user: userProfile.averageLikes,
      competitorAvg: competitorAvg('averageLikes'),
      topCompetitor: topCompetitor('averageLikes'),
      difference: competitorAvg('averageLikes') > 0
        ? ((userProfile.averageLikes - competitorAvg('averageLikes')) / competitorAvg('averageLikes')) * 100
        : 0,
      status: getStatus(userProfile.averageLikes, competitorAvg('averageLikes')),
    },
    {
      metric: 'Avg Comments',
      user: userProfile.averageComments,
      competitorAvg: competitorAvg('averageComments'),
      topCompetitor: topCompetitor('averageComments'),
      difference: competitorAvg('averageComments') > 0
        ? ((userProfile.averageComments - competitorAvg('averageComments')) / competitorAvg('averageComments')) * 100
        : 0,
      status: getStatus(userProfile.averageComments, competitorAvg('averageComments')),
    },
    {
      metric: 'Posts/Week',
      user: userProfile.postingFrequency,
      competitorAvg: competitorAvg('postingFrequency'),
      topCompetitor: topCompetitor('postingFrequency'),
      difference: competitorAvg('postingFrequency') > 0
        ? ((userProfile.postingFrequency - competitorAvg('postingFrequency')) / competitorAvg('postingFrequency')) * 100
        : 0,
      status: getStatus(userProfile.postingFrequency, competitorAvg('postingFrequency')),
    },
    {
      metric: 'Growth Rate',
      user: userProfile.growthRate,
      competitorAvg: competitorAvg('growthRate'),
      topCompetitor: topCompetitor('growthRate'),
      difference: competitorAvg('growthRate') > 0
        ? ((userProfile.growthRate - competitorAvg('growthRate')) / competitorAvg('growthRate')) * 100
        : 0,
      status: getStatus(userProfile.growthRate, competitorAvg('growthRate')),
    },
  ];

  const icons: Record<string, React.ElementType> = {
    'Followers': Users,
    'Engagement Rate': Zap,
    'Avg Likes': Heart,
    'Avg Comments': MessageCircle,
    'Posts/Week': Calendar,
    'Growth Rate': TrendingUp,
  };

  const StatusIcon = ({ status }: { status: 'ahead' | 'behind' | 'on-par' }) => {
    if (status === 'ahead') return <ArrowUpRight className="w-4 h-4 text-[--mint]" />;
    if (status === 'behind') return <ArrowDownRight className="w-4 h-4 text-[--coral]" />;
    return <Minus className="w-4 h-4 text-[--sunset]" />;
  };

  return (
    <div className="card h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <img
            src={userProfile.avatar}
            alt={userProfile.displayName}
            className="w-10 h-10 rounded-full ring-2 ring-[--coral]"
          />
          <div>
            <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
              You vs Competitors
            </h3>
            <p className="text-sm text-white/50">
              Compared to {trackedCompetitors.length} tracked accounts
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="space-y-4">
        {metrics.map((m) => {
          const Icon = icons[m.metric] || Zap;
          const isPercentage = m.metric === 'Engagement Rate' || m.metric === 'Growth Rate';
          
          return (
            <div
              key={m.metric}
              className="p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-white/40" />
                  <span className="text-sm font-medium">{m.metric}</span>
                </div>
                <div className="flex items-center gap-1">
                  <StatusIcon status={m.status} />
                  <span
                    className={`text-sm font-semibold ${
                      m.status === 'ahead'
                        ? 'text-[--mint]'
                        : m.status === 'behind'
                        ? 'text-[--coral]'
                        : 'text-[--sunset]'
                    }`}
                  >
                    {m.difference > 0 ? '+' : ''}
                    {m.difference.toFixed(0)}%
                  </span>
                </div>
              </div>

              {/* Bar Comparison */}
              <div className="space-y-2">
                {/* You */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-white/40 w-20">You</span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[--coral] to-[--sunset] rounded-full"
                      style={{
                        width: `${Math.min((m.user / m.topCompetitor) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium w-16 text-right">
                    {isPercentage ? `${m.user}%` : formatNumber(m.user)}
                  </span>
                </div>

                {/* Competitor Avg */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-white/40 w-20">Avg</span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white/30 rounded-full"
                      style={{
                        width: `${Math.min((m.competitorAvg / m.topCompetitor) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm text-white/50 w-16 text-right">
                    {isPercentage ? `${m.competitorAvg.toFixed(1)}%` : formatNumber(m.competitorAvg)}
                  </span>
                </div>

                {/* Top Competitor */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-white/40 w-20">Top</span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[--ocean]/50 rounded-full"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <span className="text-sm text-[--ocean] w-16 text-right">
                    {isPercentage ? `${m.topCompetitor}%` : formatNumber(m.topCompetitor)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
