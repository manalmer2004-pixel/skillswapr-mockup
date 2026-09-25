import React from 'react';
import { X, Clock, RefreshCw, HeartHandshake, ShieldCheck } from 'lucide-react';

interface TimeBankingExplainModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TimeBankingExplainModal: React.FC<TimeBankingExplainModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-sm bg-stone-50 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border border-stone-200 text-stone-900 max-h-[90%] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base text-stone-900">How Time Credits Work</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-xs text-stone-600 leading-relaxed">
          <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex items-start gap-3">
            <Clock className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-emerald-950 text-sm">1 Hour = 1 Credit</p>
              <p className="mt-0.5 text-stone-700">
                All skills are valued equally. 1 hour of carpentry equals 1 hour of language practice or 1 hour of tax help.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-stone-100 rounded-2xl border border-stone-200 flex items-start gap-3">
            <RefreshCw className="w-5 h-5 text-teal-800 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-stone-900 text-sm">Indirect Multi-User Exchange</p>
              <p className="mt-0.5 text-stone-700">
                You don't need a direct 1-to-1 trade. Earn credits by helping Carlos, then spend your credits having Priya teach you cooking!
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-stone-100 rounded-2xl border border-stone-200 flex items-start gap-3">
            <HeartHandshake className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-stone-900 text-sm">No Money Exchanged</p>
              <p className="mt-0.5 text-stone-700">
                Everything is powered purely by neighborly solidarity and mutual support. Everyone starts with 1 complimentary community credit upon profile setup!
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-stone-100 rounded-2xl border border-stone-200 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-800 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-stone-900 text-sm">Verified Reviews & Safety</p>
              <p className="mt-0.5 text-stone-700">
                Credits are transferred only after both parties mark the swap completed and submit their ratings.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-medium text-xs tracking-wide transition-colors"
        >
          Got it, let's swap!
        </button>
      </div>
    </div>
  );
};
