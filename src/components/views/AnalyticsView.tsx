'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import EngagementChart from '@/components/dashboard/EngagementChart';
import ContentTypeChart from '@/components/dashboard/ContentTypeChart';
import TimingHeatmap from '@/components/dashboard/TimingHeatmap';
import HashtagsWidget from '@/components/dashboard/HashtagsWidget';
import {
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from 'recharts';

export default function AnalyticsView() {
  const { competitors, posts } = useStore();
  const [selectedCompetitor, setSelectedCompetitor] = useState<string | 'all'>('all');
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d');

  // Competitor comparison data
  const competitorData = competitors.map((c) => ({
    name: c.username.length > 10 ? c.username.slice(0, 10) + '...' : c.username,
    fullName: c.username,
    followers: c.followers,
    engagement: c.engagementRate,
    growth: c.growthRate,
    posts: c.postsCount,
    color: ['#ff6b6b', '#48dbfb', '#1dd1a1', '#a29bfe', '#feca57'][competitors.indexOf(c) % 5],
  }));

  // Content type distribution
  const contentDistribution = [
    { name: 'Reels', value: 45, color: '#ff6b6b' },
    { name: 'Images', value: 30, color: '#48dbfb' },
    { name: 'Carousels', value: 20, color: '#1dd1a1' },
    { name: 'Videos', value: 5, color: '#a29bfe' },
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
            Analytics
          </h1>
          <p className="text-white/50 mt-1">
            Deep dive into competitor performance metrics
          </p>
        </div>
        
        {/* Date Range */}
        <div className="flex items-center gap-2 p-1 bg-white/5 rounded-lg">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                dateRange === range
                  ? 'bg-[--coral] text-white'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Competitor Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCompetitor('all')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
            selectedCompetitor === 'all'
              ? 'bg-[--coral] text-white'
              : 'bg-white/5 text-white/60 hover:bg-white/10'
          }`}
        >
          <Users className="w-4 h-4" />
          All Competitors
        </button>
        {competitors.map((comp) => (
          <button
            key={comp.id}
            onClick={() => setSelectedCompetitor(comp.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
              selectedCompetitor === comp.id
                ? 'bg-[--coral] text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            <img src={comp.avatar} alt="" className="w-5 h-5 rounded-full" />
            @{comp.username}
          </button>
        ))}
      </div>

      {/* Competitor Comparison Chart */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[--coral] to-[--sunset] flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                Competitor Comparison
              </h3>
              <p className="text-sm text-white/50">Engagement rates across accounts</p>
            </div>
          </div>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={competitorData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="rgba(255,255,255,0.3)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="rgba(255,255,255,0.3)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-[--card] border border-[--border] rounded-xl p-4 shadow-xl">
                        <p className="font-semibold">@{data.fullName}</p>
                        <div className="space-y-1 mt-2 text-sm">
                          <p className="text-white/60">
                            Engagement: <span className="text-[--coral] font-medium">{data.engagement}%</span>
                          </p>
                          <p className="text-white/60">
                            Followers: <span className="text-white font-medium">{formatNumber(data.followers)}</span>
                          </p>
                          <p className="text-white/60">
                            Growth: <span className={`font-medium ${data.growth > 0 ? 'text-[--mint]' : 'text-[--coral]'}`}>
                              {data.growth > 0 ? '+' : ''}{data.growth}%
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="engagement" radius={[6, 6, 0, 0]} maxBarSize={80}>
                {competitorData.map((entry, index) => (
                  <Cell key={entry.fullName} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Engagement Over Time */}
        <div className="col-span-12 lg:col-span-8">
          <EngagementChart />
        </div>

        {/* Content Distribution */}
        <div className="col-span-12 lg:col-span-4">
          <div className="card h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[--ocean] to-[--mint] flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                  Content Mix
                </h3>
                <p className="text-sm text-white/50">Distribution by type</p>
              </div>
            </div>

            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={contentDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {contentDistribution.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-[--card] border border-[--border] rounded-lg p-3 shadow-xl">
                            <p className="font-medium">{data.name}</p>
                            <p className="text-sm text-white/60">{data.value}% of posts</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              {contentDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-white/60">{item.name}</span>
                  <span className="text-sm font-medium ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Type Performance */}
        <div className="col-span-12 lg:col-span-6">
          <ContentTypeChart />
        </div>

        {/* Hashtags */}
        <div className="col-span-12 lg:col-span-6">
          <HashtagsWidget />
        </div>

        {/* Timing Heatmap */}
        <div className="col-span-12">
          <TimingHeatmap />
        </div>
      </div>

      {/* Growth Comparison Table */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
          Growth Metrics
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[--border]">
                <th className="text-left py-3 px-4 text-sm font-medium text-white/50">Competitor</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-white/50">Followers</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-white/50">Engagement</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-white/50">Growth</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-white/50">Posts/Week</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-white/50">Avg Likes</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((comp) => (
                <tr key={comp.id} className="border-b border-[--border] hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img src={comp.avatar} alt="" className="w-10 h-10 rounded-full" />
                      <div>
                        <p className="font-medium">{comp.displayName}</p>
                        <p className="text-sm text-white/40">@{comp.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right font-medium tabular-nums">
                    {formatNumber(comp.followers)}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="text-[--ocean] font-medium">{comp.engagementRate}%</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className={`flex items-center justify-end gap-1 font-medium ${
                      comp.growthRate > 0 ? 'text-[--mint]' : 'text-[--coral]'
                    }`}>
                      {comp.growthRate > 0 ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      {comp.growthRate > 0 ? '+' : ''}{comp.growthRate}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right tabular-nums">{comp.postingFrequency}</td>
                  <td className="py-4 px-4 text-right tabular-nums">{formatNumber(comp.averageLikes)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
