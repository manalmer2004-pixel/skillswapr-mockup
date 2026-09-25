import React from 'react';
import { Home, Compass, Plus, MessageSquare, User } from 'lucide-react';
import { ScreenId } from '../../types';

interface BottomNavProps {
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  unreadMessagesCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeScreen,
  onNavigate,
  unreadMessagesCount = 1
}) => {
  const isTabActive = (tab: string) => {
    if (tab === 'home') return activeScreen === 'home';
    if (tab === 'browse') return activeScreen === 'browse';
    if (tab === 'create') return activeScreen === 'create_listing';
    if (tab === 'messages') return activeScreen === 'message_thread';
    if (tab === 'profile') return activeScreen === 'profile';
    return false;
  };

  return (
    <div className="relative border-t border-stone-200/80 bg-stone-50/95 backdrop-blur-md px-3 pt-2 pb-1 z-20">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {/* 1. Home */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex-1 flex flex-col items-center justify-center py-1 group min-h-[48px]"
        >
          <div
            className={`w-14 h-7 rounded-full flex items-center justify-center transition-all ${
              isTabActive('home')
                ? 'bg-emerald-900 text-emerald-50'
                : 'text-stone-600 group-hover:text-stone-900 group-hover:bg-stone-200/50'
            }`}
          >
            <Home className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span
            className={`text-[11px] font-medium tracking-tight mt-0.5 ${
              isTabActive('home') ? 'text-emerald-950 font-semibold' : 'text-stone-600'
            }`}
          >
            Home
          </span>
        </button>

        {/* 2. Browse */}
        <button
          type="button"
          onClick={() => onNavigate('browse')}
          className="flex-1 flex flex-col items-center justify-center py-1 group min-h-[48px]"
        >
          <div
            className={`w-14 h-7 rounded-full flex items-center justify-center transition-all ${
              isTabActive('browse')
                ? 'bg-emerald-900 text-emerald-50'
                : 'text-stone-600 group-hover:text-stone-900 group-hover:bg-stone-200/50'
            }`}
          >
            <Compass className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span
            className={`text-[11px] font-medium tracking-tight mt-0.5 ${
              isTabActive('browse') ? 'text-emerald-950 font-semibold' : 'text-stone-600'
            }`}
          >
            Browse
          </span>
        </button>

        {/* 3. Center Raised Post FAB */}
        <div className="flex-1 flex flex-col items-center justify-center -mt-5">
          <button
            type="button"
            onClick={() => onNavigate('create_listing')}
            aria-label="Post a Skill"
            className="w-13 h-13 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-lg shadow-emerald-900/25 active:scale-95 transition-all flex items-center justify-center border-2 border-stone-50"
          >
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </button>
          <span className="text-[11px] font-semibold text-emerald-900 mt-1 tracking-tight">
            Post
          </span>
        </div>

        {/* 4. Messages */}
        <button
          type="button"
          onClick={() => onNavigate('message_thread')}
          className="flex-1 flex flex-col items-center justify-center py-1 group min-h-[48px]"
        >
          <div className="relative">
            <div
              className={`w-14 h-7 rounded-full flex items-center justify-center transition-all ${
                isTabActive('messages')
                  ? 'bg-emerald-900 text-emerald-50'
                  : 'text-stone-600 group-hover:text-stone-900 group-hover:bg-stone-200/50'
              }`}
            >
              <MessageSquare className="w-5 h-5 stroke-[2.2]" />
            </div>
            {unreadMessagesCount > 0 && (
              <span className="absolute top-0 right-3 w-2.5 h-2.5 rounded-full bg-amber-600 ring-2 ring-stone-50" />
            )}
          </div>
          <span
            className={`text-[11px] font-medium tracking-tight mt-0.5 ${
              isTabActive('messages') ? 'text-emerald-950 font-semibold' : 'text-stone-600'
            }`}
          >
            Messages
          </span>
        </button>

        {/* 5. Profile */}
        <button
          type="button"
          onClick={() => onNavigate('profile')}
          className="flex-1 flex flex-col items-center justify-center py-1 group min-h-[48px]"
        >
          <div
            className={`w-14 h-7 rounded-full flex items-center justify-center transition-all ${
              isTabActive('profile')
                ? 'bg-emerald-900 text-emerald-50'
                : 'text-stone-600 group-hover:text-stone-900 group-hover:bg-stone-200/50'
            }`}
          >
            <User className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span
            className={`text-[11px] font-medium tracking-tight mt-0.5 ${
              isTabActive('profile') ? 'text-emerald-950 font-semibold' : 'text-stone-600'
            }`}
          >
            Profile
          </span>
        </button>
      </div>
    </div>
  );
};
