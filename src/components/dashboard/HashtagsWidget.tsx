'use client';

import { mockHashtagMetrics } from '@/data/mockData';
import { Hash, TrendingUp, ArrowUpRight } from 'lucide-react';

export default function HashtagsWidget() {
  const sortedHashtags = [...mockHashtagMetrics].sort(
    (a, b) => b.avgEngagement - a.avgEngagement
  );

  return (
    <div className="card h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[--ocean] to-[--mint] flex items-center justify-center">
            <Hash className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
              Top Hashtags
            </h3>
            <p className="text-sm text-white/50">By engagement rate</p>
          </div>
        </div>
      </div>

      {/* Hashtags List */}
      <div className="space-y-3">
        {sortedHashtags.slice(0, 8).map((hashtag, index) => (
          <div
            key={hashtag.hashtag}
            className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group"
          >
            {/* Rank */}
            <span className="w-5 text-xs text-white/30 text-right">{index + 1}</span>

            {/* Hashtag */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-[--ocean] group-hover:text-[--ocean-dark] transition-colors">
                  {hashtag.hashtag}
                </span>
                {hashtag.trending && (
                  <span className="flex items-center gap-0.5 text-[10px] text-[--coral] font-semibold">
                    <TrendingUp className="w-3 h-3" />
                    TRENDING
                  </span>
                )}
              </div>
              <span className="text-xs text-white/40">{hashtag.usageCount} posts</span>
            </div>

            {/* Engagement */}
            <div className="text-right">
              <div className="flex items-center gap-1 text-[--mint]">
                <span className="font-semibold">{hashtag.avgEngagement}%</span>
                <ArrowUpRight className="w-3 h-3" />
              </div>
              <span className="text-[10px] text-white/40">avg eng.</span>
            </div>
          </div>
        ))}
      </div>

      {/* View More */}
      <button className="w-full mt-4 py-2 text-sm text-[--coral] hover:underline">
        View all hashtags
      </button>
    </div>
  );
}
