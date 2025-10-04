'use client';

import { motion } from 'framer-motion';

export default function Profile() {
  return (
    <div className="space-y-6 sm:space-y-8">

      {/* User Info Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-br from-accent-500/10 to-accent-600/10 border border-accent-500/20 rounded-2xl p-5 sm:p-6 lg:p-8"
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold text-white shadow-lg">
            AJ
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">Alex Johnson</h3>
            <p className="text-white/60 text-sm sm:text-base mb-3 sm:mb-4">alex@email.com</p>
            <div className="flex gap-2 justify-center sm:justify-start flex-wrap">
              <span className="px-3 py-1 sm:px-4 sm:py-1.5 bg-accent-500/20 border border-accent-500/30 rounded-full text-xs sm:text-sm text-accent-300 font-medium">
                Premium Member
              </span>
              <span className="px-3 py-1 sm:px-4 sm:py-1.5 bg-accent-500/20 border border-accent-500/30 rounded-full text-xs sm:text-sm text-accent-300 font-medium">
                Day 12
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Goals */}
      <div className="bg-primary-600/50 border border-primary-400/30 rounded-2xl p-5 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-5">Your Goals</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-accent-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-white font-medium text-sm sm:text-base">Increase Energy Levels</p>
              <p className="text-white/60 text-xs sm:text-sm">Target: 8.5/10 • Current: 8.2/10</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-accent-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-medium text-sm sm:text-base">Optimize Sleep Quality</p>
              <p className="text-white/60 text-xs sm:text-sm">Target: 92% • Current: 89%</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-accent-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-medium text-sm sm:text-base">Reduce Biological Age</p>
              <p className="text-white/60 text-xs sm:text-sm">Target: 10 years • Current: 7 years</p>
            </div>
          </div>
        </div>
        <button
          aria-label="Update your goals"
          className="w-full mt-4 sm:mt-5 bg-primary-500/50 border border-primary-400/30 rounded-xl py-3 sm:py-3.5 text-white/70 hover:text-white hover:border-primary-300 transition-all text-sm sm:text-base font-semibold focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-primary-900"
        >
          Update Goals
        </button>
      </div>

      {/* Settings */}
      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-lg sm:text-xl font-semibold text-white">Settings</h3>

        <button
          aria-label="Notification settings"
          className="w-full bg-primary-600/50 border border-primary-400/30 rounded-xl p-4 sm:p-5 flex items-center justify-between hover:bg-primary-600/60 transition-all focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-primary-900"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-white font-medium">Notifications</p>
              <p className="text-white/40 text-xs">Protocol reminders & updates</p>
            </div>
          </div>
          <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <button className="w-full bg-primary-600/50 border border-primary-400/30 rounded-xl p-4 flex items-center justify-between hover:bg-primary-600 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-white font-medium">Personal Information</p>
              <p className="text-white/40 text-xs">Age, weight, health data</p>
            </div>
          </div>
          <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <button className="w-full bg-primary-600/50 border border-primary-400/30 rounded-xl p-4 flex items-center justify-between hover:bg-primary-600 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-white font-medium">Privacy & Security</p>
              <p className="text-white/40 text-xs">Data settings & permissions</p>
            </div>
          </div>
          <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <button className="w-full bg-primary-600/50 border border-primary-400/30 rounded-xl p-4 flex items-center justify-between hover:bg-primary-600 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-white font-medium">Resources & Guides</p>
              <p className="text-white/40 text-xs">Learn about the Alumina Protocol</p>
            </div>
          </div>
          <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <button className="w-full bg-primary-600/50 border border-primary-400/30 rounded-xl p-4 flex items-center justify-between hover:bg-primary-600 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-white font-medium">Get Support</p>
              <p className="text-white/40 text-xs">Contact our longevity specialists</p>
            </div>
          </div>
          <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Account Actions */}
      <div className="space-y-3 pt-4">
        <button className="w-full bg-primary-600/50 border border-primary-400/30 rounded-xl py-3 text-accent-400 font-semibold hover:bg-primary-600 transition-all">
          Upgrade to Lifetime Access
        </button>
        <button className="w-full bg-primary-600/50 border border-primary-400/30 rounded-xl py-3 text-white/70 font-semibold hover:bg-primary-600 hover:text-white transition-all">
          Sign Out
        </button>
      </div>

      {/* App Version */}
      <div className="text-center pt-4">
        <p className="text-white/30 text-xs">Alumina At Home v1.0.0</p>
        <p className="text-white/30 text-xs mt-1">Powered by the Alumina Protocol</p>
      </div>
    </div>
  );
}
