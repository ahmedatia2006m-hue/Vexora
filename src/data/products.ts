import { Product, Review, CurrencyConfig, CurrencyCode, Order } from '../types';

export const HERO_PRODUCT: Product = {
  id: 'cyberglow-cube',
  name: 'CyberGlow Lumina Projection Cube',
  tagline: 'Gen 4.2 Optical Matrix & Atmospheric Laser Engine',
  description:
    'Atmospheric laser optics paired with 360° Hi-Fi acoustic resonator. Transform any bedroom, game room, or desk into a multi-sensory cyber universe.',
  price: 69.99,
  originalPrice: 139.99,
  discountPct: 50,
  rating: 4.96,
  reviewsCount: 3842,
  deliveredCount: '14,200+',
  image:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCTkOQW8-HqWtvUJPM-qaxfjsC8RPDpO87DaQOaZBnBwPBRNKRGqEfE5nHYK6hG-r5eZ5y5Fx5jGRwDxLmizfs4iKDupwfg7RPvrQzrw4Gp1JvA_tQUMaSvYv5hRKE9Zuw-06R2olHYu2OpE1Fje7Bg4SLqmathwqX7qfGhuBbj-ZQPIgrgBUXlAq5-I_n1QIoA4CZBfnVl5_bbnVIx-goUfoxRT1amdDgjYKP-F2F0BZzu4Y1ScQbgkA',
  thumbnails: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAB3MwPQ9E3qy7FfLzDMVZA-jabS0SwMVUrbJt-nsmA1QtB8guF3rupOfoYzgMzB0XSXdk6Z1HzX7ICBvx0GX2Wi92_ZU3LI7LKffMYoApbCPMqIJSp9dcE-SVFM2DrGgnRq4L-tmOgZHIuAa7T8v97r-OK5eUluqFD62n8fpB6T1i1cswNmuyB-3CVKFJjnHR8i2KMcLYVcLU622Y-wmyQHN3eWcKwxU417AZ1jMUUKhTD8ftegiUu9g',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC00BX8Saz8O0tyO0WWksyVYEukV67Xz6Pe5WG5RifW_PavKiJi_lVajfC_XOsOELlgEYiWQiIgKAJPsay3V4T-QIZtDVlV7IMWrQKylFiicKPa9wrE6pR2MHNKWAHyiajgQmYqBq3h9ghZk3owqPpwYzfdbxFJq6QnffXPwAh8xEe0hqTkAsAm40iMqNin0Ny_2BXi9HZp0pg4nQevqY4J1bVDUI_lDeKIZJFZyryVUfwXM-Px-3atNw',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB52x3ctC4KF2Ib4pwoBeZmxlPflrKWXWr_HTSg_cHOqI7D4x-s8wHmJH_9X-IqyJ_1K5h5jJwwHjyL_NupzmQMxfKlshAPvw0B8I6wbJKY5EX-U9eCdaT-Lcl3XpZKkms1SZbcs1meQbXj_GVnThPTyAS8g2NRTz6jKclXFXA5sv6T3BuX4eVgurTP4sqCcSnORS-XWqDChfRScxFBmaROg52kuqRf4b6qVcQQ2JxkTYAARJcDRWRiYw',
  ],
  badges: ['VIRAL ON TIKTOK', 'GEN 4.2 OPTICAL MATRIX'],
  stockLeft: 14,
  category: 'projection',
  features: [
    '16 Aurora Modes & Dynamic Nebula Laser Waves',
    'Hi-Res BT 5.3 Acoustic Resonator & Spatial Stereo',
    'Smart Sleep Timer (15m / 30m / 60m Auto-Off)',
    '10-Hr Battery Backup with Fast Type-C PD Charging',
  ],
  specs: [
    { label: 'Optical Resolution', value: '4K Ultra-Wide Nebula Projection' },
    { label: 'Sound Output', value: '12W Spatial 360° Neodymium Driver' },
    { label: 'Connectivity', value: 'Bluetooth 5.3 + Dual-band RF Remote' },
    { label: 'Battery Capacity', value: '5,200 mAh Lithium-Ion' },
    { label: 'Dimensions', value: '85 x 85 x 85 mm (Matte Titanium Alloy)' },
    { label: 'Voltage Compatibility', value: '100-240V Universal Type-C' },
  ],
  variants: [
    {
      name: 'Finish',
      options: ['Gunmetal Titanium', 'Obsidian Black', 'Cyber Frost White'],
    },
  ],
  inStock: true,
  stockLocation: 'Dispatched from USA & GCC Warehouses',
  highlightSpec: {
    title: '360° Lumina Audio Engine',
    subtitle: 'Spatial Holographic Sync 2.0',
  },
};

