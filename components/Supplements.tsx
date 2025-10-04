'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Supplements() {
  const [completedDoses, setCompletedDoses] = useState<string[]>([]);

  const supplementSchedule = {
    morning: [
      { id: 'morning-1', name: 'Vitamin D3 + K2', dose: '5000 IU + 100mcg', time: '8:00 AM', taken: false },
      { id: 'morning-2', name: 'Omega-3 (Fish Oil)', dose: '2g EPA/DHA', time: '8:00 AM', taken: false },
      { id: 'morning-3', name: 'Magnesium L-Threonate', dose: '2000mg', time: '8:00 AM', taken: false },
      { id: 'morning-4', name: 'B-Complex', dose: '1 capsule', time: '8:00 AM', taken: false },
    ],
    afternoon: [
      { id: 'afternoon-1', name: 'NAD+ Precursor (NMN)', dose: '500mg', time: '12:00 PM', taken: false },
      { id: 'afternoon-2', name: 'Creatine Monohydrate', dose: '5g', time: '12:00 PM', taken: false },
    ],
    evening: [
      { id: 'evening-1', name: 'Magnesium Glycinate', dose: '400mg', time: '7:00 PM', taken: false },
      { id: 'evening-2', name: 'Zinc', dose: '30mg', time: '7:00 PM', taken: false },
      { id: 'evening-3', name: 'Ashwagandha', dose: '600mg', time: '7:00 PM', taken: false },
    ],
    bedtime: [
      { id: 'bedtime-1', name: 'Melatonin', dose: '0.5mg', time: '9:30 PM', taken: false },
      { id: 'bedtime-2', name: 'L-Theanine', dose: '200mg', time: '9:30 PM', taken: false },
    ],
  };

  const toggleDose = (id: string) => {
    setCompletedDoses(prev =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const totalDoses = Object.values(supplementSchedule).flat().length;
  const completionRate = Math.round((completedDoses.length / totalDoses) * 100);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Progress Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-br from-accent-500/10 to-accent-600/10 border border-accent-500/20 rounded-2xl p-5 sm:p-6 lg:p-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white">Today's Progress</h3>
          <span className="text-3xl sm:text-4xl font-bold text-accent-400">{completionRate}%</span>
        </div>
        <div className="h-2 sm:h-2.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent-400 to-accent-500 transition-all duration-500"
            style={{ width: `${completionRate}%` }}
            role="progressbar"
            aria-valuenow={completionRate}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Daily supplement completion"
          />
        </div>
        <p className="text-white/60 text-sm sm:text-base mt-3">
          {completedDoses.length} of {totalDoses} doses taken
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Morning Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-accent-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white">Morning (8:00 AM)</h3>
          </div>
          <div className="space-y-3">
            {supplementSchedule.morning.map((supp, idx) => (
              <SupplementCard
                key={supp.id}
                supplement={supp}
                completed={completedDoses.includes(supp.id)}
                onToggle={() => toggleDose(supp.id)}
                delay={idx * 0.05}
              />
            ))}
          </div>
        </motion.div>

        {/* Afternoon Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-accent-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white">Afternoon (12:00 PM)</h3>
          </div>
          <div className="space-y-3">
            {supplementSchedule.afternoon.map((supp, idx) => (
              <SupplementCard
                key={supp.id}
                supplement={supp}
                completed={completedDoses.includes(supp.id)}
                onToggle={() => toggleDose(supp.id)}
                delay={idx * 0.05}
              />
            ))}
          </div>
        </motion.div>

        {/* Evening Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-accent-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white">Evening (7:00 PM)</h3>
          </div>
          <div className="space-y-3">
            {supplementSchedule.evening.map((supp, idx) => (
              <SupplementCard
                key={supp.id}
                supplement={supp}
                completed={completedDoses.includes(supp.id)}
                onToggle={() => toggleDose(supp.id)}
                delay={idx * 0.05}
              />
            ))}
          </div>
        </motion.div>

        {/* Bedtime Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-accent-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white">Bedtime (9:30 PM)</h3>
          </div>
          <div className="space-y-3">
            {supplementSchedule.bedtime.map((supp, idx) => (
              <SupplementCard
                key={supp.id}
                supplement={supp}
                completed={completedDoses.includes(supp.id)}
                onToggle={() => toggleDose(supp.id)}
                delay={idx * 0.05}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Protocol Info */}
      <div className="bg-gradient-to-br from-accent-500/10 to-accent-600/10 border border-accent-500/20 rounded-2xl p-5 sm:p-6 lg:p-8">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">About Your Protocol</h3>
        <p className="text-white/60 text-sm sm:text-base mb-4 sm:mb-5 max-w-3xl">
          This supplement stack is optimized for longevity, cellular health, and recovery. All dosages are evidence-based and tailored to your goals.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <button
            aria-label="Learn more about protocol"
            className="bg-accent-500/20 border border-accent-500/30 text-accent-300 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold hover:bg-accent-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-primary-900"
          >
            Learn More
          </button>
          <button
            aria-label="Customize supplement stack"
            className="bg-accent-500/20 border border-accent-500/30 text-accent-300 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold hover:bg-accent-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-primary-900"
          >
            Customize Stack
          </button>
        </div>
      </div>
    </div>
  );
}

function SupplementCard({
  supplement,
  completed,
  onToggle,
  delay = 0,
}: {
  supplement: { name: string; dose: string; time: string };
  completed: boolean;
  onToggle: () => void;
  delay?: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      onClick={onToggle}
      aria-label={`Mark ${supplement.name} as ${completed ? 'not taken' : 'taken'}`}
      aria-pressed={completed}
      className={`w-full p-3.5 sm:p-4 rounded-xl border transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-primary-900 ${
        completed
          ? 'bg-accent-500/10 border-accent-500/30'
          : 'bg-primary-600/50 border-primary-400/30 hover:bg-primary-600/60 hover:border-primary-400/50'
      }`}
    >
      <div className="flex items-center gap-3 sm:gap-3.5">
        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
          completed ? 'bg-accent-500 border-accent-500' : 'border-white/30 hover:border-white/50'
        }`}>
          {completed && (
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <div className="flex-1 text-left min-w-0">
          <p className={`font-medium text-sm sm:text-base truncate ${completed ? 'text-white/60 line-through' : 'text-white'}`}>
            {supplement.name}
          </p>
          <p className="text-xs sm:text-sm text-white/40">{supplement.dose}</p>
        </div>
      </div>
    </motion.button>
  );
}
