import { NextRequest, NextResponse } from 'next/server';
import { fetchInstagramProfile, fetchInstagramPosts, calculateEngagementMetrics } from '@/lib/instagram-api';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json(
      { error: 'Username is required' },
      { status: 400 }
    );
  }

  try {
    // Fetch profile
    const profile = await fetchInstagramProfile(username);
    
    if (!profile) {
      return NextResponse.json(
        { error: 'Could not fetch profile. Check API key and username.' },
        { status: 404 }
      );
    }

    // Fetch recent posts
    const posts = await fetchInstagramPosts(username, 12);

    // Calculate engagement metrics
    const enrichedProfile = calculateEngagementMetrics(profile, posts);

    return NextResponse.json({
      profile: enrichedProfile,
      posts,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Instagram data' },
      { status: 500 }
    );
  }
}
