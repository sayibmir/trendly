'use client';

import { useStore } from '@/store/useStore';
import {
  Zap,
  Clock,
  MessageSquare,
  Hash,
  Layers,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';

const categoryIcons: Record<string, React.ElementType> = {
  content: Layers,
  timing: Clock,
  engagement: MessageSquare,
  hashtags: Hash,
  format: Zap,
};

const priorityStyles = {
  urgent: {
    badge: 'bg-[--coral] text-white',
    border: 'border-[--coral]/30',
    glow: 'shadow-[--coral]/10',
  },
  recommended: {
    badge: 'bg-[--sunset] text-black',
    border: 'border-[--sunset]/30',
    glow: 'shadow-[--sunset]/10',
  },
  optional: {
    badge: 'bg-[--ocean] text-black',
    border: 'border-[--ocean]/30',
    glow: 'shadow-[--ocean]/10',
  },
};

export default function SuggestionsWidget() {
  const { suggestions } = useStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  const toggleComplete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (completedIds.includes(id)) {
      setCompletedIds(completedIds.filter((i) => i !== id));
    } else {
      setCompletedIds([...completedIds, id]);
    }
  };

  return (
    <div className="card h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[--coral] to-[--sunset] flex items-center justify-center animate-pulse-glow">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
              Actionable Suggestions
            </h3>
            <p className="text-sm text-white/50">Based on competitor success patterns</p>
          </div>
        </div>
        <span className="text-xs text-white/40">
          {completedIds.length}/{suggestions.length} done
        </span>
      </div>

      {/* Suggestions List */}
      <div className="space-y-3">
        {suggestions.map((suggestion) => {
          const Icon = categoryIcons[suggestion.category] || Zap;
          const styles = priorityStyles[suggestion.priority];
          const isExpanded = expandedId === suggestion.id;
          const isCompleted = completedIds.includes(suggestion.id);

          return (
            <div
              key={suggestion.id}
              onClick={() => setExpandedId(isExpanded ? null : suggestion.id)}
              className={`rounded-xl border transition-all cursor-pointer overflow-hidden ${
                isCompleted
                  ? 'bg-white/5 border-[--border] opacity-60'
                  : `bg-white/5 hover:bg-white/8 ${styles.border} hover:shadow-lg ${styles.glow}`
              }`}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  {/* Checkbox */}
                  <button
                    onClick={(e) => toggleComplete(suggestion.id, e)}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-[--mint] border-[--mint]'
                        : 'border-white/20 hover:border-[--coral]'
                    }`}
                  >
                    {isCompleted && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </button>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${styles.badge}`}>
                        {suggestion.priority}
                      </span>
                      <span className="badge bg-white/10 text-white/60 text-[10px]">
                        <Icon className="w-3 h-3" />
                        {suggestion.category}
                      </span>
                    </div>
                    <h4 className={`font-medium ${isCompleted ? 'line-through' : ''}`}>
                      {suggestion.title}
                    </h4>
                    <p className="text-sm text-white/50 mt-1">{suggestion.description}</p>

                    {/* Expected Impact */}
                    <div className="flex items-center gap-2 mt-3 text-xs">
                      <span className="text-white/40">Expected:</span>
                      <span className="text-[--mint] font-semibold">{suggestion.expectedImpact}</span>
                    </div>
                  </div>

                  {/* Expand Arrow */}
                  <ArrowRight
                    className={`w-5 h-5 text-white/30 transition-transform ${
                      isExpanded ? 'rotate-90' : ''
                    }`}
                  />
                </div>

                {/* Expanded Content */}
                {isExpanded && !isCompleted && (
                  <div className="mt-4 pt-4 border-t border-[--border] animate-slide-down">
                    <p className="text-xs text-white/40 mb-2">Action Steps:</p>
                    <ul className="space-y-2">
                      {suggestion.actionSteps.map((step, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-white/70">
                          <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[--border]">
                      <span className="text-xs text-white/40">Based on:</span>
                      <div className="flex items-center gap-1">
                        {suggestion.basedOn.slice(0, 3).map((comp) => (
                          <span key={comp} className="text-xs text-[--ocean]">
                            @{comp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
