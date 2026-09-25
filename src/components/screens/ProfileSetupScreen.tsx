import React, { useState } from 'react';
import { Camera, MapPin, Check, Plus, Sparkles, ArrowRight } from 'lucide-react';
import { ScreenId, SkillCategory } from '../../types';
import { LocationPermissionDialog } from '../common/LocationPermissionDialog';

interface ProfileSetupScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onFinishSetup: (profileData: {
    avatar: string;
    location: string;
    firstSkill: string;
    category: SkillCategory;
  }) => void;
}

export const ProfileSetupScreen: React.FC<ProfileSetupScreenProps> = ({
  onNavigate,
  onFinishSetup
}) => {
  const [photoSelected] = useState<string>('');
  const [name, setName] = useState('User');
  const [location, setLocation] = useState('Nairobi, Kenya');
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const [firstSkill, setFirstSkill] = useState('Basic First Aid Training');
  const [category, setCategory] = useState<SkillCategory>('Health');
  const [skillDesc, setSkillDesc] = useState(
    'I can teach practical first aid, wound care, emergency response, and basic health and hygiene practices.'
  );
  const [step, setStep] = useState<1 | 2>(1);

  const categories: SkillCategory[] = [
    'Water & Sanitation',
    'Health',
    'Solar & Energy',
    'Farming',
    'Mechanical',
    'Cooking & Baking'
  ];

  const handleGrantLocation = (precision: 'approximate' | 'precise') => {
    setShowLocationDialog(false);
    setLocation('Nairobi, Kenya (Verified Local)');
  };

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    onFinishSetup({
      avatar: photoSelected,
      location,
      firstSkill,
      category
    });
    onNavigate('home');
  };

  return (
    <div className="h-full flex flex-col justify-between bg-stone-50 text-stone-900 p-6 select-none overflow-y-auto relative">
      <LocationPermissionDialog
        isOpen={showLocationDialog}
        onGrant={handleGrantLocation}
        onDeny={() => setShowLocationDialog(false)}
      />

      <div>
        {/* Progress Header */}
        <div className="flex items-center justify-between pt-1 mb-4">
          <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
            Profile Setup · Step {step} of 2
          </span>
          <span className="text-xs font-semibold text-emerald-900 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            +1 Welcome Credit
          </span>
        </div>

        {step === 1 ? (
          <div>
            <h2 className="text-2xl font-black text-stone-900 tracking-tight">
              Create your neighborhood presence
            </h2>
            <p className="text-xs text-stone-600 mt-1 mb-6">
              A friendly photo and neighborhood area help fellow swappers recognize you in person.
            </p>

            {/* Avatar Uploader Simulator */}
            <div className="flex flex-col items-center justify-center my-4">
              <div className="relative">
                {photoSelected ? (
                    <img
                      src={photoSelected}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover ring-4 ring-emerald-100 shadow-md"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-stone-200 ring-4 ring-emerald-100 shadow-md flex items-center justify-center text-3xl font-black text-stone-500">
                      U
                    </div>
                )}
                <button
                  type="button"
                  onClick={() => alert('Photo gallery selector simulation')}
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center shadow-md hover:bg-emerald-900 transition-colors"
                  aria-label="Change photo"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <span className="text-[11px] text-stone-500 mt-2 font-medium">
                Tap camera to change photo
              </span>
            </div>

            <div className="space-y-4 mt-6">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-stone-700">
                    Neighborhood / Area
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowLocationDialog(true)}
                    className="text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    Use Device GPS
                  </button>
                </div>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Nairobi, Kenya"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
                <p className="text-[11px] text-stone-500 mt-1">
                  We show approximate neighborhood radius, never your exact house address.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full mt-8 py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs tracking-wide shadow-md shadow-emerald-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Next: Add First Skill Offered</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-black text-stone-900 tracking-tight">
              What skill can you offer?
            </h2>
            <p className="text-xs text-stone-600 mt-1 mb-5">
              It doesn't have to be professional! First aid, water storage, farming, solar setup, and transport repair all help strengthen a community.
            </p>

            <form onSubmit={handleComplete} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as SkillCategory)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 bg-white text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Skill Title
                </label>
                <input
                  type="text"
                  required
                  value={firstSkill}
                  onChange={(e) => setFirstSkill(e.target.value)}
                  placeholder="e.g. Water Filter Maintenance"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={3}
                  value={skillDesc}
                  onChange={(e) => setSkillDesc(e.target.value)}
                  placeholder="What will you help with, and what should the neighbor know?"
                  className="w-full p-3 rounded-xl border border-stone-300 bg-white text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 resize-none"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center shrink-0 font-bold text-xs">
                  ⚡
                </div>
                <div className="text-xs text-emerald-950">
                  <p className="font-bold">1 Hour Help = 1 Time Credit</p>
                  <p className="text-[11px] text-emerald-700 mt-0.5">
                    You earn 1 credit for each hour helping neighbors.
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 rounded-xl border border-stone-300 text-stone-700 font-semibold text-xs hover:bg-stone-100 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs tracking-wide shadow-md shadow-emerald-900/20 active:scale-[0.98] transition-all"
                >
                  Finish & Enter skillswapr
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <div className="pt-2 text-center">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="text-xs text-stone-500 hover:text-stone-800 font-medium"
        >
          Skip setup for now
        </button>
      </div>
    </div>
  );
};
