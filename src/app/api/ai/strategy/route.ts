import { NextRequest, NextResponse } from 'next/server';
import { generateWeeklyStrategy } from '@/lib/ai-analyzer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userProfile, competitors } = body;

    if (!userProfile || !competitors) {
      return NextResponse.json(
        { error: 'User profile and competitors required' },
        { status: 400 }
      );
    }

    const strategy = await generateWeeklyStrategy(userProfile, competitors);

    return NextResponse.json(strategy);
  } catch (error) {
    console.error('Strategy generation error:', error);
    
    // Return fallback strategy
    return NextResponse.json({
      strategy: [
        {
          day: 'Monday',
          contentType: 'Carousel',
          topic: 'Weekly motivation or tips',
          bestTime: '12:00 PM',
          caption: 'Start your week strong 💪 Here are 5 things to focus on...',
          hashtags: ['#mondaymotivation', '#weeklygoals'],
        },
        {
          day: 'Wednesday',
          contentType: 'Reel',
          topic: 'Educational or tutorial content',
          bestTime: '6:00 PM',
          caption: 'Save this for later! Here\'s how to...',
          hashtags: ['#tutorial', '#howto', '#tips'],
        },
        {
          day: 'Friday',
          contentType: 'Reel',
          topic: 'Trending or entertaining content',
          bestTime: '5:00 PM',
          caption: 'Weekend vibes 🎉 [Trending topic]',
          hashtags: ['#friday', '#weekend', '#trending'],
        },
        {
          day: 'Sunday',
          contentType: 'Story',
          topic: 'Behind the scenes or Q&A',
          bestTime: '11:00 AM',
          caption: 'Sunday reset! AMA in stories 👇',
          hashtags: ['#sundayreset', '#ama'],
        },
      ],
      tips: [
        'Post consistently at the same times each week',
        'Respond to comments within the first hour',
        'Use 5-7 relevant hashtags per post',
        'Add a clear CTA in every caption',
      ],
      error: 'AI unavailable - showing template strategy',
    });
  }
}