export const DROPSHIPPING_WINNERS: Product[] = [
  {
    id: 'cyberpulse-ring',
    name: 'CyberPulse Smart Health & Sleep Tracker Ring',
    tagline: 'Aerospace-Grade Titanium Biometric Sensor',
    description:
      'Aerospace-grade titanium, continuous HRV, sleep cycle indexing, 7-day battery life without any monthly subscription fees.',
    price: 49.99,
    originalPrice: 99.99,
    discountPct: 50,
    rating: 4.9,
    reviewsCount: 1230,
    deliveredCount: '8,400+',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCHpIZaJbolG0CBzdfdbDlmncyahoYKDt4dYoMpTbkoQpOc8sntNIhm3uMuYDek9xB3TZp69JPbbKvM_JL8LsKN1eVfp9Uh__04mELz2IU5K0VmHkrhv8kosfWd22OF47E1dfD2FbjtIAoxh2tK6azsPMx8XnlN84BsQprFe7YtMWD4F4zOYek7hDmIoWZ1u-EBdQqalv5R1iLSLrLNLHErMsccv1OkbIaqotu24XKKfy3MSB8BJhlsQw',
    badges: ['BEST SELLER', 'FAST SHIPPING'],
    stockLeft: 18,
    category: 'wearable',
    features: [
      'Zero Subscription Required (Free Lifetime App)',
      'Clinical-grade Optical Heart Rate & SpO2 Tracking',
      'IP68 50M Waterproof for swimming & shower',
      'Continuous Body Temperature & HRV Indexing',
    ],
    specs: [
      { label: 'Material', value: 'Grade 5 Aerospace Titanium + Medical Epoxy' },
      { label: 'Weight', value: 'Under 2.9 grams' },
      { label: 'Battery Life', value: '6-7 Days Active Use' },
      { label: 'Water Resistance', value: '5 ATM / 50 Meters' },
      { label: 'App Sync', value: 'iOS Health & Google Fit Compatible' },
    ],
    variants: [
      {
        name: 'Size',
        options: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
      },
      {
        name: 'Finish',
        options: ['Titanium Slate', 'Stealth Matte Black', 'Polished Silver'],
      },
    ],
    inStock: true,
    stockLocation: 'In Stock (GCC/US)',
  },
  {
    id: 'aeroclean-vacuum',
    name: 'AeroClean Portable Desk & Car Turbo Vacuum',
    tagline: '15,000Pa High-Velocity Cyclone Motor',
    description:
      'Brushless motor, washable HEPA filter, ultra-compact design for keyboard, workspace, and luxury vehicle detailing.',
    price: 39.99,
    originalPrice: 79.99,
    discountPct: 50,
    rating: 4.8,
    reviewsCount: 890,
    deliveredCount: '6,100+',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDZ40eKAJEXo_dVuXLf4DSY4IstxxSdS-CQZU7-nlhPCigh4u576njs_wQbG6PohFn2m4HrD9wN3mMlPOkirVFvny0thGSaK_mq9jke5eZUqJLs7G9DSQdT9AoaTWAR_es5XTHYjleEcI_w97FUuSoCw_nBeVilQWeSCaqXQHKkEGWGgDvH1kN7A388ZWKyi0DFv8hNCH-K7d_-bpZE0KRu4T0yc6TRPbky7HnojOH3GMhInAFpKu4uEQ',
    badges: ['VIRAL GADGET'],
    stockLeft: 23,
    category: 'cleaning',
    features: [
      '120,000 RPM Brushless Turbo Fan Motor',
      'Dual-Stage Washable Steel + HEPA Filtration',
      'Dual Suction & Air-Blower Reversible Jet Nozzle',
      'LED Worklight for dark consoles and crevices',
    ],
    specs: [
      { label: 'Suction Power', value: '15,000 Pa / 120W' },
      { label: 'Noise Level', value: '< 65dB Whisper Quiet' },
      { label: 'Battery Capacity', value: '4,000 mAh Dual-Cell Pack' },
      { label: 'Runtime', value: '25-30 Mins Continuous Turbo' },
      { label: 'Charging', value: 'USB Type-C 15W Fast Charge' },
    ],
    variants: [
      {
        name: 'Color',
        options: ['Gunmetal Grey', 'Carbon Cyber Black'],
      },
    ],
    inStock: true,
    stockLocation: 'High Suction 15kPa',
  },
  {
    id: 'magnecharge-4in1',
    name: 'MagneCharge 4-in-1 Foldable Charging Station',
    tagline: '15W Rapid Magnetic Multi-Device Travel Hub',
    description:
      '15W rapid magnetic alignment, folds flat into pocket size, charges phone, watch, and pods concurrently with zero cable mess.',
    price: 44.99,
    originalPrice: 89.99,
    discountPct: 50,
    rating: 4.9,
    reviewsCount: 2110,
    deliveredCount: '11,500+',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDmMhrGsKPUDfWffGxSJsYVveQcBIAW3dqqxJZgGlrz0Abo5Yqi5sJnp3mUmv8jXmEH1MxNVFdv1ECH3JHJAdkVDmm2l0yXybetTbh3DrRiUj2is6hSzS_NqGHPZIW1JbGATpQ5jd3S1wkbfmefC_bj0ENYolTZ_e05CaPplL0Y_NMfrEuCwk4NE9qQicJFwHieMuJa65ISfiksvT-KkHhLL7nDk7f21ZjaqMgmrDPoinCxlNJ4S-cFdQ',
    badges: ['TOP TRAVEL GEAR'],
    stockLeft: 9,
    category: 'charging',
    features: [
      'MagSafe Certified Strong Neodymium Ring Align',
      'Simultaneous 15W + 5W + 3W High-Speed Charging',
      'Folds down to 18mm slim travel wallet profile',
      'Ambient LED Charging Halo with Touch On/Off',
    ],
    specs: [
      { label: 'Total Output', value: '23W Max PD Support' },
      { label: 'Compatibility', value: 'iPhone 12-16, Apple Watch 1-10, AirPods Pro, Qi Android' },
      { label: 'Safety Protections', value: 'Overheat, Overvoltage, Foreign Object Detection' },
      { label: 'Weight', value: '142 grams (Ultra-portable)' },
    ],
    variants: [
      {
        name: 'Color',
        options: ['Dark Graphite', 'Titanium Silver'],
      },
    ],
    inStock: true,
    stockLocation: 'MagSafe Ready',
  },
  {
    id: 'luminagrip-mount',
    name: 'LuminaGrip Anti-Gravity Smart Phone Mount',
    tagline: 'Automatic Electric Sensory Vacuum Adsorption',
    description:
      'Automatic sensory suction sticks instantly to mirrors, gym equipment, screens, windshields, and glossy smooth tiles with 5kg grip.',
    price: 24.99,
    originalPrice: 49.99,
    discountPct: 50,
    rating: 4.7,
    reviewsCount: 640,
    deliveredCount: '4,800+',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBHwwjzypk8gfcderANc8mzxCmPbTeKIRESVSeJYmY9JONzcPB2U9J4Q9XBMHAnXm5GL5DAvp3m-ElvO3ZuaMnmrDIBHQP0R5SqAiVAt5PxLuOoukAu_lUJnABlyGfK5F0rHdonQMCFah6bmdGW60sAFqzTKI0jHlSsV7F_xIwibAsMaAKoMaK-0kHO-DuAEO0KaCTFnGyrgPboDw0PiusFTqa5dBnRcssXFvE7puqOxiVpzm_E-BWZTQ',
    badges: ['UNIVERSAL FIT'],
    stockLeft: 31,
    category: 'mount',
    features: [
      'Intelligent Micro-Air Pump automatically senses seal loss',
      'Supports up to 5.0 kg vertical load capacity',
      '360° Rotational Magnetic Ball-joint Head',
      'Reusable Silicone Gel Base with 60-Day Standby',
    ],
    specs: [
      { label: 'Suction Tech', value: 'Micro-Electronic Vacuum Sensor' },
      { label: 'Battery Capacity', value: '180 mAh (Recharge via Type-C)' },
      { label: 'Grip Strength', value: '5kg (Holds heaviest Pro Max & iPads)' },
      { label: 'Materials', value: 'Anodized Aluminum Alloy + Soft Silicone' },
    ],
    variants: [
      {
        name: 'Color',
        options: ['Matte Gunmetal', 'Cyber Cyan Accent'],
      },
    ],
    inStock: true,
    stockLocation: 'Electric Vacuum',
  },
];

