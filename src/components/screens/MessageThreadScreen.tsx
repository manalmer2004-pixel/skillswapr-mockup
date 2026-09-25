import React, { useState } from 'react';
import {
  ArrowLeft,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  ShieldCheck,
  Star,
  Sparkles,
  Phone,
  Info
} from 'lucide-react';
import { RequestThread, UserProfile, ScreenId } from '../../types';

interface MessageThreadScreenProps {
  thread: RequestThread;
  currentUser: UserProfile;
  onBack: () => void;
  onSelectUser: (user: UserProfile) => void;
  onAcceptRequest: (threadId: string) => void;
  onDeclineRequest: (threadId: string) => void;
  onSendMessage: (threadId: string, text: string) => void;
  onTriggerCompletion: (thread: RequestThread) => void;
  allThreads: RequestThread[];
  onSelectThread: (thread: RequestThread) => void;
}

export const MessageThreadScreen: React.FC<MessageThreadScreenProps> = ({
  thread,
  currentUser,
  onBack,
  onSelectUser,
  onAcceptRequest,
  onDeclineRequest,
  onSendMessage,
  onTriggerCompletion,
  allThreads,
  onSelectThread
}) => {
  const [inputText, setInputText] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'inbox'>('chat');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(thread.id, inputText.trim());
    setInputText('');
  };

  return (
    <div className="h-full flex flex-col bg-stone-100 text-stone-900 select-none overflow-hidden">
      {/* Top App Bar with Partner Header */}
      <div className="bg-stone-50 border-b border-stone-200 px-4 py-2.5 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              if (activeTab === 'chat') {
                setActiveTab('inbox');
              } else {
                onBack();
              }
            }}
            className="w-8 h-8 rounded-full hover:bg-stone-200 flex items-center justify-center text-stone-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {activeTab === 'chat' ? (
            <div
              onClick={() => onSelectUser(thread.otherUser)}
              className="flex items-center gap-2 cursor-pointer group"
            >
              {/* Tappable Avatar with ring */}
              <div className="relative rounded-full ring-2 ring-emerald-700/60 shadow-xs">
                <img
                  src={thread.otherUser.avatarUrl}
                  alt={thread.otherUser.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-1 ring-white" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-xs text-stone-900 group-hover:text-emerald-800 transition-colors">
                    {thread.otherUser.name}
                  </span>
                  <span className="text-[10px] text-stone-500 font-mono">
                    {thread.otherUser.handle}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-stone-500">
                  <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-500" />
                  <span>{thread.otherUser.rating}</span>
                  <span>·</span>
                  <span>{thread.otherUser.location}</span>
                </div>
              </div>
            </div>
          ) : (
            <h1 className="text-sm font-bold text-stone-900">Exchange Conversations</h1>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {activeTab === 'chat' ? (
            <button
              type="button"
              onClick={() => setActiveTab('inbox')}
              className="text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 px-2.5 py-1 rounded-lg hover:bg-emerald-100/50"
            >
              All Requests ({allThreads.length})
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setActiveTab('chat')}
              className="text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 px-2.5 py-1 rounded-lg hover:bg-emerald-100/50"
            >
              Active Chat
            </button>
          )}
        </div>
      </div>

      {activeTab === 'inbox' ? (
        /* Conversations / Requests Inbox View */
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 pb-20">
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider px-1">
            Active Threads & Requests
          </p>
          {allThreads.map((th) => (
            <div
              key={th.id}
              onClick={() => {
                onSelectThread(th);
                setActiveTab('chat');
              }}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer bg-white shadow-xs ${
                th.id === thread.id
                  ? 'border-emerald-700 ring-1 ring-emerald-700'
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <img
                    src={th.otherUser.avatarUrl}
                    alt={th.otherUser.name}
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-stone-200"
                  />
                  <div>
                    <span className="font-bold text-xs text-stone-900">{th.otherUser.name}</span>
                    <span className="text-[10px] text-stone-500 block leading-tight">
                      {th.listingTitle}
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    th.status === 'pending'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : th.status === 'accepted'
                      ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                      : 'bg-stone-200 text-stone-700'
                  }`}
                >
                  {th.status}
                </span>
              </div>

              <p className="text-xs text-stone-600 line-clamp-1 italic pl-10">"{th.lastMessage}"</p>

              <div className="flex items-center justify-between text-[10px] text-stone-400 pl-10 mt-1">
                <span>Proposed: {th.proposedDate}</span>
                <span className="font-mono font-bold text-emerald-900">
                  {th.creditsProposed} credits
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Chat View with Top Pending Request Card */
        <div className="flex-1 flex flex-col justify-between overflow-hidden">
          {/* Scrollable Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-4">
            {/* Top Request Banner (Specified in Core Feature 8) */}
            <div className="bg-white rounded-2xl border border-stone-200/90 p-3.5 shadow-xs">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                    Skill Exchange Request
                  </span>
                  <h3 className="font-bold text-xs text-stone-900 leading-snug mt-0.5">
                    {thread.listingTitle}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-1">
                    <Clock className="w-3 h-3 text-stone-400" />
                    <span>{thread.proposedDate}</span>
                    <span>·</span>
                    <span className="font-bold text-emerald-900">
                      ⚡ {thread.creditsProposed} Time Credits
                    </span>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    thread.status === 'pending'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : thread.status === 'accepted'
                      ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                      : 'bg-stone-200 text-stone-700'
                  }`}
                >
                  {thread.status}
                </span>
              </div>

              {/* Accept / Decline Action Buttons (When Pending) */}
              {thread.status === 'pending' ? (
                <div className="mt-3 pt-3 border-t border-stone-100 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onDeclineRequest(thread.id)}
                    className="flex-1 py-2 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <XCircle className="w-3.5 h-3.5 text-stone-500" />
                    <span>Decline</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onAcceptRequest(thread.id)}
                    className="flex-1 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-all"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Accept Request</span>
                  </button>
                </div>
              ) : thread.status === 'accepted' ? (
                <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold">
                    <CheckCircle className="w-4 h-4 text-emerald-700" />
                    <span>Request Accepted · Coordinate In-Person Swap</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onTriggerCompletion(thread)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-[11px] font-bold shadow-xs active:scale-95 transition-all"
                  >
                    Complete & Rate Swap
                  </button>
                </div>
              ) : (
                <div className="mt-2 pt-2 border-t border-stone-100 text-xs text-stone-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Exchange completed and credits transferred.</span>
                </div>
              )}
            </div>

            {/* Safety Guidance Note */}
            <div className="p-2.5 bg-stone-200/60 rounded-xl text-center text-[10px] text-stone-500">
              🔒 In-person exchanges are secured by community time-banking ratings. Never pay cash.
            </div>

            {/* Messages Stream */}
            {thread.messages.map((msg) => {
              const isMine = msg.senderId === currentUser.id;
              if (msg.isSystem) {
                return (
                  <div key={msg.id} className="text-center py-1">
                    <span className="inline-block bg-emerald-100/90 text-emerald-950 border border-emerald-200 text-[11px] font-medium px-3 py-1 rounded-full">
                      {msg.text}
                    </span>
                  </div>
                );
              }

              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${isMine ? 'justify-end' : 'justify-start'}`}
                >
                  {!isMine && (
                    <img
                      src={thread.otherUser.avatarUrl}
                      alt={thread.otherUser.name}
                      className="w-6 h-6 rounded-full object-cover ring-1 ring-stone-300 shrink-0"
                    />
                  )}
                  <div
                    className={`max-w-[78%] p-3 rounded-2xl text-xs leading-relaxed shadow-xs ${
                      isMine
                        ? 'bg-emerald-800 text-white rounded-br-xs'
                        : 'bg-white text-stone-900 border border-stone-200/80 rounded-bl-xs'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span
                      className={`text-[9px] block text-right mt-1 font-mono ${
                        isMine ? 'text-emerald-200' : 'text-stone-400'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky Message Input Bar */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-stone-50 border-t border-stone-200/90 flex items-center gap-2 z-10 shrink-0"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Message your neighbor to coordinate..."
              className="flex-1 px-4 py-2.5 rounded-full border border-stone-300 bg-white text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 shadow-xs"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-10 h-10 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white flex items-center justify-center shadow-xs disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
