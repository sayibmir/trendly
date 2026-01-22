'use client';

import { useStore } from '@/store/useStore';
import { Users, TrendingUp, Eye, Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatsOverview() {
  const { competitors, posts } = useStore();
  
  const trackedCount = competitors.filter((c) => c.isTracked).length;
  const totalFollowers = competitors.reduce((sum, c) => sum + c.followers, 0);
  const avgEngagement = competitors.reduce((sum, c) => sum + c.engagementRate, 0) / competitors.length;
  const totalPosts = posts.length;

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const stats = [
    {
      id: 'competitors',
      label: 'Tracked Competitors',
      value: trackedCount,
      change: '+2',
      changeType: 'positive' as const,
      icon: Users,
      color: 'coral',
      gradient: 'from-[--coral] to-[--sunset]',
    },
    {
      id: 'reach',
      label: 'Combined Reach',
      value: formatNumber(totalFollowers),
      change: '+12%',
      changeType: 'positive' as const,
      icon: Eye,
      color: 'ocean',
      gradient: 'from-[--ocean] to-[--lavender]',
    },
    {
      id: 'engagement',
      label: 'Avg Engagement',
      value: `${avgEngagement.toFixed(1)}%`,
      change: '+0.8%',
      changeType: 'positive' as const,
      icon: Zap,
      color: 'mint',
      gradient: 'from-[--mint] to-[--ocean]',
    },
    {
      id: 'posts',
      label: 'Posts Analyzed',
      value: totalPosts,
      change: '+18',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'lavender',
      gradient: 'from-[--lavender] to-[--coral]',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.id}
            className="card group relative overflow-hidden animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Background gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
            />

            {/* Icon */}
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>

            {/* Value */}
            <div className="flex items-end gap-3">
              <p className="text-3xl font-bold tabular-nums" style={{ fontFamily: 'var(--font-display)' }}>
                {stat.value}
              </p>
              <span
                className={`flex items-center gap-0.5 text-sm font-medium mb-1 ${
                  stat.changeType === 'positive' ? 'text-[--mint]' : 'text-[--coral]'
                }`}
              >
                {stat.changeType === 'positive' ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {stat.change}
              </span>
            </div>

            {/* Label */}
            <p className="text-sm text-white/50 mt-1">{stat.label}</p>

            {/* Hover line */}
            <div
              className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${stat.gradient} w-0 group-hover:w-full transition-all duration-500`}
            />
          </div>
        );
      })}
    </div>
  );
}
