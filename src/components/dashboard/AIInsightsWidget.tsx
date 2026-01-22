'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import {
  Sparkles,
  Lightbulb,
  Loader2,
  RefreshCw,
  Copy,
  Check,
  ChevronRight,
  Wand2,
  Calendar,
  Hash,
  MessageSquare,
} from 'lucide-react';

interface ContentIdea {
  title: string;
  type: 'reel' | 'carousel' | 'image' | 'story';
  description: string;
  hook: string;
  hashtags: string[];
  bestTime: string;
  expectedEngagement: string;
}

interface AIAnalysis {
  contentIdeas: string[];
  captionTemplates: string[];
  hashtagRecommendations: string[];
  bestPostingStrategy: string;
  error?: string;
}

export default function AIInsightsWidget() {
  const { userProfile, competitors, posts } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [contentIdeas, setContentIdeas] = useState<ContentIdea[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'ideas' | 'captions' | 'strategy'>('ideas');

  const trackedCompetitors = competitors.filter((c) => c.isTracked);

  const runAnalysis = async () => {
    setIsLoading(true);
    try {
      // Fetch AI analysis
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          competitors: trackedCompetitors,
          posts,
          userProfile,
        }),
      });

      const data = await response.json();
      setAnalysis(data);

      // Also fetch content ideas
      if (userProfile) {
        const ideasResponse = await fetch('/api/ai/content-ideas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userProfile,
            competitors: trackedCompetitors,
            topPosts: posts.slice(0, 10),
            count: 5,
          }),
        });
        const ideasData = await ideasResponse.json();
        setContentIdeas(ideasData.ideas || []);
      }
    } catch (error) {
      console.error('AI analysis error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const typeColors: Record<string, string> = {
    reel: 'badge-coral',
    carousel: 'badge-ocean',
    image: 'badge-mint',
    story: 'badge-lavender',
  };

  return (
    <div className="card h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[--lavender] to-[--coral] flex items-center justify-center animate-pulse-glow">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
              AI-Powered Insights
            </h3>
            <p className="text-sm text-white/50">
              Smart recommendations based on competitor analysis
            </p>
          </div>
        </div>
        <button
          onClick={runAnalysis}
          disabled={isLoading || trackedCompetitors.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[--lavender] to-[--coral] rounded-xl text-sm font-semibold disabled:opacity-50 hover:shadow-lg transition-all"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              Generate Insights
            </>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-white/5 rounded-lg mb-6">
        {[
          { id: 'ideas', label: 'Content Ideas', icon: Lightbulb },
          { id: 'captions', label: 'Captions', icon: MessageSquare },
          { id: 'strategy', label: 'Strategy', icon: Calendar },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[--coral] text-white'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      {!analysis && !isLoading && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <Wand2 className="w-8 h-8 text-white/20" />
          </div>
          <h4 className="font-medium mb-2">Ready to Analyze</h4>
          <p className="text-sm text-white/50 max-w-sm">
            Click &quot;Generate Insights&quot; to get AI-powered content recommendations based on your competitors
          </p>
        </div>
      )}

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-10 h-10 text-[--coral] animate-spin mb-4" />
          <p className="text-white/50">Analyzing competitor data...</p>
        </div>
      )}

      {analysis && !isLoading && (
        <div className="space-y-4">
          {/* Warning if using fallback */}
          {analysis.error && (
            <div className="p-3 rounded-lg bg-[--sunset]/10 border border-[--sunset]/30 text-sm text-[--sunset]">
              {analysis.error}
            </div>
          )}

          {/* Content Ideas Tab */}
          {activeTab === 'ideas' && (
            <div className="space-y-3">
              {contentIdeas.length > 0 ? (
                contentIdeas.map((idea, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-colors animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`badge ${typeColors[idea.type] || 'badge-coral'}`}>
                          {idea.type}
                        </span>
                        <span className="text-xs text-white/40">{idea.bestTime}</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(idea.hook, index)}
                        className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        {copiedIndex === index ? (
                          <Check className="w-4 h-4 text-[--mint]" />
                        ) : (
                          <Copy className="w-4 h-4 text-white/40" />
                        )}
                      </button>
                    </div>
                    <h4 className="font-medium mb-1">{idea.title}</h4>
                    <p className="text-sm text-white/60 mb-2">{idea.description}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-white/40">Hook:</span>
                      <span className="text-[--coral]">&quot;{idea.hook}&quot;</span>
                    </div>
                    {idea.hashtags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {idea.hashtags.map((tag, i) => (
                          <span key={i} className="text-xs text-[--ocean]">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                analysis.contentIdeas.map((idea, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/8 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[--coral]/20 flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="w-4 h-4 text-[--coral]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{idea}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(idea, index)}
                      className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      {copiedIndex === index ? (
                        <Check className="w-4 h-4 text-[--mint]" />
                      ) : (
                        <Copy className="w-4 h-4 text-white/40" />
                      )}
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Captions Tab */}
          {activeTab === 'captions' && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-white/60 mb-3">Caption Templates</h4>
              {analysis.captionTemplates.map((template, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-[--ocean] flex-shrink-0 mt-0.5" />
                    <p className="flex-1 text-sm italic">&quot;{template}&quot;</p>
                    <button
                      onClick={() => copyToClipboard(template, index + 100)}
                      className="p-1.5 rounded-lg hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      {copiedIndex === index + 100 ? (
                        <Check className="w-4 h-4 text-[--mint]" />
                      ) : (
                        <Copy className="w-4 h-4 text-white/40" />
                      )}
                    </button>
                  </div>
                </div>
              ))}

              <h4 className="text-sm font-medium text-white/60 mt-6 mb-3">Recommended Hashtags</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.hashtagRecommendations.map((tag, index) => (
                  <button
                    key={index}
                    onClick={() => copyToClipboard(tag, index + 200)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[--ocean]/20 text-[--ocean] text-sm hover:bg-[--ocean]/30 transition-colors"
                  >
                    <Hash className="w-3 h-3" />
                    {tag.replace('#', '')}
                    {copiedIndex === index + 200 && (
                      <Check className="w-3 h-3 text-[--mint]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Strategy Tab */}
          {activeTab === 'strategy' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-[--coral]/10 to-[--lavender]/10 border border-[--coral]/20">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-[--coral]" />
                  <h4 className="font-medium">Best Posting Strategy</h4>
                </div>
                <p className="text-sm text-white/70">{analysis.bestPostingStrategy}</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5">
                <h4 className="font-medium mb-3">Quick Tips</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-white/60">
                    <ChevronRight className="w-4 h-4 text-[--mint] mt-0.5 flex-shrink-0" />
                    Post Reels during peak hours (5-7 PM) for maximum reach
                  </li>
                  <li className="flex items-start gap-2 text-sm text-white/60">
                    <ChevronRight className="w-4 h-4 text-[--mint] mt-0.5 flex-shrink-0" />
                    Use 5-7 niche hashtags instead of 30 generic ones
                  </li>
                  <li className="flex items-start gap-2 text-sm text-white/60">
                    <ChevronRight className="w-4 h-4 text-[--mint] mt-0.5 flex-shrink-0" />
                    Reply to comments in the first hour to boost algorithm favor
                  </li>
                  <li className="flex items-start gap-2 text-sm text-white/60">
                    <ChevronRight className="w-4 h-4 text-[--mint] mt-0.5 flex-shrink-0" />
                    End every caption with a question or CTA
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
