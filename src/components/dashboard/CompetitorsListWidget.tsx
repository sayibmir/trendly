'use client';

import { useStore } from '@/store/useStore';
import CompetitorCard from '@/components/competitors/CompetitorCard';
import { Plus, Users } from 'lucide-react';

interface CompetitorsListWidgetProps {
  onAddClick?: () => void;
}

export default function CompetitorsListWidget({ onAddClick }: CompetitorsListWidgetProps) {
  const { competitors } = useStore();
  const trackedCompetitors = competitors.filter((c) => c.isTracked);

  return (
    <div className="card h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[--coral] to-[--lavender] flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
              Tracked Competitors
            </h3>
            <p className="text-sm text-white/50">{trackedCompetitors.length} active</p>
          </div>
        </div>
        <button
          onClick={onAddClick}
          className="p-2 rounded-lg bg-[--coral]/20 text-[--coral] hover:bg-[--coral]/30 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Competitors List */}
      <div className="space-y-2">
        {trackedCompetitors.slice(0, 5).map((competitor) => (
          <CompetitorCard key={competitor.id} competitor={competitor} variant="compact" />
        ))}
      </div>

      {/* View All */}
      {trackedCompetitors.length > 5 && (
        <button className="w-full mt-4 py-2 text-sm text-[--coral] hover:underline">
          View all {trackedCompetitors.length} competitors
        </button>
      )}
    </div>
  );
}