export const ALL_PRODUCTS: Product[] = [
  HERO_PRODUCT,
  ...DROPSHIPPING_WINNERS,
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Fahad Al-M.',
    location: 'Dubai, UAE',
    productPurchased: 'CyberGlow Cube',
    rating: 5,
    comment:
      '"The CyberGlow cube blew my expectations. Arrived in Dubai in just 4 days via express courier. The projection quality is crisp and the ambient sound helps me fall asleep instantly."',
    verified: true,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA-PhOcu79QrEpyDKSntR_cU-JctQnFEKO5VQXaOHqCq8lWD4SMw4dLVhYeIziz3IZFY5A8F_l6XQb0uRkm41sUgPDiKJlpLqxMJMjlkb9ckH7pavlCTulPu7867qfw0dQFTYdWzjBSW4aDx2i3YcSNIIYgBhojUAZkaXoYvEf5VFDrD-qMC5YFR1m4kmChTWeMYi8zULtC9I0RRdrRsm7ruZU4WH4LSxZZTznSHTHU0B4omXHYF0FSdA',
    date: '2 days ago',
  },
  {
    id: 'rev-2',
    author: 'Alex R.',
    location: 'Austin, TX',
    productPurchased: 'Smart Health Ring',
    rating: 5,
    comment:
      '"I replaced my $300 fitness watch with this CyberPulse Ring. The sleep accuracy is identical, no subscription fee required, and the battery genuinely lasts almost a full week."',
    verified: true,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDSw3yvA099HdfT1Jngl365DuNVVrIIJGL9NU2XczMZ9Jb1JejCHDPak2LYcS0gKSwE4ZViBUwZ7mIlaOdw1ewWoCjdlWVTdxEHHQU7iSCHDirL0GNjj1dejjVNma9tJcIiqZHpO-k0VO-soiTM1wo9EC51eMewliqjz5aXO6OdIuXex1MkX7cqXV2zhMuTjSfPn0sjs8xobLBhE5oi9F_kaw79Qv1SsiGtuDFh7f1No05uJV8nojaq-w',
    date: '4 days ago',
  },
  {
    id: 'rev-3',
    author: 'Sarah K.',
    location: 'London, UK',
    productPurchased: 'MagneCharge 4-in-1',
    rating: 5,
    comment:
      '"The MagneCharge has made work trips so much easier. One cord powers my iPhone, AirPods, and Apple Watch all together. Sturdy magnetic snap and premium build feel."',
    verified: true,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCjB61YgT7O3Jr7me6wPvijDqVUofbstY-pMoXAjFS2L4qucpBVenRZWa3MFD2MItzh9VCRYWH0JRUdeB3VszAyNABVR-YUjAxW3reE0WJOgwYyCuEezAx6iSMvgOHNiyDV0kUW9Q6pIctNphrgJ4qRoGZ-pSqFQvRTGJ7J_FAABRJlLlGvfIzk7KeslP-oDvs-c4LuijGNxAqo6Gfcy1IbYIajTUkC3MkB0TgUZ5OV86026eGqaxqWRg',
    date: '1 week ago',
  },
];

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rate: 1.0, prefix: true },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, prefix: false },
  SAR: { code: 'SAR', symbol: '﷼', rate: 3.75, prefix: false },
  AED: { code: 'AED', symbol: 'د.إ', rate: 3.67, prefix: false },
  EGP: { code: 'EGP', symbol: 'ج.م', rate: 49.5, prefix: false },
};

