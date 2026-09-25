import React, { useState } from 'react';
import {
  Settings,
  Star,
  MapPin,
  Clock,
  Award,
  Calendar,
  Sparkles,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle2,
  ChevronRight,
  Plus
} from 'lucide-react';
import { UserProfile, ReviewItem, ScreenId } from '../../types';

interface ProfileScreenProps {
  user: UserProfile;
  currentUser: UserProfile;
  reviews: ReviewItem[];
  onOpenTimeExplain: () => void;
  onNavigate: (screen: ScreenId) => void;
  onSwitchToMyProfile: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  currentUser,
  reviews,
  onOpenTimeExplain,
  onNavigate,
  onSwitchToMyProfile
}) => {
  const [activeTab, setActiveTab] = useState<'offered' | 'wanted'>('offered');
  const isMe = user.id === currentUser.id;

  return (
    <div className="h-full flex flex-col bg-stone-100 text-stone-900 select-none overflow-y-auto pb-20">
      {/* Top Bar */}
      <div className="sticky top-0 bg-stone-50/95 backdrop-blur-md border-b border-stone-200 px-4 py-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          {!isMe && (
            <button
              type="button"
              onClick={onSwitchToMyProfile}
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
            >
              &larr; Back to My Profile
            </button>
          )}
          <h1 className="text-sm font-bold text-stone-900">
            {isMe ? 'My Profile' : `${user.name}’s Profile`}
          </h1>
        </div>

        {isMe ? (
          <button
            type="button"
            onClick={() => alert('Settings & Preferences (Mock)')}
            className="p-1.5 text-stone-500 hover:text-stone-800 rounded-full hover:bg-stone-200 transition-colors"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        ) : (
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
            Neighbor
          </span>
        )}
      </div>

      {/* Profile Header Card */}
      <div className="bg-white border-b border-stone-200 p-4">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="w-18 h-18 rounded-full bg-emerald-100 text-emerald-900 ring-3 ring-emerald-700/50 shadow-md flex items-center justify-center text-2xl font-black">
              {user.name.charAt(0)}
            </div>
            <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-white">
              ✓
            </span>
          </div>

          <div className="flex-1">
            <h2 className="text-base font-black text-stone-900 tracking-tight leading-tight">
              {user.name}
            </h2>
            <p className="text-xs text-stone-500 font-mono">{user.handle}</p>

            <div className="flex items-center gap-1 text-xs text-stone-600 mt-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-800" />
              <span>{user.location}</span>
            </div>

            <div className="flex items-center gap-2 mt-1.5 text-xs">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{user.rating}</span>
              </div>
              <span className="text-stone-400">·</span>
              <span className="text-stone-600 font-medium">({user.reviewCount} community reviews)</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-stone-700 mt-3 leading-relaxed">{user.bio}</p>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {user.badges.map((b, i) => (
            <span
              key={i}
              className="text-[10px] font-semibold text-emerald-900 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full"
            >
              {b}
            </span>
          ))}
          <span className="text-[10px] font-medium text-stone-500 py-0.5">
            · {user.joinedDate}
          </span>
        </div>
      </div>

      {/* Time-Credit Wallet Card (Specified: visually treated like a currency/points balance) */}
      <div className="p-4">
        <div className="p-4 rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-widest block">
                Time-Credit Wallet
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black font-mono tracking-tight text-white">
                  {user.timeCreditBalance.toFixed(1)}
                </span>
                <span className="text-xs font-bold text-emerald-200 uppercase">
                  Hours Available
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenTimeExplain}
              className="px-2.5 py-1 rounded-xl bg-white/20 hover:bg-white/30 text-white text-[10px] font-bold transition-colors"
            >
              How it works
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-white/20 grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-emerald-700/80 flex items-center justify-center">
                <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-300" />
              </div>
              <div>
                <span className="text-[10px] text-emerald-200 block">Total Earned</span>
                <span className="font-bold font-mono text-sm">{user.totalHoursEarned} hrs</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-emerald-700/80 flex items-center justify-center">
                <ArrowUpRight className="w-3.5 h-3.5 text-amber-300" />
              </div>
              <div>
                <span className="text-[10px] text-emerald-200 block">Total Redeemed</span>
                <span className="font-bold font-mono text-sm">{user.totalHoursSpent} hrs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Skills Offered vs Skills Wanted */}
      <div className="px-4">
        <div className="flex items-center p-1 bg-stone-200/80 rounded-2xl">
          <button
            type="button"
            onClick={() => setActiveTab('offered')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'offered'
                ? 'bg-white text-emerald-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Skills Offered ({user.skillsOffered.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('wanted')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'wanted'
                ? 'bg-white text-emerald-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Skills Wanted ({user.skillsWanted.length})
          </button>
        </div>

        {/* Tab Content List */}
        <div className="mt-3 space-y-2">
          {activeTab === 'offered' ? (
            <>
              {user.skillsOffered.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white rounded-2xl border border-stone-200 flex items-center justify-between shadow-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">
                      ⚡
                    </div>
                    <div>
                      <span className="text-xs font-bold text-stone-900 block">{skill}</span>
                      <span className="text-[10px] text-stone-500">1 Time Credit / hr</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-800">Active</span>
                </div>
              ))}
              {isMe && (
                <button
                  type="button"
                  onClick={() => onNavigate('create_listing')}
                  className="w-full py-2.5 rounded-2xl border border-dashed border-stone-300 text-stone-600 hover:border-emerald-700 hover:text-emerald-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>List another skill offer</span>
                </button>
              )}
            </>
          ) : (
            <>
              {user.skillsWanted.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white rounded-2xl border border-stone-200 flex items-center justify-between shadow-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-bold">
                      🔍
                    </div>
                    <div>
                      <span className="text-xs font-bold text-stone-900 block">{skill}</span>
                      <span className="text-[10px] text-stone-500">Seeking local helper</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-amber-800">Open</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Reviews List */}
      <div className="p-4 mt-2">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
            Verified Community Reviews ({reviews.length})
          </h3>
          <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{user.rating}</span>
          </div>
        </div>

        <div className="space-y-2.5">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-xs"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-stone-200 flex items-center justify-center text-[9px] font-bold text-stone-500 ring-1 ring-stone-200">
                    U
                  </div>
                  <span className="font-bold text-xs text-stone-900">{rev.reviewerName}</span>
                </div>
                <span className="text-[10px] text-stone-400">{rev.date}</span>
              </div>

              <div className="flex items-center gap-1 text-amber-500 mb-1">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400" />
                ))}
                <span className="text-[10px] font-bold text-stone-500 ml-1">
                  · Exchanged "{rev.skillName}"
                </span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed italic">"{rev.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
