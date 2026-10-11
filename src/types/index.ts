export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice: number;
  discountPct: number;
  rating: number;
  reviewsCount: number;
  deliveredCount: string;
  image: string;
  thumbnails?: string[];
  badges: string[];
  stockLeft: number;
  category: 'projection' | 'wearable' | 'cleaning' | 'charging' | 'mount' | 'audio' | 'desk';
  features: string[];
  specs: { label: string; value: string }[];
  variants?: {
    name: string;
    options: string[];
  }[];
  inStock: boolean;
  stockLocation?: string;
  highlightSpec?: {
    title: string;
    subtitle: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  productPurchased: string;
  rating: number;
  comment: string;
  verified: boolean;
  image?: string;
  date: string;
}

export type CurrencyCode = 'USD' | 'EUR' | 'SAR' | 'AED' | 'EGP';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to USD
  prefix: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  currency: CurrencyCode;
  customerName: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  paymentMethod: 'visa' | 'vodafone_cash' | 'orange_cash' | 'card' | 'applepay' | 'paypal' | 'cod';
  walletReference?: string;
  status: 'Order Confirmed' | 'Air Cargo Dispatched' | 'Customs Cleared' | 'Out for Delivery';
  createdAt: string;
  estimatedDelivery: string;
  trackingNumber: string;
  timeline: {
    title: string;
    date: string;
    description: string;
    completed: boolean;
    current?: boolean;
  }[];
}
