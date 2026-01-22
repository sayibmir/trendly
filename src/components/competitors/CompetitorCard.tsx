'use client';

import { Competitor } from '@/types';
import { useStore } from '@/store/useStore';
import {
  Users,
  Heart,
  MessageCircle,
  TrendingUp,
  MapPin,
  MoreVertical,
  Eye,
  EyeOff,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { useState } from 'react';

interface CompetitorCardProps {
  competitor: Competitor;
  variant?: 'default' | 'compact';
}

export default function CompetitorCard({ competitor, variant = 'default' }: CompetitorCardProps) {
  const { toggleTrackCompetitor, removeCompetitor, selectCompetitor } = useStore();
  const [showMenu, setShowMenu] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  if (variant === 'compact') {
    return (
      <div
        onClick={() => selectCompetitor(competitor.id)}
        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-all group"
      >
        <img
          src={competitor.avatar}
          alt={competitor.displayName}
          className="w-10 h-10 rounded-full ring-2 ring-[--border] group-hover:ring-[--coral] transition-all"
        />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate">{competitor.displayName}</p>
          <p className="text-xs text-white/40 truncate">@{competitor.username}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold">{formatNumber(competitor.followers)}</p>
          <p className={`text-xs ${competitor.growthRate > 0 ? 'text-[--mint]' : 'text-[--coral]'}`}>
            {competitor.growthRate > 0 ? '+' : ''}{competitor.growthRate}%
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card group relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[--coral]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Menu */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          className="p-2 rounded-lg bg-[--card] hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
        >
          <MoreVertical className="w-4 h-4" />
        </button>

        {showMenu && (
          <div className="absolute right-0 top-full mt-1 w-48 bg-[--card] border border-[--border] rounded-xl shadow-xl overflow-hidden animate-scale-in">
            <button
              onClick={() => {
                toggleTrackCompetitor(competitor.id);
                setShowMenu(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-left text-sm"
            >
              {competitor.isTracked ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  Stop Tracking
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Start Tracking
                </>
              )}
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-left text-sm">
              <ExternalLink className="w-4 h-4" />
              View on Instagram
            </button>
            <button
              onClick={() => {
                removeCompetitor(competitor.id);
                setShowMenu(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-left text-sm text-[--coral]"
            >
              <Trash2 className="w-4 h-4" />
              Remove
            </button>
          </div>
        )}
      </div>

      {/* Tracking status */}
      <div className="absolute top-4 left-4">
        <span
          className={`badge ${competitor.isTracked ? 'badge-mint' : 'bg-white/10 text-white/50'}`}
        >
          <span className={`status-dot ${competitor.isTracked ? 'status-online' : 'status-offline'}`} />
          {competitor.isTracked ? 'Tracking' : 'Paused'}
        </span>
      </div>

      {/* Profile */}
      <div className="relative pt-8 pb-4 flex flex-col items-center">
        <div className="relative">
          <img
            src={competitor.avatar}
            alt={competitor.displayName}
            className="w-20 h-20 rounded-full ring-4 ring-[--border] group-hover:ring-[--coral]/50 transition-all"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full instagram-gradient flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white fill-current">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </div>
        </div>

        <h3 className="mt-4 font-semibold text-lg">{competitor.displayName}</h3>
        <p className="text-sm text-white/50">@{competitor.username}</p>

        {/* Location */}
        <div className="flex items-center gap-1 mt-2 text-xs text-white/40">
          <MapPin className="w-3 h-3" />
          {competitor.location}
        </div>

        {/* Niches */}
        <div className="flex flex-wrap justify-center gap-2 mt-3">
          {competitor.niche.slice(0, 3).map((n) => (
            <span key={n} className="badge badge-coral text-[10px]">
              {n}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[--border]">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-white/40 mb-1">
            <Users className="w-3.5 h-3.5" />
          </div>
          <p className="font-bold tabular-nums">{formatNumber(competitor.followers)}</p>
          <p className="text-xs text-white/40">Followers</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-white/40 mb-1">
            <Heart className="w-3.5 h-3.5" />
          </div>
          <p className="font-bold tabular-nums">{formatNumber(competitor.averageLikes)}</p>
          <p className="text-xs text-white/40">Avg Likes</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-white/40 mb-1">
            <MessageCircle className="w-3.5 h-3.5" />
          </div>
          <p className="font-bold tabular-nums">{formatNumber(competitor.averageComments)}</p>
          <p className="text-xs text-white/40">Avg Comments</p>
        </div>
      </div>

      {/* Engagement & Growth */}
      <div className="mt-4 pt-4 border-t border-[--border] flex items-center justify-between">
        <div>
          <p className="text-xs text-white/40">Engagement Rate</p>
          <p className="font-bold text-[--ocean]">{competitor.engagementRate}%</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-white/40">Growth</p>
          <div className="flex items-center gap-1">
            <TrendingUp className={`w-4 h-4 ${competitor.growthRate > 0 ? 'text-[--mint]' : 'text-[--coral]'}`} />
            <p className={`font-bold ${competitor.growthRate > 0 ? 'text-[--mint]' : 'text-[--coral]'}`}>
              {competitor.growthRate > 0 ? '+' : ''}{competitor.growthRate}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
