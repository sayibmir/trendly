import { NextRequest, NextResponse } from 'next/server';
import { analyzeCompetitorContent } from '@/lib/ai-analyzer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { competitors, posts, userProfile } = body;

    if (!competitors || !posts) {
      return NextResponse.json(
        { error: 'Competitors and posts data required' },
        { status: 400 }
      );
    }

    const analysis = await analyzeCompetitorContent(competitors, posts, userProfile);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('AI analysis error:', error);
    
    // Return mock data if AI fails
    return NextResponse.json({
      insights: [],
      suggestions: [],
      contentIdeas: [
        'Behind-the-scenes content showing your creative process',
        'Tutorial or how-to related to your niche',
        'Day in the life content',
        'Trending audio Reel with your unique twist',
        'Carousel post sharing valuable tips',
      ],
      captionTemplates: [
        'Here\'s what nobody tells you about [topic]... 👇',
        'I spent [time] learning this so you don\'t have to:',
        'The secret to [result]? It\'s simpler than you think.',
      ],
      hashtagRecommendations: ['#contentcreator', '#growthtips', '#instagram'],
      bestPostingStrategy: 'Post Reels Tuesday-Friday between 5-7 PM for optimal engagement.',
      error: 'AI analysis unavailable - showing sample recommendations',
    });
  }
}
