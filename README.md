# Trendly - Instagram Competitor Analysis MVP

A platform for Instagram content creators to track competitors and get growth insights.

## Quick Start

```bash
# Install dependencies
npm install

# Run the app
npm run dev
```

Open **http://localhost:3000**

## Features (MVP)

1. **Connect Your Account** - Enter your Instagram username
2. **Track Competitors** - Add competitor usernames to monitor
3. **See Comparisons** - Your metrics vs competitor averages
4. **Get Suggestions** - Actionable tips based on what works

## Optional: Real Data

Add API keys to `.env.local` for real Instagram data and AI insights:

```
NEXT_PUBLIC_RAPIDAPI_KEY=your_key    # Instagram data
OPENAI_API_KEY=your_key              # AI recommendations
```

Without keys, the app works with demo data.

## Tech Stack

- Next.js 16
- TypeScript  
- Tailwind CSS
- Zustand (state)
- Recharts (charts)
