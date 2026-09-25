import React, { useState } from 'react';
import {
  ArrowLeft,
  Clock,
  Sparkles,
  MapPin,
  Wrench,
  Check,
  AlertCircle
} from 'lucide-react';
import { SkillListing, SkillCategory, UserProfile } from '../../types';
import woodworkImg from '../../assets/images/hero_skill_woodwork_1790249188536.jpg';

interface CreateListingScreenProps {
  currentUser: UserProfile;
  onBack: () => void;
  onPublishListing: (newListing: Partial<SkillListing>) => void;
}

export const CreateListingScreen: React.FC<CreateListingScreenProps> = ({
  currentUser,
  onBack,
  onPublishListing
}) => {
  const [listingType, setListingType] = useState<'offer' | 'request'>('offer');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<SkillCategory>('Home & DIY');
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState<number>(1.5);
  const [toolsInput, setToolsInput] = useState('Safety gear, Hand tools');
  const [locationArea, setLocationArea] = useState('Mission District, SF');
  const [availability, setAvailability] = useState('Weekends & Evenings');
  const [errors, setErrors] = useState<string | null>(null);

  const categories: SkillCategory[] = [
    'Home & DIY',
    'Garden & Outdoor',
    'Cooking & Baking',
    'Languages',
    'Tech & Digital',
    'Arts & Crafts',
    'Music & Audio',
    'Wellness & Fitness'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrors('Please enter a listing title.');
      return;
    }
    if (!description.trim()) {
      setErrors('Please write a brief description for your neighbors.');
      return;
    }

    const tools = toolsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    onPublishListing({
      userId: currentUser.id,
      type: listingType,
      title: title.trim(),
      category,
      description: description.trim(),
      imageUrl: woodworkImg,
      estimatedHours: hours,
      creditCost: hours, // 1 hour = 1 credit in time-banking model
      locationArea,
      distanceMiles: 0.1,
      availability,
      toolsProvided: tools,
      createdAt: 'Just now',
      saved: false
    });
  };

  return (
    <div className="h-full flex flex-col justify-between bg-stone-50 text-stone-900 select-none overflow-y-auto">
      <div>
        {/* Top App Bar */}
        <div className="sticky top-0 bg-stone-50/95 backdrop-blur-md border-b border-stone-200 px-4 py-2.5 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onBack}
              className="w-8 h-8 rounded-full hover:bg-stone-200 flex items-center justify-center text-stone-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="text-sm font-bold text-stone-900">
              {listingType === 'offer' ? 'Offer a Community Skill' : 'Request Neighbor Help'}
            </h1>
          </div>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
            Time-Bank
          </span>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Segmented Toggle (Material You SingleChoiceSegmentedButtonRow) */}
          <div className="p-1 bg-stone-200/80 rounded-2xl flex items-center">
            <button
              type="button"
              onClick={() => setListingType('offer')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                listingType === 'offer'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Offer a Skill (Earn Credits)
            </button>
            <button
              type="button"
              onClick={() => setListingType('request')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                listingType === 'request'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Request a Skill (Spend Credits)
            </button>
          </div>

          {errors && (
            <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errors}</span>
            </div>
          )}

          {/* Skill Title */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Title of Skill {listingType === 'offer' ? 'Offered' : 'Needed'}
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setErrors(null);
              }}
              placeholder={
                listingType === 'offer'
                  ? 'e.g. Knife Sharpening & Whetstone Basics'
                  : 'e.g. Need help assembling IKEA wardrobe'
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as SkillCategory)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Estimated Time / Credit Value Slider */}
          <div className="p-3.5 bg-emerald-50/80 rounded-2xl border border-emerald-200/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-800" />
                <span>Estimated Time = Time Credits</span>
              </span>
              <span className="text-sm font-black font-mono text-emerald-950 bg-emerald-200/60 px-2 py-0.5 rounded-lg">
                {hours} {hours === 1 ? 'Credit' : 'Credits'} ({hours} hrs)
              </span>
            </div>

            <input
              type="range"
              min={0.5}
              max={4}
              step={0.5}
              value={hours}
              onChange={(e) => setHours(parseFloat(e.target.value))}
              className="w-full mt-3 accent-emerald-800 cursor-pointer"
            />

            <div className="flex justify-between text-[10px] text-stone-500 font-mono mt-1">
              <span>0.5 hr</span>
              <span>1.0 hr</span>
              <span>2.0 hrs</span>
              <span>3.0 hrs</span>
              <span>4.0 hrs</span>
            </div>

            <p className="text-[11px] text-emerald-800 mt-2">
              Time-banking rule: 1 hour = 1 credit. Every neighbor's time is valued equally regardless of profession.
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Description & Details
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setErrors(null);
              }}
              placeholder="What will you do? What experience do you have? Where can you meet?"
              className="w-full p-3 rounded-xl border border-stone-300 bg-white text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 resize-none"
            />
          </div>

          {/* Tools / Equipment */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
              <Wrench className="w-3.5 h-3.5 text-stone-500" />
              <span>Tools & Gear Provided (comma separated)</span>
            </label>
            <input
              type="text"
              value={toolsInput}
              onChange={(e) => setToolsInput(e.target.value)}
              placeholder="e.g. Drill, Level, Safety goggles, Extension cord"
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          {/* Availability */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Typical Availability
            </label>
            <input
              type="text"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              placeholder="e.g. Saturdays 10am-2pm, or Tuesday evenings"
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs tracking-wide shadow-md shadow-emerald-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>Publish {listingType === 'offer' ? 'Offer' : 'Request'} to Community</span>
          </button>
        </form>
      </div>
    </div>
  );
};
