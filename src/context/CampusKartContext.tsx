import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  Product, 
  Conversation, 
  ChatMessage, 
  NotificationItem, 
  PurchaseRequest, 
  SwapOffer, 
  Review, 
  CollegePartnershipInquiry 
} from '../types';
import { CURRENT_DEMO_USER, DEMO_USERS } from '../data/demoUsers';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_CONVERSATIONS, 
  INITIAL_MESSAGES, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_PURCHASES, 
  INITIAL_SWAP_OFFERS, 
  INITIAL_REVIEWS, 
  INITIAL_WISHLIST_IDS 
} from '../data/mockData';

export interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface CampusKartContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  isVerified: boolean;
  setIsVerified: (v: boolean) => void;
  demoCampus: string;
  setDemoCampus: (campus: string) => void;
  
  // Products
  products: Product[];
  addProduct: (productData: Partial<Product>) => Product;
  deleteProduct: (productId: string) => void;
  updateProductStatus: (productId: string, status: 'active' | 'pending' | 'sold' | 'swapped') => void;
  
  // Wishlist
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  
  // Chat
  conversations: Conversation[];
  messages: Record<string, ChatMessage[]>;
  sendMessage: (
    conversationId: string, 
    text: string, 
    options?: { isPhoto?: boolean; photoUrl?: string; isLocation?: boolean; locationName?: string }
  ) => void;
  getOrCreateConversation: (seller: User, product?: Product) => string;
  
  // Notifications
  notifications: NotificationItem[];
  addNotification: (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  unreadNotificationsCount: number;
  
  // Purchases & Rating
  purchases: PurchaseRequest[];
  requestPurchase: (productId: string, pickupLocation?: string) => PurchaseRequest | null;
  completePurchase: (purchaseId: string) => void;
  rateSeller: (sellerId: string, rating: number, comment: string, recommended: boolean, itemTitle: string) => void;
  reviews: Review[];
  
  // Kart Swap
  swapOffers: SwapOffer[];
  createSwapOffer: (
    offeredItem: any, 
    requestedItem: any, 
    toUser: User, 
    matchScore: number, 
    notes?: string
  ) => SwapOffer;
  
  // College Partnerships
  partnerships: CollegePartnershipInquiry[];
  addPartnershipInquiry: (inquiry: Omit<CollegePartnershipInquiry, 'id' | 'submittedAt' | 'status'>) => void;
  
  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  
  // Demo Reset
  resetToDemoState: () => void;
}

const CampusKartContext = createContext<CampusKartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'campuskart_state_v1';

