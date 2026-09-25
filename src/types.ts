export type ScreenId =
  | 'onboarding'
  | 'signup'
  | 'login'
  | 'profile_setup'
  | 'home'
  | 'browse'
  | 'listing_detail'
  | 'message_thread'
  | 'profile'
  | 'create_listing';

export type SkillCategory =
  | 'Water & Sanitation'
  | 'Health'
  | 'Solar & Energy'
  | 'Farming'
  | 'Mechanical'
  | 'Cooking & Baking';

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  location: string;
  distanceMiles: number;
  bio: string;
  rating: number;
  reviewCount: number;
  timeCreditBalance: number; // in hours/credits (1 hr = 1 credit)
  totalHoursEarned: number;
  totalHoursSpent: number;
  joinedDate: string;
  skillsOffered: string[];
  skillsWanted: string[];
  badges: string[];
}

export interface SkillListing {
  id: string;
  userId: string;
  type: 'offer' | 'request';
  title: string;
  category: SkillCategory;
  description: string;
  imageUrl: string;
  estimatedHours: number; // 1 hr = 1 credit
  creditCost: number;
  locationArea: string;
  distanceMiles: number;
  availability: string;
  toolsProvided: string[];
  createdAt: string;
  saved?: boolean;
}

export interface ReviewItem {
  id: string;
  reviewerId: string;
  reviewerName: string;
  reviewerAvatar: string;
  rating: number;
  comment: string;
  skillName: string;
  date: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isSystem?: boolean;
}

export interface RequestThread {
  id: string;
  listingId: string;
  listingTitle: string;
  listingCategory: SkillCategory;
  otherUser: UserProfile;
  status: 'pending' | 'accepted' | 'completed' | 'declined';
  creditsProposed: number;
  proposedDate: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}
