'use client';

import { useStore } from '@/store/useStore';
import {
  TrendingUp,
  Clock,
  Hash,
  FileText,
  Layers,
  Zap,
  ChevronRight,
  Lightbulb,
} from 'lucide-react';

const typeIcons: Record<string, React.ElementType> = {
  content_type: Layers,
  timing: Clock,
  hashtag: Hash,
  caption: FileText,
  format: TrendingUp,
};

const impactColors = {
  high: {
    badge: 'badge-coral',
    bg: 'bg-[--coral]/10',
    text: 'text-[--coral]',
  },
  medium: {
    badge: 'badge-sunset',
    bg: 'bg-[--sunset]/10',
    text: 'text-[--sunset]',
  },
  low: {
    badge: 'badge-ocean',
    bg: 'bg-[--ocean]/10',
    text: 'text-[--ocean]',
  },
};

export default function TrendInsightsWidget() {
  const { insights } = useStore();

  return (
    <div className="card h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[--lavender] to-[--coral] flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
              Trend Insights
            </h3>
            <p className="text-sm text-white/50">Patterns from competitor analysis</p>
          </div>
        </div>
        <span className="badge badge-lavender">
          <Zap className="w-3 h-3" />
          {insights.length} insights
        </span>
      </div>

      {/* Insights List */}
      <div className="space-y-4">
        {insights.map((insight) => {
          const Icon = typeIcons[insight.type] || TrendingUp;
          const colors = impactColors[insight.impact];

          return (
            <div
              key={insight.id}
              className="p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-colors cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium">{insight.title}</h4>
                    <span className={`badge ${colors.badge} text-[10px] flex-shrink-0`}>
                      {insight.impact.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-white/50 mt-1 line-clamp-2">
                    {insight.description}
                  </p>

                  {/* Confidence */}
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex-1">
                      <div className="progress-bar">
                        <div
                          className="progress-bar-fill bg-gradient-to-r from-[--coral] to-[--mint]"
                          style={{ width: `${insight.confidence}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs text-white/40">
                      {insight.confidence}% confidence
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-white/50 group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
