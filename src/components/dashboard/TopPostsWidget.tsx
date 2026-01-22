'use client';

import { useStore } from '@/store/useStore';
import { Heart, MessageCircle, Bookmark, Share2, ExternalLink, Play } from 'lucide-react';

export default function TopPostsWidget() {
  const { posts, competitors } = useStore();
  const topPosts = [...posts]
    .sort((a, b) => b.engagementRate - a.engagementRate)
    .slice(0, 5);

  const getCompetitor = (id: string) => competitors.find((c) => c.id === id);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getTypeIcon = (type: string) => {
    if (type === 'reel' || type === 'video') {
      return <Play className="w-4 h-4" />;
    }
    return null;
  };

  return (
    <div className="card h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
            Top Performing Posts
          </h3>
          <p className="text-sm text-white/50">Highest engagement this week</p>
        </div>
        <button className="text-sm text-[--coral] hover:underline flex items-center gap-1">
          View All
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {topPosts.map((post, index) => {
          const competitor = getCompetitor(post.competitorId);
          return (
            <div
              key={post.id}
              className="flex gap-4 p-3 -mx-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group"
            >
              {/* Rank */}
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[--coral]/20 to-[--sunset]/20 flex items-center justify-center text-xs font-bold text-[--coral]">
                {index + 1}
              </div>

              {/* Thumbnail */}
              <div className="relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden">
                <img
                  src={post.thumbnail}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {getTypeIcon(post.type) && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                      {getTypeIcon(post.type)}
                    </div>
                  </div>
                )}
                <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded bg-black/60 text-[10px] font-medium uppercase">
                  {post.type}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {competitor && (
                    <>
                      <img
                        src={competitor.avatar}
                        alt={competitor.username}
                        className="w-5 h-5 rounded-full"
                      />
                      <span className="text-xs text-white/50">@{competitor.username}</span>
                    </>
                  )}
                </div>
                <p className="text-sm line-clamp-2 text-white/80">{post.caption.slice(0, 80)}...</p>
                
                {/* Stats */}
                <div className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-1 text-xs text-white/40">
                    <Heart className="w-3 h-3" />
                    {formatNumber(post.likes)}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-white/40">
                    <MessageCircle className="w-3 h-3" />
                    {formatNumber(post.comments)}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-white/40">
                    <Bookmark className="w-3 h-3" />
                    {formatNumber(post.saves)}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-white/40">
                    <Share2 className="w-3 h-3" />
                    {formatNumber(post.shares)}
                  </span>
                </div>
              </div>

              {/* Engagement Rate */}
              <div className="flex-shrink-0 text-right">
                <p className="text-lg font-bold text-[--mint]">{post.engagementRate}%</p>
                <p className="text-xs text-white/40">engagement</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
