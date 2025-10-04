'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Environment() {
  const [activeRoom, setActiveRoom] = useState('bedroom');

  const rooms = {
    bedroom: {
      name: 'Bedroom Optimization',
      icon: 'BED',
      score: 78,
      optimizations: [
        {
          title: 'Temperature Control',
          current: '72°F',
          optimal: '65-68°F',
          status: 'needs-improvement',
          priority: 'high',
          description: 'Lower temperature improves deep sleep and melatonin production',
          action: 'Adjust thermostat 1 hour before bedtime'
        },
        {
          title: 'Light Exposure',
          current: 'Blue light present',
          optimal: 'Amber/red only',
          status: 'needs-improvement',
          priority: 'high',
          description: 'Blue light suppresses melatonin and disrupts circadian rhythm',
          action: 'Install amber bulbs or use blue light blocking'
        },
        {
          title: 'Air Quality',
          current: 'Good',
          optimal: 'Excellent',
          status: 'good',
          priority: 'medium',
          description: 'Clean air supports respiratory health and recovery',
          action: 'Consider air purifier with HEPA filter'
        },
        {
          title: 'EMF Exposure',
          current: 'Devices nearby',
          optimal: 'Airplane mode',
          status: 'needs-improvement',
          priority: 'medium',
          description: 'Electromagnetic fields may impact sleep quality',
          action: 'Keep devices 3ft away, use airplane mode'
        },
      ]
    },
    kitchen: {
      name: 'Kitchen Optimization',
      icon: 'KIT',
      score: 65,
      optimizations: [
        {
          title: 'Water Quality',
          current: 'Tap water',
          optimal: 'Filtered + mineralized',
          status: 'needs-improvement',
          priority: 'high',
          description: 'Mineralized water supports cellular function and hydration',
          action: 'Install reverse osmosis + remineralization system'
        },
        {
          title: 'Cookware',
          current: 'Non-stick',
          optimal: 'Cast iron, stainless',
          status: 'needs-improvement',
          priority: 'high',
          description: 'Avoid PFAS and harmful chemicals in food preparation',
          action: 'Replace with cast iron or stainless steel'
        },
        {
          title: 'Food Storage',
          current: 'Plastic containers',
          optimal: 'Glass containers',
          status: 'needs-improvement',
          priority: 'medium',
          description: 'Avoid BPA and microplastics leaching into food',
          action: 'Switch to glass storage containers'
        },
      ]
    },
    bathroom: {
      name: 'Bathroom Optimization',
      icon: 'BTH',
      score: 82,
      optimizations: [
        {
          title: 'Shower Filter',
          current: 'Installed ✓',
          optimal: 'Installed',
          status: 'optimized',
          priority: 'high',
          description: 'Removes chlorine and heavy metals from water',
          action: 'Replace filter every 6 months'
        },
        {
          title: 'Personal Care Products',
          current: 'Some toxic ingredients',
          optimal: 'All non-toxic',
          status: 'needs-improvement',
          priority: 'medium',
          description: 'Avoid parabens, sulfates, and endocrine disruptors',
          action: 'Switch to clean beauty brands'
        },
        {
          title: 'Ventilation',
          current: 'Good',
          optimal: 'Excellent',
          status: 'good',
          priority: 'low',
          description: 'Proper ventilation reduces mold and moisture',
          action: 'Run exhaust fan during and after showers'
        },
      ]
    },
    workspace: {
      name: 'Workspace Optimization',
      icon: 'WRK',
      score: 70,
      optimizations: [
        {
          title: 'Ergonomics',
          current: 'Needs adjustment',
          optimal: 'Ergonomic setup',
          status: 'needs-improvement',
          priority: 'high',
          description: 'Proper posture prevents pain and supports longevity',
          action: 'Adjust monitor height, use standing desk'
        },
        {
          title: 'Natural Light',
          current: 'Limited',
          optimal: 'Abundant',
          status: 'needs-improvement',
          priority: 'high',
          description: 'Natural light improves focus and circadian rhythm',
          action: 'Position desk near window'
        },
        {
          title: 'Blue Light',
          current: 'Unfiltered',
          optimal: 'Filtered',
          status: 'needs-improvement',
          priority: 'medium',
          description: 'Excess blue light strains eyes and disrupts sleep',
          action: 'Use blue light glasses or screen filters'
        },
      ]
    },
  };

  const currentRoom = rooms[activeRoom as keyof typeof rooms];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Room Selector */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {Object.entries(rooms).map(([key, room], index) => (
          <motion.button
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            onClick={() => setActiveRoom(key)}
            aria-label={`Select ${room.name}`}
            aria-current={activeRoom === key ? 'true' : undefined}
            className={`p-4 sm:p-5 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-primary-900 ${
              activeRoom === key
                ? 'bg-accent-500/20 border-accent-500/30 shadow-lg'
                : 'bg-primary-600/50 border-primary-400/30 hover:bg-primary-600/60 hover:border-primary-400/50'
            }`}
          >
            <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-primary-700/50 border border-primary-400/30 mb-2 sm:mb-3">
              <span className="text-xs sm:text-sm font-bold text-accent-400">{room.icon}</span>
            </div>
            <p className={`font-semibold text-sm sm:text-base mb-2 ${activeRoom === key ? 'text-accent-300' : 'text-white'}`}>
              {room.name}
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 sm:h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent-400 to-accent-500 transition-all duration-500"
                  style={{ width: `${room.score}%` }}
                  role="progressbar"
                  aria-valuenow={room.score}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${room.name} optimization score`}
                />
              </div>
              <span className="text-xs sm:text-sm text-white/60 font-semibold">{room.score}%</span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Room Details */}
      <motion.div
        key={activeRoom}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-primary-600/50 border border-primary-400/30 rounded-2xl p-5 sm:p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 sm:mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white">{currentRoom.name}</h3>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full ${getScoreColor(currentRoom.score)}`} aria-hidden="true" />
            <span className="text-white/60 text-sm sm:text-base font-medium">{currentRoom.score}% Optimized</span>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {currentRoom.optimizations.map((opt, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="bg-primary-700/50 rounded-xl p-4 sm:p-5 hover:bg-primary-700/60 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h4 className="font-semibold text-white text-base sm:text-lg">{opt.title}</h4>
                    <span className={`px-2 py-0.5 rounded text-xs sm:text-sm ${getPriorityColor(opt.priority)}`}>
                      {opt.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm sm:text-base mb-3 flex-wrap">
                    <span className="text-white/40">Current:</span>
                    <span className="text-white/70 font-medium">{opt.current}</span>
                    <span className="text-white/40">→</span>
                    <span className="text-accent-400 font-semibold">{opt.optimal}</span>
                  </div>
                  <p className="text-white/60 text-sm sm:text-base mb-4">{opt.description}</p>
                  <div className="bg-primary-600/50 border border-primary-400/30 rounded-lg p-3 sm:p-4">
                    <p className="text-xs sm:text-sm text-white/40 mb-1.5 font-medium">Recommended Action:</p>
                    <p className="text-sm sm:text-base text-white/80">{opt.action}</p>
                  </div>
                </div>
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 ${getStatusBg(opt.status)}`} aria-label={`Status: ${opt.status}`}>
                  {opt.status === 'optimized' ? (
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : opt.status === 'good' ? (
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Equipment Guide */}
      <div className="bg-gradient-to-br from-accent-500/10 to-accent-600/10 border border-accent-500/20 rounded-2xl p-5 sm:p-6 lg:p-8 text-center">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Equipment Recommendations</h3>
        <p className="text-white/60 text-sm sm:text-base mb-4 sm:mb-5 max-w-2xl mx-auto">Curated tools for optimal home environment</p>
        <button
          aria-label="View equipment guide"
          className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-accent-500/20 border border-accent-500/30 text-accent-300 rounded-xl font-semibold hover:bg-accent-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-primary-900"
        >
          View Equipment Guide
        </button>
      </div>
    </div>
  );
}

function getScoreColor(score: number) {
  if (score >= 80) return 'bg-accent-400';
  if (score >= 60) return 'bg-accent-500';
  return 'bg-accent-600';
}

function getStatusBg(status: string) {
  if (status === 'optimized') return 'bg-accent-500/20';
  if (status === 'good') return 'bg-accent-400/20';
  return 'bg-accent-600/20';
}

function getPriorityColor(priority: string) {
  if (priority === 'high') return 'bg-accent-600/20 text-accent-300';
  if (priority === 'medium') return 'bg-accent-500/20 text-accent-300';
  return 'bg-primary-400/20 text-accent-400';
}
