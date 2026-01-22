'use client';

import { mockContentTypeMetrics } from '@/data/mockData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Video, Image, Layers, Film } from 'lucide-react';

const colors = ['#ff6b6b', '#48dbfb', '#1dd1a1', '#a29bfe'];

const icons: Record<string, React.ElementType> = {
  Reels: Film,
  Carousels: Layers,
  Images: Image,
  Videos: Video,
};

export default function ContentTypeChart() {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: typeof mockContentTypeMetrics[0] }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[--card] border border-[--border] rounded-xl p-4 shadow-xl">
          <p className="font-semibold mb-2">{data.type}</p>
          <div className="space-y-1 text-sm">
            <p className="text-white/60">
              Posts: <span className="text-white font-medium">{data.count}</span>
            </p>
            <p className="text-white/60">
              Avg Engagement: <span className="text-[--coral] font-medium">{data.avgEngagement}%</span>
            </p>
            <p className="text-white/60">
              Avg Likes: <span className="text-white font-medium">{formatNumber(data.avgLikes)}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const topType = mockContentTypeMetrics.reduce((max, current) =>
    current.avgEngagement > max.avgEngagement ? current : max
  );

  return (
    <div className="card h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
            Content Performance
          </h3>
          <p className="text-sm text-white/50">Engagement by content type</p>
        </div>
        <span className="badge badge-coral">
          <Film className="w-3 h-3" />
          {topType.type} leads
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {mockContentTypeMetrics.map((metric, index) => {
          const Icon = icons[metric.type] || Image;
          return (
            <div
              key={metric.type}
              className="p-3 rounded-xl bg-white/5 text-center group hover:bg-white/10 transition-colors"
            >
              <div
                className="w-10 h-10 mx-auto rounded-lg flex items-center justify-center mb-2 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${colors[index]}20` }}
              >
                <Icon className="w-5 h-5" style={{ color: colors[index] }} />
              </div>
              <p className="text-lg font-bold" style={{ color: colors[index] }}>
                {metric.avgEngagement}%
              </p>
              <p className="text-xs text-white/40">{metric.type}</p>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={mockContentTypeMetrics}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
              vertical={false}
            />
            <XAxis
              dataKey="type"
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
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="avgEngagement"
              radius={[6, 6, 0, 0]}
              maxBarSize={60}
            >
              {mockContentTypeMetrics.map((entry, index) => (
                <Cell key={entry.type} fill={colors[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
