'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { mockNicheSuggestions } from '@/data/mockData';
import { Competitor } from '@/types';
import {
  X,
  Search,
  Instagram,
  Users,
  TrendingUp,
  Sparkles,
  MapPin,
  Check,
  Loader2,
} from 'lucide-react';

interface AddCompetitorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddCompetitorModal({ isOpen, onClose }: AddCompetitorModalProps) {
  const { addCompetitor, competitors, nicheFilter, locationFilter, followerRange, setNicheFilter, setLocationFilter, setFollowerRange } = useStore();
  const [tab, setTab] = useState<'search' | 'discover'>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Competitor[]>([]);
  const [selectedNiches, setSelectedNiches] = useState<string[]>([]);

  const niches = ['Travel', 'Fashion', 'Fitness', 'Food', 'Beauty', 'Lifestyle', 'Tech', 'Photography', 'Art', 'Music'];
  const locations = ['Worldwide', 'United States', 'United Kingdom', 'Germany', 'France', 'Dubai', 'Australia', 'Canada'];

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResult: Competitor = {
        id: `new-${Date.now()}`,
        username: searchQuery.toLowerCase().replace(/[^a-z0-9_]/g, ''),
        displayName: searchQuery,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${searchQuery}`,
        bio: 'Content creator and influencer',
        followers: Math.floor(Math.random() * 500000) + 50000,
        following: Math.floor(Math.random() * 2000) + 500,
        postsCount: Math.floor(Math.random() * 1000) + 100,
        engagementRate: Number((Math.random() * 8 + 2).toFixed(1)),
        niche: selectedNiches.length > 0 ? selectedNiches : ['Lifestyle'],
        location: 'Unknown',
        isTracked: false,
        addedAt: new Date(),
        averageLikes: Math.floor(Math.random() * 50000) + 5000,
        averageComments: Math.floor(Math.random() * 2000) + 100,
        postingFrequency: Math.floor(Math.random() * 10) + 3,
        growthRate: Number((Math.random() * 8 - 2).toFixed(1)),
      };
      setSearchResults([mockResult]);
      setIsSearching(false);
    }, 1500);
  };

  const handleAddCompetitor = (competitor: Competitor) => {
    addCompetitor({ ...competitor, isTracked: true });
    onClose();
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-[--card] border border-[--border] rounded-2xl shadow-2xl animate-scale-in overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[--border]">
          <div>
            <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              Add Competitor
            </h2>
            <p className="text-sm text-white/50 mt-1">
              Find and track Instagram accounts to analyze
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[--border]">
          <button
            onClick={() => setTab('search')}
            className={`flex-1 py-4 text-sm font-medium transition-colors ${
              tab === 'search'
                ? 'text-[--coral] border-b-2 border-[--coral]'
                : 'text-white/50 hover:text-white'
            }`}
          >
            <Search className="w-4 h-4 inline mr-2" />
            Search Username
          </button>
          <button
            onClick={() => setTab('discover')}
            className={`flex-1 py-4 text-sm font-medium transition-colors ${
              tab === 'discover'
                ? 'text-[--coral] border-b-2 border-[--coral]'
                : 'text-white/50 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 inline mr-2" />
            Auto-Discover
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {tab === 'search' ? (
            <div className="space-y-6">
              {/* Search Input */}
              <div className="relative">
                <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Enter Instagram username..."
                  className="input pl-12 pr-24"
                />
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[--coral] rounded-lg text-sm font-semibold disabled:opacity-50 transition-all hover:bg-[--coral-light]"
                >
                  {isSearching ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    'Search'
                  )}
                </button>
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-white/60">Search Results</h3>
                  {searchResults.map((result) => (
                    <div
                      key={result.id}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-[--border] hover:border-[--coral]/50 transition-all"
                    >
                      <img
                        src={result.avatar}
                        alt={result.displayName}
                        className="w-14 h-14 rounded-full ring-2 ring-[--border]"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold">{result.displayName}</p>
                        <p className="text-sm text-white/50">@{result.username}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-white/40">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {formatNumber(result.followers)}
                          </span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {result.engagementRate}%
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAddCompetitor(result)}
                        className="px-4 py-2 bg-gradient-to-r from-[--coral] to-[--sunset] rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-[--coral]/25 transition-all"
                      >
                        Add & Track
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Existing Competitors */}
              {competitors.length > 0 && searchResults.length === 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-white/60">Currently Tracking</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {competitors.slice(0, 4).map((comp) => (
                      <div
                        key={comp.id}
                        className="flex items-center gap-3 p-3 bg-white/5 rounded-lg opacity-60"
                      >
                        <img
                          src={comp.avatar}
                          alt={comp.displayName}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">@{comp.username}</p>
                          <p className="text-xs text-white/40">{formatNumber(comp.followers)}</p>
                        </div>
                        <Check className="w-4 h-4 text-[--mint]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Filters */}
              <div className="grid grid-cols-2 gap-4">
                {/* Niche Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-white/60">Niche</label>
                  <div className="flex flex-wrap gap-2">
                    {niches.map((niche) => (
                      <button
                        key={niche}
                        onClick={() => {
                          if (selectedNiches.includes(niche)) {
                            setSelectedNiches(selectedNiches.filter((n) => n !== niche));
                          } else {
                            setSelectedNiches([...selectedNiches, niche]);
                          }
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          selectedNiches.includes(niche)
                            ? 'bg-[--coral] text-white'
                            : 'bg-white/10 text-white/60 hover:bg-white/20'
                        }`}
                      >
                        {niche}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-white/60">Location</label>
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="input bg-[--card]"
                  >
                    <option value="">Any Location</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Follower Range */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-white/60">Follower Range</label>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    placeholder="Min"
                    className="input flex-1"
                    defaultValue={10000}
                  />
                  <span className="text-white/40">to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="input flex-1"
                    defaultValue={1000000}
                  />
                </div>
              </div>

              {/* Suggested Competitors */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-white/60">Suggested for You</h3>
                  <button className="text-xs text-[--coral] hover:underline">Refresh</button>
                </div>
                
                <div className="space-y-3">
                  {mockNicheSuggestions
                    .filter((s) => selectedNiches.length === 0 || selectedNiches.some((n) => s.niche.toLowerCase().includes(n.toLowerCase())))
                    .slice(0, 3)
                    .map((suggestion) => (
                      <div
                        key={suggestion.niche}
                        className="p-4 bg-white/5 rounded-xl border border-[--border]"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="badge badge-coral">{suggestion.niche}</span>
                          <span className="text-xs text-white/40">
                            Avg {suggestion.avgEngagement}% engagement
                          </span>
                        </div>
                        
                        {suggestion.competitors.map((comp) => (
                          <div
                            key={comp.id}
                            className="flex items-center gap-3 mt-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                          >
                            <img
                              src={comp.avatar}
                              alt={comp.displayName}
                              className="w-10 h-10 rounded-full"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium">@{comp.username}</p>
                              <div className="flex items-center gap-3 text-xs text-white/40">
                                <span>{formatNumber(comp.followers)} followers</span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {comp.location}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => handleAddCompetitor(comp)}
                              className="px-3 py-1.5 bg-[--coral] rounded-lg text-xs font-semibold hover:bg-[--coral-light] transition-all"
                            >
                              Add
                            </button>
                          </div>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
