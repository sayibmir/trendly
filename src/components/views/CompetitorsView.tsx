'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import CompetitorCard from '@/components/competitors/CompetitorCard';
import AddCompetitorModal from '@/components/competitors/AddCompetitorModal';
import {
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  SortAsc,
  Users,
} from 'lucide-react';

export default function CompetitorsView() {
  const { competitors, searchQuery, setSearchQuery } = useStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'followers' | 'engagement' | 'growth'>('followers');
  const [filterTracked, setFilterTracked] = useState<'all' | 'tracked' | 'paused'>('all');

  const filteredCompetitors = competitors
    .filter((c) => {
      if (filterTracked === 'tracked') return c.isTracked;
      if (filterTracked === 'paused') return !c.isTracked;
      return true;
    })
    .filter(
      (c) =>
        c.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.niche.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'followers') return b.followers - a.followers;
      if (sortBy === 'engagement') return b.engagementRate - a.engagementRate;
      return b.growthRate - a.growthRate;
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
            Competitors
          </h1>
          <p className="text-white/50 mt-1">
            Manage and analyze your tracked Instagram accounts
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Competitor
        </button>
      </div>

      {/* Stats Bar */}
      <div className="flex items-center gap-6 p-4 bg-[--card] rounded-xl border border-[--border]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[--coral]/20 flex items-center justify-center">
            <Users className="w-5 h-5 text-[--coral]" />
          </div>
          <div>
            <p className="text-2xl font-bold">{competitors.length}</p>
            <p className="text-xs text-white/40">Total Competitors</p>
          </div>
        </div>
        <div className="w-px h-10 bg-[--border]" />
        <div>
          <p className="text-2xl font-bold text-[--mint]">
            {competitors.filter((c) => c.isTracked).length}
          </p>
          <p className="text-xs text-white/40">Actively Tracked</p>
        </div>
        <div className="w-px h-10 bg-[--border]" />
        <div>
          <p className="text-2xl font-bold text-[--ocean]">
            {(competitors.reduce((sum, c) => sum + c.engagementRate, 0) / competitors.length).toFixed(1)}%
          </p>
          <p className="text-xs text-white/40">Avg Engagement</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by username, name, or niche..."
            className="input pl-11"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          {/* Filter Status */}
          <div className="flex items-center gap-1 p-1 bg-white/5 rounded-lg">
            {(['all', 'tracked', 'paused'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setFilterTracked(filter)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all capitalize ${
                  filterTracked === filter
                    ? 'bg-[--coral] text-white'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg text-sm hover:bg-white/10 transition-colors">
              <SortAsc className="w-4 h-4" />
              Sort: {sortBy}
            </button>
            <div className="absolute right-0 top-full mt-2 w-40 bg-[--card] border border-[--border] rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              {(['followers', 'engagement', 'growth'] as const).map((sort) => (
                <button
                  key={sort}
                  onClick={() => setSortBy(sort)}
                  className={`w-full px-4 py-2 text-left text-sm capitalize hover:bg-white/5 first:rounded-t-xl last:rounded-b-xl ${
                    sortBy === sort ? 'text-[--coral]' : 'text-white/70'
                  }`}
                >
                  {sort}
                </button>
              ))}
            </div>
          </div>

          {/* View Mode */}
          <div className="flex items-center gap-1 p-1 bg-white/5 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-[--coral] text-white' : 'text-white/50 hover:text-white'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-[--coral] text-white' : 'text-white/50 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Competitors Grid/List */}
      {filteredCompetitors.length > 0 ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {filteredCompetitors.map((competitor, index) => (
            <div
              key={competitor.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CompetitorCard
                competitor={competitor}
                variant={viewMode === 'list' ? 'compact' : 'default'}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <Users className="w-10 h-10 text-white/20" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No competitors found</h3>
          <p className="text-white/50 mb-6">
            {searchQuery
              ? 'Try adjusting your search or filters'
              : 'Start by adding your first competitor to track'}
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Competitor
          </button>
        </div>
      )}

      {/* Add Modal */}
      <AddCompetitorModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  );
}
