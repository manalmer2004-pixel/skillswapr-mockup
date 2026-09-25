import { UserProfile, SkillListing, ReviewItem, RequestThread } from '../types';
import woodworkImg from '../assets/images/hero_skill_woodwork_1790249188536.jpg';
import gardenImg from '../assets/images/hero_skill_gardening_1790249201218.jpg';
import bakingImg from '../assets/images/baking.jpg';
import cropSoilImg from '../assets/images/crop-and-soil-health.jpg';
import firstAidImg from '../assets/images/first-aid.jpg';
import solarImg from '../assets/images/solar-panel-installation.jpg';
import waterRepairImg from '../assets/images/water-repair-maintenance.jpg';
import waterStorageImg from '../assets/images/water-storage-device.jpg';

export const CURRENT_USER: UserProfile = {
  id: 'user_maya',
  name: 'User',
  handle: '@user',
  avatarUrl: '',
  location: 'Nairobi, Kenya',
  distanceMiles: 0,
  bio: 'Community organizer and practical skills volunteer. Passionate about clean water, food security, and sustainable local skill exchanges.',
  rating: 4.9,
  reviewCount: 18,
  timeCreditBalance: 3.5, // 3.5 credits = 3.5 hours
  totalHoursEarned: 8.0,
  totalHoursSpent: 4.5,
  joinedDate: 'Member since Apr 2024',
  skillsOffered: [
    'Crop Rotation & Soil Health',
    'Basic First Aid Training',
    'Small Solar Panel Installation'
  ],
  skillsWanted: [
    'Water Filter Maintenance',
    'Community Baking & Bread Basics',
    'Rainwater Collection Setup'
  ],
  badges: ['Neighborhood Anchor', '10+ Hours Exchanged', 'Top Rated']
};

export const OTHER_USERS: Record<string, UserProfile> = {
  user_carlos: {
    id: 'user_carlos',
    name: 'User',
    handle: '@user',
    avatarUrl: '',
    location: 'Nairobi, Kenya · 0.6 km away',
    distanceMiles: 0.4,
    bio: 'Community repair worker who keeps household tools and transport running. Looking to learn safe water-pump maintenance and solar basics.',
    rating: 4.95,
    reviewCount: 29,
    timeCreditBalance: 5.0,
    totalHoursEarned: 16.0,
    totalHoursSpent: 11.0,
    joinedDate: 'Member since Jan 2024',
    skillsOffered: [
      'Water Filter Maintenance',
      'Community Baking & Bread Basics',
      'Small Solar Panel Installation'
    ],
    skillsWanted: [
      'Basic First Aid Training',
      'Crop Rotation & Soil Health',
      'Water Filter Maintenance'
    ],
    badges: ['Master Craftsman', 'Fast Responder', 'Founding Member']
  },
  user_elena: {
    id: 'user_elena',
    name: 'User',
    handle: '@user',
    avatarUrl: '',
    location: 'Nairobi, Kenya · 1.3 km away',
    distanceMiles: 0.8,
    bio: 'Smallholder farmer and community garden volunteer. I help neighbors improve harvests through healthy soil, water-wise growing, and practical food production.',
    rating: 4.88,
    reviewCount: 22,
    timeCreditBalance: 4.0,
    totalHoursEarned: 12.0,
    totalHoursSpent: 8.0,
    joinedDate: 'Member since Mar 2024',
    skillsOffered: [
      'Crop Rotation & Soil Health',
      'Composting & Natural Fertilizer',
      'Water-Saving Irrigation'
    ],
    skillsWanted: [
      'Water Filter Maintenance',
      'Basic First Aid Training',
      'Solar Battery Maintenance'
    ],
    badges: ['Green Thumb', 'Neighborhood Anchor']
  },
  user_david: {
    id: 'user_david',
    name: 'User',
    handle: '@user',
    avatarUrl: '',
    location: 'Nairobi, Kenya · 1.9 km away',
    distanceMiles: 1.2,
    bio: 'Community baker and food skills volunteer. Happy to teach affordable bread making and food preparation in exchange for health, water, or farming skills.',
    rating: 5.0,
    reviewCount: 14,
    timeCreditBalance: 2.0,
    totalHoursEarned: 9.0,
    totalHoursSpent: 7.0,
    joinedDate: 'Member since Feb 2024',
    skillsOffered: [
      'Community Baking & Bread Basics',
      'Affordable Flatbread Making',
      'Food Preservation Basics'
    ],
    skillsWanted: [
      'Small Solar Panel Installation',
      'Water Filter Maintenance',
      'Crop Rotation & Soil Health'
    ],
    badges: ['Community Fixer', '5-Star Streak']
  },
  user_priya: {
    id: 'user_priya',
    name: 'User',
    handle: '@user',
    avatarUrl: '',
    location: 'Nairobi, Kenya · 2.7 km away',
    distanceMiles: 1.7,
    bio: 'Community health volunteer and trainer. I teach practical first aid, hygiene, and prevention skills that families can use every day.',
    rating: 4.92,
    reviewCount: 31,
    timeCreditBalance: 6.5,
    totalHoursEarned: 24.0,
    totalHoursSpent: 17.5,
    joinedDate: 'Member since Oct 2023',
    skillsOffered: [
      'Basic First Aid Training',
      'Community Hygiene & Safe Water',
      'Nutrition for Families'
    ],
    skillsWanted: [
      'Community Baking & Bread Basics',
      'Small Solar Panel Installation',
      'Crop Rotation & Soil Health'
    ],
    badges: ['Top Mentor', 'Super Swapper']
  }
};

