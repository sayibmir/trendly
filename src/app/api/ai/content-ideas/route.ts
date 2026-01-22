import { NextRequest, NextResponse } from 'next/server';
import { generateContentIdeas } from '@/lib/ai-analyzer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userProfile, competitors, topPosts, count = 10 } = body;

    if (!userProfile || !competitors) {
      return NextResponse.json(
        { error: 'User profile and competitors required' },
        { status: 400 }
      );
    }

    const ideas = await generateContentIdeas(userProfile, competitors, topPosts || [], count);

    return NextResponse.json(ideas);
  } catch (error) {
    console.error('Content ideas error:', error);
    
    // Return fallback ideas
    return NextResponse.json({
      ideas: [
        {
          title: '3 Things I Wish I Knew Earlier',
          type: 'carousel',
          description: 'Share lessons learned in your niche',
          hook: 'Nobody talks about this...',
          hashtags: ['#tips', '#lessons', '#growth'],
          bestTime: 'Wednesday 6PM',
          expectedEngagement: 'High - educational content performs well',
        },
        {
          title: 'Day in My Life',
          type: 'reel',
          description: 'Show your daily routine with trending audio',
          hook: 'POV: You\'re spending a day with me',
          hashtags: ['#dayinthelife', '#routine', '#vlog'],
          bestTime: 'Friday 5PM',
          expectedEngagement: 'High - relatable content',
        },
        {
          title: 'Unpopular Opinion',
          type: 'reel',
          description: 'Share a controversial take in your niche',
          hook: 'Hot take: [statement]',
          hashtags: ['#unpopularopinion', '#hottake'],
          bestTime: 'Tuesday 7PM',
          expectedEngagement: 'Very High - drives comments',
        },
      ],
      error: 'AI unavailable - showing template ideas',
    });
  }
}
