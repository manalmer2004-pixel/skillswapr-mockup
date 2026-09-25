import React, { useState } from 'react';
import { Code, Copy, Check, X } from 'lucide-react';
import { COMPOSE_SNIPPETS } from '../../data/composeSnippets';
import { ScreenId } from '../../types';

interface ComposeCodeDrawerProps {
  currentScreen: ScreenId;
  isOpen: boolean;
  onClose: () => void;
}

export const ComposeCodeDrawer: React.FC<ComposeCodeDrawerProps> = ({
  currentScreen,
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState(false);
  const snippet = COMPOSE_SNIPPETS[currentScreen] || COMPOSE_SNIPPETS['home'];

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-end">
      <div className="w-full max-w-xl h-full bg-stone-900 border-l border-stone-800 text-stone-100 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="p-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/80">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-950 border border-emerald-700/50 text-emerald-400 flex items-center justify-center">
              <Code className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-100">Android Jetpack Compose Inspector</h3>
              <p className="text-[11px] text-emerald-400 font-mono">{snippet.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-medium text-stone-200 border border-stone-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Kotlin</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4 bg-stone-950/40 border-b border-stone-800 text-xs text-stone-400">
          Ready to drop into Android Studio. Implements Google Material Design 3 (<code className="text-emerald-300 font-mono">androidx.compose.material3</code>), dynamic color theming, and edge-to-edge layout.
        </div>

        <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed text-stone-300 bg-stone-950 select-text">
          <pre className="whitespace-pre">{snippet.code}</pre>
        </div>

        <div className="p-3 border-t border-stone-800 bg-stone-950 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-medium transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
