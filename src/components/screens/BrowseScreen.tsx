import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Star,
  Clock,
  MapPin,
  Sparkles,
  Check
} from 'lucide-react';
import { SkillListing, SkillCategory, UserProfile } from '../../types';
import { formatDistanceKm } from '../../utils/distance';

interface BrowseScreenProps {
  listings: SkillListing[];
  onSelectListing: (listing: SkillListing) => void;
  onSelectUser: (user: UserProfile) => void;
}

export const BrowseScreen: React.FC<BrowseScreenProps> = ({
  listings,
  onSelectListing,
  onSelectUser
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [typeFilter, setTypeFilter] = useState<'all' | 'offer' | 'request'>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  const categories = [
    'All',
    'Home & DIY',
    'Garden & Outdoor',
    'Cooking & Baking',
    'Languages',
    'Tech & Digital',
    'Arts & Crafts',
    'Music & Audio',
    'Wellness & Fitness'
  ];

  const filtered = listings.filter((item) => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
    if (typeFilter !== 'all' && item.type !== typeFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="h-full flex flex-col bg-stone-100 text-stone-900 select-none overflow-y-auto">
      {/* Sticky Browse Header */}
      <div className="sticky top-0 bg-stone-50/95 backdrop-blur-md border-b border-stone-200 px-4 pt-3 pb-2 z-10">
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <h1 className="text-lg font-black text-stone-900 tracking-tight">Explore Skills</h1>
            <p className="text-[11px] text-stone-500 font-medium">
              Time-banking exchange in San Francisco Bay
            </p>
          </div>
          <div className="flex items-center gap-1 bg-stone-200/80 p-0.5 rounded-xl">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative mb-2.5">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search any skill or hobby..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-stone-300 bg-white text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 shadow-xs"
          />
        </div>

        {/* Horizontal Scrollable Category Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar -mx-4 px-4">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`py-1 px-3 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-stone-200/80 hover:bg-stone-300 text-stone-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Sub-filters (Type filter pills) */}
        <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setTypeFilter('all')}
              className={`px-2.5 py-0.5 rounded-lg text-[11px] font-semibold transition-colors ${
                typeFilter === 'all'
                  ? 'bg-stone-800 text-white'
                  : 'text-stone-600 hover:bg-stone-200'
              }`}
            >
              All Types
            </button>
            <button
              type="button"
              onClick={() => setTypeFilter('offer')}
              className={`px-2.5 py-0.5 rounded-lg text-[11px] font-semibold transition-colors ${
                typeFilter === 'offer'
                  ? 'bg-emerald-800 text-white'
                  : 'text-stone-600 hover:bg-stone-200'
              }`}
            >
              Offered
            </button>
            <button
              type="button"
              onClick={() => setTypeFilter('request')}
              className={`px-2.5 py-0.5 rounded-lg text-[11px] font-semibold transition-colors ${
                typeFilter === 'request'
                  ? 'bg-amber-800 text-white'
                  : 'text-stone-600 hover:bg-stone-200'
              }`}
            >
              Wanted
            </button>
          </div>

          <span className="text-[11px] text-stone-500 font-medium">
            {filtered.length} matches
          </span>
        </div>
      </div>

      {/* Main Results Feed */}
      <div className="p-4 space-y-3 pb-24">
        {filtered.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-stone-200">
            <p className="font-bold text-sm text-stone-800">No matching skills found</p>
            <p className="text-xs text-stone-500 mt-1">
              Try switching back to "All" categories or clearing your search term.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setTypeFilter('all');
              }}
              className="mt-3 px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'list' ? (
          filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectListing(item)}
              className="bg-white rounded-2xl border border-stone-200 p-3.5 shadow-xs hover:border-emerald-700/50 cursor-pointer transition-all flex gap-3 group"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] text-stone-500 font-semibold uppercase tracking-wider mb-0.5">
                    <span
                      className={
                        item.type === 'offer' ? 'text-emerald-800 font-bold' : 'text-amber-800 font-bold'
                      }
                    >
                      {item.type === 'offer' ? 'Offer' : 'Wanted'}
                    </span>
                    <span>·</span>
                    <span>{item.category}</span>
                  </div>
                  <h3 className="font-bold text-xs text-stone-900 leading-snug line-clamp-1 group-hover:text-emerald-800">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <div className="flex items-center gap-1 text-stone-500 font-medium">
                    <MapPin className="w-3 h-3 text-emerald-800" />
                    <span>{formatDistanceKm(item.distanceMiles)} away</span>
                  </div>
                  <span className="font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {item.creditCost} {item.creditCost === 1 ? 'Credit' : 'Credits'}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectListing(item)}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:border-emerald-700/50 cursor-pointer transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="h-28 w-full bg-stone-100 relative">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute bottom-2 right-2 bg-black/60 text-white backdrop-blur-xs text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {item.creditCost} cr
                    </span>
                  </div>
                  <div className="p-2.5">
                    <span className="text-[9px] font-bold text-emerald-800 uppercase tracking-wider block">
                      {item.category}
                    </span>
                    <h3 className="font-bold text-xs text-stone-900 leading-tight mt-0.5 line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="p-2.5 pt-0 flex items-center justify-between text-[10px] text-stone-500 border-t border-stone-100">
                  <span>{formatDistanceKm(item.distanceMiles)}</span>
                  <span className="font-semibold text-emerald-800">Details &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
