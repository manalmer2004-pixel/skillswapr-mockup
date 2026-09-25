import React, { useState } from 'react';
import { ArrowRight, Sparkles, Clock, MapPin, Users } from 'lucide-react';
import { ScreenId } from '../../types';

interface OnboardingScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Exchange Skills, Not Money',
      subtitle: 'Neighborly Mutual Aid',
      description:
        'Share what you love doing with neighbors in your area. A carpenter helps build a shelf; in return, someone teaches Spanish, bakes bread, or tunes a bike.',
      icon: Users,
      badge: 'Step 1 of 3 · The Time Bank'
    },
    {
      title: '1 Hour Given = 1 Time Credit',
      subtitle: 'Equal Value for All Talents',
      description:
        'Every hour of help earns 1 credit. Spend it on any skill in the community — you don’t need a direct 1-to-1 swap. Help Elena garden, then spend your credit with Carlos for carpentry!',
      icon: Clock,
      badge: 'Step 2 of 3 · Time Credits'
    },
    {
      title: 'Hyper-Local & Trust-First',
      subtitle: 'Meet Verified Neighbors',
      description:
        'Listings are prioritized by walking and biking distance. Build real-world community ties backed by verified neighbor ratings and mutual reviews.',
      icon: MapPin,
      badge: 'Step 3 of 3 · Local Network'
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onNavigate('signup');
    }
  };

  const SlideIcon = slides[currentSlide].icon;

  return (
    <div className="h-full flex flex-col justify-between bg-gradient-to-b from-stone-50 via-emerald-50/30 to-stone-100 text-stone-900 p-6 select-none overflow-y-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-emerald-900/20">
            sw
          </div>
          <span className="font-bold text-base tracking-tight text-emerald-950">skillswapr</span>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('login')}
          className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 px-3 py-1.5 rounded-full hover:bg-emerald-100/60 transition-colors"
        >
          Log In
        </button>
      </div>

      {/* Main Slide Card (Material You Soft Container) */}
      <div className="my-auto py-6 flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-3xl bg-emerald-100/90 text-emerald-800 flex items-center justify-center shadow-sm mb-6 border border-emerald-200/60">
          <SlideIcon className="w-12 h-12 stroke-[1.8]" />
        </div>

        <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-widest bg-emerald-100/70 px-3 py-1 rounded-full mb-3">
          {slides[currentSlide].badge}
        </span>

        <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight leading-tight max-w-xs">
          {slides[currentSlide].title}
        </h2>

        <p className="text-xs font-semibold text-emerald-700 mt-1">
          {slides[currentSlide].subtitle}
        </p>

        <p className="text-xs text-stone-600 mt-4 leading-relaxed max-w-xs">
          {slides[currentSlide].description}
        </p>

        {/* Carousel Dots */}
        <div className="flex items-center gap-2 mt-8">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx
                  ? 'w-7 bg-emerald-800'
                  : 'w-2 bg-stone-300 hover:bg-stone-400'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="space-y-3 pb-2">
        <button
          type="button"
          onClick={handleNext}
          className="w-full py-3.5 px-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm shadow-md shadow-emerald-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>{currentSlide === slides.length - 1 ? 'Get Started · Sign Up' : 'Continue'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="flex items-center justify-between px-2 pt-1 text-xs">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="text-stone-500 hover:text-stone-800 font-medium"
          >
            Explore as Guest
          </button>
          <button
            type="button"
            onClick={() => onNavigate('signup')}
            className="text-emerald-800 hover:text-emerald-950 font-bold"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};
