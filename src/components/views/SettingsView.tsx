'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import {
  Settings,
  User,
  Bell,
  Palette,
  Shield,
  CreditCard,
  HelpCircle,
  ExternalLink,
  Check,
  ChevronRight,
  Moon,
  Sun,
  Monitor,
} from 'lucide-react';

const settingsSections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'dashboard', label: 'Dashboard', icon: Monitor },
  { id: 'privacy', label: 'Privacy & Security', icon: Shield },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'help', label: 'Help & Support', icon: HelpCircle },
];

export default function SettingsView() {
  const { widgets, toggleWidget, userProfile, clearUserProfile, setActiveView } = useStore();
  const [activeSection, setActiveSection] = useState('profile');
  const [notifications, setNotifications] = useState({
    newPosts: true,
    weeklyReports: true,
    trendAlerts: true,
    competitorChanges: false,
    emailDigest: true,
  });

  return (
    <div className="flex gap-6 h-[calc(100vh-6rem)]">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 space-y-1">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-[--coral]/20 to-transparent text-[--coral]'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{section.label}</span>
              {activeSection === section.id && (
                <ChevronRight className="w-4 h-4 ml-auto" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {activeSection === 'profile' && (
          <div className="space-y-6">
            {/* Connected Instagram Account */}
            {userProfile && (
              <div className="card card-coral">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={userProfile.avatar}
                      alt={userProfile.displayName}
                      className="w-16 h-16 rounded-xl ring-2 ring-[--coral]/30"
                    />
                    <div>
                      <p className="text-sm text-white/50">Connected Instagram</p>
                      <h3 className="text-lg font-semibold">{userProfile.displayName}</h3>
                      <p className="text-white/50">@{userProfile.username}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      clearUserProfile();
                      setActiveView('onboarding');
                    }}
                    className="btn-secondary text-sm"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            )}

            <div className="card">
              <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                Profile Settings
              </h2>

              <div className="flex items-start gap-6 mb-8">
                <div className="relative">
                  {userProfile ? (
                    <img
                      src={userProfile.avatar}
                      alt={userProfile.displayName}
                      className="w-24 h-24 rounded-2xl"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[--ocean] to-[--lavender] flex items-center justify-center text-3xl font-bold">
                      SM
                    </div>
                  )}
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[--coral] flex items-center justify-center text-white hover:bg-[--coral-light] transition-colors">
                    <Palette className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{userProfile?.displayName || 'Your Name'}</h3>
                  <p className="text-white/50">{userProfile ? `@${userProfile.username}` : 'your@email.com'}</p>
                  <span className="badge badge-coral mt-2">Pro Plan</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Full Name</label>
                  <input type="text" defaultValue={userProfile?.displayName || ''} className="input" />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Email</label>
                  <input type="email" defaultValue="" placeholder="your@email.com" className="input" />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Instagram Handle</label>
                  <input type="text" defaultValue={userProfile ? `@${userProfile.username}` : ''} className="input" disabled />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Timezone</label>
                  <select className="input">
                    <option>Pacific Time (PT)</option>
                    <option>Eastern Time (ET)</option>
                    <option>Central European Time (CET)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button className="btn-primary">Save Changes</button>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'notifications' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                Notification Preferences
              </h2>

              <div className="space-y-4">
                {[
                  { key: 'newPosts', label: 'New competitor posts', desc: 'Get notified when tracked competitors post new content' },
                  { key: 'weeklyReports', label: 'Weekly reports', desc: 'Receive weekly summary reports via email' },
                  { key: 'trendAlerts', label: 'Trend alerts', desc: 'Get notified about emerging trends and patterns' },
                  { key: 'competitorChanges', label: 'Competitor changes', desc: 'Alerts for significant follower or engagement changes' },
                  { key: 'emailDigest', label: 'Email digest', desc: 'Daily digest of all notifications' },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-white/50">{item.desc}</p>
                    </div>
                    <button
                      onClick={() =>
                        setNotifications({
                          ...notifications,
                          [item.key]: !notifications[item.key as keyof typeof notifications],
                        })
                      }
                      className={`w-12 h-6 rounded-full transition-all ${
                        notifications[item.key as keyof typeof notifications]
                          ? 'bg-[--coral]'
                          : 'bg-white/20'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                          notifications[item.key as keyof typeof notifications]
                            ? 'translate-x-6'
                            : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'dashboard' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                Dashboard Widgets
              </h2>
              <p className="text-white/50 mb-6">
                Customize which widgets appear on your dashboard
              </p>

              <div className="grid grid-cols-2 gap-4">
                {widgets.map((widget) => (
                  <div
                    key={widget.id}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${
                      widget.isVisible
                        ? 'bg-[--coral]/10 border-[--coral]/30'
                        : 'bg-white/5 border-[--border] opacity-60'
                    }`}
                    onClick={() => toggleWidget(widget.id)}
                  >
                    <div>
                      <p className="font-medium">{widget.title}</p>
                      <p className="text-xs text-white/40 capitalize">{widget.size} size</p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        widget.isVisible
                          ? 'bg-[--coral] text-white'
                          : 'bg-white/10'
                      }`}
                    >
                      {widget.isVisible && <Check className="w-4 h-4" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'appearance' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                Appearance
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-white/60 mb-3">Theme</label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: 'dark', label: 'Dark', icon: Moon },
                      { id: 'light', label: 'Light', icon: Sun },
                      { id: 'system', label: 'System', icon: Monitor },
                    ].map((theme) => {
                      const Icon = theme.icon;
                      const isActive = theme.id === 'dark';
                      return (
                        <button
                          key={theme.id}
                          className={`p-4 rounded-xl border transition-all ${
                            isActive
                              ? 'bg-[--coral]/10 border-[--coral]/30'
                              : 'bg-white/5 border-[--border] hover:border-[--border-hover]'
                          }`}
                        >
                          <Icon className={`w-6 h-6 mx-auto mb-2 ${isActive ? 'text-[--coral]' : 'text-white/40'}`} />
                          <p className={`text-sm font-medium ${isActive ? 'text-[--coral]' : ''}`}>
                            {theme.label}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-3">Accent Color</label>
                  <div className="flex gap-3">
                    {['#ff6b6b', '#48dbfb', '#1dd1a1', '#a29bfe', '#feca57'].map((color) => (
                      <button
                        key={color}
                        className={`w-10 h-10 rounded-xl transition-transform hover:scale-110 ${
                          color === '#ff6b6b' ? 'ring-2 ring-white ring-offset-2 ring-offset-[--card]' : ''
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'billing' && (
          <div className="space-y-6">
            <div className="card bg-gradient-to-br from-[--card] to-[--coral]/5 border-[--coral]/20">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="badge badge-coral mb-2">Current Plan</span>
                  <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                    Pro Plan
                  </h2>
                  <p className="text-white/50">$29/month • Renews Jan 15, 2025</p>
                </div>
                <button className="btn-secondary">Manage Subscription</button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white/5">
                  <p className="text-2xl font-bold">25</p>
                  <p className="text-sm text-white/50">Competitors</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5">
                  <p className="text-2xl font-bold">∞</p>
                  <p className="text-sm text-white/50">Reports</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5">
                  <p className="text-2xl font-bold">90</p>
                  <p className="text-sm text-white/50">Days History</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="font-semibold mb-4">Payment Method</h3>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                <div className="w-12 h-8 rounded bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-xs font-bold text-white">
                  VISA
                </div>
                <div className="flex-1">
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-white/40">Expires 12/26</p>
                </div>
                <button className="text-sm text-[--coral] hover:underline">Edit</button>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'privacy' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                Privacy & Security
              </h2>

              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-colors">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-[--coral]" />
                    <div className="text-left">
                      <p className="font-medium">Change Password</p>
                      <p className="text-sm text-white/50">Last changed 3 months ago</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/30" />
                </button>

                <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-colors">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-[--ocean]" />
                    <div className="text-left">
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-white/50">Add an extra layer of security</p>
                    </div>
                  </div>
                  <span className="badge badge-mint">Enabled</span>
                </button>

                <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-colors">
                  <div className="flex items-center gap-3">
                    <ExternalLink className="w-5 h-5 text-[--lavender]" />
                    <div className="text-left">
                      <p className="font-medium">Connected Accounts</p>
                      <p className="text-sm text-white/50">Manage your connected services</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/30" />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'help' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                Help & Support
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '📚', title: 'Documentation', desc: 'Learn how to use Trendly' },
                  { icon: '💬', title: 'Live Chat', desc: 'Talk to our support team' },
                  { icon: '🎥', title: 'Video Tutorials', desc: 'Watch step-by-step guides' },
                  { icon: '❓', title: 'FAQs', desc: 'Common questions answered' },
                ].map((item) => (
                  <button
                    key={item.title}
                    className="p-6 rounded-xl bg-white/5 hover:bg-white/8 transition-colors text-left group"
                  >
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h3 className="font-semibold group-hover:text-[--coral] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/50">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
