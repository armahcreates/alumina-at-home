'use client';

import { useState } from 'react';
import ReactPlayer from 'react-player';

interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  thumbnail: string;
  url: string;
}

export default function VideoLibrary() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const videos: Video[] = [
    {
      id: '1',
      title: 'Morning Light Exposure Protocol',
      description: 'Learn the optimal way to get morning sunlight for circadian rhythm',
      duration: '8:32',
      category: 'circadian',
      thumbnail: 'https://placehold.co/400x225/235B4E/EFC2B3?text=Morning+Light',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' // Replace with actual video
    },
    {
      id: '2',
      title: 'Contrast Shower Technique',
      description: 'Step-by-step guide to hot/cold therapy at home',
      duration: '12:15',
      category: 'contrast',
      thumbnail: 'https://placehold.co/400x225/235B4E/EFC2B3?text=Cold+Shower',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      id: '3',
      title: 'Box Breathing for Beginners',
      description: 'Master the 4-4-4-4 breathing pattern for stress reduction',
      duration: '6:45',
      category: 'breathwork',
      thumbnail: 'https://placehold.co/400x225/235B4E/EFC2B3?text=Breathwork',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      id: '4',
      title: 'Setting Up Your Sleep Sanctuary',
      description: 'Optimize your bedroom for deep, restorative sleep',
      duration: '15:20',
      category: 'environment',
      thumbnail: 'https://placehold.co/400x225/235B4E/EFC2B3?text=Sleep+Setup',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      id: '5',
      title: 'Supplement Timing & Stacking',
      description: 'When and how to take your longevity supplements',
      duration: '18:40',
      category: 'supplements',
      thumbnail: 'https://placehold.co/400x225/235B4E/EFC2B3?text=Supplements',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      id: '6',
      title: 'Advanced Cold Exposure',
      description: 'Ice baths and advanced techniques for experienced practitioners',
      duration: '22:10',
      category: 'advanced',
      thumbnail: 'https://placehold.co/400x225/235B4E/EFC2B3?text=Ice+Bath',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
  ];

  const categories = ['all', 'circadian', 'contrast', 'breathwork', 'environment', 'supplements', 'advanced'];

  const filteredVideos = activeCategory === 'all'
    ? videos
    : videos.filter(v => v.category === activeCategory);

  return (
    <>
      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-primary-900/95 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="max-w-5xl w-full">
            <div className="bg-primary-600/50 border border-primary-400/30 rounded-2xl overflow-hidden shadow-2xl">
              {/* Close Button */}
              <button
                onClick={() => setSelectedVideo(null)}
                aria-label="Close video player"
                className="absolute top-4 right-4 z-10 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center bg-primary-700/80 backdrop-blur-sm rounded-full text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent-400"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Video Player */}
              <div className="aspect-video bg-black">
                <ReactPlayer
                  {...{
                    url: selectedVideo.url,
                    width: "100%",
                    height: "100%",
                    controls: true,
                    playing: true
                  } as any}
                />
              </div>

              {/* Video Info */}
              <div className="p-5 sm:p-6 lg:p-8">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3">{selectedVideo.title}</h3>
                <p className="text-white/70 text-sm sm:text-base mb-4">{selectedVideo.description}</p>
                <div className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base text-white/50 flex-wrap">
                  <span>Duration: {selectedVideo.duration}</span>
                  <span>•</span>
                  <span className="capitalize">{selectedVideo.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6 sm:space-y-8">
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 sm:mx-0 px-4 sm:px-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              aria-label={`Filter by ${category}`}
              aria-current={activeCategory === category ? 'true' : undefined}
              className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-sm sm:text-base whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-primary-900 ${
                activeCategory === category
                  ? 'bg-accent-500/20 border border-accent-500/30 text-accent-300 shadow-lg'
                  : 'bg-primary-600/50 border border-primary-400/30 text-white/60 hover:bg-primary-600/70 hover:text-white/80'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredVideos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                aria-label={`Play ${video.title}`}
                className="bg-primary-600/50 border border-primary-400/30 rounded-xl overflow-hidden hover:bg-primary-600/60 hover:border-primary-400/50 hover:shadow-xl transition-all text-left group focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-primary-900"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-primary-700">
                  <img src={video.thumbnail} alt="" className="w-full h-full object-cover" aria-hidden="true" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-xs sm:text-sm text-white font-medium">
                    {video.duration}
                  </div>
                  {/* Play Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-accent-500/90 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-accent-500 transition-all shadow-lg">
                      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-white font-semibold text-base sm:text-lg mb-1.5 line-clamp-2">{video.title}</h3>
                  <p className="text-white/60 text-sm sm:text-base line-clamp-2 mb-3">{video.description}</p>
                  <div className="mt-2">
                    <span className="text-xs sm:text-sm px-2.5 py-1 bg-accent-500/20 text-accent-300 rounded-full capitalize font-medium">
                      {video.category}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-primary-600/30 rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-white/60 text-center mb-2 text-base sm:text-lg">No videos found</p>
            <p className="text-white/40 text-sm sm:text-base text-center">Try selecting a different category</p>
          </div>
        )}
      </div>
    </>
  );
}
