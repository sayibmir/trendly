'use client';

import { useStore } from '@/store/useStore';
import {
  FileText,
  Download,
  Share2,
  Calendar,
  TrendingUp,
  TrendingDown,
  Award,
  Target,
  Lightbulb,
  ChevronRight,
  Check,
} from 'lucide-react';
import { format } from 'date-fns';

export default function WeeklyReport() {
  const { competitors, posts, insights, suggestions } = useStore();
  
  const topCompetitor = [...competitors].sort((a, b) => b.growthRate - a.growthRate)[0];
  const topPost = [...posts].sort((a, b) => b.engagementRate - a.engagementRate)[0];
  const highPrioritySuggestions = suggestions.filter((s) => s.priority === 'urgent');

  const reportDate = new Date();
  const weekStart = new Date(reportDate);
  weekStart.setDate(weekStart.getDate() - 7);

  return (
    <div className="space-y-6">
      {/* Report Header */}
      <div className="card bg-gradient-to-br from-[--card] to-[--coral]/5 border-[--coral]/20">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[--coral] to-[--sunset] flex items-center justify-center">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                Weekly Competitor Report
              </h2>
              <div className="flex items-center gap-2 mt-1 text-white/50">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">
                  {format(weekStart, 'MMM d')} - {format(reportDate, 'MMM d, yyyy')}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="btn-secondary flex items-center gap-2 py-2 px-4">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button className="btn-primary flex items-center gap-2 py-2 px-4">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
          Executive Summary
        </h3>
        <div className="prose prose-invert max-w-none">
          <p className="text-white/70 leading-relaxed">
            This week, your tracked competitors showed an overall <span className="text-[--mint] font-semibold">positive growth trend</span> with 
            an average engagement increase of 12.3%. <span className="text-[--coral] font-semibold">Reels continue to dominate</span> as 
            the top-performing content format, generating 3.2x more engagement than static posts. The best posting 
            window remains <span className="text-[--sunset] font-semibold">5-7 PM on weekdays</span>, particularly Fridays.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-[--border]">
          <div className="text-center p-4 rounded-xl bg-white/5">
            <p className="text-3xl font-bold text-[--coral]">+12.3%</p>
            <p className="text-xs text-white/50 mt-1">Avg Engagement Growth</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/5">
            <p className="text-3xl font-bold text-[--ocean]">24.8%</p>
            <p className="text-xs text-white/50 mt-1">Reels Engagement Rate</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/5">
            <p className="text-3xl font-bold text-[--mint]">156</p>
            <p className="text-xs text-white/50 mt-1">Posts Analyzed</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/5">
            <p className="text-3xl font-bold text-[--lavender]">5</p>
            <p className="text-xs text-white/50 mt-1">Active Competitors</p>
          </div>
        </div>
      </div>

      {/* What Worked This Week */}
      <div className="grid grid-cols-2 gap-6">
        {/* Top Performer */}
        <div className="card card-mint">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-[--mint]" />
            <h3 className="font-semibold">Top Performer This Week</h3>
          </div>
          
          {topCompetitor && (
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
              <img
                src={topCompetitor.avatar}
                alt={topCompetitor.displayName}
                className="w-14 h-14 rounded-full ring-2 ring-[--mint]"
              />
              <div className="flex-1">
                <p className="font-semibold">{topCompetitor.displayName}</p>
                <p className="text-sm text-white/50">@{topCompetitor.username}</p>
                <div className="flex items-center gap-2 mt-2">
                  <TrendingUp className="w-4 h-4 text-[--mint]" />
                  <span className="text-[--mint] font-semibold">+{topCompetitor.growthRate}% growth</span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 space-y-2">
            <p className="text-sm text-white/50">What they did right:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm">
                <Check className="w-4 h-4 text-[--mint] mt-0.5 flex-shrink-0" />
                Posted 5 Reels with trending audio
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Check className="w-4 h-4 text-[--mint] mt-0.5 flex-shrink-0" />
                Consistent posting at peak hours
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Check className="w-4 h-4 text-[--mint] mt-0.5 flex-shrink-0" />
                High response rate in comments
              </li>
            </ul>
          </div>
        </div>

        {/* Best Post */}
        <div className="card card-coral">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-[--coral]" />
            <h3 className="font-semibold">Highest Engagement Post</h3>
          </div>

          {topPost && (
            <div className="flex gap-4 p-4 bg-white/5 rounded-xl">
              <img
                src={topPost.thumbnail}
                alt=""
                className="w-24 h-24 rounded-xl object-cover"
              />
              <div className="flex-1 min-w-0">
                <span className="badge badge-coral mb-2">{topPost.type}</span>
                <p className="text-sm line-clamp-2">{topPost.caption.slice(0, 100)}...</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-white/50">
                  <span>{topPost.engagementRate}% engagement</span>
                  <span>{(topPost.likes / 1000).toFixed(1)}K likes</span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 space-y-2">
            <p className="text-sm text-white/50">Why it performed well:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm">
                <Check className="w-4 h-4 text-[--coral] mt-0.5 flex-shrink-0" />
                Posted during peak engagement window
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Check className="w-4 h-4 text-[--coral] mt-0.5 flex-shrink-0" />
                Story-driven caption with CTA
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Check className="w-4 h-4 text-[--coral] mt-0.5 flex-shrink-0" />
                Used niche-specific hashtags
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="card">
        <div className="flex items-center gap-2 mb-6">
          <Lightbulb className="w-5 h-5 text-[--sunset]" />
          <h3 className="font-semibold">Key Insights This Week</h3>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {insights.slice(0, 3).map((insight) => (
            <div
              key={insight.id}
              className="p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-colors"
            >
              <span
                className={`badge text-[10px] mb-3 ${
                  insight.impact === 'high'
                    ? 'badge-coral'
                    : insight.impact === 'medium'
                    ? 'badge-sunset'
                    : 'badge-ocean'
                }`}
              >
                {insight.impact.toUpperCase()} IMPACT
              </span>
              <h4 className="font-medium mb-2">{insight.title}</h4>
              <p className="text-sm text-white/50 line-clamp-3">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="card card-lavender">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-[--lavender]" />
            <h3 className="font-semibold">What You Should Experiment With</h3>
          </div>
          <span className="text-sm text-white/50">
            {highPrioritySuggestions.length} urgent actions
          </span>
        </div>

        <div className="space-y-3">
          {suggestions.slice(0, 4).map((suggestion, index) => (
            <div
              key={suggestion.id}
              className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/8 transition-colors cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-[--lavender]/20 flex items-center justify-center text-[--lavender] font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{suggestion.title}</h4>
                  {suggestion.priority === 'urgent' && (
                    <span className="badge badge-coral text-[10px]">URGENT</span>
                  )}
                </div>
                <p className="text-sm text-white/50">{suggestion.expectedImpact}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-white/50 group-hover:translate-x-1 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
