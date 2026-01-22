import { NextRequest, NextResponse } from 'next/server';
import { searchInstagramUsers } from '@/lib/instagram-api';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json(
      { error: 'Search query is required' },
      { status: 400 }
    );
  }

  try {
    const results = await searchInstagramUsers(query);

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to search Instagram users' },
      { status: 500 }
    );
  }
}
