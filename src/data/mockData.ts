import { UserProfile, SkillListing, ReviewItem, RequestThread } from '../types';
import woodworkImg from '../assets/images/hero_skill_woodwork_1790249188536.jpg';
import gardenImg from '../assets/images/hero_skill_gardening_1790249201218.jpg';
import bakingImg from '../assets/images/hero_skill_baking_1790249212345.jpg';
import avatarMakerImg from '../assets/images/avatar_community_maker_1790249223451.jpg';

export const CURRENT_USER: UserProfile = {
  id: 'user_maya',
  name: 'Maya Chen',
  handle: '@mayamakes',
  avatarUrl: avatarMakerImg,
  location: 'Mission District, San Francisco',
  distanceMiles: 0,
  bio: 'Urban gardener, amateur sourdough baker, and community advocate. Passionate about mutual aid and sustainable local skill exchanges.',
  rating: 4.9,
  reviewCount: 18,
  timeCreditBalance: 3.5, // 3.5 credits = 3.5 hours
  totalHoursEarned: 8.0,
  totalHoursSpent: 4.5,
  joinedDate: 'Member since Apr 2024',
  skillsOffered: [
    'Urban Container Gardening & Soil Prep',
    'Sourdough Starter & Bread Basics',
    'Beginner Mandolin & Acoustic Folk Chords'
  ],
  skillsWanted: [
    'Bicycle Tune-up & Derailleur Adjustment',
    'Conversational Spanish (Intermediate)',
    'Simple Shelving Installation'
  ],
  badges: ['Neighborhood Anchor', '10+ Hours Exchanged', 'Top Rated']
};

export const OTHER_USERS: Record<string, UserProfile> = {
  user_carlos: {
    id: 'user_carlos',
    name: 'Carlos Mendez',
    handle: '@carlos_woodcraft',
    avatarUrl: woodworkImg,
    location: 'Mission District · 0.6 km away',
    distanceMiles: 0.4,
    bio: 'Local carpenter with 12 years in bespoke furniture and wood joinery. Looking to learn conversational Spanish fluency and need help setting up a portfolio site.',
    rating: 4.95,
    reviewCount: 29,
    timeCreditBalance: 5.0,
    totalHoursEarned: 16.0,
    totalHoursSpent: 11.0,
    joinedDate: 'Member since Jan 2024',
    skillsOffered: [
      'Custom Floating Shelves Installation',
      'Solid Wood Restoration & Sanding',
      'Power Tool Safety & Basic Joinery'
    ],
    skillsWanted: [
      'Spanish Conversation Practice',
      'Website Setup & Domain Linking',
      'Indoor Houseplant Repotting'
    ],
    badges: ['Master Craftsman', 'Fast Responder', 'Founding Member']
  },
  user_elena: {
    id: 'user_elena',
    name: 'Elena Rostova',
    handle: '@elena_botanics',
    avatarUrl: gardenImg,
    location: 'Potrero Hill · 1.3 km away',
    distanceMiles: 0.8,
    bio: 'Landscape designer & community garden volunteer. I love helping neighbors turn barren fire escapes or backyards into pollinator-friendly vegetable havens.',
    rating: 4.88,
    reviewCount: 22,
    timeCreditBalance: 4.0,
    totalHoursEarned: 12.0,
    totalHoursSpent: 8.0,
    joinedDate: 'Member since Mar 2024',
    skillsOffered: [
      'Raised Garden Bed Layout & Drip Line',
      'Composting & Micro-green Cultivation',
      'Fruit Tree Pruning'
    ],
    skillsWanted: [
      'Carpentry / Cold-frame Building',
      'Ceramic Planter Glazing',
      'Bicycle Pannier Rack Mount'
    ],
    badges: ['Green Thumb', 'Neighborhood Anchor']
  },
  user_david: {
    id: 'user_david',
    name: 'David Kim',
    handle: '@david_gears',
    avatarUrl: bakingImg,
    location: 'Bernal Heights · 1.9 km away',
    distanceMiles: 1.2,
    bio: 'Avid cyclist and volunteer bike cooperative mechanic. Happy to do complete brake, shifter, and chain overhauls in exchange for cooking or language lessons.',
    rating: 5.0,
    reviewCount: 14,
    timeCreditBalance: 2.0,
    totalHoursEarned: 9.0,
    totalHoursSpent: 7.0,
    joinedDate: 'Member since Feb 2024',
    skillsOffered: [
      'Bicycle Full Tune-up & Safety Check',
      'Brake Cable & Derailleur Indexing',
      'Home WiFi & Mesh Network Setup'
    ],
    skillsWanted: [
      'Sourdough Baking Lessons',
      'Gentle Vinyasa Yoga Coaching',
      'Knife Sharpening'
    ],
    badges: ['Community Fixer', '5-Star Streak']
  },
  user_priya: {
    id: 'user_priya',
    name: 'Priya Sharma',
    handle: '@priyacooks',
    avatarUrl: avatarMakerImg,
    location: 'Noe Valley · 2.7 km away',
    distanceMiles: 1.7,
    bio: 'Home chef & polyglot. I teach regional North Indian cooking, spice blending, and conversational Spanish from 4 years living in Oaxaca.',
    rating: 4.92,
    reviewCount: 31,
    timeCreditBalance: 6.5,
    totalHoursEarned: 24.0,
    totalHoursSpent: 17.5,
    joinedDate: 'Member since Oct 2023',
    skillsOffered: [
      'Conversational Spanish Immersion',
      'Traditional Dahl & Roti from Scratch',
      'Ayurvedic Herbal Tea Blends'
    ],
    skillsWanted: [
      'Drywall Patching & Painting',
      'Acoustic Guitar Strumming Basics',
      'Pet Sitting (friendly senior lab)'
    ],
    badges: ['Top Mentor', 'Super Swapper']
  }
};

