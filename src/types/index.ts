export type Category = 
  | 'Books'
  | 'Study Materials'
  | 'Electronics'
  | 'Clothing'
  | 'Stationery'
  | 'Hostel Essentials'
  | 'Accessories'
  | 'Rent / Swap';

export type ListingType = 'Sell' | 'Rent' | 'Swap';

export type Condition = 'Like New' | 'Excellent' | 'Good' | 'Used';

export type CampusLocation = 
  | 'Block A'
  | 'Block B'
  | 'Main Building'
  | 'Library'
  | "Girls' Hostel"
  | "Boys' Hostel"
  | 'Hostel Block'
  | 'Student Center'
  | 'Campus Canteen';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  department: string;
  year: string;
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  successfulTransactions: number;
  joinedDate: string;
  bio?: string;
  phone?: string;
  hostelBlock?: string;
}

export interface Review {
  id: string;
  targetUserId: string;
  reviewerId: string;
  reviewerName: string;
  reviewerAvatar: string;
  rating: number;
  comment: string;
  recommended: boolean;
  itemTitle: string;
  date: string;
}

export interface Product {
  id: string;
  title: string;
  price: number; // For Sell: price, For Rent: rental price per week/month, For Swap: 0
  rentalDuration?: string; // e.g. 'per week', 'per semester'
  swapWishlist?: string; // e.g. 'Scientific Calculator or Economics Book'
  originalPrice?: number;
  category: Category;
  condition: Condition;
  listingType: ListingType;
  location: CampusLocation | string;
  description: string;
  images: string[];
  seller: User;
  isFeatured?: boolean;
  createdAt: string;
  status: 'active' | 'pending' | 'sold' | 'swapped';
  likesCount: number;
  viewsCount: number;
  tags?: string[];
}

export interface SwapOffer {
  id: string;
  fromUserId: string;
  toUserId: string;
  fromUserName: string;
  fromUserAvatar: string;
  toUserName: string;
  offeredItem: {
    id: string;
    title: string;
    image: string;
    category: Category;
    condition: Condition;
  };
  requestedItem: {
    id: string;
    title: string;
    image: string;
    category: Category;
    condition: Condition;
  };
  matchScore: number;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  createdAt: string;
  notes?: string;
}

export interface PurchaseRequest {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  price: number;
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  buyerId: string;
  buyerName: string;
  buyerAvatar: string;
  pickupLocation: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  isRated?: boolean;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isPhoto?: boolean;
  photoUrl?: string;
  isLocation?: boolean;
  locationName?: string;
  isSystem?: boolean;
}

export interface Conversation {
  id: string;
  participant: User;
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: number;
  relatedProductId?: string;
  relatedProductTitle?: string;
  relatedProductPrice?: number;
  relatedProductImage?: string;
}

export interface NotificationItem {
  id: string;
  type: 'wishlist' | 'message' | 'swap' | 'review' | 'sold' | 'purchase' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
  avatar?: string;
}

export interface CollegePartnershipInquiry {
  id: string;
  collegeName: string;
  contactPerson: string;
  collegeEmail: string;
  phone: string;
  numberOfStudents: string;
  message: string;
  submittedAt: string;
  status: 'New' | 'In Review' | 'Approved';
}
