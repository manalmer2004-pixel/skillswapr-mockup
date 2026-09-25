import React from 'react';
import { Wifi, Signal, BatteryCharging } from 'lucide-react';

interface AndroidStatusBarProps {
  dark?: boolean;
  time?: string;
}

export const AndroidStatusBar: React.FC<AndroidStatusBarProps> = ({
  dark = true,
  time = '9:41'
}) => {
  return (
    <div
      className={`h-7 px-5 flex items-center justify-between text-xs font-semibold select-none z-30 transition-colors ${
        dark ? 'text-stone-800' : 'text-stone-100'
      }`}
    >
      <div className="flex items-center gap-1.5 pl-1">
        <span>{time}</span>
      </div>

      {/* Camera punch hole representation */}
      <div className="w-3.5 h-3.5 rounded-full bg-black ring-1 ring-stone-800/40 shadow-inner -translate-x-1" />

      <div className="flex items-center gap-2 pr-1">
        <Signal className="w-3.5 h-3.5 stroke-[2.2]" />
        <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />
        <div className="flex items-center gap-0.5">
          <span className="text-[10px] font-mono">92%</span>
          <BatteryCharging className="w-3.5 h-3.5 stroke-[2.2]" />
        </div>
      </div>
    </div>
  );
};

export const AndroidNavBar: React.FC<{ dark?: boolean }> = ({ dark = true }) => {
  return (
    <div className="h-6 flex items-center justify-center select-none z-30">
      <div
        className={`w-32 h-1 rounded-full transition-colors ${
          dark ? 'bg-stone-400/80 hover:bg-stone-500' : 'bg-stone-500/80 hover:bg-stone-400'
        }`}
      />
    </div>
  );
};
