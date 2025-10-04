'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import LoginPage from '@/components/auth/LoginPage';
import OnboardingFlow from '@/components/auth/OnboardingFlow';
import Dashboard from '@/components/Dashboard';
import Protocols from '@/components/Protocols';
import Environment from '@/components/Environment';
import Supplements from '@/components/Supplements';
import Progress from '@/components/Progress';
import Profile from '@/components/Profile';
import VideoLibrary from '@/components/VideoLibrary';
import EquipmentGuide from '@/components/EquipmentGuide';
import AchievementsModal from '@/components/AchievementsModal';

type Tab = 'dashboard' | 'protocols' | 'environment' | 'supplements' | 'progress' | 'profile' | 'videos' | 'equipment';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [showAchievements, setShowAchievements] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, hasCompletedOnboarding, currentStreak, totalPoints, user } = useStore();

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Show onboarding if not completed
  if (!hasCompletedOnboarding) {
    return <OnboardingFlow />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'protocols':
        return <Protocols />;
      case 'environment':
        return <Environment />;
      case 'supplements':
        return <Supplements />;
      case 'videos':
        return <VideoLibrary />;
      case 'equipment':
        return <EquipmentGuide />;
      case 'progress':
        return <Progress />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    )},
    { id: 'protocols', label: 'Protocols', icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    )},
    { id: 'supplements', label: 'Supplements', icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    )},
    { id: 'environment', label: 'Environment', icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    )},
    { id: 'progress', label: 'Progress', icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    )},
    { id: 'videos', label: 'Videos', icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </>
    )},
    { id: 'equipment', label: 'Equipment', icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    )},
    { id: 'profile', label: 'Profile', icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    )},
  ];

  return (
    <>
      {/* Achievements Modal */}
      <AchievementsModal isOpen={showAchievements} onClose={() => setShowAchievements(false)} />

      <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-700 to-primary-900">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col z-50">
          <div className="flex flex-col flex-grow bg-primary-800/50 backdrop-blur-lg border-r border-accent-500/20 overflow-y-auto">
            {/* Logo */}
            <div className="flex items-center justify-center px-6 py-5 border-b border-accent-500/20">
              <div className="flex flex-col items-center">
                <img src="/alumina-isotipo.webp" alt="Alumina" className="w-16 h-20" />
                <p className="text-xs text-accent-200/60 leading-tight mt-2">At Home</p>
              </div>
            </div>

            {/* User Profile Card */}
            <div className="px-4 py-4 border-b border-accent-500/10">
              <div className="flex items-center gap-3 p-3 bg-primary-700/50 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center text-white font-bold">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{user?.name || 'User'}</p>
                  <p className="text-xs text-white/60 truncate">{user?.email || 'user@email.com'}</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="px-4 py-4 border-b border-accent-500/10">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setShowAchievements(true)}
                  aria-label="View streak"
                  className="flex flex-col items-center gap-1.5 p-3 bg-accent-500/10 rounded-xl hover:bg-accent-500/15 transition-all focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-primary-900"
                >
                  <svg className="w-6 h-6 text-accent-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2c1.5 1.5 3 3.5 3 5.5 0 2.5-1.5 4.5-3 4.5s-3-2-3-4.5c0-2 1.5-4 3-5.5zm0 18c-3.5 0-6-2.5-6-6 0-2 1-3.5 2-4.5.5 1.5 2 2.5 4 2.5s3.5-1 4-2.5c1 1 2 2.5 2 4.5 0 3.5-2.5 6-6 6z"/>
                  </svg>
                  <span className="text-lg font-bold text-accent-400">{currentStreak}</span>
                  <span className="text-xs text-white/60">Day Streak</span>
                </button>
                <button
                  onClick={() => setShowAchievements(true)}
                  aria-label="View points"
                  className="flex flex-col items-center gap-1.5 p-3 bg-accent-500/10 rounded-xl hover:bg-accent-500/15 transition-all focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-primary-900"
                >
                  <svg className="w-6 h-6 text-accent-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                  <span className="text-lg font-bold text-accent-400">{totalPoints}</span>
                  <span className="text-xs text-white/60">Points</span>
                </button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4 space-y-1" role="navigation" aria-label="Main navigation">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as Tab)}
                  aria-label={`Navigate to ${item.label}`}
                  aria-current={activeTab === item.id ? 'page' : undefined}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-primary-900 ${
                    activeTab === item.id
                      ? 'bg-accent-500/20 text-accent-300 shadow-lg shadow-accent-500/10'
                      : 'text-white/70 hover:bg-primary-700/50 hover:text-white'
                  }`}
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    {item.icon}
                  </svg>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Achievements Button */}
            <div className="px-4 py-4 border-t border-accent-500/10">
              <button
                onClick={() => setShowAchievements(true)}
                aria-label="View all achievements"
                className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl hover:from-accent-600 hover:to-accent-700 transition-all shadow-lg shadow-accent-500/20 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-primary-900"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span className="font-semibold">Achievements</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-primary-900/95 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />
            <aside className="fixed inset-y-0 left-0 w-72 bg-primary-800/95 backdrop-blur-lg border-r border-accent-500/20 z-50 lg:hidden overflow-y-auto">
              <div className="flex flex-col h-full">
                {/* Close Button */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-accent-500/20">
                  <div className="flex flex-col items-center flex-1">
                    <img src="/alumina-isotipo.webp" alt="Alumina" className="w-16 h-20" />
                    <p className="text-xs text-accent-200/60 leading-tight mt-2">At Home</p>
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    aria-label="Close menu"
                    className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent-400 rounded-lg"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* User Profile Card */}
                <div className="px-4 py-4 border-b border-accent-500/10">
                  <div className="flex items-center gap-3 p-3 bg-primary-700/50 rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center text-white font-bold">
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{user?.name || 'User'}</p>
                      <p className="text-xs text-white/60 truncate">{user?.email || 'user@email.com'}</p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="px-4 py-4 border-b border-accent-500/10">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        setShowAchievements(true);
                        setSidebarOpen(false);
                      }}
                      aria-label="View streak"
                      className="flex flex-col items-center gap-1.5 p-3 bg-accent-500/10 rounded-xl active:bg-accent-500/15 transition-all"
                    >
                      <svg className="w-6 h-6 text-accent-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2c1.5 1.5 3 3.5 3 5.5 0 2.5-1.5 4.5-3 4.5s-3-2-3-4.5c0-2 1.5-4 3-5.5zm0 18c-3.5 0-6-2.5-6-6 0-2 1-3.5 2-4.5.5 1.5 2 2.5 4 2.5s3.5-1 4-2.5c1 1 2 2.5 2 4.5 0 3.5-2.5 6-6 6z"/>
                      </svg>
                      <span className="text-lg font-bold text-accent-400">{currentStreak}</span>
                      <span className="text-xs text-white/60">Day Streak</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowAchievements(true);
                        setSidebarOpen(false);
                      }}
                      aria-label="View points"
                      className="flex flex-col items-center gap-1.5 p-3 bg-accent-500/10 rounded-xl active:bg-accent-500/15 transition-all"
                    >
                      <svg className="w-6 h-6 text-accent-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                      <span className="text-lg font-bold text-accent-400">{totalPoints}</span>
                      <span className="text-xs text-white/60">Points</span>
                    </button>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-4 space-y-1">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id as Tab);
                        setSidebarOpen(false);
                      }}
                      aria-label={`Navigate to ${item.label}`}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        activeTab === item.id
                          ? 'bg-accent-500/20 text-accent-300'
                          : 'text-white/70 active:bg-primary-700/50'
                      }`}
                    >
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        {item.icon}
                      </svg>
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </nav>

                {/* Achievements Button */}
                <div className="px-4 py-4 border-t border-accent-500/10">
                  <button
                    onClick={() => {
                      setShowAchievements(true);
                      setSidebarOpen(false);
                    }}
                    aria-label="View all achievements"
                    className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl active:from-accent-600 active:to-accent-700 transition-all shadow-lg shadow-accent-500/20"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="font-semibold">Achievements</span>
                  </button>
                </div>
              </div>
            </aside>
          </>
        )}

        {/* Main Content */}
        <main className="lg:pl-72">
          {/* Mobile Header */}
          <header className="sticky top-0 z-30 bg-primary-700/80 backdrop-blur-lg border-b border-accent-500/20 lg:hidden safe-top">
            <div className="px-4 py-3 pt-safe">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSidebarOpen(true)}
                  aria-label="Open menu"
                  className="w-11 h-11 flex items-center justify-center text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent-400 rounded-lg"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                <div className="text-center flex flex-col items-center">
                  <img src="/alumina-isotipo.webp" alt="Alumina" className="w-10 h-12 sm:w-12 sm:h-14" />
                  <p className="text-[10px] sm:text-xs text-accent-200/60 leading-tight mt-1">At Home</p>
                </div>

                <button
                  onClick={() => setShowAchievements(true)}
                  aria-label="View achievements"
                  className="w-11 h-11 flex items-center justify-center bg-accent-500/10 rounded-lg active:bg-accent-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-accent-400"
                >
                  <svg className="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </button>
              </div>
            </div>
          </header>

          {/* Desktop Header */}
          <header className="hidden lg:block sticky top-0 z-30 bg-primary-700/80 backdrop-blur-lg border-b border-accent-500/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    {navigationItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
                  </h2>
                  <p className="text-sm sm:text-base text-white/60 mt-1">
                    {activeTab === 'dashboard' && 'Your longevity journey overview'}
                    {activeTab === 'protocols' && 'Evidence-based daily practices'}
                    {activeTab === 'supplements' && 'Optimized supplement stack'}
                    {activeTab === 'environment' && 'Transform your home sanctuary'}
                    {activeTab === 'progress' && 'Track your health metrics'}
                    {activeTab === 'videos' && 'Master every protocol'}
                    {activeTab === 'equipment' && 'Curated longevity tools'}
                    {activeTab === 'profile' && 'Manage your account'}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowAchievements(true)}
                    aria-label="View streak and points"
                    className="flex items-center gap-4 px-4 py-2 bg-accent-500/10 rounded-xl hover:bg-accent-500/15 transition-all focus:outline-none focus:ring-2 focus:ring-accent-400"
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2c1.5 1.5 3 3.5 3 5.5 0 2.5-1.5 4.5-3 4.5s-3-2-3-4.5c0-2 1.5-4 3-5.5zm0 18c-3.5 0-6-2.5-6-6 0-2 1-3.5 2-4.5.5 1.5 2 2.5 4 2.5s3.5-1 4-2.5c1 1 2 2.5 2 4.5 0 3.5-2.5 6-6 6z"/>
                      </svg>
                      <span className="font-semibold text-accent-400">{currentStreak} days</span>
                    </div>
                    <div className="w-px h-6 bg-white/20" />
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                      <span className="font-semibold text-accent-400">{totalPoints} pts</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 lg:pb-8">
            {renderContent()}
          </div>
        </main>

        {/* Mobile Bottom Navigation - Simplified to 5 items */}
        <nav className="fixed bottom-0 left-0 right-0 bg-primary-700/95 backdrop-blur-lg border-t border-accent-500/20 safe-bottom lg:hidden" role="navigation" aria-label="Mobile navigation">
          <div className="flex justify-around items-center px-2 py-2 pb-safe">
            <button
              onClick={() => setActiveTab('dashboard')}
              aria-label="Dashboard"
              aria-current={activeTab === 'dashboard' ? 'page' : undefined}
              className={`flex flex-col items-center justify-center min-w-[64px] min-h-[56px] px-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-accent-400 ${
                activeTab === 'dashboard'
                  ? 'bg-accent-500/20 text-accent-400'
                  : 'text-white/40 active:text-white/60'
              }`}
            >
              <svg className="w-6 h-6 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-[10px] leading-tight font-medium">Home</span>
            </button>

            <button
              onClick={() => setActiveTab('protocols')}
              aria-label="Protocols"
              aria-current={activeTab === 'protocols' ? 'page' : undefined}
              className={`flex flex-col items-center justify-center min-w-[64px] min-h-[56px] px-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-accent-400 ${
                activeTab === 'protocols'
                  ? 'bg-accent-500/20 text-accent-400'
                  : 'text-white/40 active:text-white/60'
              }`}
            >
              <svg className="w-6 h-6 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <span className="text-[10px] leading-tight font-medium">Protocols</span>
            </button>

            <button
              onClick={() => setActiveTab('supplements')}
              aria-label="Supplements"
              aria-current={activeTab === 'supplements' ? 'page' : undefined}
              className={`flex flex-col items-center justify-center min-w-[64px] min-h-[56px] px-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-accent-400 ${
                activeTab === 'supplements'
                  ? 'bg-accent-500/20 text-accent-400'
                  : 'text-white/40 active:text-white/60'
              }`}
            >
              <svg className="w-6 h-6 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <span className="text-[10px] leading-tight font-medium">Supps</span>
            </button>

            <button
              onClick={() => setActiveTab('progress')}
              aria-label="Progress"
              aria-current={activeTab === 'progress' ? 'page' : undefined}
              className={`flex flex-col items-center justify-center min-w-[64px] min-h-[56px] px-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-accent-400 ${
                activeTab === 'progress'
                  ? 'bg-accent-500/20 text-accent-400'
                  : 'text-white/40 active:text-white/60'
              }`}
            >
              <svg className="w-6 h-6 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-[10px] leading-tight font-medium">Stats</span>
            </button>

            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="More options"
              className="flex flex-col items-center justify-center min-w-[64px] min-h-[56px] px-3 rounded-lg text-white/40 active:text-white/60 transition-all focus:outline-none focus:ring-2 focus:ring-accent-400"
            >
              <svg className="w-6 h-6 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="text-[10px] leading-tight font-medium">More</span>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
