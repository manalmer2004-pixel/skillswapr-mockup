/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ScreenId,
  SkillListing,
  UserProfile,
  RequestThread,
  ReviewItem,
  SkillCategory
} from './types';
import {
  CURRENT_USER,
  OTHER_USERS,
  INITIAL_LISTINGS,
  INITIAL_THREADS,
  INITIAL_REVIEWS
} from './data/mockData';
import { AndroidFrame } from './components/common/AndroidFrame';
import { BottomNav } from './components/common/BottomNav';
import { TimeBankingExplainModal } from './components/common/TimeBankingExplainModal';
import { ReviewRatingModal } from './components/common/ReviewRatingModal';
import { ComposeCodeDrawer } from './components/common/ComposeCodeDrawer';
import { AllScreensGallery } from './components/AllScreensGallery';

// Screens
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { SignUpScreen } from './components/screens/SignUpScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { ProfileSetupScreen } from './components/screens/ProfileSetupScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { BrowseScreen } from './components/screens/BrowseScreen';
import { ListingDetailScreen } from './components/screens/ListingDetailScreen';
import { MessageThreadScreen } from './components/screens/MessageThreadScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { CreateListingScreen } from './components/screens/CreateListingScreen';

export default function App() {
  // Navigation & View Mode
  const [activeScreen, setActiveScreen] = useState<ScreenId>('home');
  const [viewMode, setViewMode] = useState<'phone' | 'canvas'>('phone');

  // Application State
  const [currentUser, setCurrentUser] = useState<UserProfile>(CURRENT_USER);
  const [viewingUser, setViewingUser] = useState<UserProfile>(CURRENT_USER);
  const [listings, setListings] = useState<SkillListing[]>(INITIAL_LISTINGS);
  const [selectedListing, setSelectedListing] = useState<SkillListing>(INITIAL_LISTINGS[0]);
  const [threads, setThreads] = useState<RequestThread[]>(INITIAL_THREADS);
  const [activeThread, setActiveThread] = useState<RequestThread>(INITIAL_THREADS[0]);
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);

  // Modals & Drawers
  const [showTimeExplain, setShowTimeExplain] = useState<boolean>(false);
  const [showComposeDrawer, setShowComposeDrawer] = useState<boolean>(false);
  const [inspectingScreen, setInspectingScreen] = useState<ScreenId>('home');
  const [ratingModalData, setRatingModalData] = useState<{
    isOpen: boolean;
    threadId: string;
    partnerName: string;
    skillTitle: string;
    credits: number;
  }>({
    isOpen: false,
    threadId: '',
    partnerName: '',
    skillTitle: '',
    credits: 0
  });

  // Handler: Select User Profile (e.g. tapping any avatar anywhere)
  const handleSelectUser = (user: UserProfile) => {
    setViewingUser(user);
    setActiveScreen('profile');
  };

  // Handler: Return to Current User Profile
  const handleSwitchToMyProfile = () => {
    setViewingUser(currentUser);
  };

  // Handler: Select Listing
  const handleSelectListing = (listing: SkillListing) => {
    setSelectedListing(listing);
    setActiveScreen('listing_detail');
  };

  // Handler: Toggle Save / Bookmark
  const handleToggleSaveListing = (listingId: string) => {
    setListings((prev) =>
      prev.map((l) => (l.id === listingId ? { ...l, saved: !l.saved } : l))
    );
  };

  // Handler: Request a Skill from Listing Detail
  const handleRequestSkill = (listing: SkillListing) => {
    // Check if thread exists or create new
    const existing = threads.find((t) => t.listingId === listing.id);
    if (existing) {
      setActiveThread(existing);
    } else {
      const partner = OTHER_USERS[listing.userId] || {
        id: listing.userId,
        name: 'Community Neighbor',
        handle: '@neighbor',
        avatarUrl: listing.imageUrl,
        location: listing.locationArea,
        distanceMiles: listing.distanceMiles,
        bio: 'Community member',
        rating: 4.9,
        reviewCount: 12,
        timeCreditBalance: 4.0,
        totalHoursEarned: 10.0,
        totalHoursSpent: 6.0,
        joinedDate: 'Member',
        skillsOffered: [listing.title],
        skillsWanted: ['Cooking'],
        badges: ['Verified']
      };

      const newThread: RequestThread = {
        id: `thread_${Date.now()}`,
        listingId: listing.id,
        listingTitle: listing.title,
        listingCategory: listing.category,
        otherUser: partner,
        status: 'pending',
        creditsProposed: listing.creditCost,
        proposedDate: 'This Weekend (Flexible)',
        lastMessage: `Hi ${partner.name}! I would love to exchange skills for "${listing.title}".`,
        lastMessageTime: 'Just now',
        unreadCount: 0,
        messages: [
          {
            id: `msg_${Date.now()}`,
            senderId: currentUser.id,
            text: `Hi ${partner.name}! I would love to request your help with "${listing.title}". I'm offering ${listing.creditCost} time credits.`,
            timestamp: 'Just now'
          }
        ]
      };
      setThreads((prev) => [newThread, ...prev]);
      setActiveThread(newThread);
    }
    setActiveScreen('message_thread');
  };

  // Handler: Accept Request in Chat
  const handleAcceptRequest = (threadId: string) => {
    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === threadId) {
          return {
            ...t,
            status: 'accepted',
            messages: [
              ...t.messages,
              {
                id: `msg_sys_${Date.now()}`,
                senderId: 'system',
                text: `Request accepted! You are now scheduled for ${t.proposedDate}. Coordinate details below.`,
                timestamp: 'Just now',
                isSystem: true
              }
            ]
          };
        }
        return t;
      })
    );
    setActiveThread((prev) => ({
      ...prev,
      status: 'accepted',
      messages: [
        ...prev.messages,
        {
          id: `msg_sys_${Date.now()}`,
          senderId: 'system',
          text: `Request accepted! You are now scheduled for ${prev.proposedDate}. Coordinate details below.`,
          timestamp: 'Just now',
          isSystem: true
        }
      ]
    }));
  };

  // Handler: Decline Request
  const handleDeclineRequest = (threadId: string) => {
    setThreads((prev) =>
      prev.map((t) => (t.id === threadId ? { ...t, status: 'declined' } : t))
    );
    setActiveThread((prev) => ({ ...prev, status: 'declined' }));
  };

  // Handler: Send Message
  const handleSendMessage = (threadId: string, text: string) => {
    const newMsg = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      text,
      timestamp: 'Just now'
    };

    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === threadId) {
          return {
            ...t,
            lastMessage: text,
            lastMessageTime: 'Just now',
            messages: [...t.messages, newMsg]
          };
        }
        return t;
      })
    );

    setActiveThread((prev) => ({
      ...prev,
      lastMessage: text,
      lastMessageTime: 'Just now',
      messages: [...prev.messages, newMsg]
    }));
  };

  // Handler: Trigger Completion Dialog
  const handleTriggerCompletion = (thread: RequestThread) => {
    setRatingModalData({
      isOpen: true,
      threadId: thread.id,
      partnerName: thread.otherUser.name,
      skillTitle: thread.listingTitle,
      credits: thread.creditsProposed
    });
  };

  // Handler: Submit Rating & Complete Swap
  const handleRatingSubmit = (rating: number, comment: string) => {
    const creditsSpent = ratingModalData.credits;

    // Update user balance: deduct spent credits, record in history
    setCurrentUser((prev) => ({
      ...prev,
      timeCreditBalance: Math.max(0, prev.timeCreditBalance - creditsSpent),
      totalHoursSpent: prev.totalHoursSpent + creditsSpent
    }));

    // Add new review
    const newRev: ReviewItem = {
      id: `rev_${Date.now()}`,
      reviewerId: currentUser.id,
      reviewerName: currentUser.name,
      reviewerAvatar: currentUser.avatarUrl,
      rating,
      comment,
      skillName: ratingModalData.skillTitle,
      date: 'Just now'
    };
    setReviews((prev) => [newRev, ...prev]);

    // Update thread to completed
    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === ratingModalData.threadId) {
          return {
            ...t,
            status: 'completed',
            messages: [
              ...t.messages,
              {
                id: `msg_sys_comp_${Date.now()}`,
                senderId: 'system',
                text: `Skill exchange completed! ${creditsSpent} Time Credits transferred. Rating submitted: ★ ${rating}.0.`,
                timestamp: 'Just now',
                isSystem: true
              }
            ]
          };
        }
        return t;
      })
    );

    setActiveThread((prev) => ({
      ...prev,
      status: 'completed',
      messages: [
        ...prev.messages,
        {
          id: `msg_sys_comp_${Date.now()}`,
          senderId: 'system',
          text: `Skill exchange completed! ${creditsSpent} Time Credits transferred. Rating submitted: ★ ${rating}.0.`,
          timestamp: 'Just now',
          isSystem: true
        }
      ]
    }));

    setRatingModalData({
      isOpen: false,
      threadId: '',
      partnerName: '',
      skillTitle: '',
      credits: 0
    });
  };

  // Handler: Publish New Listing
  const handlePublishListing = (newListingData: Partial<SkillListing>) => {
    const newListing: SkillListing = {
      id: `listing_${Date.now()}`,
      userId: currentUser.id,
      type: newListingData.type || 'offer',
      title: newListingData.title || 'New Community Skill',
      category: newListingData.category || 'Water & Sanitation',
      description: newListingData.description || '',
      imageUrl: newListingData.imageUrl || currentUser.avatarUrl,
      estimatedHours: newListingData.estimatedHours || 1,
      creditCost: newListingData.creditCost || 1,
      locationArea: newListingData.locationArea || 'Mission District, SF',
      distanceMiles: 0.1,
      availability: newListingData.availability || 'Flexible',
      toolsProvided: newListingData.toolsProvided || [],
      createdAt: 'Just now',
      saved: false
    };

    setListings((prev) => [newListing, ...prev]);
    setSelectedListing(newListing);
    setActiveScreen('listing_detail');
  };

  // Reset to initial demo state
  const handleResetDemo = () => {
    setCurrentUser(CURRENT_USER);
    setViewingUser(CURRENT_USER);
    setListings(INITIAL_LISTINGS);
    setSelectedListing(INITIAL_LISTINGS[0]);
    setThreads(INITIAL_THREADS);
    setActiveThread(INITIAL_THREADS[0]);
    setReviews(INITIAL_REVIEWS);
    setActiveScreen('home');
  };

  // Screens Renderer (Used for both interactive phone frame & all-screens canvas)
  const renderScreen = (screenId: ScreenId) => {
    switch (screenId) {
      case 'onboarding':
        return <OnboardingScreen onNavigate={(s) => setActiveScreen(s)} />;
      case 'signup':
        return (
          <SignUpScreen
            onNavigate={(s) => setActiveScreen(s)}
            onSignUpComplete={(ud) =>
              setCurrentUser((prev) => ({ ...prev, name: ud.name }))
            }
          />
        );
      case 'login':
        return (
          <LoginScreen
            onNavigate={(s) => setActiveScreen(s)}
            onLoginComplete={() => setActiveScreen('home')}
          />
        );
      case 'profile_setup':
        return (
          <ProfileSetupScreen
            onNavigate={(s) => setActiveScreen(s)}
            onFinishSetup={(pData) => {
              setCurrentUser((prev) => ({
                ...prev,
                location: pData.location,
                skillsOffered: [pData.firstSkill, ...prev.skillsOffered],
                timeCreditBalance: prev.timeCreditBalance + 1.0 // +1 welcome credit!
              }));
            }}
          />
        );
      case 'home':
        return (
          <HomeScreen
            user={currentUser}
            listings={listings}
            onSelectListing={handleSelectListing}
            onSelectUser={handleSelectUser}
            onOpenTimeExplain={() => setShowTimeExplain(true)}
            onNavigate={(s) => setActiveScreen(s)}
            onToggleSaveListing={handleToggleSaveListing}
          />
        );
      case 'browse':
        return (
          <BrowseScreen
            listings={listings}
            onSelectListing={handleSelectListing}
            onSelectUser={handleSelectUser}
          />
        );
      case 'listing_detail':
        return (
          <ListingDetailScreen
            listing={selectedListing}
            currentUser={currentUser}
            onBack={() => setActiveScreen('home')}
            onSelectUser={handleSelectUser}
            onRequestSkill={handleRequestSkill}
            onToggleSaveListing={handleToggleSaveListing}
            onOpenTimeExplain={() => setShowTimeExplain(true)}
          />
        );
      case 'message_thread':
        return (
          <MessageThreadScreen
            thread={activeThread}
            currentUser={currentUser}
            onBack={() => setActiveScreen('home')}
            onSelectUser={handleSelectUser}
            onAcceptRequest={handleAcceptRequest}
            onDeclineRequest={handleDeclineRequest}
            onSendMessage={handleSendMessage}
            onTriggerCompletion={handleTriggerCompletion}
            allThreads={threads}
            onSelectThread={(th) => setActiveThread(th)}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            user={viewingUser}
            currentUser={currentUser}
            reviews={reviews}
            onOpenTimeExplain={() => setShowTimeExplain(true)}
            onNavigate={(s) => setActiveScreen(s)}
            onSwitchToMyProfile={handleSwitchToMyProfile}
          />
        );
      case 'create_listing':
        return (
          <CreateListingScreen
            currentUser={currentUser}
            onBack={() => setActiveScreen('home')}
            onPublishListing={handlePublishListing}
          />
        );
      default:
        return null;
    }
  };

  // Determine if bottom navigation is visible
  const showBottomNav =
    activeScreen === 'home' ||
    activeScreen === 'browse' ||
    activeScreen === 'profile' ||
    activeScreen === 'message_thread';

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col selection:bg-emerald-800 selection:text-white">
      {/* Main Workspace Area */}
      <main className="min-h-screen bg-stone-100 text-stone-900 flex-1 flex flex-col justify-center items-center py-6 px-4 overflow-x-hidden">
        {viewMode === 'canvas' ? (
          <AllScreensGallery
            onSelectScreen={(screen) => {
              setActiveScreen(screen);
              setViewMode('phone');
            }}
            onOpenComposeInspector={(screen) => {
              setInspectingScreen(screen);
              setShowComposeDrawer(true);
            }}
            renderScreenContent={(screenId) => (
              <div className="h-full flex flex-col justify-between">
                <div className="flex-1 overflow-hidden">{renderScreen(screenId)}</div>
                {(screenId === 'home' ||
                  screenId === 'browse' ||
                  screenId === 'profile' ||
                  screenId === 'message_thread') && (
                  <BottomNav
                    activeScreen={screenId}
                    onNavigate={(s) => {
                      setActiveScreen(s);
                      setViewMode('phone');
                    }}
                  />
                )}
              </div>
            )}
          />
        ) : (
          <div className="flex flex-col items-center">
            {/* Android Device Mockup Frame */}
            <AndroidFrame darkStatus={activeScreen !== 'listing_detail'}>
              {/* Screen Body */}
              <div className="flex-1 overflow-hidden relative flex flex-col">
                {renderScreen(activeScreen)}
              </div>

              {/* Persistent Bottom Nav Bar (Home, Browse, Messages, Profile) */}
              {showBottomNav && (
                <BottomNav
                  activeScreen={activeScreen}
                  onNavigate={(s) => {
                    if (s === 'profile') setViewingUser(currentUser);
                    setActiveScreen(s);
                  }}
                  unreadMessagesCount={1}
                />
              )}

              <TimeBankingExplainModal
                isOpen={showTimeExplain}
                onClose={() => setShowTimeExplain(false)}
              />
            </AndroidFrame>

            <p className="text-[11px] text-stone-500 mt-4 text-center">
              Google Pixel 8 / 9 chassis · Fully clickable wireframe · Tapping avatars opens profiles
            </p>
          </div>
        )}
      </main>

      {/* Global Modals */}
      <ReviewRatingModal
        isOpen={ratingModalData.isOpen}
        onClose={() =>
          setRatingModalData({
            isOpen: false,
            threadId: '',
            partnerName: '',
            skillTitle: '',
            credits: 0
          })
        }
        partnerName={ratingModalData.partnerName}
        skillTitle={ratingModalData.skillTitle}
        credits={ratingModalData.credits}
        onSubmit={handleRatingSubmit}
      />

      <ComposeCodeDrawer
        currentScreen={inspectingScreen}
        isOpen={showComposeDrawer}
        onClose={() => setShowComposeDrawer(false)}
      />
    </div>
  );
}