export function formatPrice(amountUsd: number, currency: CurrencyConfig): string {
  const converted = amountUsd * currency.rate;
  const formatted = converted.toFixed(currency.code === 'EGP' ? 0 : 2);
  if (currency.prefix) {
    return `${currency.symbol}${formatted}`;
  }
  return `${formatted} ${currency.symbol}`;
}

export const FAQS = [
  {
    id: 'faq-1',
    question: 'How fast is global shipping to my country?',
    answer:
      'All orders are processed and dispatched within 24 hours from our nearest regional hubs (USA, Germany, Dubai, Cairo, and Hong Kong). Typical delivery takes between 3 to 7 business days with door-to-door tracking sent straight to your email and SMS.',
  },
  {
    id: 'faq-2',
    question: 'What is your 30-Day Money-Back Guarantee policy?',
    answer:
      'We offer an absolute zero-risk trial. If you are not 100% satisfied with your Vexora device for any reason within 30 days of receipt, email our 24/7 concierge support team for an instant RMA label and full refund.',
  },
  {
    id: 'faq-3',
    question: 'Do your devices support regional GCC / Egyptian voltages?',
    answer:
      'Yes, all Vexora products are engineered with 100-240V universal Type-C PD standards and ship with multi-region international fast-charging adapters compliant with CE, FCC, and RoHS certifications.',
  },
  {
    id: 'faq-4',
    question: 'ما هي طرق الدفع المتاحة داخل مصر؟ (Payment Methods in Egypt)',
    answer:
      'داخل مصر نوفر أكثر طرق الدفع سهولة وأماناً: الدفع ببطاقات فيزا وماستركارد (Visa / Mastercard) المشفرة، والتحويل المباشر الفوري عبر محفظة فودافون كاش (Vodafone Cash) وأورنج كاش (Orange Cash) بدون أي مصاريف تحويل إضافية، بالإضافة إلى إمكانية الدفع نقداً عند استلام الشحنة (Cash on Delivery).',
  },
];

