import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  Competitor,
  Post,
  TrendInsight,
  ActionableSuggestion,
  DashboardWidget,
} from '@/types';
import {
  mockCompetitors,
  mockPosts,
  mockTrendInsights,
  mockSuggestions,
  mockDashboardWidgets,
} from '@/data/mockData';

interface AppState {
  // Competitors
  competitors: Competitor[];
  selectedCompetitorId: string | null;
  addCompetitor: (competitor: Competitor) => void;
  removeCompetitor: (id: string) => void;
  toggleTrackCompetitor: (id: string) => void;
  selectCompetitor: (id: string | null) => void;

  // Posts
  posts: Post[];
  getPostsByCompetitor: (competitorId: string) => Post[];
  getTopPosts: (limit?: number) => Post[];

  // Insights & Suggestions
  insights: TrendInsight[];
  suggestions: ActionableSuggestion[];

  // Dashboard
  widgets: DashboardWidget[];
  toggleWidget: (id: string) => void;
  reorderWidgets: (widgets: DashboardWidget[]) => void;

  // UI State
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  activeView: 'dashboard' | 'competitors' | 'analytics' | 'reports' | 'settings';
  setActiveView: (view: 'dashboard' | 'competitors' | 'analytics' | 'reports' | 'settings') => void;

  // Search & Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  nicheFilter: string[];
  setNicheFilter: (niches: string[]) => void;
  locationFilter: string;
  setLocationFilter: (location: string) => void;
  followerRange: [number, number];
  setFollowerRange: (range: [number, number]) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Competitors
      competitors: mockCompetitors,
      selectedCompetitorId: null,
      addCompetitor: (competitor) =>
        set((state) => ({
          competitors: [...state.competitors, competitor],
        })),
      removeCompetitor: (id) =>
        set((state) => ({
          competitors: state.competitors.filter((c) => c.id !== id),
        })),
      toggleTrackCompetitor: (id) =>
        set((state) => ({
          competitors: state.competitors.map((c) =>
            c.id === id ? { ...c, isTracked: !c.isTracked } : c
          ),
        })),
      selectCompetitor: (id) => set({ selectedCompetitorId: id }),

      // Posts
      posts: mockPosts,
      getPostsByCompetitor: (competitorId) =>
        get().posts.filter((p) => p.competitorId === competitorId),
      getTopPosts: (limit = 5) =>
        [...get().posts]
          .sort((a, b) => b.engagementRate - a.engagementRate)
          .slice(0, limit),

      // Insights & Suggestions
      insights: mockTrendInsights,
      suggestions: mockSuggestions,

      // Dashboard
      widgets: mockDashboardWidgets,
      toggleWidget: (id) =>
        set((state) => ({
          widgets: state.widgets.map((w) =>
            w.id === id ? { ...w, isVisible: !w.isVisible } : w
          ),
        })),
      reorderWidgets: (widgets) => set({ widgets }),

      // UI State
      sidebarOpen: true,
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      activeView: 'dashboard',
      setActiveView: (view) => set({ activeView: view }),

      // Search & Filters
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      nicheFilter: [],
      setNicheFilter: (niches) => set({ nicheFilter: niches }),
      locationFilter: '',
      setLocationFilter: (location) => set({ locationFilter: location }),
      followerRange: [0, 10000000],
      setFollowerRange: (range) => set({ followerRange: range }),
    }),
    {
      name: 'trendly-storage',
      partialize: (state) => ({
        competitors: state.competitors,
        widgets: state.widgets,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);
