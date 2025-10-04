'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ProtocolTimerProps {
  protocolName: string;
  duration: number; // in seconds
  onComplete: () => void;
  onClose: () => void;
}

export default function ProtocolTimer({ protocolName, duration, onComplete, onClose }: ProtocolTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setShowCelebration(true);
            // Play completion sound
            if (audioRef.current) {
              audioRef.current.play().catch(() => {});
            }
            setTimeout(() => {
              onComplete();
            }, 2000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((duration - timeLeft) / duration) * 100;

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTimeLeft(duration);
    setIsRunning(false);
  };

  if (showCelebration) {
    return (
      <div className="fixed inset-0 z-50 bg-primary-900/95 backdrop-blur-lg flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="text-center"
        >
          <div className="flex justify-center mb-4">
            <svg className="w-24 h-24 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-accent-400 mb-2">Protocol Complete!</h2>
          <p className="text-white/70">+10 points earned</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-primary-900/95 backdrop-blur-lg flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-primary-600/50 border border-primary-400/30 rounded-2xl p-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white/40 hover:text-white/70 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Protocol Name */}
          <h2 className="text-2xl font-bold text-white mb-8 text-center">{protocolName}</h2>

          {/* Timer Circle */}
          <div className="relative w-64 h-64 mx-auto mb-8">
            <svg className="transform -rotate-90 w-64 h-64">
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-primary-700"
              />
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${progress * 7.54} 754`}
                className="text-accent-400 transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-bold text-white">{formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={resetTimer}
              className="w-14 h-14 flex items-center justify-center bg-primary-700/50 border border-primary-400/30 rounded-full text-white/70 hover:text-white hover:bg-primary-700 transition-all"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>

            <button
              onClick={toggleTimer}
              className="w-20 h-20 flex items-center justify-center bg-gradient-to-r from-accent-500 to-accent-600 rounded-full text-white shadow-lg shadow-accent-500/20 hover:scale-105 transition-all"
            >
              {isRunning ? (
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-10 h-10 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setTimeLeft(Math.max(0, timeLeft - 60))}
              className="w-14 h-14 flex items-center justify-center bg-primary-700/50 border border-primary-400/30 rounded-full text-white/70 hover:text-white hover:bg-primary-700 transition-all"
            >
              <span className="text-sm font-semibold">-1m</span>
            </button>
          </div>

          {/* Progress Text */}
          <p className="text-center text-white/60 text-sm mt-6">
            {isRunning ? 'Timer running...' : 'Press play to start'}
          </p>
        </div>
      </div>

      {/* Audio element for completion sound */}
      <audio ref={audioRef} src="/sounds/complete.mp3" />
    </div>
  );
}
