'use client';

import { useStore } from '@/store/useStore';
import { User, LogOut } from 'lucide-react';

export default function SettingsView() {
  const { userProfile, clearUserProfile } = useStore();

  const handleDisconnect = () => {
    clearUserProfile();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
        Settings
      </h1>

      {/* Connected Account */}
      {userProfile && (
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Connected Account</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={userProfile.avatar}
                alt={userProfile.displayName}
                className="w-14 h-14 rounded-xl"
              />
              <div>
                <p className="font-semibold">{userProfile.displayName}</p>
                <p className="text-white/50">@{userProfile.username}</p>
              </div>
            </div>
            <button
              onClick={handleDisconnect}
              className="flex items-center gap-2 px-4 py-2 text-[--coral] border border-[--coral]/30 rounded-lg hover:bg-[--coral]/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Disconnect
            </button>
          </div>
        </div>
      )}

      {/* About */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">About</h2>
        <p className="text-white/60 text-sm">
          Trendly helps Instagram creators track competitors and discover what content works best in their niche.
        </p>
      </div>
    </div>
  );
}
