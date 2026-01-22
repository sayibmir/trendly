// Core types for Trendly - Instagram Competitor Analysis Platform

export interface Competitor {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  postsCount: number;
  engagementRate: number;
  niche: string[];
  location: string;
  isTracked: boolean;
  addedAt: Date;
  averageLikes: number;
  averageComments: number;
  postingFrequency: number; // posts per week
  growthRate: number; // follower growth percentage
}

export interface Post {
  id: string;
  competitorId: string;
  type: 'image' | 'video' | 'carousel' | 'reel';
  thumbnail: string;
  caption: string;
  hashtags: string[];
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  engagementRate: number;
  postedAt: Date;
  dayOfWeek: string;
  timeOfDay: string;
}

export interface TrendInsight {
  id: string;
  type: 'content_type' | 'timing' | 'hashtag' | 'caption' | 'format';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  data: Record<string, unknown>;
  competitors: string[];
}

export interface ActionableSuggestion {
  id: string;
  priority: 'urgent' | 'recommended' | 'optional';
  category: 'content' | 'timing' | 'engagement' | 'hashtags' | 'format';
  title: string;
  description: string;
  expectedImpact: string;
  basedOn: string[];
  actionSteps: string[];
}

export interface DashboardWidget {
  id: string;
  type: 'stats' | 'chart' | 'competitors' | 'posts' | 'suggestions' | 'trends' | 'hashtags' | 'timing';
  title: string;
  size: 'small' | 'medium' | 'large';
  position: { x: number; y: number };
  isVisible: boolean;
}

export interface Report {
  id: string;
  title: string;
  generatedAt: Date;
  period: 'weekly' | 'monthly';
  competitors: Competitor[];
  topPerformingPosts: Post[];
  insights: TrendInsight[];
  suggestions: ActionableSuggestion[];
  summary: string;
}

export interface EngagementMetrics {
  date: string;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  engagement: number;
}

export interface ContentTypeMetrics {
  type: string;
  count: number;
  avgEngagement: number;
  avgLikes: number;
  avgComments: number;
}

export interface TimingMetrics {
  hour: number;
  day: string;
  avgEngagement: number;
  postCount: number;
}

export interface HashtagMetrics {
  hashtag: string;
  usageCount: number;
  avgEngagement: number;
  trending: boolean;
}

export interface NicheSuggestion {
  niche: string;
  competitors: Competitor[];
  avgFollowers: number;
  avgEngagement: number;
}
