export type Locale = 'fr' | 'en';

export type BookingStatus = 'pending' | 'confirmed' | 'rejected' | 'cancelled';

export interface Booking {
  id: string;
  created_at: string;
  guest_first_name: string;
  guest_last_name: string;
  guest_email: string;
  guest_phone: string;
  guest_message?: string | null;
  guest_locale: Locale;
  check_in: string; // YYYY-MM-DD
  check_out: string; // YYYY-MM-DD
  guests_count: number;
  include_cleaning: boolean;
  total_price: number;
  status: BookingStatus;
  rejection_reason?: string | null;
}

export type BlockedDateSource = 'manual' | 'airbnb_ical' | 'booking_pending' | 'booking_confirmed';

export interface BlockedDate {
  id: string;
  start_date: string; // YYYY-MM-DD
  end_date: string; // YYYY-MM-DD
  reason?: string | null;
  source: BlockedDateSource;
  created_at?: string;
}

export interface PricingRule {
  id: string;
  name: string;
  start_date: string; // YYYY-MM-DD
  end_date: string; // YYYY-MM-DD
  price_per_night: number;
  min_stay_nights: number;
  allowed_checkin_days: number[]; // 0=Sunday, 1=Monday, ..., 6=Saturday
}

export interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  badge?: string;
  title: string;
  content: {
    fr: string;
    en: string;
  };
}

export interface Highlight {
  id: string;
  icon: string;
  title: {
    fr: string;
    en: string;
  };
  description: {
    fr: string;
    en: string;
  };
}

export interface Amenity {
  category: {
    fr: string;
    en: string;
  };
  items: {
    fr: string;
    en: string;
    icon?: string;
  }[];
}

export interface Attraction {
  id: string;
  name: string;
  kicker?: {
    fr: string;
    en: string;
  };
  distance: {
    fr: string;
    en: string;
  };
  description: {
    fr: string;
    en: string;
  };
  imageUrl: string;
}

export type GalleryCategory = 'piscine' | 'exterieur' | 'interieur' | 'panorama';

export interface GalleryImage {
  id: string;
  url: string;
  alt: {
    fr: string;
    en: string;
  };
  category: GalleryCategory;
  caption: {
    fr: string;
    en: string;
  };
}
