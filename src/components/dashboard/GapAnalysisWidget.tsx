'use client';

import { useStore } from '@/store/useStore';
import { GapAnalysis } from '@/types';
import {
  Target,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
} from 'lucide-react';

export default function GapAnalysisWidget() {
  const { userProfile, competitors } = useStore();
  const trackedCompetitors = competitors.filter((c) => c.isTracked);

  if (!userProfile || trackedCompetitors.length === 0) {
    return (
      <div className="card h-full flex items-center justify-center">
        <div className="text-center">
          <Target className="w-10 h-10 text-white/20 mx-auto mb-3" />
          <p className="text-white/50">Add competitors to see gap analysis</p>
        </div>
      </div>
    );
  }

  // Find the top performer for each metric
  const topEngagement = Math.max(...trackedCompetitors.map((c) => c.engagementRate));
  const topPostFreq = Math.max(...trackedCompetitors.map((c) => c.postingFrequency));
  const topGrowth = Math.max(...trackedCompetitors.map((c) => c.growthRate));
  const topComments = Math.max(...trackedCompetitors.map((c) => c.averageComments));

  // Generate gap analysis
  const gaps: GapAnalysis[] = [];

  // Engagement gap
  if (userProfile.engagementRate < topEngagement * 0.8) {
    gaps.push({
      category: 'Engagement Rate',
      userValue: userProfile.engagementRate,
      competitorBest: topEngagement,
      recommendation: 'Focus on creating more interactive content like polls, questions, and carousels to boost engagement.',
      priority: userProfile.engagementRate < topEngagement * 0.5 ? 'high' : 'medium',
    });
  }

  // Posting frequency gap
  if (userProfile.postingFrequency < topPostFreq * 0.7) {
    gaps.push({
      category: 'Posting Frequency',
      userValue: `${userProfile.postingFrequency}/week`,
      competitorBest: `${topPostFreq}/week`,
      recommendation: 'Top competitors post more frequently. Consider batching content creation to maintain consistency.',
      priority: userProfile.postingFrequency < topPostFreq * 0.5 ? 'high' : 'medium',
    });
  }

  // Growth rate gap
  if (userProfile.growthRate < topGrowth * 0.7) {
    gaps.push({
      category: 'Growth Rate',
      userValue: `${userProfile.growthRate}%`,
      competitorBest: `${topGrowth}%`,
      recommendation: 'Boost growth by collaborating with similar creators, using trending audio in Reels, and optimizing hashtags.',
      priority: 'high',
    });
  }

  // Comment engagement gap
  if (userProfile.averageComments < topComments * 0.6) {
    gaps.push({
      category: 'Comment Engagement',
      userValue: userProfile.averageComments,
      competitorBest: topComments,
      recommendation: 'End your captions with questions or CTAs. Respond to every comment within the first hour to boost engagement.',
      priority: 'medium',
    });
  }

  // If doing well, add positive gaps
  if (gaps.length === 0) {
    gaps.push({
      category: 'Overall Performance',
      userValue: 'Excellent',
      competitorBest: 'Competitive',
      recommendation: 'You\'re performing well against competitors! Focus on maintaining consistency and testing new content formats.',
      priority: 'low',
    });
  }

  const priorityStyles = {
    high: {
      bg: 'bg-[--coral]/10',
      border: 'border-[--coral]/30',
      badge: 'badge-coral',
      icon: AlertCircle,
    },
    medium: {
      bg: 'bg-[--sunset]/10',
      border: 'border-[--sunset]/30',
      badge: 'badge-sunset',
      icon: Lightbulb,
    },
    low: {
      bg: 'bg-[--mint]/10',
      border: 'border-[--mint]/30',
      badge: 'badge-mint',
      icon: CheckCircle2,
    },
  };

  return (
    <div className="card h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[--coral] to-[--lavender] flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
              Gap Analysis
            </h3>
            <p className="text-sm text-white/50">Where to focus for growth</p>
          </div>
        </div>
        <span className="badge badge-coral">
          {gaps.filter((g) => g.priority === 'high').length} priority items
        </span>
      </div>

      {/* Gap Items */}
      <div className="space-y-4">
        {gaps.map((gap, index) => {
          const styles = priorityStyles[gap.priority];
          const Icon = styles.icon;

          return (
            <div
              key={gap.category}
              className={`p-4 rounded-xl ${styles.bg} border ${styles.border} animate-slide-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white/10">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium">{gap.category}</h4>
                    <span className={`badge ${styles.badge} text-[10px]`}>
                      {gap.priority.toUpperCase()}
                    </span>
                  </div>

                  {/* Comparison */}
                  <div className="flex items-center gap-3 mb-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-white/40">You:</span>
                      <span className="font-semibold">{gap.userValue}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/20" />
                    <div className="flex items-center gap-2">
                      <span className="text-white/40">Top:</span>
                      <span className="font-semibold text-[--ocean]">{gap.competitorBest}</span>
                    </div>
                  </div>

                  {/* Recommendation */}
                  <p className="text-sm text-white/60">{gap.recommendation}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
