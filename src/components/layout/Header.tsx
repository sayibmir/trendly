'use client';

import { useStore } from '@/store/useStore';
import { Search, Bell, Plus, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { searchQuery, setSearchQuery, sidebarOpen } = useStore();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header
      className={`fixed top-0 right-0 h-16 bg-[--background]/80 backdrop-blur-xl border-b border-[--border] z-40 flex items-center justify-between px-6 transition-all duration-300 ${
        sidebarOpen ? 'left-64' : 'left-20'
      }`}
    >
      {/* Search */}
      <div className="relative w-96">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search competitors, posts, or insights..."
          className="input pl-11 pr-4 py-2.5 bg-[--card] text-sm"
        />
        <kbd className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-[--border] text-[10px] text-white/40 font-mono">
          ⌘K
        </kbd>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Add Competitor Button */}
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[--coral] to-[--coral-light] rounded-xl text-sm font-semibold text-white hover:shadow-lg hover:shadow-[--coral]/25 transition-all hover:-translate-y-0.5">
          <Plus className="w-4 h-4" />
          <span>Add Competitor</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-xl bg-[--card] border border-[--border] text-white/60 hover:text-white hover:border-[--border-hover] transition-all"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[--coral] animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-[--card] border border-[--border] rounded-xl shadow-2xl animate-scale-in overflow-hidden">
              <div className="p-4 border-b border-[--border]">
                <h3 className="font-semibold">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {[
                  {
                    title: 'New trend detected',
                    desc: 'Reels under 15s are getting 2x engagement',
                    time: '2m ago',
                    type: 'trend',
                  },
                  {
                    title: '@travel_luxe posted',
                    desc: 'New carousel about Bali destinations',
                    time: '1h ago',
                    type: 'post',
                  },
                  {
                    title: 'Weekly report ready',
                    desc: 'Your competitor analysis is available',
                    time: '3h ago',
                    type: 'report',
                  },
                ].map((notif, i) => (
                  <div
                    key={i}
                    className="p-4 hover:bg-white/5 cursor-pointer transition-colors border-b border-[--border] last:border-0"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          notif.type === 'trend'
                            ? 'bg-[--coral]'
                            : notif.type === 'post'
                            ? 'bg-[--ocean]'
                            : 'bg-[--mint]'
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{notif.title}</p>
                        <p className="text-xs text-white/50 truncate">{notif.desc}</p>
                        <p className="text-xs text-white/30 mt-1">{notif.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-[--border]">
                <button className="w-full py-2 text-sm text-[--coral] hover:underline">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <button className="flex items-center gap-3 p-2 pr-4 rounded-xl hover:bg-white/5 transition-colors">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[--ocean] to-[--lavender] flex items-center justify-center text-sm font-bold">
            SM
          </div>
          <div className="text-left">
            <p className="text-sm font-medium">Sarah Miller</p>
            <p className="text-xs text-white/40">Pro Plan</p>
          </div>
          <ChevronDown className="w-4 h-4 text-white/40" />
        </button>
      </div>
    </header>
  );
}
