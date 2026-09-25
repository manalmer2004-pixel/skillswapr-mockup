import React from 'react';
import { AndroidStatusBar, AndroidNavBar } from './AndroidStatusBar';

interface AndroidFrameProps {
  children: React.ReactNode;
  darkStatus?: boolean;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({
  children,
  darkStatus = true
}) => {
  return (
    <div className="relative mx-auto my-auto w-full max-w-[395px] h-[812px] bg-stone-950 rounded-[48px] p-3 shadow-2xl ring-1 ring-stone-700/80 flex flex-col justify-between select-none">
      {/* Phone outer frame borders & speaker slit */}
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-14 h-1 rounded-full bg-stone-800 z-40" />

      {/* Screen Container with edge-to-edge radius */}
      <div className="w-full h-full bg-stone-100 rounded-[38px] overflow-hidden flex flex-col relative">
        {/* Status Bar */}
        <AndroidStatusBar dark={darkStatus} />

        {/* Screen Content Viewport */}
        <div className="flex-1 overflow-hidden relative flex flex-col">
          {children}
        </div>

        {/* Android Gesture Bar */}
        <div className="bg-stone-50/95 border-t border-stone-200/50">
          <AndroidNavBar dark={darkStatus} />
        </div>
      </div>
    </div>
  );
};
