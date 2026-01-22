/**
 * AI-Powered Analysis Module
 * 
 * Uses OpenAI GPT-4 for intelligent content analysis and recommendations.
 * 
 * Setup:
 * 1. Get an API key from https://platform.openai.com
 * 2. Add to .env.local: OPENAI_API_KEY=your_key_here
 */

import { Competitor, Post, UserProfile, ActionableSuggestion, TrendInsight } from '@/types';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

interface AIAnalysisResult {
  insights: TrendInsight[];
  suggestions: ActionableSuggestion[];
  contentIdeas: string[];
  captionTemplates: string[];
  hashtagRecommendations: string[];
  bestPostingStrategy: string;
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/**
 * Call OpenAI API
 */
async function callOpenAI(messages: ChatMessage[], maxTokens = 1000): Promise<string> {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4-turbo-preview',
      messages,
      max_tokens: maxTokens,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'OpenAI API error');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

/**
 * Analyze competitor content and generate insights
 */
export async function analyzeCompetitorContent(
  competitors: Competitor[],
  posts: Post[],
  userProfile?: UserProfile
): Promise<AIAnalysisResult> {
  const competitorSummary = competitors.map(c => ({
    username: c.username,
    followers: c.followers,
    engagementRate: c.engagementRate,
    niche: c.niche,
    postingFrequency: c.postingFrequency,
    avgLikes: c.averageLikes,
    avgComments: c.averageComments,
  }));

  const topPosts = posts
    .sort((a, b) => b.engagementRate - a.engagementRate)
    .slice(0, 10)
    .map(p => ({
      type: p.type,
      caption: p.caption.slice(0, 200),
      hashtags: p.hashtags.slice(0, 5),
      likes: p.likes,
      comments: p.comments,
      engagementRate: p.engagementRate,
      dayOfWeek: p.dayOfWeek,
      timeOfDay: p.timeOfDay,
    }));

  const userSummary = userProfile ? {
    followers: userProfile.followers,
    engagementRate: userProfile.engagementRate,
    avgLikes: userProfile.averageLikes,
    postingFrequency: userProfile.postingFrequency,
    niche: userProfile.niche,
  } : null;

  const systemPrompt = `You are an expert Instagram growth strategist and content analyst. 
Analyze the provided competitor data and generate actionable insights.
Always respond in valid JSON format.`;

  const userPrompt = `Analyze this Instagram competitor data and provide strategic recommendations:

COMPETITORS:
${JSON.stringify(competitorSummary, null, 2)}

TOP PERFORMING POSTS:
${JSON.stringify(topPosts, null, 2)}

${userSummary ? `USER PROFILE:
${JSON.stringify(userSummary, null, 2)}` : ''}

Provide your analysis in this exact JSON format:
{
  "insights": [
    {
      "type": "content_type|timing|hashtag|caption|format",
      "title": "Brief title",
      "description": "Detailed insight",
      "impact": "high|medium|low",
      "confidence": 85
    }
  ],
  "suggestions": [
    {
      "priority": "urgent|recommended|optional",
      "category": "content|timing|engagement|hashtags|format",
      "title": "Action title",
      "description": "What to do",
      "expectedImpact": "+X% engagement",
      "actionSteps": ["Step 1", "Step 2", "Step 3"]
    }
  ],
  "contentIdeas": ["Idea 1", "Idea 2", "Idea 3", "Idea 4", "Idea 5"],
  "captionTemplates": ["Template 1 with [placeholder]", "Template 2"],
  "hashtagRecommendations": ["#hashtag1", "#hashtag2", "#hashtag3"],
  "bestPostingStrategy": "Detailed posting schedule recommendation"
}`;

  try {
    const response = await callOpenAI([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ], 2000);

    // Parse JSON from response (handle markdown code blocks)
    let jsonStr = response;
    if (response.includes('```json')) {
      jsonStr = response.split('```json')[1].split('```')[0];
    } else if (response.includes('```')) {
      jsonStr = response.split('```')[1].split('```')[0];
    }

    const result = JSON.parse(jsonStr.trim());

    // Add IDs to insights and suggestions
    result.insights = result.insights.map((i: TrendInsight, idx: number) => ({
      ...i,
      id: `ai-insight-${idx}`,
      competitors: competitors.slice(0, 3).map(c => c.id),
    }));

    result.suggestions = result.suggestions.map((s: ActionableSuggestion, idx: number) => ({
      ...s,
      id: `ai-suggestion-${idx}`,
      basedOn: competitors.slice(0, 2).map(c => c.username),
    }));

    return result;
  } catch (error) {
    console.error('AI analysis error:', error);
    throw error;
  }
}

/**
 * Analyze a specific caption and suggest improvements
 */
export async function analyzeCaptions(
  captions: string[],
  niche: string[]
): Promise<{
  analysis: { caption: string; score: number; strengths: string[]; improvements: string[] }[];
  patterns: string[];
}> {
  const systemPrompt = `You are an Instagram caption expert. Analyze captions for engagement potential.`;

  const userPrompt = `Analyze these Instagram captions for the ${niche.join(', ')} niche:

${captions.map((c, i) => `Caption ${i + 1}: "${c}"`).join('\n\n')}

Respond in JSON format:
{
  "analysis": [
    {
      "caption": "original caption",
      "score": 85,
      "strengths": ["Has CTA", "Storytelling"],
      "improvements": ["Add more emojis", "Include question"]
    }
  ],
  "patterns": ["Pattern 1 that works well", "Pattern 2"]
}`;

  const response = await callOpenAI([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt },
  ]);

