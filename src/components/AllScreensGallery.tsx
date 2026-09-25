import React from 'react';
import { ScreenId } from '../types';
import { Smartphone, ExternalLink, Code2 } from 'lucide-react';

interface AllScreensGalleryProps {
  onSelectScreen: (screen: ScreenId) => void;
  onOpenComposeInspector: (screen: ScreenId) => void;
  renderScreenContent: (screen: ScreenId) => React.ReactNode;
}

export const AllScreensGallery: React.FC<AllScreensGalleryProps> = ({
  onSelectScreen,
  onOpenComposeInspector,
  renderScreenContent
}) => {
  const screensMeta: { id: ScreenId; number: number; title: string; subtitle: string; category: string }[] = [
    {
      id: 'onboarding',
      number: 1,
      title: 'Onboarding / Welcome',
      subtitle: 'Swipeable carousel explaining time-banking & local swaps',
      category: 'Auth & Onboarding'
    },
    {
      id: 'signup',
      number: 2,
      title: 'Sign Up Screen',
      subtitle: 'Google OAuth + Email registration & terms acceptance',
      category: 'Auth & Onboarding'
    },
    {
      id: 'login',
      number: 3,
      title: 'Log In Screen',
      subtitle: 'Email, password, Google sign-in & password recovery',
      category: 'Auth & Onboarding'
    },
    {
      id: 'profile_setup',
      number: 4,
      title: 'Profile Setup',
      subtitle: 'Avatar upload, location GPS prompt & first skill offered',
      category: 'Auth & Onboarding'
    },
    {
      id: 'home',
      number: 5,
      title: 'Home / Discover Feed',
      subtitle: 'Distance-sorted feed cards, radius filter & wallet badge',
      category: 'Core Exchange'
    },
    {
      id: 'browse',
      number: 6,
      title: 'Browse Screen',
      subtitle: 'Category chips, live search, filter pills & grid/list views',
      category: 'Core Exchange'
    },
    {
      id: 'listing_detail',
      number: 7,
      title: 'Listing Detail Screen',
      subtitle: 'Hero media, poster rating, gear checklist & sticky CTA',
      category: 'Core Exchange'
    },
    {
      id: 'message_thread',
      number: 8,
      title: 'Request / Message Thread',
      subtitle: 'Top Accept/Decline card, chat coordination & rate modal',
      category: 'Communication'
    },
    {
      id: 'profile',
      number: 9,
      title: 'Profile Screen',
      subtitle: 'Time-credit wallet card, reviews & Offered/Wanted tabs',
      category: 'User Identity'
    },
    {
      id: 'create_listing',
      number: 10,
      title: 'Post / Create Listing',
      subtitle: 'Offer vs Request toggle & 1 hr = 1 credit time calculator',
      category: 'Creation'
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Banner */}
      <div className="mb-8 p-6 rounded-3xl bg-stone-800/80 border border-stone-700 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-900 text-emerald-300 border border-emerald-700">
                Android Material Design 3 UI Set
              </span>
              <span className="text-xs text-stone-400 font-mono">10 Complete Screens</span>
            </div>
            <h1 className="text-2xl font-black text-stone-100 tracking-tight mt-2">
              skillswapr UI System & Wireframe Canvas
            </h1>
            <p className="text-xs text-stone-300 mt-1 max-w-2xl leading-relaxed">
              Cohesive Android application mockups designed according to Material You specifications: dynamic color palettes (warm forest, soft sage, natural stone), 1 hour = 1 time credit economics, persistent navigation, and edge-to-edge layout.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onSelectScreen('home')}
              className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
            >
              <Smartphone className="w-4 h-4" />
              <span>Launch Phone Simulator</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid of All 10 Screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {screensMeta.map((screen) => (
          <div
            key={screen.id}
            className="flex flex-col rounded-3xl bg-stone-800/60 border border-stone-700/80 p-3 hover:border-emerald-500/60 transition-all group"
          >
            {/* Screen Header Badge */}
            <div className="flex items-center justify-between px-1 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-900 text-emerald-300 text-[10px] font-bold flex items-center justify-center font-mono">
                  {screen.number}
                </span>
                <h3 className="text-xs font-bold text-stone-100 truncate group-hover:text-emerald-400 transition-colors">
                  {screen.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onOpenComposeInspector(screen.id)}
                className="text-stone-400 hover:text-emerald-400 p-1"
                title="View Jetpack Compose Kotlin code"
              >
                <Code2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[11px] text-stone-400 px-1 mb-2 line-clamp-1 leading-snug">
              {screen.subtitle}
            </p>

            {/* Android Device Mini Viewport */}
            <div
              onClick={() => onSelectScreen(screen.id)}
              className="relative w-full h-[580px] rounded-2xl overflow-hidden shadow-xl border border-stone-600/60 bg-stone-100 cursor-pointer transition-transform duration-200 group-hover:scale-[1.01]"
            >
              {/* Overlay hover prompt */}
              <div className="absolute inset-0 bg-emerald-950/0 group-hover:bg-emerald-950/15 z-30 transition-colors flex items-center justify-center pointer-events-none">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900/90 text-emerald-300 text-[11px] font-bold py-1 px-3 rounded-full shadow-lg">
                  Click to Interact &rarr;
                </span>
              </div>

              {/* Render screen inside miniature mobile viewport */}
              <div className="w-full h-full pointer-events-none scale-100">
                {renderScreenContent(screen.id)}
              </div>
            </div>

            {/* Quick Action Footer */}
            <div className="flex items-center justify-between pt-2.5 px-1">
              <button
                type="button"
                onClick={() => onSelectScreen(screen.id)}
                className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                <span>Interact</span>
                <ExternalLink className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => onOpenComposeInspector(screen.id)}
                className="text-[11px] font-medium text-stone-400 hover:text-stone-200"
              >
                Compose Code &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
