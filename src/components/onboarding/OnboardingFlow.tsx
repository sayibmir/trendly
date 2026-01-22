'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { UserProfile } from '@/types';
import {
  Instagram,
  ArrowRight,
  Loader2,
  CheckCircle,
  TrendingUp,
  Users,
  BarChart3,
  Sparkles,
} from 'lucide-react';

export default function OnboardingFlow() {
  const { setUserProfile, setUserPosts, setActiveView } = useStore();
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [fetchedProfile, setFetchedProfile] = useState<UserProfile | null>(null);

  const handleFetchProfile = async () => {
    if (!username.trim()) {
      setError('Please enter your Instagram username');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/instagram/profile?username=${encodeURIComponent(username.trim())}`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.profile) {
          const userProfile: UserProfile = {
            ...data.profile,
            connectedAt: new Date(),
          };
          setFetchedProfile(userProfile);
          setStep(2);
          setIsLoading(false);
          return;
        }
      }

      // Fallback to mock profile for demo
      const mockProfile: UserProfile = {
        id: `user-${Date.now()}`,
        username: username.toLowerCase().replace(/[^a-z0-9_]/g, ''),
        displayName: username,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
        bio: 'Content creator',
        followers: Math.floor(Math.random() * 50000) + 5000,
        following: Math.floor(Math.random() * 1000) + 200,
        postsCount: Math.floor(Math.random() * 500) + 50,
        engagementRate: Number((Math.random() * 5 + 2).toFixed(1)),
        niche: ['Lifestyle'],
        location: 'Unknown',
        averageLikes: Math.floor(Math.random() * 5000) + 500,
        averageComments: Math.floor(Math.random() * 200) + 20,
        postingFrequency: Math.floor(Math.random() * 7) + 2,
        growthRate: Number((Math.random() * 5 - 1).toFixed(1)),
        connectedAt: new Date(),
      };
      setFetchedProfile(mockProfile);
      setStep(2);
    } catch (err) {
      setError('Failed to fetch profile. Using demo mode.');
      // Create demo profile
      const mockProfile: UserProfile = {
        id: `user-${Date.now()}`,
        username: username.toLowerCase().replace(/[^a-z0-9_]/g, ''),
        displayName: username,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
        bio: 'Content creator (Demo)',
        followers: Math.floor(Math.random() * 50000) + 5000,
        following: Math.floor(Math.random() * 1000) + 200,
        postsCount: Math.floor(Math.random() * 500) + 50,
        engagementRate: Number((Math.random() * 5 + 2).toFixed(1)),
        niche: ['Lifestyle'],
        location: 'Unknown',
        averageLikes: Math.floor(Math.random() * 5000) + 500,
        averageComments: Math.floor(Math.random() * 200) + 20,
        postingFrequency: Math.floor(Math.random() * 7) + 2,
        growthRate: Number((Math.random() * 5 - 1).toFixed(1)),
        connectedAt: new Date(),
      };
      setFetchedProfile(mockProfile);
      setStep(2);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmProfile = () => {
    if (fetchedProfile) {
      setUserProfile(fetchedProfile);
      setStep(3);
    }
  };

  const handleComplete = () => {
    setActiveView('dashboard');
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-[--background] bg-grid bg-gradient-radial flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  step >= s
                    ? 'bg-gradient-to-br from-[--coral] to-[--sunset] text-white'
                    : 'bg-white/10 text-white/40'
                }`}
              >
                {step > s ? <CheckCircle className="w-5 h-5" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`w-16 h-1 rounded-full transition-all ${
                    step > s ? 'bg-[--coral]' : 'bg-white/10'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Connect Account */}
        {step === 1 && (
          <div className="card animate-scale-in text-center">
            <div className="w-20 h-20 mx-auto rounded-2xl instagram-gradient flex items-center justify-center mb-6">
              <Instagram className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Connect Your Instagram
            </h1>
            <p className="text-white/50 mb-8 max-w-md mx-auto">
              Enter your Instagram username to analyze your account and compare it with competitors
            </p>

            <div className="max-w-sm mx-auto space-y-4">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">@</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleFetchProfile()}
                  placeholder="your_username"
                  className="input pl-10 text-center"
                  autoFocus
                />
              </div>

              {error && (
                <p className="text-sm text-[--sunset]">{error}</p>
              )}

              <button
                onClick={handleFetchProfile}
                disabled={isLoading}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Fetching profile...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-white/30 mt-6">
              We only read public profile data. No login required.
            </p>
          </div>
        )}

        {/* Step 2: Confirm Profile */}
        {step === 2 && fetchedProfile && (
          <div className="card animate-scale-in">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ fontFamily: 'var(--font-display)' }}>
              Is This Your Account?
            </h2>

            <div className="flex flex-col items-center mb-8">
              <img
                src={fetchedProfile.avatar}
                alt={fetchedProfile.displayName}
                className="w-24 h-24 rounded-full ring-4 ring-[--coral]/30 mb-4"
              />
              <h3 className="text-xl font-semibold">{fetchedProfile.displayName}</h3>
              <p className="text-white/50">@{fetchedProfile.username}</p>
              
              {fetchedProfile.bio && (
                <p className="text-sm text-white/60 mt-3 text-center max-w-sm">
                  {fetchedProfile.bio}
                </p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 rounded-xl bg-white/5">
                <Users className="w-5 h-5 mx-auto mb-2 text-[--coral]" />
                <p className="text-2xl font-bold">{formatNumber(fetchedProfile.followers)}</p>
                <p className="text-xs text-white/40">Followers</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/5">
                <BarChart3 className="w-5 h-5 mx-auto mb-2 text-[--ocean]" />
                <p className="text-2xl font-bold">{fetchedProfile.engagementRate}%</p>
                <p className="text-xs text-white/40">Engagement</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/5">
                <TrendingUp className="w-5 h-5 mx-auto mb-2 text-[--mint]" />
                <p className="text-2xl font-bold">{fetchedProfile.postsCount}</p>
                <p className="text-xs text-white/40">Posts</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setStep(1);
                  setFetchedProfile(null);
                }}
                className="btn-secondary flex-1"
              >
                Not Me
              </button>
              <button
                onClick={handleConfirmProfile}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                Yes, Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Ready */}
        {step === 3 && (
          <div className="card animate-scale-in text-center">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[--mint] to-[--ocean] flex items-center justify-center mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              You&apos;re All Set!
            </h1>
            <p className="text-white/50 mb-8 max-w-md mx-auto">
              Your account is connected. Now add competitors to start analyzing and getting insights.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8 max-w-md mx-auto">
              <div className="p-4 rounded-xl bg-[--coral]/10 border border-[--coral]/20">
                <Users className="w-6 h-6 text-[--coral] mx-auto mb-2" />
                <p className="text-sm font-medium">Track Competitors</p>
              </div>
              <div className="p-4 rounded-xl bg-[--ocean]/10 border border-[--ocean]/20">
                <BarChart3 className="w-6 h-6 text-[--ocean] mx-auto mb-2" />
                <p className="text-sm font-medium">Compare Metrics</p>
              </div>
              <div className="p-4 rounded-xl bg-[--mint]/10 border border-[--mint]/20">
                <TrendingUp className="w-6 h-6 text-[--mint] mx-auto mb-2" />
                <p className="text-sm font-medium">Get Insights</p>
              </div>
            </div>

            <button
              onClick={handleComplete}
              className="btn-primary flex items-center justify-center gap-2 mx-auto"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
