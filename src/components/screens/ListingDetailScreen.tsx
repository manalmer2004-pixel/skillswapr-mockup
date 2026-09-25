import React, { useState } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Clock,
  MapPin,
  Star,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Wrench,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { SkillListing, UserProfile, ScreenId } from '../../types';
import { OTHER_USERS } from '../../data/mockData';
import { formatDistanceKm } from '../../utils/distance';

interface ListingDetailScreenProps {
  listing: SkillListing;
  currentUser: UserProfile;
  onBack: () => void;
  onSelectUser: (user: UserProfile) => void;
  onRequestSkill: (listing: SkillListing) => void;
  onToggleSaveListing: (listingId: string) => void;
  onOpenTimeExplain: () => void;
}

export const ListingDetailScreen: React.FC<ListingDetailScreenProps> = ({
  listing,
  currentUser,
  onBack,
  onSelectUser,
  onRequestSkill,
  onToggleSaveListing,
  onOpenTimeExplain
}) => {
  const [requestedSuccess, setRequestedSuccess] = useState(false);
  const poster = OTHER_USERS[listing.userId] || {
    id: listing.userId,
    name: 'Carlos Mendez',
    handle: '@carlos_woodcraft',
    avatarUrl: listing.imageUrl,
    location: `${listing.locationArea} · ${formatDistanceKm(listing.distanceMiles)} away`,
    distanceMiles: listing.distanceMiles,
    bio: 'Community member exchanging craft & practical knowledge.',
    rating: 4.95,
    reviewCount: 29,
    timeCreditBalance: 5.0,
    totalHoursEarned: 16.0,
    totalHoursSpent: 11.0,
    joinedDate: 'Member since Jan 2024',
    skillsOffered: ['Wood Joinery', 'Furniture Restoration'],
    skillsWanted: ['Spanish Lessons', 'Web Help'],
    badges: ['Verified Neighbor', 'Master Craftsman']
  };

  const handleRequestClick = () => {
    setRequestedSuccess(true);
    setTimeout(() => {
      onRequestSkill(listing);
    }, 700);
  };

  return (
    <div className="h-full flex flex-col bg-stone-50 text-stone-900 select-none overflow-y-auto relative pb-24">
      {/* Top Media Header */}
      <div className="relative h-64 w-full bg-stone-900 shrink-0">
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-black/30 to-black/60" />

        {/* Top App Bar Navigation on Header */}
        <div className="absolute top-2 left-4 right-4 flex items-center justify-between z-10">
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleSaveListing(listing.id)}
              className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-colors"
            >
              <Bookmark
                className={`w-4 h-4 ${listing.saved ? 'fill-amber-400 text-amber-400' : ''}`}
              />
            </button>
            <button
              type="button"
              onClick={() => alert('Link copied to clipboard (Mock)')}
              className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title & Badges in Hero Footer */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                listing.type === 'offer'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-amber-700 text-white'
              }`}
            >
              {listing.type === 'offer' ? 'Skill Offer' : 'Skill Request'}
            </span>
            <span className="text-[10px] font-semibold bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full">
              {listing.category}
            </span>
          </div>
          <h1 className="text-lg font-black leading-tight drop-shadow-sm">{listing.title}</h1>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-4 space-y-5">
        {/* Tappable Poster Card (Material You Soft Elevation) */}
        <div
          onClick={() => onSelectUser(poster)}
          className="p-3.5 bg-white rounded-2xl border border-stone-200/90 shadow-xs flex items-center justify-between cursor-pointer hover:border-emerald-700/60 transition-all group"
        >
          <div className="flex items-center gap-3">
            {/* Avatar with subtle border & shadow to look explicitly tappable */}
            <div className="relative rounded-full ring-2 ring-emerald-700/60 shadow-xs group-hover:scale-105 transition-transform">
              <img
                src={poster.avatarUrl}
                alt={poster.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-white">
                ✓
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-stone-900 group-hover:text-emerald-800 transition-colors">
                  {poster.name}
                </span>
                <span className="text-[10px] text-stone-500 font-mono">{poster.handle}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{poster.rating}</span>
                </div>
                <span>·</span>
                <span>{poster.reviewCount} reviews</span>
                <span>·</span>
                <span className="text-emerald-800 font-semibold">{formatDistanceKm(listing.distanceMiles)}</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-bold text-emerald-800 group-hover:underline">
              View Profile &rarr;
            </span>
          </div>
        </div>

        {/* Time-Credit Economics Box */}
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">
                ⚡
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                  Time-Bank Cost
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-black font-mono text-emerald-950">
                    {listing.creditCost} Credits
                  </span>
                  <span className="text-xs text-emerald-800 font-semibold">
                    ({listing.estimatedHours} hrs estimated)
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenTimeExplain}
              className="text-[11px] font-bold text-emerald-800 hover:text-emerald-950 underline"
            >
              How it works
            </button>
          </div>

          <p className="text-[11px] text-emerald-800/90 mt-2 leading-relaxed">
            1 credit = 1 hour of help. You currently have{' '}
            <strong>{currentUser.timeCreditBalance} Time Credits</strong> in your wallet.
          </p>
        </div>

        {/* Description Section */}
        <div>
          <h2 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-1.5">
            About this skill exchange
          </h2>
          <p className="text-xs text-stone-700 leading-relaxed whitespace-pre-line">
            {listing.description}
          </p>
        </div>

        {/* Tools & Materials Provided */}
        {listing.toolsProvided && listing.toolsProvided.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-stone-600" />
              <span>Tools & Gear Provided by {poster.name.split(' ')[0]}</span>
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {listing.toolsProvided.map((tool, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-xl bg-white border border-stone-200 flex items-center gap-2 text-xs text-stone-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="truncate">{tool}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Availability & Location */}
        <div className="p-3.5 bg-white rounded-2xl border border-stone-200 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-stone-700">
            <Calendar className="w-4 h-4 text-emerald-800 shrink-0" />
            <div>
              <span className="font-semibold text-stone-900">Availability: </span>
              <span>{listing.availability}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-stone-700">
            <MapPin className="w-4 h-4 text-emerald-800 shrink-0" />
            <div>
              <span className="font-semibold text-stone-900">Exchange Radius: </span>
              <span>
                {listing.locationArea} (within {formatDistanceKm(listing.distanceMiles + 0.5)} in-person)
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-stone-700">
            <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
            <div>
              <span className="font-semibold text-stone-900">Safety & Trust: </span>
              <span>Verified community identity with background check</span>
            </div>
          </div>
        </div>

        {/* Poster's other skills */}
        <div>
          <h2 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
            Other skills {poster.name.split(' ')[0]} offers
          </h2>
          <div className="space-y-1.5">
            {poster.skillsOffered.map((sk, i) => (
              <div
                key={i}
                className="py-1.5 px-3 bg-stone-100/90 rounded-xl text-xs font-medium text-stone-800 flex items-center justify-between"
              >
                <span>{sk}</span>
                <span className="text-[10px] font-bold text-emerald-800">1 cr/hr</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom CTA Bar (Pattern 3 / Layout C compliant) */}
      <div className="absolute bottom-0 left-0 right-0 p-3.5 bg-stone-50/95 backdrop-blur-md border-t border-stone-200 z-30 flex items-center gap-3">
        <div className="shrink-0">
          <span className="text-[10px] text-stone-500 font-semibold uppercase block">Cost</span>
          <span className="text-sm font-black font-mono text-emerald-950">
            {listing.creditCost} Credits
          </span>
        </div>

        <button
          type="button"
          onClick={handleRequestClick}
          disabled={requestedSuccess}
          className="flex-1 py-3 px-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md shadow-emerald-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:bg-emerald-700"
        >
          {requestedSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Opening Request Thread...</span>
            </>
          ) : (
            <>
              <MessageSquare className="w-4 h-4" />
              <span>Request This Skill ({listing.creditCost} Cr)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