export const INITIAL_LISTINGS: SkillListing[] = [
  {
    id: 'listing_wood_shelves',
    userId: 'user_carlos',
    type: 'offer',
    title: 'Water Filter Maintenance',
    category: 'Water & Sanitation',
    description: 'I can show you how to clean, maintain, and replace basic parts in household water filters so drinking water stays safer. Bring your filter housing or tell me what problem you are seeing.',
    imageUrl: waterRepairImg,
    estimatedHours: 2,
    creditCost: 2,
    locationArea: 'Nairobi, Kenya',
    distanceMiles: 0.4,
    availability: 'Sat & Sun mornings, Tue evenings',
    toolsProvided: ['Clean Containers', 'Replacement Filter Media', 'Brushes', 'Basic Hand Tools'],
    createdAt: '2 hrs ago',
    saved: false
  },
  {
    id: 'listing_garden_setup',
    userId: 'user_elena',
    type: 'offer',
    title: 'Crop Rotation & Soil Health',
    category: 'Farming',
    description: 'Learn how to rotate crops, protect soil nutrients, make compost, and plan planting seasons for healthier harvests with fewer costly inputs.',
    imageUrl: cropSoilImg,
    estimatedHours: 2,
    creditCost: 2,
    locationArea: 'Nairobi, Kenya',
    distanceMiles: 0.8,
    availability: 'Weekends, Friday afternoons',
    toolsProvided: ['Soil Jar Test', 'Hand Hoe', 'Compost Samples', 'Planting Calendar'],
    createdAt: '5 hrs ago',
    saved: true
  },
  {
    id: 'listing_bike_tuneup',
    userId: 'user_david',
    type: 'offer',
    title: 'Community Baking & Bread Basics',
    category: 'Cooking & Baking',
    description: 'Learn affordable bread and flatbread basics using simple ingredients, local cooking methods, and practical ways to make food go further for your family.',
    imageUrl: bakingImg,
    estimatedHours: 1.5,
    creditCost: 1.5,
    locationArea: 'Nairobi, Kenya',
    distanceMiles: 1.2,
    availability: 'Weekday evenings (5–8pm)',
    toolsProvided: ['Wrench Set', 'Tire Levers', 'Patch Kit', 'Chain Lubricant'],
    createdAt: 'Yesterday',
    saved: false
  },
  {
    id: 'listing_solar_installation',
    userId: 'user_maya',
    type: 'offer',
    title: 'Small Solar Panel Installation',
    category: 'Solar & Energy',
    description: 'I can help you position a small solar panel, connect a charge controller safely, and set up basic battery storage for lights or phone charging.',
    imageUrl: solarImg,
    estimatedHours: 2,
    creditCost: 2,
    locationArea: 'Nairobi, Kenya',
    distanceMiles: 0.2,
    availability: 'Saturday mornings (10am–12pm)',
    toolsProvided: ['Wire Strippers', 'Multimeter', 'Mounting Brackets', 'Safety Gloves'],
    createdAt: '2 days ago',
    saved: false
  },
  {
    id: 'listing_spanish_chat',
    userId: 'user_priya',
    type: 'offer',
    title: 'Basic First Aid Training',
    category: 'Health',
    description: 'Practice practical first aid for cuts, burns, sprains, fainting, and other common emergencies. We will also cover when to seek professional medical help.',
    imageUrl: firstAidImg,
    estimatedHours: 1,
    creditCost: 1,
    locationArea: 'Nairobi, Kenya',
    distanceMiles: 1.7,
    availability: 'Flexible weekday lunchtimes & weekends',
    toolsProvided: ['First Aid Kit', 'Clean Bandages', 'Soap', 'Training Cards'],
    createdAt: '3 days ago',
    saved: true
  },
  {
    id: 'listing_req_tax',
    userId: 'user_carlos',
    type: 'request',
    title: 'Seeking: Clean Water Storage Advice',
    category: 'Water & Sanitation',
    description: 'Looking for help choosing, cleaning, and covering household water containers to keep drinking water safe. Happy to exchange repair time or credits.',
    imageUrl: waterStorageImg,
    estimatedHours: 3,
    creditCost: 3,
    locationArea: 'Nairobi, Kenya',
    distanceMiles: 0.4,
    availability: 'Any evening this week',
    toolsProvided: ['Covered Containers', 'Soap', 'Water Treatment Notes', 'Notebook'],
    createdAt: '4 days ago',
    saved: false
  }
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev_1',
    reviewerId: 'user_priya',
    reviewerName: 'User',
    reviewerAvatar: '',
    rating: 5,
    comment: 'Maya helped me revitalize my apartment balcony with organic herbs! She brought her own soil mix and seedling starter kit. Truly what neighborly community is all about.',
    skillName: 'Crop Rotation & Soil Health',
    date: '3 days ago'
  },
  {
    id: 'rev_2',
    reviewerId: 'user_david',
    reviewerName: 'User',
    reviewerAvatar: '',
    rating: 5,
    comment: 'Maya made solar panel setup feel simple and safe. We connected the charge controller, tested the battery, and now I can keep essential lights powered.',
    skillName: 'Small Solar Panel Installation',
    date: '1 week ago'
  },
  {
    id: 'rev_3',
    reviewerId: 'user_carlos',
    reviewerName: 'User',
    reviewerAvatar: '',
    rating: 5,
    comment: 'Great communication and prompt swap. Maya taught me the basic chords on my acoustic guitar that I had sitting in the closet for 3 years.',
    skillName: 'Basic First Aid Training',
    date: '2 weeks ago'
  }
];

