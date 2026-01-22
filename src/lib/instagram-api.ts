/**
 * Instagram API Integration
 * 
 * This module provides functions to fetch real Instagram data.
 * You'll need to sign up for an API provider and add your API key.
 * 
 * Recommended providers (via RapidAPI):
 * - Instagram Scraper API: https://rapidapi.com/social-api1-instagram/api/instagram-scraper-api2
 * - Instagram Data: https://rapidapi.com/arraybobo/api/instagram-data1
 * 
 * Setup:
 * 1. Sign up at https://rapidapi.com
 * 2. Subscribe to an Instagram API
 * 3. Copy your API key
 * 4. Add it to .env.local as RAPIDAPI_KEY
 */

import { Competitor, Post } from '@/types';

const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '';
const RAPIDAPI_HOST = 'instagram-scraper-api2.p.rapidapi.com';

interface InstagramUserResponse {
  data: {
    id: string;
    username: string;
    full_name: string;
    profile_pic_url: string;
    biography: string;
    follower_count: number;
    following_count: number;
    media_count: number;
    is_business_account: boolean;
    category?: string;
    public_email?: string;
    city_name?: string;
  };
}

interface InstagramPostResponse {
  data: {
    items: Array<{
      id: string;
      code: string;
      media_type: number; // 1 = image, 2 = video, 8 = carousel
      thumbnail_url: string;
      caption?: { text: string };
      like_count: number;
      comment_count: number;
      taken_at: number;
      video_view_count?: number;
    }>;
  };
}

/**
 * Fetch Instagram user profile data
 */
export async function fetchInstagramProfile(username: string): Promise<Competitor | null> {
  if (!RAPIDAPI_KEY) {
    console.error('RAPIDAPI_KEY is not set. Add it to .env.local');
    return null;
  }

  try {
    const response = await fetch(
      `https://${RAPIDAPI_HOST}/v1/info?username_or_id_or_url=${username}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': RAPIDAPI_KEY,
          'x-rapidapi-host': RAPIDAPI_HOST,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: InstagramUserResponse = await response.json();
    const user = data.data;

    // Calculate estimated engagement rate (rough estimate)
    const estimatedEngagement = user.follower_count > 0 
      ? Math.min(((user.media_count * 100) / user.follower_count) * 0.5, 15)
      : 0;

    return {
      id: user.id,
      username: user.username,
      displayName: user.full_name || user.username,
      avatar: user.profile_pic_url,
      bio: user.biography || '',
      followers: user.follower_count,
      following: user.following_count,
      postsCount: user.media_count,
      engagementRate: Number(estimatedEngagement.toFixed(1)),
      niche: user.category ? [user.category] : ['Unknown'],
      location: user.city_name || 'Unknown',
      isTracked: false,
      addedAt: new Date(),
      averageLikes: 0, // Will be calculated from posts
      averageComments: 0,
      postingFrequency: 0,
      growthRate: 0,
    };
  } catch (error) {
    console.error('Error fetching Instagram profile:', error);
    return null;
  }
}

/**
 * Fetch recent posts from an Instagram account
 */
export async function fetchInstagramPosts(username: string, limit = 12): Promise<Post[]> {
  if (!RAPIDAPI_KEY) {
    console.error('RAPIDAPI_KEY is not set');
    return [];
  }

  try {
    const response = await fetch(
      `https://${RAPIDAPI_HOST}/v1.2/posts?username_or_id_or_url=${username}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': RAPIDAPI_KEY,
          'x-rapidapi-host': RAPIDAPI_HOST,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: InstagramPostResponse = await response.json();
    
    return data.data.items.slice(0, limit).map((item) => {
      const postedAt = new Date(item.taken_at * 1000);
      const dayOfWeek = postedAt.toLocaleDateString('en-US', { weekday: 'long' });
      const timeOfDay = postedAt.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });

      // Extract hashtags from caption
      const caption = item.caption?.text || '';
      const hashtagRegex = /#[\w]+/g;
      const hashtags = caption.match(hashtagRegex) || [];

      // Determine post type
      let type: 'image' | 'video' | 'carousel' | 'reel' = 'image';
      if (item.media_type === 2) type = 'video';
      else if (item.media_type === 8) type = 'carousel';

      return {
        id: item.id,
        competitorId: '', // Will be set when associating with competitor
        type,
        thumbnail: item.thumbnail_url,
        caption,
        hashtags,
        likes: item.like_count,
        comments: item.comment_count,
        shares: 0, // Not available via API
        saves: 0, // Not available via API
        engagementRate: 0, // Will be calculated
        postedAt,
        dayOfWeek,
        timeOfDay,
      };
    });
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    return [];
  }
}

/**
 * Search for Instagram users by keyword
 */
export async function searchInstagramUsers(query: string): Promise<Partial<Competitor>[]> {
  if (!RAPIDAPI_KEY) {
    console.error('RAPIDAPI_KEY is not set');
    return [];
  }

  try {
    const response = await fetch(
      `https://${RAPIDAPI_HOST}/v1/search_users?search_query=${encodeURIComponent(query)}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': RAPIDAPI_KEY,
          'x-rapidapi-host': RAPIDAPI_HOST,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    return data.data.items.map((user: { 
      id: string; 
      username: string; 
      full_name: string; 
      profile_pic_url: string;
      follower_count?: number;
    }) => ({
      id: user.id,
      username: user.username,
      displayName: user.full_name,
      avatar: user.profile_pic_url,
      followers: user.follower_count || 0,
    }));
  } catch (error) {
    console.error('Error searching Instagram users:', error);
    return [];
  }
}

/**
 * Calculate engagement metrics for a competitor based on their posts
 */
export function calculateEngagementMetrics(
  competitor: Competitor, 
  posts: Post[]
): Competitor {
  if (posts.length === 0) return competitor;

  const totalLikes = posts.reduce((sum, p) => sum + p.likes, 0);
  const totalComments = posts.reduce((sum, p) => sum + p.comments, 0);
  const avgLikes = totalLikes / posts.length;
  const avgComments = totalComments / posts.length;
  
  // Calculate engagement rate
  const avgEngagement = competitor.followers > 0
    ? ((avgLikes + avgComments) / competitor.followers) * 100
    : 0;

  // Calculate posting frequency (posts per week)
  const oldestPost = posts[posts.length - 1];
  const newestPost = posts[0];
  const daysDiff = (newestPost.postedAt.getTime() - oldestPost.postedAt.getTime()) / (1000 * 60 * 60 * 24);
  const postsPerWeek = daysDiff > 0 ? (posts.length / daysDiff) * 7 : posts.length;

  // Update post engagement rates
  const postsWithEngagement = posts.map((post) => ({
    ...post,
    competitorId: competitor.id,
    engagementRate: competitor.followers > 0
      ? Number((((post.likes + post.comments) / competitor.followers) * 100).toFixed(2))
      : 0,
  }));

  return {
    ...competitor,
    averageLikes: Math.round(avgLikes),
    averageComments: Math.round(avgComments),
    engagementRate: Number(avgEngagement.toFixed(2)),
    postingFrequency: Math.round(postsPerWeek),
  };
}
