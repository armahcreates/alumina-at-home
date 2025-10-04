'use client';

import { useState } from 'react';

interface EquipmentItem {
  id: string;
  name: string;
  description: string;
  price: string;
  tier: 'essential' | 'intermediate' | 'premium';
  category: string;
  benefits: string[];
  buyLink: string;
  owned?: boolean;
}

export default function EquipmentGuide() {
  const [activeTier, setActiveTier] = useState<'essential' | 'intermediate' | 'premium'>('essential');
  const [ownedItems, setOwnedItems] = useState<string[]>([]);

  const equipment: EquipmentItem[] = [
    {
      id: '1',
      name: 'Blue Light Blocking Glasses',
      description: 'Wear 2-3 hours before bed to improve melatonin production',
      price: '$25-50',
      tier: 'essential',
      category: 'Sleep',
      benefits: ['Better sleep quality', 'Natural melatonin boost', 'Reduced eye strain'],
      buyLink: 'https://amazon.com'
    },
    {
      id: '2',
      name: 'Water Mineralization Drops',
      description: 'Add 70+ trace minerals to your drinking water',
      price: '$20-35',
      tier: 'essential',
      category: 'Hydration',
      benefits: ['Cellular hydration', 'Electrolyte balance', 'Better absorption'],
      buyLink: 'https://amazon.com'
    },
    {
      id: '3',
      name: 'Red Light Therapy Panel',
      description: 'Full-body red/NIR light for cellular energy and recovery',
      price: '$300-800',
      tier: 'intermediate',
      category: 'Recovery',
      benefits: ['ATP production', 'Skin health', 'Faster recovery', 'Collagen boost'],
      buyLink: 'https://amazon.com'
    },
    {
      id: '4',
      name: 'Oura Ring (Gen 3)',
      description: 'Track sleep, HRV, and readiness with precision',
      price: '$299-449',
      tier: 'intermediate',
      category: 'Tracking',
      benefits: ['Sleep insights', 'HRV tracking', 'Activity monitoring', 'Recovery score'],
      buyLink: 'https://ouraring.com'
    },
    {
      id: '5',
      name: 'Infrared Sauna',
      description: 'Full-spectrum IR sauna for detox and cardiovascular health',
      price: '$2,500-5,000',
      tier: 'premium',
      category: 'Recovery',
      benefits: ['Detoxification', 'Cardiovascular health', 'Stress reduction', 'Longevity boost'],
      buyLink: 'https://sunlighten.com'
    },
    {
      id: '6',
      name: 'Cold Plunge Tub',
      description: 'Dedicated cold immersion for daily contrast therapy',
      price: '$3,000-8,000',
      tier: 'premium',
      category: 'Recovery',
      benefits: ['Immune boost', 'Mental clarity', 'Inflammation reduction', 'Metabolism boost'],
      buyLink: 'https://plunge.com'
    },
  ];

  const filteredEquipment = equipment.filter(item => item.tier === activeTier);

  const toggleOwned = (id: string) => {
    setOwnedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const tierInfo = {
    essential: {
      title: 'Essential Tier',
      budget: '$0-500',
      description: 'Start with free protocols and minimal equipment'
    },
    intermediate: {
      title: 'Intermediate Tier',
      budget: '$500-2,500',
      description: 'Add helpful tools for better results'
    },
    premium: {
      title: 'Premium Tier',
      budget: '$2,500+',
      description: 'Invest in advanced optimization equipment'
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Tier Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {(Object.keys(tierInfo) as Array<keyof typeof tierInfo>).map((tier, index) => (
          <button
            key={tier}
            onClick={() => setActiveTier(tier)}
            aria-label={`Select ${tierInfo[tier].title}`}
            aria-current={activeTier === tier ? 'true' : undefined}
            className={`p-4 sm:p-5 rounded-xl border transition-all text-left focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-primary-900 ${
              activeTier === tier
                ? 'bg-accent-500/20 border-accent-500/50 shadow-lg'
                : 'bg-primary-600/50 border-primary-400/30 hover:bg-primary-600/60'
            }`}
          >
            <p className={`font-semibold text-sm sm:text-base ${activeTier === tier ? 'text-accent-300' : 'text-white'}`}>
              {tierInfo[tier].title}
            </p>
            <p className="text-xs sm:text-sm text-white/60 mt-1">{tierInfo[tier].budget}</p>
          </button>
        ))}
      </div>

      {/* Tier Description */}
      <div className="bg-primary-600/30 border border-primary-400/20 rounded-xl p-4 sm:p-5">
        <p className="text-white/70 text-sm sm:text-base">{tierInfo[activeTier].description}</p>
      </div>

      {/* Equipment List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        {filteredEquipment.map((item, index) => (
          <div
            key={item.id}
            className="bg-primary-600/50 border border-primary-400/30 rounded-xl p-4 sm:p-5 hover:bg-primary-600/60 hover:border-primary-400/50 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <h3 className="text-base sm:text-lg font-semibold text-white">{item.name}</h3>
                  <span className="px-2 py-0.5 bg-accent-500/20 text-accent-300 rounded text-xs sm:text-sm">
                    {item.category}
                  </span>
                </div>
                <p className="text-white/60 text-sm sm:text-base mb-2">{item.description}</p>
                <p className="text-accent-400 font-semibold text-base sm:text-lg">{item.price}</p>
              </div>

              <button
                onClick={() => toggleOwned(item.id)}
                aria-label={`Mark ${item.name} as ${ownedItems.includes(item.id) ? 'not owned' : 'owned'}`}
                aria-pressed={ownedItems.includes(item.id)}
                className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-sm sm:text-base font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-primary-900 ${
                  ownedItems.includes(item.id)
                    ? 'bg-accent-500/20 border border-accent-500/30 text-accent-300'
                    : 'bg-primary-700/50 border border-primary-400/30 text-white/60 hover:bg-primary-700/70'
                }`}
              >
                {ownedItems.includes(item.id) ? '✓ Owned' : 'Mark Owned'}
              </button>
            </div>

            {/* Benefits */}
            <div className="mb-4">
              <p className="text-white/50 text-xs sm:text-sm mb-2.5 font-medium">Key Benefits:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                {item.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-accent-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/70 text-sm sm:text-base">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Buy Button */}
            <a
              href={item.buyLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${item.name} product details`}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl font-semibold text-sm sm:text-base hover:from-accent-600 hover:to-accent-700 transition-all shadow-lg shadow-accent-500/20 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-primary-900"
            >
              <span>View Product</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        ))}
      </div>

      {/* Investment Summary */}
      <div className="bg-gradient-to-br from-accent-500/10 to-accent-600/10 border border-accent-500/20 rounded-2xl p-5 sm:p-6 lg:p-8">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Investment ROI</h3>
        <p className="text-white/70 text-sm sm:text-base mb-4 sm:mb-5 max-w-3xl">
          Quality equipment pays for itself in health gains and healthcare cost avoidance.
        </p>
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <div>
            <p className="text-white/50 text-xs sm:text-sm mb-1.5">Avg. Equipment Cost</p>
            <p className="text-white font-semibold text-base sm:text-lg">{tierInfo[activeTier].budget}</p>
          </div>
          <div>
            <p className="text-white/50 text-xs sm:text-sm mb-1.5">Potential Savings</p>
            <p className="text-accent-400 font-semibold text-base sm:text-lg">$50K+ lifetime</p>
          </div>
        </div>
      </div>
    </div>
  );
}
