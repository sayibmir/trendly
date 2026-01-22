'use client';

import { mockEngagementMetrics } from '@/data/mockData';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useState } from 'react';

type MetricKey = 'likes' | 'comments' | 'shares' | 'saves';

const metrics: { key: MetricKey; label: string; color: string }[] = [
  { key: 'likes', label: 'Likes', color: '#ff6b6b' },
  { key: 'comments', label: 'Comments', color: '#48dbfb' },
  { key: 'shares', label: 'Shares', color: '#1dd1a1' },
  { key: 'saves', label: 'Saves', color: '#a29bfe' },
];

export default function EngagementChart() {
  const [activeMetrics, setActiveMetrics] = useState<MetricKey[]>(['likes', 'comments']);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  const toggleMetric = (key: MetricKey) => {
    if (activeMetrics.includes(key)) {
      if (activeMetrics.length > 1) {
        setActiveMetrics(activeMetrics.filter((m) => m !== key));
      }
    } else {
      setActiveMetrics([...activeMetrics, key]);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ color: string; name: string; value: number }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[--card] border border-[--border] rounded-xl p-4 shadow-xl">
          <p className="text-sm font-medium text-white/60 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-white/60">{entry.name}:</span>
              <span className="font-semibold">{formatNumber(entry.value)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
            Engagement Trends
          </h3>
          <p className="text-sm text-white/50">Track competitor metrics over time</p>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center gap-1 p-1 bg-white/5 rounded-lg">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                timeRange === range
                  ? 'bg-[--coral] text-white'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Toggles */}
      <div className="flex flex-wrap gap-2 mb-6">
        {metrics.map((metric) => (
          <button
            key={metric.key}
            onClick={() => toggleMetric(metric.key)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeMetrics.includes(metric.key)
                ? 'text-white'
                : 'text-white/40 hover:text-white/60'
            }`}
            style={{
              backgroundColor: activeMetrics.includes(metric.key)
                ? `${metric.color}20`
                : 'rgba(255,255,255,0.05)',
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: activeMetrics.includes(metric.key)
                ? `${metric.color}50`
                : 'transparent',
            }}
          >
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: metric.color }}
            />
            {metric.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={mockEngagementMetrics}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              {metrics.map((metric) => (
                <linearGradient
                  key={metric.key}
                  id={`gradient-${metric.key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={metric.color} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={metric.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
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
              tickFormatter={formatNumber}
            />
            <Tooltip content={<CustomTooltip />} />
            {metrics.map(
              (metric) =>
                activeMetrics.includes(metric.key) && (
                  <Area
                    key={metric.key}
                    type="monotone"
                    dataKey={metric.key}
                    stroke={metric.color}
                    strokeWidth={2}
                    fill={`url(#gradient-${metric.key})`}
                    name={metric.label}
                  />
                )
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