export const SAMPLE_ORDERS: Order[] = [
  {
    id: 'VX-71029',
    items: [
      { product: HERO_PRODUCT, quantity: 1, selectedColor: 'Gunmetal Titanium' },
    ],
    subtotal: 69.99,
    discount: 0.0,
    shipping: 0.0,
    total: 69.99,
    currency: 'EGP',
    customerName: 'أحمد محمود القاضي (Ahmed Mahmoud)',
    email: 'ahmed.m@example.com',
    phone: '+20 101 808 4708',
    country: 'Egypt (جمهورية مصر العربية)',
    address: 'شارع التسعين الشمالي، التجمع الخامس، القاهرة الجديدة',
    paymentMethod: 'vodafone_cash',
    walletReference: '01002345678 | Ref: VF-883921',
    status: 'Out for Delivery',
    createdAt: '2026-10-09T08:15:00Z',
    estimatedDelivery: 'اليوم خلال ساعتين (بواسطة مندوب القاهرة)',
    trackingNumber: 'EG-EXP-889104',
    timeline: [
      {
        title: 'تم تأكيد الدفع عبر فودافون كاش (Vodafone Cash)',
        date: 'Oct 9, 08:15 AM',
        description: 'تم توثيق إيصال التحويل (Ref: VF-883921) وحجز الشحنة من المستودع الإقليمي.',
        completed: true,
      },
      {
        title: 'شحن جوي سريع إلى مركز لوجستيات القاهرة',
        date: 'Oct 9, 06:40 PM',
        description: 'وصول الشحنة عبر الشحن الجوي السريع إلى مطار القاهرة الدولي.',
        completed: true,
      },
      {
        title: 'اجتياز الفحص الجمركي والتخليص الفوري',
        date: 'Oct 10, 09:20 AM',
        description: 'تم إنهاء كافة الإجراءات دون أي رسوم جمركية إضافية على العميل.',
        completed: true,
      },
      {
        title: 'مع المندوب للتوصيل للعنوان (القاهرة الجديدة)',
        date: 'اليوم، 01:15 PM',
        description: 'المندوب في طريقه إليك. تم سداد كامل المبلغ مسبقاً عبر فودافون كاش.',
        completed: true,
        current: true,
      },
    ],
  },
  {
    id: 'VX-60481',
    items: [
      { product: HERO_PRODUCT, quantity: 1, selectedColor: 'Cyber Matte Black' },
    ],
    subtotal: 69.99,
    discount: 10.0,
    shipping: 0.0,
    total: 59.99,
    currency: 'EGP',
    customerName: 'مريم الشريف (Mariam El-Sherif)',
    email: 'mariam.s@example.com',
    phone: '+20 101 808 4708',
    country: 'Egypt (جمهورية مصر العربية)',
    address: 'شارع فؤاد، محطة الرمل، الإسكندرية',
    paymentMethod: 'orange_cash',
    walletReference: '01018084708 | Ref: OC-449102',
    status: 'Air Cargo Dispatched',
    createdAt: '2026-10-10T10:30:00Z',
    estimatedDelivery: 'غداً قبل الساعة 4:00 مساءً (الإسكندرية)',
    trackingNumber: 'EG-EXP-910482',
    timeline: [
      {
        title: 'تم تأكيد الدفع عبر أورنج كاش (Orange Cash)',
        date: 'اليوم، 10:30 AM',
        description: 'تم اعتماد التحويل بنجاح برقم عملية OC-449102 وإصدار فاتورة إلكترونية.',
        completed: true,
      },
      {
        title: 'تجهيز الشحنة وانطلاق سيارة التوزيع السريع',
        date: 'اليوم، 02:15 PM',
        description: 'تم تحويل الشحنة إلى مركز توزيع الإسكندرية الرئيسي.',
        completed: true,
        current: true,
      },
      {
        title: 'وصول الشحنة لمقر الإسكندرية وتسليمها للمندوب',
        date: 'غداً، 11:00 AM',
        description: 'التوصيل المباشر إلى شارع فؤاد.',
        completed: false,
      },
    ],
  },
  {
    id: 'VX-84920',
    items: [
      { product: HERO_PRODUCT, quantity: 1, selectedColor: 'Gunmetal Titanium' },
      { product: DROPSHIPPING_WINNERS[2], quantity: 1, selectedColor: 'Dark Graphite' },
    ],
    subtotal: 114.98,
    discount: 15.0,
    shipping: 0.0,
    total: 99.98,
    currency: 'USD',
    customerName: 'Fahad Al-Maktoum',
    email: 'fahad.m@example.com',
    phone: '+971 50 123 4567',
    country: 'United Arab Emirates',
    address: 'Downtown Tower 4, Suite 1902, Dubai',
    paymentMethod: 'applepay',
    status: 'Out for Delivery',
    createdAt: '2026-10-07T10:14:00Z',
    estimatedDelivery: 'Today by 6:00 PM',
    trackingNumber: 'DXB-AIR-9482103',
    timeline: [
      {
        title: 'Order Confirmed & Quality Checked',
        date: 'Oct 7, 10:14 AM',
        description: 'Vexora robotics test facility verified optical calibration and battery seal.',
        completed: true,
      },
      {
        title: 'Dispatched via Global Express Air',
        date: 'Oct 8, 02:40 AM',
        description: 'Direct flight cargo manifest assigned to Emirates SkyCargo DXB.',
        completed: true,
      },
      {
        title: 'Regional Hub Customs Clearance Passed',
        date: 'Oct 9, 11:15 AM',
        description: 'Cleared through Dubai Cargo Village customs with zero tariff hold.',
        completed: true,
      },
      {
        title: 'Out for Local Last-Mile Courier Delivery',
        date: 'Today, 08:30 AM',
        description: 'Courier driver assigned. Tracking live with contactless signature.',
        completed: true,
        current: true,
      },
    ],
  },
  {
    id: 'VX-92041',
    items: [
      { product: DROPSHIPPING_WINNERS[0], quantity: 1, selectedColor: 'Titanium Slate', selectedSize: 'US 10' },
    ],
    subtotal: 49.99,
    discount: 0,
    shipping: 0,
    total: 49.99,
    currency: 'USD',
    customerName: 'Marcus Vance',
    email: 'marcus.v@example.com',
    phone: '+1 512 889 0192',
    country: 'United States',
    address: '701 Brazos St, Austin, TX 78701',
    paymentMethod: 'card',
    status: 'Air Cargo Dispatched',
    createdAt: '2026-10-09T18:22:00Z',
    estimatedDelivery: 'Oct 12, 2026',
    trackingNumber: 'USPS-EXP-4491029',
    timeline: [
      {
        title: 'Order Verified & Encrypted',
        date: 'Oct 9, 6:22 PM',
        description: 'Order confirmed with PCI-DSS 256-bit payment vault clearance.',
        completed: true,
      },
      {
        title: 'Dispatched from Houston Air Terminal',
        date: 'Oct 10, 04:12 AM',
        description: 'Loaded onto air express transport container to Austin hub.',
        completed: true,
        current: true,
      },
      {
        title: 'In Transit to Regional Sorting Facility',
        date: 'Estimated Oct 11',
        description: 'Automated conveyor sorting and dispatch routing.',
        completed: false,
      },
      {
        title: 'Out for Delivery',
        date: 'Estimated Oct 12',
        description: 'Direct vehicle drop-off at recipient front desk.',
        completed: false,
      },
    ],
  },
];