export const INITIAL_LISTINGS: SkillListing[] = [
  {
    id: 'listing_wood_shelves',
    userId: 'user_carlos',
    type: 'offer',
    title: 'Custom Floating Shelf Build & Wall Stud Mounting',
    category: 'Home & DIY',
    description: 'I will bring my stud finder, level, drill press, and heavy-duty hardware to measure, cut, and mount sturdy solid wood floating shelves in your living room or kitchen. 1 hour of my time equals 1 time credit. You provide the raw lumber or shelf boards.',
    imageUrl: woodworkImg,
    estimatedHours: 2,
    creditCost: 2,
    locationArea: 'Mission District',
    distanceMiles: 0.4,
    availability: 'Sat & Sun mornings, Tue evenings',
    toolsProvided: ['DeWalt 20V Drill', 'Magnetic Stud Finder', 'Heavy Toggle Anchors', 'Laser Level'],
    createdAt: '2 hrs ago',
    saved: false
  },
  {
    id: 'listing_garden_setup',
    userId: 'user_elena',
    type: 'offer',
    title: 'Raised Garden Bed Setup & Soil Conditioning',
    category: 'Garden & Outdoor',
    description: 'Planning your spring vegetable patch? I will come over with soil testing kits, organic amendments, and seedling trays to plan crop rotation and install companion plants that naturally ward off pests.',
    imageUrl: gardenImg,
    estimatedHours: 2,
    creditCost: 2,
    locationArea: 'Potrero Hill',
    distanceMiles: 0.8,
    availability: 'Weekends, Friday afternoons',
    toolsProvided: ['pH Soil Tester', 'Hand Trowels', 'Seedling Trays', 'Organic Compost Blend'],
    createdAt: '5 hrs ago',
    saved: true
  },
  {
    id: 'listing_bike_tuneup',
    userId: 'user_david',
    type: 'offer',
    title: 'Bicycle Full Safety Tune-Up & Shifter Alignment',
    category: 'Home & DIY',
    description: 'Bring your commuter bike or road bike over! I will true the wheels, de-grease and lube the drivetrain, replace frayed cables, and adjust brake pads so you ride safely and quietly.',
    imageUrl: woodworkImg,
    estimatedHours: 1.5,
    creditCost: 1.5,
    locationArea: 'Bernal Heights',
    distanceMiles: 1.2,
    availability: 'Weekday evenings (5–8pm)',
    toolsProvided: ['Park Tool Stand', 'Torque Wrench', 'Cable Cutters', 'Chain Wear Indicator'],
    createdAt: 'Yesterday',
    saved: false
  },
  {
    id: 'listing_sourdough_bake',
    userId: 'user_maya',
    type: 'offer',
    title: 'Sourdough 101: Wild Yeast Fermentation & Scoring',
    category: 'Cooking & Baking',
    description: 'Learn the ancient art of sourdough baking. I will give you a jar of my active 5-year sourdough starter, teach you autolyse, stretch-and-fold techniques, and Dutch oven baking secrets.',
    imageUrl: bakingImg,
    estimatedHours: 2,
    creditCost: 2,
    locationArea: 'Mission District',
    distanceMiles: 0.2,
    availability: 'Saturday mornings (10am–12pm)',
    toolsProvided: ['Active Starter Jar', 'Proofing Banneton', 'Baker’s Lame Razor', 'Organic Rye Flour'],
    createdAt: '2 days ago',
    saved: false
  },
  {
    id: 'listing_spanish_chat',
    userId: 'user_priya',
    type: 'offer',
    title: 'Conversational Spanish Coffee Walks & Accent Coaching',
    category: 'Languages',
    description: 'Tired of robotic language apps? Practice natural conversational Spanish over coffee or a walk in Dolores Park. Ideal for intermediate learners who want to break through hesitation.',
    imageUrl: avatarMakerImg,
    estimatedHours: 1,
    creditCost: 1,
    locationArea: 'Noe Valley',
    distanceMiles: 1.7,
    availability: 'Flexible weekday lunchtimes & weekends',
    toolsProvided: ['Vocabulary Cheat Sheets', 'Idiom Cards', 'Recommended Reading list'],
    createdAt: '3 days ago',
    saved: true
  },
  {
    id: 'listing_req_tax',
    userId: 'user_carlos',
    type: 'request',
    title: 'Seeking: Basic Self-Employed Tax & Receipt Organization',
    category: 'Tech & Digital',
    description: 'Looking for someone comfortable with spreadsheets or QuickBooks to help me categorize 2023–2024 craft business receipts before quarterly tax deadlines. Happy to exchange 3 hours of woodshop labor or credits!',
    imageUrl: woodworkImg,
    estimatedHours: 3,
    creditCost: 3,
    locationArea: 'Mission District',
    distanceMiles: 0.4,
    availability: 'Any evening this week',
    toolsProvided: ['All Receipts Boxed', 'Laptop Ready', 'Fresh Coffee'],
    createdAt: '4 days ago',
    saved: false
  }
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev_1',
    reviewerId: 'user_priya',
    reviewerName: 'Priya Sharma',
    reviewerAvatar: avatarMakerImg,
    rating: 5,
    comment: 'Maya helped me revitalize my apartment balcony with organic herbs! She brought her own soil mix and seedling starter kit. Truly what neighborly community is all about.',
    skillName: 'Urban Container Gardening',
    date: '3 days ago'
  },
  {
    id: 'rev_2',
    reviewerId: 'user_david',
    reviewerName: 'David Kim',
    reviewerAvatar: bakingImg,
    rating: 5,
    comment: 'The sourdough starter Maya gave me is bubbling vigorously and the Dutch oven baking technique was so easy to follow. Earned 2 credits well spent!',
    skillName: 'Sourdough 101 Lessons',
    date: '1 week ago'
  },
  {
    id: 'rev_3',
    reviewerId: 'user_carlos',
    reviewerName: 'Carlos Mendez',
    reviewerAvatar: woodworkImg,
    rating: 5,
    comment: 'Great communication and prompt swap. Maya taught me the basic chords on my acoustic guitar that I had sitting in the closet for 3 years.',
    skillName: 'Beginner Acoustic Guitar Chords',
    date: '2 weeks ago'
  }
];

