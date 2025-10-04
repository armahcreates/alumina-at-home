'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import ProtocolTimer from './ProtocolTimer';

export default function Dashboard() {
  const { completedTasks, toggleTask, user } = useStore();
  const [activeTimer, setActiveTimer] = useState<{ id: string; name: string; duration: number } | null>(null);

  const todayProtocols = [
    { id: 'morning-light', title: 'Morning Light Exposure', time: '6:30 AM', duration: 15, durationStr: '15 min', category: 'circadian' },
    { id: 'cold-shower', title: 'Cold Shower', time: '7:00 AM', duration: 3, durationStr: '3 min', category: 'contrast' },
    { id: 'breathwork', title: 'Breathwork Session', time: '7:15 AM', duration: 10, durationStr: '10 min', category: 'restoration' },
    { id: 'morning-supps', title: 'Morning Supplements', time: '8:00 AM', duration: 2, durationStr: '2 min', category: 'supplements' },
    { id: 'movement', title: 'Movement Practice', time: '5:00 PM', duration: 30, durationStr: '30 min', category: 'movement' },
    { id: 'evening-supps', title: 'Evening Supplements', time: '7:00 PM', duration: 2, durationStr: '2 min', category: 'supplements' },
    { id: 'wind-down', title: 'Evening Wind-Down', time: '9:00 PM', duration: 20, durationStr: '20 min', category: 'restoration' },
  ];

  const startTimer = (protocol: typeof todayProtocols[0]) => {
    setActiveTimer({
      id: protocol.id,
      name: protocol.title,
      duration: protocol.duration * 60 // convert to seconds
    });
  };

  const completionRate = Math.round((completedTasks.length / todayProtocols.length) * 100);

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Morning';
    if (hour < 18) return 'Afternoon';
    return 'Evening';
  };

  return (
    <>
      {/* Timer Modal */}
      {activeTimer && (
        <ProtocolTimer
          protocolName={activeTimer.name}
          duration={activeTimer.duration}
          onComplete={() => {
            toggleTask(activeTimer.id);
            setActiveTimer(null);
          }}
          onClose={() => setActiveTimer(null)}
        />
      )}

      <div className="space-y-6 sm:space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-br from-accent-500/10 to-accent-600/10 border border-accent-500/20 rounded-2xl p-5 sm:p-6 lg:p-8"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1">Good {getTimeOfDay()}, {user?.name || 'Friend'}</h2>
          <p className="text-accent-200/70 text-sm sm:text-base mb-4 sm:mb-5">Your longevity journey continues</p>

          {/* Progress Ring */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="flex items-center gap-4 sm:gap-6"
          >
            <div className="relative w-20 h-20 sm:w-24 sm:h-24">
              <svg className="transform -rotate-90 w-20 h-20 sm:w-24 sm:h-24">
                <circle
                  cx="50%"
                  cy="50%"
                  r="34"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  className="text-white/10"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="34"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={`${completionRate * 2.14} 214`}
                  className="text-accent-400 transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg sm:text-xl font-bold text-white">{completionRate}%</span>
              </div>
            </div>
            <div>
              <p className="text-white font-semibold text-base sm:text-lg">Daily Progress</p>
              <p className="text-white/60 text-sm sm:text-base">{completedTasks.length} of {todayProtocols.length} completed</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          <div className="bg-primary-600/50 border border-primary-400/30 rounded-xl p-3.5 sm:p-4 hover:bg-primary-600/60 transition-all">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-accent-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-white/60 text-xs sm:text-sm">Energy</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-white">8.2<span className="text-xs sm:text-sm text-white/40">/10</span></p>
            <p className="text-[10px] sm:text-xs text-accent-400 mt-1">+15% from last week</p>
          </div>

          <div className="bg-primary-600/50 border border-primary-400/30 rounded-xl p-3.5 sm:p-4 hover:bg-primary-600/60 transition-all">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-accent-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <span className="text-white/60 text-xs sm:text-sm">Sleep</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-white">7.5<span className="text-xs sm:text-sm text-white/40">hrs</span></p>
            <p className="text-[10px] sm:text-xs text-accent-400 mt-1">89% quality score</p>
          </div>

          <div className="bg-primary-600/50 border border-primary-400/30 rounded-xl p-3.5 sm:p-4 hover:bg-primary-600/60 transition-all">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-accent-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-white/60 text-xs sm:text-sm">HRV</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-white">68<span className="text-xs sm:text-sm text-white/40">ms</span></p>
            <p className="text-[10px] sm:text-xs text-accent-400 mt-1">+26% improvement</p>
          </div>

          <div className="bg-primary-600/50 border border-primary-400/30 rounded-xl p-3.5 sm:p-4 hover:bg-primary-600/60 transition-all">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-accent-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-accent-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2c1.5 1.5 3 3.5 3 5.5 0 2.5-1.5 4.5-3 4.5s-3-2-3-4.5c0-2 1.5-4 3-5.5zm0 18c-3.5 0-6-2.5-6-6 0-2 1-3.5 2-4.5.5 1.5 2 2.5 4 2.5s3.5-1 4-2.5c1 1 2 2.5 2 4.5 0 3.5-2.5 6-6 6z"/>
                </svg>
              </div>
              <span className="text-white/60 text-xs sm:text-sm">Streak</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-white">12<span className="text-xs sm:text-sm text-white/40"> days</span></p>
            <p className="text-[10px] sm:text-xs text-accent-400 mt-1">Longest: 18 days</p>
          </div>
        </motion.div>

        {/* Today's Protocols */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white">Today's Protocol</h3>
            <span className="text-xs sm:text-sm text-white/60">{completedTasks.length}/{todayProtocols.length} done</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            {todayProtocols.map((protocol, index) => (
              <motion.div
                key={protocol.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className={`p-3.5 sm:p-4 rounded-xl border transition-all hover:shadow-lg ${
                  completedTasks.includes(protocol.id)
                    ? 'bg-accent-500/10 border-accent-500/30'
                    : 'bg-primary-600/50 border-primary-400/30 hover:border-primary-400/50'
                }`}
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <button
                    onClick={() => toggleTask(protocol.id)}
                    aria-label={`Mark ${protocol.title} as ${completedTasks.includes(protocol.id) ? 'incomplete' : 'complete'}`}
                    className={`min-w-[44px] min-h-[44px] w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-primary-900 ${
                      completedTasks.includes(protocol.id)
                        ? 'bg-accent-500 border-accent-500'
                        : 'border-white/30 hover:border-white/50 active:border-white/70'
                    }`}
                  >
                    {completedTasks.includes(protocol.id) && (
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-sm sm:text-base leading-tight mb-1 ${completedTasks.includes(protocol.id) ? 'text-white/60 line-through' : 'text-white'}`}>
                      {protocol.title}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-xs sm:text-sm text-white/40">{protocol.time} • {protocol.durationStr}</p>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] sm:text-xs ${getCategoryColor(protocol.category)}`}>
                        {protocol.category}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => startTimer(protocol)}
                    aria-label={`Start timer for ${protocol.title}`}
                    className="min-w-[44px] min-h-[44px] w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center bg-accent-500/20 border border-accent-500/30 rounded-xl text-accent-400 hover:bg-accent-500/30 active:bg-accent-500/40 transition-all flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-primary-900"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          <motion.button
            whileTap={{ scale: 0.98 }}
            aria-label="Start breathwork timer"
            className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl p-4 sm:p-5 text-left shadow-lg shadow-accent-500/20 min-h-[100px] sm:min-h-[120px] hover:from-accent-600 hover:to-accent-700 transition-all focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-primary-900"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center mb-2 sm:mb-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-white font-semibold text-sm sm:text-base">Start Timer</p>
            <p className="text-white/70 text-xs sm:text-sm mt-0.5">Breathwork session</p>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            aria-label="View resources"
            className="bg-primary-600/50 border border-primary-400/30 rounded-xl p-4 sm:p-5 text-left min-h-[100px] sm:min-h-[120px] hover:bg-primary-600/60 hover:border-primary-400/50 transition-all focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-primary-900"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/5 rounded-lg flex items-center justify-center mb-2 sm:mb-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-white font-semibold text-sm sm:text-base">Resources</p>
            <p className="text-white/70 text-xs sm:text-sm mt-0.5">Learn more</p>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            aria-label="View community"
            className="bg-primary-600/50 border border-primary-400/30 rounded-xl p-4 sm:p-5 text-left min-h-[100px] sm:min-h-[120px] hover:bg-primary-600/60 hover:border-primary-400/50 transition-all focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-primary-900"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/5 rounded-lg flex items-center justify-center mb-2 sm:mb-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-white font-semibold text-sm sm:text-base">Community</p>
            <p className="text-white/70 text-xs sm:text-sm mt-0.5">Connect & share</p>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            aria-label="Book consultation"
            className="bg-primary-600/50 border border-primary-400/30 rounded-xl p-4 sm:p-5 text-left min-h-[100px] sm:min-h-[120px] hover:bg-primary-600/60 hover:border-primary-400/50 transition-all focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-primary-900"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/5 rounded-lg flex items-center justify-center mb-2 sm:mb-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-white font-semibold text-sm sm:text-base">Consultation</p>
            <p className="text-white/70 text-xs sm:text-sm mt-0.5">Book a specialist</p>
          </motion.button>
        </motion.div>
      </div>
    </>
  );
}

function getCategoryColor(category: string) {
  const colors: Record<string, string> = {
    circadian: 'bg-accent-500/20 text-accent-300',
    contrast: 'bg-accent-400/20 text-accent-300',
    restoration: 'bg-primary-400/20 text-accent-400',
    supplements: 'bg-accent-500/15 text-accent-300',
    movement: 'bg-accent-600/20 text-accent-300',
  };
  return colors[category] || 'bg-white/20 text-white/70';
}
