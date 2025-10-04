'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Protocols() {
  const [selectedProtocol, setSelectedProtocol] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const protocols = [
    {
      id: 'morning-awakening',
      title: 'Morning Awakening Ritual',
      duration: '45-60 min',
      category: 'Foundation',
      description: 'Start your day with optimal circadian alignment and metabolic activation',
      steps: [
        'Wake naturally or with sunrise alarm (6:00-7:00 AM)',
        'Immediate sunlight exposure (15 min outdoors)',
        'Hydrate with mineralized water (16-24 oz)',
        'Light movement or stretching (5-10 min)',
        'Morning supplements stack',
      ],
      benefits: ['Improved energy', 'Better sleep quality', 'Metabolic activation', 'Hormone optimization']
    },
    {
      id: 'contrast-therapy',
      title: 'Contrast Therapy',
      duration: '10-15 min',
      category: 'Advanced',
      description: 'Hot/cold exposure for cardiovascular health and longevity',
      steps: [
        'Hot shower or sauna (3-5 min)',
        'Cold shower (1-3 min)',
        'Repeat 2-3 cycles',
        'End with cold exposure',
        'Controlled breathing throughout',
      ],
      benefits: ['Cardiovascular health', 'Inflammation reduction', 'Immune boost', 'Mental resilience']
    },
    {
      id: 'breathwork',
      title: 'Breathwork Practice',
      duration: '10-20 min',
      category: 'Foundation',
      description: 'Evidence-based breathing techniques for stress reduction and vitality',
      steps: [
        'Find quiet, comfortable space',
        'Box breathing (4-4-4-4) x 5 rounds',
        'Diaphragmatic breathing x 10',
        'Wim Hof method (optional, advanced)',
        'End with gratitude meditation (2 min)',
      ],
      benefits: ['Stress reduction', 'Improved HRV', 'Better oxygen efficiency', 'Parasympathetic activation']
    },
    {
      id: 'movement',
      title: 'Daily Movement',
      duration: '20-30 min',
      category: 'Foundation',
      description: 'Functional movement for longevity and metabolic health',
      steps: [
        'Dynamic warmup (5 min)',
        'Strength training or bodyweight exercises (15 min)',
        'Mobility work (5 min)',
        'Walking or light cardio (10 min)',
        'Cool down and stretch',
      ],
      benefits: ['Muscle maintenance', 'Bone density', 'Metabolic health', 'Longevity markers']
    },
    {
      id: 'evening-winddown',
      title: 'Evening Wind-Down',
      duration: '30-45 min',
      category: 'Foundation',
      description: 'Prepare your body for restorative sleep',
      steps: [
        'Dim lights 2 hours before bed',
        'Light dinner (stop eating 3 hours before sleep)',
        'Evening supplements',
        'Avoid screens 1 hour before bed',
        'Meditation or journaling (10 min)',
        'Cool bedroom temperature (65-68°F)',
      ],
      benefits: ['Better sleep quality', 'Deeper recovery', 'Hormone optimization', 'Cellular repair']
    },
    {
      id: 'grounding',
      title: 'Grounding Practice',
      duration: '15-20 min',
      category: 'Intermediate',
      description: 'Connect with earth energy for inflammation reduction',
      steps: [
        'Find natural outdoor space',
        'Remove shoes and socks',
        'Stand or walk on earth/grass (15 min)',
        'Practice mindful breathing',
        'Morning or evening optimal',
      ],
      benefits: ['Inflammation reduction', 'Better sleep', 'Stress reduction', 'Circadian alignment']
    },
  ];

  const categories = ['all', 'Foundation', 'Intermediate', 'Advanced'];

  const filteredProtocols = activeCategory === 'all'
    ? protocols
    : protocols.filter(p => p.category === activeCategory);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 sm:mx-0 px-4 sm:px-0">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            aria-label={`Filter by ${category === 'all' ? 'all protocols' : category}`}
            aria-current={activeCategory === category ? 'true' : undefined}
            className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-sm sm:text-base whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-primary-900 ${
              activeCategory === category
                ? 'bg-accent-500/20 border border-accent-500/30 text-accent-300 shadow-lg'
                : 'bg-primary-600/50 border border-primary-400/30 text-white/60 hover:bg-primary-600/70 hover:text-white/80'
            }`}
          >
            {category === 'all' ? 'All Protocols' : category}
          </button>
        ))}
      </div>

      {/* Protocols List */}
      {filteredProtocols.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          {filteredProtocols.map((protocol, index) => (
          <motion.div
            key={protocol.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="bg-primary-600/50 border border-primary-400/30 rounded-2xl overflow-hidden hover:border-primary-400/50 transition-all"
          >
            <button
              onClick={() => setSelectedProtocol(selectedProtocol === protocol.id ? null : protocol.id)}
              aria-label={`${selectedProtocol === protocol.id ? 'Collapse' : 'Expand'} ${protocol.title} details`}
              aria-expanded={selectedProtocol === protocol.id}
              className="w-full p-4 sm:p-5 text-left hover:bg-primary-600/30 transition-all focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-400"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <h3 className="text-base sm:text-lg font-semibold text-white">{protocol.title}</h3>
                    <span className="px-2 py-0.5 bg-accent-500/20 text-accent-300 rounded text-xs sm:text-sm">
                      {protocol.category}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm sm:text-base mb-2">{protocol.description}</p>
                  <p className="text-white/40 text-xs sm:text-sm">Duration: {protocol.duration}</p>
                </div>
                <svg
                  className={`w-5 h-5 sm:w-6 sm:h-6 text-white/40 transition-transform flex-shrink-0 ${selectedProtocol === protocol.id ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {selectedProtocol === protocol.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="px-4 sm:px-5 pb-4 sm:pb-5 space-y-4 sm:space-y-5 border-t border-primary-400/30 pt-4 sm:pt-5"
              >
                {/* Steps */}
                <div>
                  <h4 className="text-sm sm:text-base font-semibold text-white mb-3">Protocol Steps</h4>
                  <div className="space-y-2.5">
                    {protocol.steps.map((step, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-accent-500/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-accent-400 text-xs sm:text-sm font-semibold">{index + 1}</span>
                        </div>
                        <p className="text-white/70 text-sm sm:text-base pt-0.5">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="text-sm sm:text-base font-semibold text-white mb-3">Key Benefits</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {protocol.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-accent-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-white/70 text-sm sm:text-base">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  aria-label={`Start ${protocol.title}`}
                  className="w-full bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold py-3 sm:py-3.5 rounded-xl mt-2 hover:from-accent-600 hover:to-accent-700 transition-all shadow-lg shadow-accent-500/20 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-primary-900"
                >
                  Start This Protocol
                </button>
              </motion.div>
            )}
          </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-4">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-primary-600/30 rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-white/60 text-center mb-2 text-base sm:text-lg">No protocols found</p>
          <p className="text-white/40 text-sm sm:text-base text-center">Try selecting a different category</p>
        </div>
      )}

      {/* Custom Protocol CTA */}
      <div className="bg-gradient-to-br from-accent-500/10 to-accent-600/10 border border-accent-500/20 rounded-2xl p-5 sm:p-6 lg:p-8 text-center">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Need a Custom Protocol?</h3>
        <p className="text-white/60 text-sm sm:text-base mb-4 sm:mb-5 max-w-2xl mx-auto">Work with our longevity specialists to create a personalized plan</p>
        <button
          aria-label="Schedule consultation with specialist"
          className="px-6 sm:px-8 py-2.5 sm:py-3 bg-accent-500/20 border border-accent-500/30 text-accent-300 rounded-full text-sm sm:text-base font-semibold hover:bg-accent-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-primary-900"
        >
          Schedule Consultation
        </button>
      </div>
    </div>
  );
}