export const CampusKartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial or persisted state with validation
  const loadSavedState = () => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          parsed &&
          typeof parsed === 'object' &&
          Array.isArray(parsed.products) &&
          parsed.products.length > 0 &&
          parsed.currentUser &&
          parsed.currentUser.name
        ) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load CampusKart local state', e);
    }
    return null;
  };

  const initial = loadSavedState();

  const [currentUser, setCurrentUser] = useState<User>(initial?.currentUser || CURRENT_DEMO_USER);
  const [isVerified, setIsVerified] = useState<boolean>(initial?.isVerified ?? true);
  const [demoCampus, setDemoCampus] = useState<string>(initial?.demoCampus || "Marathwada Mitra Mandal's College of Commerce");
  
  const [products, setProducts] = useState<Product[]>(initial?.products || INITIAL_PRODUCTS);
  const [wishlistIds, setWishlistIds] = useState<string[]>(initial?.wishlistIds || INITIAL_WISHLIST_IDS);
  
  const [conversations, setConversations] = useState<Conversation[]>(initial?.conversations || INITIAL_CONVERSATIONS);
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(initial?.messages || INITIAL_MESSAGES);
  
  const [notifications, setNotifications] = useState<NotificationItem[]>(initial?.notifications || INITIAL_NOTIFICATIONS);
  const [purchases, setPurchases] = useState<PurchaseRequest[]>(initial?.purchases || INITIAL_PURCHASES);
  const [swapOffers, setSwapOffers] = useState<SwapOffer[]>(initial?.swapOffers || INITIAL_SWAP_OFFERS);
  const [reviews, setReviews] = useState<Review[]>(initial?.reviews || INITIAL_REVIEWS);
  const [partnerships, setPartnerships] = useState<CollegePartnershipInquiry[]>(initial?.partnerships || []);

  const [toasts, setToasts] = useState<Toast[]>([]);

  // Persist state to localStorage on changes
  useEffect(() => {
    try {
      const stateToSave = {
        currentUser,
        isVerified,
        demoCampus,
        products,
        wishlistIds,
        conversations,
        messages,
        notifications,
        purchases,
        swapOffers,
        reviews,
        partnerships,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error('Failed to persist CampusKart state', e);
    }
  }, [currentUser, isVerified, demoCampus, products, wishlistIds, conversations, messages, notifications, purchases, swapOffers, reviews, partnerships]);

  // Toast Helpers
  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Wishlist Helpers
  const toggleWishlist = (productId: string) => {
    const exists = wishlistIds.includes(productId);
    const product = products.find((p) => p.id === productId);
    if (exists) {
      setWishlistIds((prev) => prev.filter((id) => id !== productId));
      showToast('Item removed from wishlist', 'info');
    } else {
      setWishlistIds((prev) => [...prev, productId]);
      showToast('Item added to wishlist', 'success');
      if (product) {
        addNotification({
          type: 'wishlist',
          title: 'Added to Wishlist',
          message: `You saved "${product.title}". We'll notify you of any price updates.`,
          link: '/wishlist',
        });
      }
    }
  };

  const isWishlisted = (productId: string) => wishlistIds.includes(productId);

  // Products Helpers
  const addProduct = (productData: Partial<Product>): Product => {
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      title: productData.title || 'Untitled Product',
      price: Number(productData.price) || 0,
      rentalDuration: productData.rentalDuration,
      swapWishlist: productData.swapWishlist,
      originalPrice: productData.originalPrice || (Number(productData.price) ? Number(productData.price) * 1.5 : 500),
      category: productData.category || 'Books',
      condition: productData.condition || 'Good',
      listingType: productData.listingType || 'Sell',
      location: productData.location || 'Block A',
      description: productData.description || 'No description provided.',
      images: productData.images && productData.images.length > 0 
        ? productData.images 
        : ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80'],
      seller: currentUser,
      isFeatured: false,
      createdAt: 'Just now',
      status: 'active',
      likesCount: 1,
      viewsCount: 1,
      tags: [productData.category || 'Campus', productData.location || 'Campus'],
    };

    setProducts((prev) => [newProduct, ...prev]);

    addNotification({
      type: 'sold',
      title: 'Item Listed Successfully',
      message: `Your item "${newProduct.title}" is now visible to verified students on campus.`,
      link: `/explore`,
    });

    return newProduct;
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
    showToast('Listing removed from marketplace', 'info');
  };

  const updateProductStatus = (productId: string, status: 'active' | 'pending' | 'sold' | 'swapped') => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, status } : p))
    );
    showToast(`Listing status updated to ${status}`, 'info');
  };

  // Notification Helpers
  const addNotification = (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      ...notif,
      timestamp: 'Just now',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  // Chat Helpers
  const getOrCreateConversation = (seller: User, product?: Product): string => {
    const existing = conversations.find((c) => c.participant.id === seller.id);
    if (existing) {
      return existing.id;
    }

    const newConvId = `conv-${seller.name.toLowerCase()}-${Date.now()}`;
    const newConversation: Conversation = {
      id: newConvId,
      participant: seller,
      lastMessage: product ? `Inquiring about ${product.title}` : 'Started a conversation',
      lastMessageTimestamp: 'Just now',
      unreadCount: 0,
      relatedProductId: product?.id,
      relatedProductTitle: product?.title,
      relatedProductPrice: product?.price,
      relatedProductImage: product?.images[0],
    };

    setConversations((prev) => [newConversation, ...prev]);

    const initialMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId: newConvId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text: product 
        ? `Hey ${seller.name}! Is the "${product.title}" still available?`
        : `Hey ${seller.name}, let's connect on CampusKart!`,
      timestamp: 'Just now',
    };

    setMessages((prev) => ({
      ...prev,
      [newConvId]: [initialMsg],
    }));

    return newConvId;
  };

  const sendMessage = (
    conversationId: string, 
    text: string, 
    options?: { isPhoto?: boolean; photoUrl?: string; isLocation?: boolean; locationName?: string }
  ) => {
    if (!text.trim() && !options?.isPhoto && !options?.isLocation) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text: text.trim(),
      timestamp: 'Just now',
      isPhoto: options?.isPhoto,
      photoUrl: options?.photoUrl,
      isLocation: options?.isLocation,
      locationName: options?.locationName,
    };

    setMessages((prev) => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMsg],
    }));

    // Update conversation preview
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              lastMessage: options?.isLocation 
                ? `📍 Shared location: ${options.locationName}` 
                : options?.isPhoto 
                ? '📷 Shared a photo' 
                : text.trim(),
              lastMessageTimestamp: 'Just now',
            }
          : c
      )
    );

    showToast('Message sent', 'success');

    // Auto simulated seller reply for demo after 2.5 seconds if message came from user
    const activeConv = conversations.find((c) => c.id === conversationId);
    if (activeConv && activeConv.participant.id !== currentUser.id) {
      setTimeout(() => {
        const replyText = options?.isLocation 
          ? `Got it! I will meet you at ${options.locationName}. See you soon!`
          : `Thanks for messaging! Sounds great, let me know what time works best for you today.`;
        
        const replyMsg: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          conversationId,
          senderId: activeConv.participant.id,
          senderName: activeConv.participant.name,
          text: replyText,
          timestamp: 'Just now',
        };

        setMessages((prev) => ({
          ...prev,
          [conversationId]: [...(prev[conversationId] || []), replyMsg],
        }));

        setConversations((prev) =>
          prev.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  lastMessage: replyText,
                  lastMessageTimestamp: 'Just now',
                  unreadCount: c.unreadCount + 1,
                }
              : c
          )
        );

        addNotification({
          type: 'message',
          title: `New message from ${activeConv.participant.name}`,
          message: `"${replyText.substring(0, 50)}..."`,
          link: '/messages',
        });
      }, 2500);
    }
  };

  // Buy Flow & Purchases
  const requestPurchase = (productId: string, pickupLocation: string = 'Main Building'): PurchaseRequest | null => {
    const product = products.find((p) => p.id === productId);
    if (!product) return null;

    const newPurchase: PurchaseRequest = {
      id: `pur-${Date.now()}`,
      productId: product.id,
      productTitle: product.title,
      productImage: product.images[0],
      price: product.price,
      sellerId: product.seller.id,
      sellerName: product.seller.name,
      sellerAvatar: product.seller.avatar,
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      buyerAvatar: currentUser.avatar,
      pickupLocation: pickupLocation || product.location,
      status: 'pending',
      createdAt: 'Just now',
      isRated: false,
    };

    setPurchases((prev) => [newPurchase, ...prev]);

    // Update product status
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, status: 'pending' } : p))
    );

    addNotification({
      type: 'purchase',
      title: 'Purchase Request Sent',
      message: `Purchase request for "${product.title}" sent to ${product.seller.name}.`,
      link: '/my-campuskart',
    });

    showToast(`Purchase request sent to ${product.seller.name}`, 'success');
    return newPurchase;
  };

  const completePurchase = (purchaseId: string) => {
    setPurchases((prev) =>
      prev.map((pur) => {
        if (pur.id === purchaseId) {
          // Also mark product as sold
          setProducts((productsPrev) =>
            productsPrev.map((p) => (p.id === pur.productId ? { ...p, status: 'sold' } : p))
          );
          return { ...pur, status: 'completed' };
        }
        return pur;
      })
    );
    showToast('Transaction marked as completed! You can now rate the seller.', 'success');
  };

  const rateSeller = (sellerId: string, rating: number, comment: string, recommended: boolean, itemTitle: string) => {
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      targetUserId: sellerId,
      reviewerId: currentUser.id,
      reviewerName: currentUser.name,
      reviewerAvatar: currentUser.avatar,
      rating,
      comment,
      recommended,
      itemTitle,
      date: 'Just now',
    };

    setReviews((prev) => [newReview, ...prev]);

    // Mark purchase as rated
    setPurchases((prev) =>
      prev.map((pur) => (pur.sellerId === sellerId && !pur.isRated ? { ...pur, isRated: true } : pur))
    );

    const targetUser = DEMO_USERS[sellerId];
    if (targetUser) {
      const newRating = Number(((targetUser.rating * targetUser.reviewCount + rating) / (targetUser.reviewCount + 1)).toFixed(1));
      targetUser.rating = newRating;
      targetUser.reviewCount += 1;
    }

    addNotification({
      type: 'review',
      title: 'Review Published',
      message: `Your ${rating}-star review for ${itemTitle} has been posted.`,
      link: '/profile',
    });

    showToast('Review submitted successfully!', 'success');
  };

  // Swap Flow
  const createSwapOffer = (
    offeredItem: any, 
    requestedItem: any, 
    toUser: User, 
    matchScore: number, 
    notes?: string
  ): SwapOffer => {
    const newSwap: SwapOffer = {
      id: `swap-${Date.now()}`,
      fromUserId: currentUser.id,
      toUserId: toUser.id,
      fromUserName: currentUser.name,
      fromUserAvatar: currentUser.avatar,
      toUserName: toUser.name,
      offeredItem: {
        id: offeredItem.id || `offered-${Date.now()}`,
        title: offeredItem.title || 'Economics Textbook',
        image: offeredItem.image || 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&auto=format&fit=crop&q=80',
        category: offeredItem.category || 'Books',
        condition: offeredItem.condition || 'Like New',
      },
      requestedItem: {
        id: requestedItem.id || `req-${Date.now()}`,
        title: requestedItem.title || 'Casio Scientific Calculator',
        image: requestedItem.image || 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=600&auto=format&fit=crop&q=80',
        category: requestedItem.category || 'Electronics',
        condition: requestedItem.condition || 'Like New',
      },
      matchScore: matchScore || 92,
      status: 'pending',
      createdAt: 'Just now',
      notes: notes || 'Looking forward to swapping on campus!',
    };

    setSwapOffers((prev) => [newSwap, ...prev]);

    addNotification({
      type: 'swap',
      title: 'Swap Request Sent',
      message: `Swap proposal sent to ${toUser.name} (${matchScore}% match).`,
      link: '/swap',
    });

    showToast(`Swap request sent to ${toUser.name} successfully!`, 'success');
    return newSwap;
  };

  // College Partnerships
  const addPartnershipInquiry = (inquiry: Omit<CollegePartnershipInquiry, 'id' | 'submittedAt' | 'status'>) => {
    const newInquiry: CollegePartnershipInquiry = {
      id: `inq-${Date.now()}`,
      ...inquiry,
      submittedAt: 'Just now',
      status: 'New',
    };
    setPartnerships((prev) => [newInquiry, ...prev]);
    showToast('Partnership request submitted! Our campus outreach team will contact you within 24 hours.', 'success');
  };

  // Reset to initial demo
  const resetToDemoState = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setCurrentUser(CURRENT_DEMO_USER);
    setIsVerified(true);
    setDemoCampus("Marathwada Mitra Mandal's College of Commerce");
    setProducts(INITIAL_PRODUCTS);
    setWishlistIds(INITIAL_WISHLIST_IDS);
    setConversations(INITIAL_CONVERSATIONS);
    setMessages(INITIAL_MESSAGES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setPurchases(INITIAL_PURCHASES);
    setSwapOffers(INITIAL_SWAP_OFFERS);
    setReviews(INITIAL_REVIEWS);
    setPartnerships([]);
    showToast('Demo state has been reset to initial mock data', 'info');
  };

  return (
    <CampusKartContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isVerified,
        setIsVerified,
        demoCampus,
        setDemoCampus,
        products,
        addProduct,
        deleteProduct,
        updateProductStatus,
        wishlistIds,
        toggleWishlist,
        isWishlisted,
        conversations,
        messages,
        sendMessage,
        getOrCreateConversation,
        notifications,
        addNotification,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadNotificationsCount,
        purchases,
        requestPurchase,
        completePurchase,
        rateSeller,
        reviews,
        swapOffers,
        createSwapOffer,
        partnerships,
        addPartnershipInquiry,
        toasts,
        showToast,
        removeToast,
        resetToDemoState,
      }}
    >
      {children}
    </CampusKartContext.Provider>
  );
};

export const useCampusKart = () => {
  const context = useContext(CampusKartContext);
  if (!context) {
    throw new Error('useCampusKart must be used within a CampusKartProvider');
  }
  return context;
};