export const INITIAL_THREADS: RequestThread[] = [
  {
    id: 'thread_carlos_shelves',
    listingId: 'listing_wood_shelves',
    listingTitle: 'Custom Floating Shelf Build & Wall Mounting',
    listingCategory: 'Water & Sanitation',
    otherUser: OTHER_USERS['user_carlos'],
    status: 'pending',
    creditsProposed: 2,
    proposedDate: 'Saturday, 10:00 AM',
    lastMessage: 'Hey Maya! I saw your request for mounting oak floating shelves. I have my stud finder and laser level ready for this weekend.',
    lastMessageTime: '10:42 AM',
    unreadCount: 1,
    messages: [
      {
        id: 'm1',
        senderId: 'user_carlos',
        text: 'Hi Maya! Thanks for reaching out. I’d love to help mount those shelves in your kitchen.',
        timestamp: '10:35 AM'
      },
      {
        id: 'm2',
        senderId: 'user_maya',
        text: 'Hi Carlos! That would be amazing. I have two 36-inch oak planks. Will 2 hours (2 credits) work for you?',
        timestamp: '10:38 AM'
      },
      {
        id: 'm3',
        senderId: 'user_carlos',
        text: 'Hey Maya! I saw your request for mounting oak floating shelves. I have my stud finder and laser level ready for this weekend.',
        timestamp: '10:42 AM'
      }
    ]
  },
  {
    id: 'thread_elena_garden',
    listingId: 'listing_garden_setup',
    listingTitle: 'Crop Rotation & Soil Health',
    listingCategory: 'Farming',
    otherUser: OTHER_USERS['user_elena'],
    status: 'accepted',
    creditsProposed: 2,
    proposedDate: 'Sunday, 2:00 PM',
    lastMessage: 'Sounds good! See you on Sunday at 2pm. I’ll bring the soil notes and planting calendar.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    messages: [
      {
        id: 'em1',
        senderId: 'user_maya',
        text: 'Hi Elena! Would you be free to inspect my back patio soil this Sunday?',
        timestamp: 'Yesterday 3:15 PM'
      },
      {
        id: 'em2',
        senderId: 'user_elena',
        text: 'Sounds good! See you on Sunday at 2pm. I’ll bring the soil notes and planting calendar.',
        timestamp: 'Yesterday 4:02 PM'
      }
    ]
  },
  {
    id: 'thread_david_bike',
    listingId: 'listing_bike_tuneup',
    listingTitle: 'Bicycle Full Safety Tune-Up & Shifter Alignment',
    listingCategory: 'Mechanical',
    otherUser: OTHER_USERS['user_david'],
    status: 'completed',
    creditsProposed: 1.5,
    proposedDate: 'Completed Sep 18',
    lastMessage: 'Exchange completed! 1.5 Time Credits transferred. Thank you for helping with first aid training!',
    lastMessageTime: 'Sep 18',
    unreadCount: 0,
    messages: [
      {
        id: 'dm1',
        senderId: 'system',
        text: 'Skill exchange completed: 1.5 Time Credits were deposited into User’s balance.',
        timestamp: 'Sep 18 6:00 PM',
        isSystem: true
      }
    ]
  }
];
