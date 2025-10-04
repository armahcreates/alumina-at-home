'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  points: number;
}

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AchievementsModal({ isOpen, onClose }: AchievementsModalProps) {
  const achievements: Achievement[] = [
    {
      id: 'first-day',
      title: 'First Steps',
      description: 'Complete your first day of protocols',
      icon: '1ST',
      unlocked: true,
      unlockedAt: new Date().toISOString(),
      points: 50
    },
    {
      id: 'streak-7',
      title: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      icon: '7D',
      unlocked: false,
      points: 100
    },
    {
      id: 'streak-30',
      title: 'Monthly Master',
      description: 'Maintain a 30-day streak',
      icon: '30D',
      unlocked: false,
      points: 300
    },
    {
      id: 'streak-90',
      title: 'Quarterly Champion',
      description: 'Maintain a 90-day streak',
      icon: '90D',
      unlocked: false,
      points: 1000
    },
    {
      id: 'all-protocols',
      title: 'Protocol Perfectionist',
      description: 'Complete all daily protocols in one day',
      icon: '100',
      unlocked: false,
      points: 150
    },
    {
      id: 'early-bird',
      title: 'Early Bird',
      description: 'Complete morning protocol before 7 AM',
      icon: 'AM',
      unlocked: false,
      points: 75
    },
    {
      id: 'cold-plunge-10',
      title: 'Ice Warrior',
      description: 'Complete 10 cold exposure sessions',
      icon: 'ICE',
      unlocked: false,
      points: 200
    },
    {
      id: 'community-engage',
      title: 'Community Champion',
      description: 'Help 5 members in the community',
      icon: 'COM',
      unlocked: false,
      points: 250
    },
    {
      id: 'bio-age-reverse',
      title: 'Time Traveler',
      description: 'Reverse your biological age by 5+ years',
      icon: 'AGE',
      unlocked: false,
      points: 500
    },
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalPoints = achievements
    .filter(a => a.unlocked)
    .reduce((sum, a) => sum + a.points, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary-900/95 backdrop-blur-lg"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl max-h-[90vh] sm:max-h-[80vh] bg-primary-600/50 border border-primary-400/30 rounded-t-2xl sm:rounded-2xl overflow-hidden sm:m-4"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center bg-primary-700/80 rounded-full text-white/70 active:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-primary-400/30">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Achievements</h2>
              <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-white/60">Unlocked:</span>
                  <span className="text-accent-400 font-semibold">{unlockedCount}/{achievements.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white/60">Total Points:</span>
                  <span className="text-accent-400 font-semibold">{totalPoints}</span>
                </div>
              </div>
            </div>

            {/* Achievements Grid */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-140px)] sm:max-h-[calc(80vh-140px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                      achievement.unlocked
                        ? 'bg-accent-500/10 border-accent-500/30'
                        : 'bg-primary-700/30 border-primary-400/20 opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      <div className={`flex items-center justify-center w-14 h-14 rounded-xl border ${achievement.unlocked ? 'bg-accent-500/10 border-accent-500/30' : 'bg-primary-700/30 border-primary-500/20'}`}>
                        <span className={`text-sm font-bold ${achievement.unlocked ? 'text-accent-400' : 'text-white/30'}`}>
                          {achievement.icon}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold mb-1 ${achievement.unlocked ? 'text-white' : 'text-white/50'}`}>
                          {achievement.title}
                        </h3>
                        <p className={`text-sm mb-2 ${achievement.unlocked ? 'text-white/70' : 'text-white/40'}`}>
                          {achievement.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-semibold ${achievement.unlocked ? 'text-accent-400' : 'text-white/30'}`}>
                            +{achievement.points} points
                          </span>
                          {achievement.unlocked && achievement.unlockedAt && (
                            <span className="text-xs text-white/40">
                              • {new Date(achievement.unlockedAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      {achievement.unlocked && (
                        <div className="w-8 h-8 bg-accent-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
