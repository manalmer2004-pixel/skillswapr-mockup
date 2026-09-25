import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Clock,
  Star,
  SlidersHorizontal,
  Bookmark,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { SkillListing, UserProfile, ScreenId } from '../../types';
import { formatDistanceKm } from '../../utils/distance';

interface HomeScreenProps {
  user: UserProfile;
  listings: SkillListing[];
  onSelectListing: (listing: SkillListing) => void;
  onSelectUser: (user: UserProfile) => void;
  onOpenTimeExplain: () => void;
  onNavigate: (screen: ScreenId) => void;
  onToggleSaveListing: (listingId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  listings,
  onSelectListing,
  onSelectUser,
  onOpenTimeExplain,
  onNavigate,
  onToggleSaveListing
}) => {
  const [distanceFilter, setDistanceFilter] = useState<number>(2.0); // max miles in stored data
  const [searchQuery, setSearchQuery] = useState('');

  // Filter listings by search query and distance radius
  const filteredListings = listings
    .filter((l) => l.distanceMiles <= distanceFilter)
    .filter((l) =>
      searchQuery
        ? l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.description.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    )
    .sort((a, b) => a.distanceMiles - b.distanceMiles);

  return (
    <div className="h-full flex flex-col bg-stone-100 text-stone-900 select-none overflow-y-auto">
      {/* Material Design 3 Top App Bar */}
      <div className="sticky top-0 bg-stone-50/95 backdrop-blur-md border-b border-stone-200/80 px-4 pt-2 pb-3 z-10 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => onSelectUser(user)}
              className="relative rounded-full p-0.5 ring-2 ring-emerald-700/40 shadow-xs active:scale-95 transition-transform"
              aria-label="View My Profile"
            >
              <span className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center text-sm font-black">
                {user.name.charAt(0)}
              </span>
            </button>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-base text-emerald-950 tracking-tight">skillswapr</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-stone-500 font-medium">
                <MapPin className="w-3 h-3 text-emerald-800" />
                <span>Mission District · {formatDistanceKm(distanceFilter)}</span>
              </div>
            </div>
          </div>

          {/* Time Credit Balance Pill (Wallet currency style) */}
          <button
            type="button"
            onClick={onOpenTimeExplain}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-emerald-100/90 hover:bg-emerald-200/80 border border-emerald-300/50 text-emerald-950 shadow-xs transition-all active:scale-95"
            title="Click to see how Time Credits work"
          >
            <Clock className="w-3.5 h-3.5 text-emerald-800 stroke-[2.5]" />
            <span className="text-xs font-bold font-mono tracking-tight">
              {user.timeCreditBalance.toFixed(1)}
            </span>
            <span className="text-[10px] font-semibold text-emerald-800 uppercase">hrs</span>
          </button>
        </div>

        {/* Quick Search Bar */}
        <div className="mt-3 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search woodworking, Spanish, bike repair..."
            className="w-full pl-10 pr-10 py-2 rounded-2xl border border-stone-300/90 bg-white text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-700 text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Quick Radius Filter Selector */}
        <div className="flex items-center justify-between mt-2.5 text-[11px]">
          <span className="text-stone-500 font-medium flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3" /> Radius:
          </span>
          <div className="flex items-center gap-1 bg-stone-200/70 p-0.5 rounded-lg">
            {[1.0, 2.0, 5.0].map((miles) => (
              <button
                key={miles}
                type="button"
                onClick={() => setDistanceFilter(miles)}
                className={`px-2 py-0.5 rounded-md font-semibold transition-all ${
                  distanceFilter === miles
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                &lt; {formatDistanceKm(miles)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Community Mutual Aid Banner */}
      <div className="mx-4 mt-3 p-3 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-800 text-white shadow-xs">
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-2">
            <div className="flex items-center gap-1.5 text-emerald-200 text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Time-Banking Rule</span>
            </div>
            <p className="text-xs font-semibold mt-0.5 leading-snug">
              1 hour of help = 1 time credit.
            </p>
            <p className="text-[11px] text-emerald-100/90 mt-0.5">
              No cash exchanged. Help anyone, spend with anyone.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenTimeExplain}
            className="px-2.5 py-1 rounded-xl bg-white/20 hover:bg-white/30 text-white text-[10px] font-bold whitespace-nowrap transition-colors"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Nearby Feed Header */}
      <div className="px-4 pt-3 pb-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-stone-900">Nearby in your neighborhood</h2>
          <span className="text-xs text-stone-500 font-semibold font-mono">
            ({filteredListings.length})
          </span>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('browse')}
          className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-0.5"
        >
          View all <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Listings List */}
      <div className="p-4 pt-1 space-y-3.5 pb-20">
        {filteredListings.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-stone-200 p-6">
            <p className="font-bold text-sm text-stone-800">No skill listings in this radius</p>
            <p className="text-xs text-stone-500 mt-1">
              Try expanding your distance filter to {formatDistanceKm(5)} or changing search keywords.
            </p>
            <button
              type="button"
              onClick={() => setDistanceFilter(5.0)}
              className="mt-3 px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-semibold"
            >
              Expand to {formatDistanceKm(5)}
            </button>
          </div>
        ) : (
          filteredListings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-shadow group"
            >
              {/* Card Image Banner */}
              <div
                className="relative h-40 w-full bg-stone-200 cursor-pointer overflow-hidden"
                onClick={() => onSelectListing(listing)}
              >
                <img
                  src={listing.imageUrl}
                  alt={listing.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Badges in Image */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md uppercase tracking-wider ${
                      listing.type === 'offer'
                        ? 'bg-emerald-900/85 text-emerald-100 border border-emerald-400/30'
                        : 'bg-amber-900/85 text-amber-100 border border-amber-400/30'
                    }`}
                  >
                    {listing.type === 'offer' ? 'Skill Offered' : 'Skill Wanted'}
                  </span>
                  <span className="text-[10px] font-semibold text-stone-100 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full">
                    {listing.category}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSaveListing(listing.id);
                  }}
                  aria-label="Save listing"
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                >
                  <Bookmark
                    className={`w-4 h-4 ${
                      listing.saved ? 'fill-amber-400 text-amber-400' : 'text-white'
                    }`}
                  />
                </button>

                {/* Distance & Time Credit Pill in Banner Bottom */}
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
                  <div className="flex items-center gap-1 drop-shadow-sm text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{formatDistanceKm(listing.distanceMiles)} away</span>
                    <span className="opacity-70">· {listing.locationArea}</span>
                  </div>
                  <div className="bg-white/90 text-emerald-950 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-xs flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-700" />
                    <span>
                      {listing.creditCost} {listing.creditCost === 1 ? 'Credit' : 'Credits'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4">
                <h3
                  onClick={() => onSelectListing(listing)}
                  className="font-bold text-sm text-stone-900 leading-snug cursor-pointer hover:text-emerald-800 transition-colors line-clamp-2"
                >
                  {listing.title}
                </h3>

                <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                  {listing.description}
                </p>

                {/* Poster Info Row & Action */}
                <div className="mt-3.5 pt-3 border-t border-stone-100 flex items-center justify-between">
                  {/* Tappable Avatar & Poster Rating */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectListing(listing);
                    }}
                    className="flex items-center gap-2 group/user text-left"
                  >
                    <div className="relative rounded-full ring-2 ring-stone-200/90 group-hover/user:ring-emerald-700 transition-all">
                      <img
                        src={listing.imageUrl}
                        alt="Poster"
                        className="w-7 h-7 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-stone-800 group-hover/user:text-emerald-900 transition-colors block leading-tight">
                        {listing.userId === 'user_carlos'
                          ? 'Carlos Mendez'
                          : listing.userId === 'user_elena'
                          ? 'Elena Rostova'
                          : listing.userId === 'user_david'
                          ? 'David Kim'
                          : listing.userId === 'user_priya'
                          ? 'Priya Sharma'
                          : 'Community Neighbor'}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] text-stone-500">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                        <span className="font-bold text-stone-700">4.9</span>
                        <span>· Verified</span>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectListing(listing)}
                    className="py-1.5 px-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold shadow-xs active:scale-95 transition-all"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