  let jsonStr = response;
  if (response.includes('```')) {
    jsonStr = response.split('```')[1].replace('json', '').split('```')[0];
  }

  return JSON.parse(jsonStr.trim());
}

/**
 * Generate content ideas based on competitor success
 */
export async function generateContentIdeas(
  userProfile: UserProfile,
  competitors: Competitor[],
  topPosts: Post[],
  count = 10
): Promise<{
  ideas: {
    title: string;
    type: 'reel' | 'carousel' | 'image' | 'story';
    description: string;
    hook: string;
    hashtags: string[];
    bestTime: string;
    expectedEngagement: string;
  }[];
}> {
  const systemPrompt = `You are a viral Instagram content strategist. Generate specific, actionable content ideas.`;

  const context = {
    userNiche: userProfile.niche,
    userFollowers: userProfile.followers,
    competitorNiches: [...new Set(competitors.flatMap(c => c.niche))],
    topContentTypes: topPosts.slice(0, 5).map(p => p.type),
    topHashtags: [...new Set(topPosts.flatMap(p => p.hashtags))].slice(0, 10),
    successfulCaptions: topPosts.slice(0, 3).map(p => p.caption.slice(0, 100)),
  };

  const userPrompt = `Generate ${count} viral content ideas based on this data:

${JSON.stringify(context, null, 2)}

Respond in JSON format:
{
  "ideas": [
    {
      "title": "Catchy title",
      "type": "reel|carousel|image|story",
      "description": "What the content should include",
      "hook": "First 3 seconds / first slide hook",
      "hashtags": ["#relevant", "#hashtags"],
      "bestTime": "Tuesday 6PM",
      "expectedEngagement": "High - because..."
    }
  ]
}`;

  const response = await callOpenAI([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt },
  ], 2000);

  let jsonStr = response;
  if (response.includes('```')) {
    jsonStr = response.split('```')[1].replace('json', '').split('```')[0];
  }

  return JSON.parse(jsonStr.trim());
}

/**
 * Generate a weekly content strategy
 */
export async function generateWeeklyStrategy(
  userProfile: UserProfile,
  competitors: Competitor[]
): Promise<{
  strategy: {
    day: string;
    contentType: string;
    topic: string;
    bestTime: string;
    caption: string;
    hashtags: string[];
  }[];
  tips: string[];
}> {
  const systemPrompt = `You are an Instagram growth coach. Create actionable weekly content plans.`;

  const userPrompt = `Create a 7-day Instagram content strategy for:

Niche: ${userProfile.niche.join(', ')}
Current followers: ${userProfile.followers}
Current engagement: ${userProfile.engagementRate}%
Posting frequency goal: ${Math.max(...competitors.map(c => c.postingFrequency))} posts/week

Top competitor engagement rates: ${competitors.map(c => `${c.username}: ${c.engagementRate}%`).join(', ')}

Respond in JSON format:
{
  "strategy": [
    {
      "day": "Monday",
      "contentType": "Reel",
      "topic": "Specific topic idea",
      "bestTime": "6:00 PM",
      "caption": "Full caption with CTA",
      "hashtags": ["#hashtag1", "#hashtag2"]
    }
  ],
  "tips": ["Tip 1", "Tip 2", "Tip 3"]
}`;

  const response = await callOpenAI([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt },
  ], 2500);

  let jsonStr = response;
  if (response.includes('```')) {
    jsonStr = response.split('```')[1].replace('json', '').split('```')[0];
  }

  return JSON.parse(jsonStr.trim());
}

/**
 * Analyze why a post performed well/poorly
 */
export async function analyzePostPerformance(
  post: Post,
  averageEngagement: number
): Promise<{
  performanceRating: 'excellent' | 'good' | 'average' | 'poor';
  reasons: string[];
  improvements: string[];
  replicateStrategy: string;
}> {
  const performance = post.engagementRate > averageEngagement * 1.5 
    ? 'high performing' 
    : post.engagementRate < averageEngagement * 0.5 
      ? 'low performing' 
      : 'average performing';

  const systemPrompt = `You are an Instagram analytics expert. Analyze post performance.`;

  const userPrompt = `Analyze this ${performance} Instagram post:

Type: ${post.type}
Caption: "${post.caption}"
Hashtags: ${post.hashtags.join(', ')}
Posted: ${post.dayOfWeek} at ${post.timeOfDay}
Engagement rate: ${post.engagementRate}% (average is ${averageEngagement}%)
Likes: ${post.likes}
Comments: ${post.comments}

Respond in JSON format:
{
  "performanceRating": "excellent|good|average|poor",
  "reasons": ["Reason 1", "Reason 2"],
  "improvements": ["Improvement 1", "Improvement 2"],
  "replicateStrategy": "How to replicate success or avoid issues"
}`;

  const response = await callOpenAI([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt },
  ]);

  let jsonStr = response;
  if (response.includes('```')) {
    jsonStr = response.split('```')[1].replace('json', '').split('```')[0];
  }

  return JSON.parse(jsonStr.trim());
}
