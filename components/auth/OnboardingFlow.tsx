'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';

export default function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const completeOnboarding = useStore((state) => state.completeOnboarding);

  const [formData, setFormData] = useState({
    name: '',
    goals: [] as string[],
    experienceLevel: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    availableTime: 30,
    healthConditions: [] as string[],
    budget: 'intermediate' as 'essential' | 'intermediate' | 'premium',
  });

  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      completeOnboarding({
        ...formData,
        email: useStore.getState().user?.email || ''
      });
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSkip = () => {
    completeOnboarding({
      name: formData.name || 'Friend',
      email: useStore.getState().user?.email || '',
      goals: formData.goals.length > 0 ? formData.goals : ['Increase energy'],
      experienceLevel: formData.experienceLevel,
      availableTime: formData.availableTime,
      healthConditions: formData.healthConditions,
      budget: formData.budget,
    });
  };

  const toggleGoal = (goal: string) => {
    setFormData({
      ...formData,
      goals: formData.goals.includes(goal)
        ? formData.goals.filter(g => g !== goal)
        : [...formData.goals, goal]
    });
  };

  const toggleCondition = (condition: string) => {
    setFormData({
      ...formData,
      healthConditions: formData.healthConditions.includes(condition)
        ? formData.healthConditions.filter(c => c !== condition)
        : [...formData.healthConditions, condition]
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-700 to-primary-900 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-2xl w-full">
        {/* Skip Button */}
        <div className="flex justify-end mb-3 sm:mb-4">
          <button
            onClick={handleSkip}
            className="text-white/60 active:text-white text-sm underline transition-colors min-h-[44px] inline-flex items-center"
          >
            Skip for now
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/60 text-sm">Step {step} of {totalSteps}</span>
            <span className="text-accent-400 text-sm">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 bg-primary-600/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent-400 to-accent-500"
              initial={{ width: 0 }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-primary-600/50 border border-primary-400/30 rounded-2xl p-5 sm:p-8"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Welcome! What's your name?</h2>
              <p className="text-white/60 mb-5 sm:mb-6 text-sm sm:text-base">Let's personalize your longevity journey</p>

              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-5 sm:px-6 py-4 bg-primary-700/50 border border-primary-400/30 rounded-xl text-white text-base sm:text-lg placeholder-white/40 focus:outline-none focus:border-accent-400 min-h-[52px]"
                placeholder="Enter your name"
                autoFocus
                autoComplete="name"
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-primary-600/50 border border-primary-400/30 rounded-2xl p-5 sm:p-8"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">What are your main goals?</h2>
              <p className="text-white/60 mb-5 sm:mb-6 text-sm sm:text-base">Select all that apply</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
                {[
                  'Increase energy',
                  'Improve sleep quality',
                  'Reduce stress',
                  'Optimize body composition',
                  'Enhance mental clarity',
                  'Reverse biological age',
                  'Build healthy habits',
                  'Improve athletic performance'
                ].map((goal) => (
                  <button
                    key={goal}
                    onClick={() => toggleGoal(goal)}
                    className={`px-4 sm:px-6 py-3.5 sm:py-4 rounded-xl border transition-all text-left min-h-[56px] ${
                      formData.goals.includes(goal)
                        ? 'bg-accent-500/20 border-accent-500/50 text-accent-300'
                        : 'bg-primary-700/50 border-primary-400/30 text-white/70 active:bg-primary-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData.goals.includes(goal) ? 'border-accent-400 bg-accent-400' : 'border-white/30'
                      }`}>
                        {formData.goals.includes(goal) && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="font-medium">{goal}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-primary-600/50 border border-primary-400/30 rounded-2xl p-5 sm:p-8"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">What's your experience level?</h2>
              <p className="text-white/60 mb-5 sm:mb-6 text-sm sm:text-base">This helps us customize your protocols</p>

              <div className="space-y-2.5 sm:space-y-3">
                {[
                  { value: 'beginner', label: 'Beginner', desc: 'New to wellness and longevity practices' },
                  { value: 'intermediate', label: 'Intermediate', desc: 'Some experience with biohacking' },
                  { value: 'advanced', label: 'Advanced', desc: 'Experienced with wellness optimization' }
                ].map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setFormData({ ...formData, experienceLevel: level.value as any })}
                    className={`w-full px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl border transition-all text-left min-h-[68px] ${
                      formData.experienceLevel === level.value
                        ? 'bg-accent-500/20 border-accent-500/50'
                        : 'bg-primary-700/50 border-primary-400/30 active:bg-primary-700'
                    }`}
                  >
                    <p className="text-white font-semibold text-base">{level.label}</p>
                    <p className="text-white/60 text-sm mt-0.5">{level.desc}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-primary-600/50 border border-primary-400/30 rounded-2xl p-5 sm:p-8"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">How much time can you commit daily?</h2>
              <p className="text-white/60 mb-5 sm:mb-6 text-sm sm:text-base">We'll build your protocol around your schedule</p>

              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white text-lg font-semibold">{formData.availableTime} minutes</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="120"
                  step="15"
                  value={formData.availableTime}
                  onChange={(e) => setFormData({ ...formData, availableTime: parseInt(e.target.value) })}
                  className="w-full h-2 bg-primary-700/50 rounded-full appearance-none cursor-pointer accent-accent-400"
                />
                <div className="flex justify-between text-white/40 text-xs mt-2">
                  <span>15 min</span>
                  <span>120 min</span>
                </div>
              </div>

              <div className="bg-primary-700/30 rounded-xl p-4 border border-primary-400/20">
                <p className="text-white/70 text-sm">
                  {formData.availableTime < 30 && "We'll focus on essential quick wins"}
                  {formData.availableTime >= 30 && formData.availableTime < 60 && "Perfect for building core habits"}
                  {formData.availableTime >= 60 && "Great! You'll have time for advanced protocols"}
                </p>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-primary-600/50 border border-primary-400/30 rounded-2xl p-5 sm:p-8"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">What's your equipment budget?</h2>
              <p className="text-white/60 mb-5 sm:mb-6 text-sm sm:text-base">We'll recommend tools that fit your investment level</p>

              <div className="space-y-2.5 sm:space-y-3">
                {[
                  { value: 'essential', label: 'Essential ($0-$500)', desc: 'Start with free protocols and minimal equipment' },
                  { value: 'intermediate', label: 'Intermediate ($500-$2,500)', desc: 'Add helpful tools for better results' },
                  { value: 'premium', label: 'Premium ($2,500+)', desc: 'Invest in advanced optimization equipment' }
                ].map((budget) => (
                  <button
                    key={budget.value}
                    onClick={() => setFormData({ ...formData, budget: budget.value as any })}
                    className={`w-full px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl border transition-all text-left min-h-[68px] ${
                      formData.budget === budget.value
                        ? 'bg-accent-500/20 border-accent-500/50'
                        : 'bg-primary-700/50 border-primary-400/30 active:bg-primary-700'
                    }`}
                  >
                    <p className="text-white font-semibold text-base">{budget.label}</p>
                    <p className="text-white/60 text-sm mt-0.5">{budget.desc}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 sm:mt-8 gap-3">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="px-5 sm:px-6 py-3.5 bg-primary-600/50 border border-primary-400/30 rounded-xl text-white/70 active:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all min-h-[48px]"
          >
            ← Back
          </button>

          <button
            onClick={handleNext}
            disabled={
              (step === 1 && !formData.name) ||
              (step === 2 && formData.goals.length === 0)
            }
            className="flex-1 px-6 sm:px-8 py-3.5 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold rounded-xl active:from-accent-600 active:to-accent-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all min-h-[48px]"
          >
            {step === totalSteps ? 'Complete Setup' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}
