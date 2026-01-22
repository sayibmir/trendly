# Trendly - Instagram Competitor Analysis Platform

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript" alt="TypeScript 5" />
  <img src="https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss" alt="Tailwind CSS" />
</div>

## Overview

Trendly is a powerful analytics platform designed for Instagram content creators to track, analyze, and outperform their competitors. Get actionable insights based on real competitor data to grow your Instagram presence.

## Features

### 🎯 Competitor Identification
- **Manual Search**: Add competitors by Instagram username
- **Auto-Discovery**: Get AI-powered suggestions based on:
  - Your niche
  - Follower count range
  - Geographic location
  - Similar content style

### 📊 Content Tracking & Analysis
- Track posts, reels, carousels, and stories
- Analyze engagement metrics (likes, comments, shares, saves)
- Monitor posting frequency and timing
- Extract and analyze hashtag strategies
- Caption sentiment and CTA analysis

### 📈 Trend Analysis
- Identify successful content patterns
- Optimal posting times heatmap
- Content type performance comparison
- Hashtag effectiveness tracking
- Growth rate monitoring

### 💡 Actionable Suggestions
- Prioritized recommendations (urgent, recommended, optional)
- Step-by-step action items
- Expected impact predictions
- Based on competitor success patterns

### 📋 Customizable Dashboard
- Drag-and-drop widget arrangement
- Toggle widget visibility
- Multiple view options (grid/list)
- Real-time data updates

### 📄 Clear Reports
- Weekly and monthly summaries
- Top performer highlights
- Key insights compilation
- Exportable PDF reports

## Getting Started

### Prerequisites
- Node.js 20.x or later
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/trendly.git
cd trendly

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Utilities**: date-fns

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/
│   ├── competitors/       # Competitor-related components
│   ├── dashboard/         # Dashboard widgets
│   ├── layout/           # Layout components (Sidebar, Header)
│   ├── reports/          # Report components
│   └── views/            # Main view components
├── data/
│   └── mockData.ts       # Mock data for development
├── store/
│   └── useStore.ts       # Zustand store
└── types/
    └── index.ts          # TypeScript interfaces
```

## Key Components

### Dashboard View
The main dashboard displays:
- Overview stats (tracked competitors, reach, engagement, posts)
- Engagement trends chart
- Content performance by type
- Top performing posts
- Trend insights
- Actionable suggestions
- Top hashtags
- Best posting times heatmap

### Competitors View
Manage tracked competitors:
- Grid and list view options
- Filter by tracking status
- Sort by followers, engagement, or growth
- Search by username, name, or niche
- Add new competitors via modal

### Analytics View
Deep dive into metrics:
- Competitor comparison charts
- Content mix distribution
- Engagement over time
- Growth metrics table

### Reports View
Generate and view reports:
- Weekly competitor reports
- Executive summaries
- Top performer highlights
- Actionable recommendations

### Settings View
Customize your experience:
- Profile settings
- Notification preferences
- Dashboard widget configuration
- Appearance (theme, accent colors)
- Privacy & security
- Billing management

## Design System

### Colors
- **Coral** (`#ff6b6b`): Primary accent
- **Sunset** (`#feca57`): Secondary accent
- **Ocean** (`#48dbfb`): Info/success
- **Mint** (`#1dd1a1`): Positive indicators
- **Lavender** (`#a29bfe`): Tertiary accent

### Typography
- **Display**: Clash Display (headings)
- **Body**: Satoshi (body text)

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## Future Enhancements

- [ ] Instagram API integration
- [ ] Real-time data syncing
- [ ] Team collaboration features
- [ ] Custom report templates
- [ ] Mobile app companion
- [ ] Scheduled report delivery
- [ ] AI-powered content suggestions

## License

MIT License - feel free to use this project for your own purposes.
