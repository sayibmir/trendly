import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Competitor, UserProfile, ActionableSuggestion } from '@/types';
import { mockCompetitors, mockSuggestions } from '@/data/mockData';

interface AppState {
  // User
  userProfile: UserProfile | null;
  isOnboarded: boolean;
  setUserProfile: (profile: UserProfile) => void;
  clearUserProfile: () => void;

  // Competitors
  competitors: Competitor[];
  addCompetitor: (competitor: Competitor) => void;
  removeCompetitor: (id: string) => void;
  toggleTrackCompetitor: (id: string) => void;

  // Suggestions
  suggestions: ActionableSuggestion[];

  // UI
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  activeView: 'dashboard' | 'competitors' | 'settings' | 'onboarding';
  setActiveView: (view: 'dashboard' | 'competitors' | 'settings' | 'onboarding') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // User
      userProfile: null,
      isOnboarded: false,
      setUserProfile: (profile) => set({ userProfile: profile, isOnboarded: true }),
      clearUserProfile: () => set({ userProfile: null, isOnboarded: false }),

      // Competitors
      competitors: mockCompetitors,
      addCompetitor: (competitor) =>
        set((state) => ({ competitors: [...state.competitors, competitor] })),
      removeCompetitor: (id) =>
        set((state) => ({ competitors: state.competitors.filter((c) => c.id !== id) })),
      toggleTrackCompetitor: (id) =>
        set((state) => ({
          competitors: state.competitors.map((c) =>
            c.id === id ? { ...c, isTracked: !c.isTracked } : c
          ),
        })),

      // Suggestions
      suggestions: mockSuggestions,

      // UI
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      activeView: 'dashboard',
      setActiveView: (view) => set({ activeView: view }),
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: 'trendly-storage',
      partialize: (state) => ({
        userProfile: state.userProfile,
        isOnboarded: state.isOnboarded,
        competitors: state.competitors,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);
