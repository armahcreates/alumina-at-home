'use client';

export default function Progress() {
  const metrics = [
    { name: 'Energy Level', current: 8.2, previous: 7.1, unit: '/10', trend: 'up', change: '+15%' },
    { name: 'Sleep Quality', current: 89, previous: 76, unit: '%', trend: 'up', change: '+17%' },
    { name: 'HRV', current: 68, previous: 54, unit: 'ms', trend: 'up', change: '+26%' },
    { name: 'Resting Heart Rate', current: 58, previous: 64, unit: 'bpm', trend: 'down', change: '-9%' },
    { name: 'Body Fat', current: 14.2, previous: 16.8, unit: '%', trend: 'down', change: '-15%' },
    { name: 'VO2 Max', current: 48, previous: 43, unit: 'ml/kg/min', trend: 'up', change: '+12%' },
  ];

  const weeklyProgress = [
    { day: 'Mon', completion: 85 },
    { day: 'Tue', completion: 92 },
    { day: 'Wed', completion: 78 },
    { day: 'Thu', completion: 95 },
    { day: 'Fri', completion: 88 },
    { day: 'Sat', completion: 90 },
    { day: 'Sun', completion: 82 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Progress Tracking</h2>
        <p className="text-white/60 text-sm">Your longevity journey in numbers</p>
      </div>

      {/* Streak Card */}
      <div className="bg-gradient-to-br from-accent-500/20 to-accent-600/20 border border-accent-500/30 rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/60 text-sm mb-1">Current Streak</p>
            <p className="text-4xl font-bold text-accent-400">12</p>
            <p className="text-white/60 text-sm mt-1">days in a row</p>
          </div>
          <div>
            <svg className="w-16 h-16 text-accent-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2c1.5 1.5 3 3.5 3 5.5 0 2.5-1.5 4.5-3 4.5s-3-2-3-4.5c0-2 1.5-4 3-5.5zm0 18c-3.5 0-6-2.5-6-6 0-2 1-3.5 2-4.5.5 1.5 2 2.5 4 2.5s3.5-1 4-2.5c1 1 2 2.5 2 4.5 0 3.5-2.5 6-6 6z"/>
            </svg>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-accent-500/20">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-white/40 text-xs">Longest Streak</p>
              <p className="text-white font-semibold">18 days</p>
            </div>
            <div>
              <p className="text-white/40 text-xs">Total Active Days</p>
              <p className="text-white font-semibold">42 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="bg-primary-600/50 border border-primary-400/30 rounded-2xl p-5">
        <h3 className="text-lg font-semibold text-white mb-4">This Week</h3>
        <div className="flex items-end justify-between gap-2 h-32">
          {weeklyProgress.map((day) => (
            <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-primary-500/30 rounded-t-lg relative overflow-hidden flex items-end" style={{ height: '100%' }}>
                <div
                  className="w-full bg-gradient-to-t from-accent-500 to-accent-400 rounded-t-lg transition-all"
                  style={{ height: `${day.completion}%` }}
                />
              </div>
              <span className="text-xs text-white/60">{day.day}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-white/60 mt-4">
          Average completion: <span className="text-accent-400 font-semibold">87%</span>
        </p>
      </div>

      {/* Key Metrics */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Key Health Metrics</h3>
        <div className="space-y-3">
          {metrics.map((metric) => (
            <div key={metric.name} className="bg-primary-600/50 border border-primary-400/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-white font-medium">{metric.name}</p>
                <div className={`flex items-center gap-1 px-2 py-1 rounded ${
                  metric.trend === 'up' ? 'bg-accent-500/20 text-accent-400' : 'bg-accent-400/20 text-accent-300'
                }`}>
                  <svg
                    className={`w-3 h-3 ${metric.trend === 'down' ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  <span className="text-xs font-semibold">{metric.change}</span>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-white">
                  {metric.current}
                  <span className="text-sm text-white/40 font-normal ml-1">{metric.unit}</span>
                </p>
                <p className="text-sm text-white/40">from {metric.previous}{metric.unit}</p>
              </div>
              <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent-400 to-accent-500"
                  style={{ width: '70%' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Biological Age */}
      <div className="bg-gradient-to-br from-accent-500/10 to-accent-600/10 border border-accent-500/20 rounded-2xl p-5">
        <h3 className="text-lg font-semibold text-white mb-3">Biological Age</h3>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/60 text-sm">Current</p>
            <p className="text-4xl font-bold text-accent-400">35</p>
          </div>
          <div className="text-4xl">→</div>
          <div>
            <p className="text-white/60 text-sm">Actual Age</p>
            <p className="text-4xl font-bold text-white">42</p>
          </div>
        </div>
        <div className="bg-accent-500/20 border border-accent-500/30 rounded-lg p-3">
          <p className="text-accent-300 text-sm font-semibold">You've reversed 7 years!</p>
          <p className="text-white/60 text-xs mt-1">Based on biomarker analysis from last bloodwork</p>
        </div>
      </div>

      {/* Export Data */}
      <button className="w-full bg-primary-600/50 border border-primary-400/30 rounded-xl p-4 flex items-center justify-center gap-2 text-white/70 hover:text-white hover:border-primary-300 transition-all">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span className="font-semibold">Export All Data</span>
      </button>
    </div>
  );
}
