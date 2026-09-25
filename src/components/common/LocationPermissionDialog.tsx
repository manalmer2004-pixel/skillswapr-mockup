import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationPermissionDialogProps {
  isOpen: boolean;
  onGrant: (precision: 'approximate' | 'precise') => void;
  onDeny: () => void;
}

export const LocationPermissionDialog: React.FC<LocationPermissionDialogProps> = ({
  isOpen,
  onGrant,
  onDeny
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-50 flex items-center justify-center p-6 animate-in fade-in duration-200">
      <div className="w-full max-w-[320px] bg-stone-50 rounded-3xl p-6 shadow-2xl border border-stone-200 text-stone-900">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-6 h-6" />
        </div>

        <h3 className="text-center text-lg font-bold tracking-tight text-stone-900">
          Allow <span className="text-emerald-800">skillswapr</span> to access this device's location?
        </h3>

        <p className="text-xs text-stone-600 text-center mt-2 leading-relaxed">
          skillswapr prioritizes skill exchanges within walking or biking distance in your local neighborhood.
        </p>

        <div className="mt-6 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => onGrant('precise')}
            className="w-full py-3 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-stone-50 font-medium text-xs tracking-wide transition-colors"
          >
            While using the app
          </button>
          <button
            type="button"
            onClick={() => onGrant('approximate')}
            className="w-full py-2.5 px-4 rounded-xl bg-stone-200/80 hover:bg-stone-300 text-stone-800 font-medium text-xs transition-colors"
          >
            Only this time
          </button>
          <button
            type="button"
            onClick={onDeny}
            className="w-full py-2 px-4 rounded-xl text-stone-500 hover:text-stone-800 font-medium text-xs transition-colors"
          >
            Don't allow
          </button>
        </div>
      </div>
    </div>
  );
};