export const INITIAL_THREADS: RequestThread[] = [
  {
    id: 'thread_carlos_shelves',
    listingId: 'listing_wood_shelves',
    listingTitle: 'Custom Floating Shelf Build & Wall Mounting',
    listingCategory: 'Home & DIY',
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
    listingTitle: 'Raised Garden Bed Setup & Soil Conditioning',
    listingCategory: 'Garden & Outdoor',
    otherUser: OTHER_USERS['user_elena'],
    status: 'accepted',
    creditsProposed: 2,
    proposedDate: 'Sunday, 2:00 PM',
    lastMessage: 'Sounds good! See you on Sunday at 2pm. I’ll bring the compost amendment.',
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
        text: 'Sounds good! See you on Sunday at 2pm. I’ll bring the compost amendment.',
        timestamp: 'Yesterday 4:02 PM'
      }
    ]
  },
  {
    id: 'thread_david_bike',
    listingId: 'listing_bike_tuneup',
    listingTitle: 'Bicycle Full Safety Tune-Up & Shifter Alignment',
    listingCategory: 'Home & DIY',
    otherUser: OTHER_USERS['user_david'],
    status: 'completed',
    creditsProposed: 1.5,
    proposedDate: 'Completed Sep 18',
    lastMessage: 'Exchange completed! 1.5 Time Credits transferred. Thank you for the sourdough loaf!',
    lastMessageTime: 'Sep 18',
    unreadCount: 0,
    messages: [
      {
        id: 'dm1',
        senderId: 'system',
        text: 'Skill exchange completed: 1.5 Time Credits were deposited into David Kim’s balance.',
        timestamp: 'Sep 18 6:00 PM',
        isSystem: true
      }
    ]
  }
];
