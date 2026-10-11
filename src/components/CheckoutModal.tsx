import React, { useState } from 'react';
import { CartItem, CurrencyConfig, Order } from '../types';
import { formatPrice } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: CurrencyConfig;
  discountPct: number;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  discountPct,
  onOrderSuccess,
}) => {
  const isEgp = currency.code === 'EGP';

  // State for form data
  const [formData, setFormData] = useState({
    name: isEgp ? 'أحمد محمود القاضي' : 'Fahad Al-Maktoum',
    email: isEgp ? 'ahmed.m@example.com' : 'fahad.m@example.com',
    phone: isEgp ? '01002345678' : '+971 50 123 4567',
    country: isEgp ? 'Egypt' : 'United Arab Emirates',
    governorate: 'القاهرة (Cairo)',
    city: isEgp ? 'القاهرة الجديدة / التجمع الخامس' : 'Dubai',
    address: isEgp ? 'شارع التسعين الشمالي، برج فيكسورا، شقة 402' : 'Downtown Tower 4, Suite 1902',
    postalCode: '11835',
    // Payment method: visa, vodafone_cash, orange_cash, cod
    paymentMethod: 'visa' as 'visa' | 'vodafone_cash' | 'orange_cash' | 'cod',
    // Card inputs
    cardNumber: '4123 8892 4102 9942',
    cardHolder: isEgp ? 'AHMED MAHMOUD EL-KADI' : 'FAHAD AL-MAKTOUM',
    cardExp: '12/28',
    cardCvc: '884',
    // Vodafone Cash inputs
    vodafoneSenderPhone: isEgp ? '01002345678' : '01012345678',
    vodafoneRefId: 'VF-' + Math.floor(100000 + Math.random() * 900000),
    // Orange Cash inputs
    orangeSenderPhone: isEgp ? '01223456789' : '01212345678',
    orangeRefId: 'OC-' + Math.floor(100000 + Math.random() * 900000),
  });

  const [copiedWallet, setCopiedWallet] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const rawSubtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const discountAmount = discountPct > 0 ? (rawSubtotal * discountPct) / 100 : 0;
  const subtotalAfterDiscount = Math.max(0, rawSubtotal - discountAmount);
  const shippingCost = rawSubtotal >= 75 || rawSubtotal === 0 ? 0 : 9.99;
  const total = subtotalAfterDiscount + shippingCost;

  // Merchant official wallets
  const VODAFONE_OFFICIAL_WALLET = '01099482103';
  const ORANGE_OFFICIAL_WALLET = '01277391054';

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedWallet(type);
    setTimeout(() => setCopiedWallet(null), 2500);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    if (formData.paymentMethod === 'vodafone_cash') {
      setProcessingStep('جاري الاتصال بشبكة فودافون كاش والتحقق من رقم المحفظة...');
      setTimeout(() => {
        setProcessingStep('تم توثيق إيصال التحويل بنجاح على محفظة Vexora الرسمية...');
      }, 1000);
      setTimeout(() => {
        setProcessingStep('تأكيد العملية وتخصيص بوليصة شحن جوي سريع...');
      }, 2000);
    } else if (formData.paymentMethod === 'orange_cash') {
      setProcessingStep('جاري الاتصال بشبكة أورنج كاش والتحقق من المعاملة...');
      setTimeout(() => {
        setProcessingStep('تم اعتماد التحويل عبر محفظة أورنج كاش المعتمدة...');
      }, 1000);
      setTimeout(() => {
        setProcessingStep('تأكيد العملية وتخصيص بوليصة شحن جوي سريع...');
      }, 2000);
    } else if (formData.paymentMethod === 'visa') {
      setProcessingStep('الاتصال بالبوابة المصرفية المشفرة 256-Bit SSL 3D Secure...');
      setTimeout(() => {
        setProcessingStep('المصادقة البنكية لبطاقة فيزا معتمدة بنجاح...');
      }, 1000);
      setTimeout(() => {
        setProcessingStep('حجز الشحنة من المستودع الإقليمي وطباعة الباركود...');
      }, 2000);
    } else {
      setProcessingStep('تسجيل طلب الدفع عند الاستلام والتحقق من بيانات العنوان...');
      setTimeout(() => {
        setProcessingStep('إرسال إشعار للمندوب وتخصيص حزمة المنتجات...');
      }, 1200);
    }

    setTimeout(() => {
      const orderId = `VX-${Math.floor(10000 + Math.random() * 90000)}`;
      const trackingCode =
        formData.country === 'Egypt'
          ? `EG-EXP-${Math.floor(100000 + Math.random() * 900000)}`
          : `AIR-EXP-${Math.floor(1000000 + Math.random() * 9000000)}`;

      let paymentLabel = 'فيزا (Visa Card)';
      let walletRef = '';
      if (formData.paymentMethod === 'vodafone_cash') {
        paymentLabel = 'فودافون كاش (Vodafone Cash)';
        walletRef = `${formData.vodafoneSenderPhone} | Ref: ${formData.vodafoneRefId}`;
      } else if (formData.paymentMethod === 'orange_cash') {
        paymentLabel = 'أورنج كاش (Orange Cash)';
        walletRef = `${formData.orangeSenderPhone} | Ref: ${formData.orangeRefId}`;
      } else if (formData.paymentMethod === 'cod') {
        paymentLabel = 'الدفع عند الاستلام (COD)';
      }

      const newOrder: Order = {
        id: orderId,
        items,
        subtotal: rawSubtotal,
        discount: discountAmount,
        shipping: shippingCost,
        total,
        currency: currency.code,
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        address: `${formData.address}, ${formData.city}, ${formData.governorate}`,
        paymentMethod: formData.paymentMethod,
        walletReference: walletRef,
        status: 'Order Confirmed',
        createdAt: new Date().toISOString(),
        estimatedDelivery:
          formData.country === 'Egypt'
            ? 'خلال 24 إلى 48 ساعة (شحن سريع لجميع محافظات مصر)'
            : '5-7 Business Days (Air Express)',
        trackingNumber: trackingCode,
        timeline: [
          {
            title: 'تم تأكيد الطلب وتوثيق الدفع',
            date: 'الآن',
            description: `تم سداد وقبول الدفع بنجاح عبر [${paymentLabel}]. تم إرسال الطلب لخط التغليف الفوري.`,
            completed: true,
            current: true,
          },
          {
            title: 'تجهيز الشحنة وفحص الجودة الإلكتروني',
            date: 'مجدول خلال ساعات قليلة',
            description: 'فحص كل جهاز واختباره وتغليفه في عبوة حماية Titanium Cyber المقاومة للصدمات.',
            completed: false,
          },
          {
            title: 'تسليم الشحنة لشركة الشحن السريع',
            date: 'خلال 24 ساعة',
            description: `إصدار بوليصة التوصيل (${trackingCode}) المتجهة إلى ${formData.city}.`,
            completed: false,
          },
          {
            title: 'التسليم إلى باب المنزل',
            date: formData.country === 'Egypt' ? 'خلال 24-48 ساعة' : 'خلال 3-5 أيام',
            description: 'التواصل المباشر عبر الهاتف وواتساب من المندوب قبل الوصول.',
            completed: false,
          },
        ],
      };

      setIsProcessing(false);
      setCompletedOrder(newOrder);
      onOrderSuccess(newOrder);
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#181e27] border border-[#3b494c] rounded-2xl max-w-2xl w-full p-5 lg:p-7 shadow-2xl relative my-6 text-[#e2e2e6] max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        {!isProcessing && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#849396] hover:text-[#e2e2e6] text-sm p-1.5 rounded-lg hover:bg-[#282a2d] transition-colors cursor-pointer"
          >
            ✕
          </button>
        )}

        {/* Processing State */}
        {isProcessing && (
          <div className="py-16 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-16 h-16 border-4 border-[#282a2d] border-t-[#00e5ff] rounded-full animate-spin" />
            <h3 className="font-space font-bold text-xl text-[#e2e2e6] mt-2">
              جاري معالجة وتأكيد الدفع المشفر
            </h3>
            <p className="text-sm text-[#00e5ff] font-space font-semibold animate-pulse max-w-md">
              {processingStep}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#849396] font-space mt-2">
              <span className="material-symbols-outlined text-[16px] text-[#00e5ff]">lock</span>
              تشفير مصرفي آمن 256-Bit SSL
            </div>
          </div>
        )}

        {/* Completed State */}
        {!isProcessing && completedOrder && (
          <div className="py-4 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#00e5ff]/20 text-[#00e5ff] flex items-center justify-center shadow-[0_0_28px_rgba(0,229,255,0.6)]">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>

            <div>
              <span className="text-[11px] font-space uppercase font-bold text-[#00e5ff] tracking-widest bg-[#00e5ff]/10 px-3.5 py-1 rounded-full border border-[#00e5ff]/30">
                تم اعتماد الدفع وتأكيد الحجز بنجاح
              </span>
              <h3 className="font-space font-bold text-2xl lg:text-3xl text-[#e2e2e6] mt-2">
                تهانينا! تم تأكيد طلبك
              </h3>
              <p className="text-xs text-[#bac9cc] mt-1">
                رقم الطلب الخاص بك هو:{' '}
                <strong className="text-[#00e5ff] font-space text-base font-bold ml-1">
                  {completedOrder.id}
                </strong>
              </p>
            </div>

            <div className="w-full bg-[#11151b] border border-[#3b494c]/50 rounded-xl p-4 text-left my-2 text-xs flex flex-col gap-2.5">
              <div className="flex justify-between items-center pb-2 border-b border-[#3b494c]/30">
                <span className="text-[#849396]">طريقة الدفع المعتمدة:</span>
                <span className="font-space font-bold text-sm text-[#e2e2e6] flex items-center gap-1.5">
                  {completedOrder.paymentMethod === 'vodafone_cash' && (
                    <span className="px-2 py-0.5 rounded bg-[#e60000]/20 text-[#ff4d4d] border border-[#e60000]/40 font-bold text-[11px]">
                      فودافون كاش (Vodafone Cash)
                    </span>
                  )}
                  {completedOrder.paymentMethod === 'orange_cash' && (
                    <span className="px-2 py-0.5 rounded bg-[#ff7900]/20 text-[#ff9933] border border-[#ff7900]/40 font-bold text-[11px]">
                      أورنج كاش (Orange Cash)
                    </span>
                  )}
                  {completedOrder.paymentMethod === 'visa' && (
                    <span className="px-2 py-0.5 rounded bg-[#00579f]/20 text-[#4da6ff] border border-[#00579f]/40 font-bold text-[11px]">
                      فيزا / ماستركارد (Visa Card)
                    </span>
                  )}
                  {completedOrder.paymentMethod === 'cod' && (
                    <span className="px-2 py-0.5 rounded bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/40 font-bold text-[11px]">
                      الدفع عند الاستلام (COD)
                    </span>
                  )}
                </span>
              </div>

              {completedOrder.walletReference && (
                <div className="flex justify-between items-center text-[11px] bg-[#181e27] p-2 rounded border border-[#3b494c]/30">
                  <span className="text-[#849396]">بيانات مرجع المحفظة:</span>
                  <span className="font-mono-tabular text-[#00e5ff] font-bold">
                    {completedOrder.walletReference}
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-[#849396]">رقم بوليصة الشحن السريع:</span>
                <span className="font-mono-tabular font-bold text-[#00e5ff]">
                  {completedOrder.trackingNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#849396]">المستلم:</span>
                <span className="text-[#e2e2e6] font-semibold">{completedOrder.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#849396]">عنوان التوصيل:</span>
                <span className="text-[#e2e2e6] text-right max-w-xs">{completedOrder.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#849396]">موعد التوصيل المتوقع:</span>
                <span className="text-[#00e5ff] font-bold">
                  {completedOrder.estimatedDelivery}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#3b494c]/40 text-sm font-bold text-[#e2e2e6]">
                <span>المبلغ الإجمالي المسدد:</span>
                <span className="font-space text-[#00e5ff] text-base">
                  {formatPrice(completedOrder.total, currency)}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full pt-1">
              <button
                onClick={onClose}
                className="flex-1 py-3.5 rounded-xl bg-[#00e5ff] text-[#001f24] font-space font-bold text-xs uppercase tracking-wider hover:bg-[#9cf0ff] transition-all cursor-pointer shadow-lg flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                تتبع حالة الشحنة بالرقم ({completedOrder.trackingNumber})
              </button>
              <button
                onClick={onClose}
                className="py-3.5 px-6 rounded-xl bg-[#282a2d] hover:bg-[#333538] text-[#e2e2e6] font-space text-xs uppercase font-bold transition-all cursor-pointer"
              >
                متابعة التسوق
              </button>
            </div>
          </div>
        )}

        {/* Checkout Form */}
        {!isProcessing && !completedOrder && (
          <div>
            <div className="border-b border-[#3b494c]/40 pb-3 mb-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00e5ff] text-2xl">lock</span>
                  <h2 className="font-space font-bold text-lg sm:text-xl uppercase tracking-tight text-[#e2e2e6]">
                    إتمام الطلب والدفع الآمن
                  </h2>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#00e5ff]/10 text-[#00e5ff] text-[10px] font-space font-bold border border-[#00e5ff]/30">
                  256-Bit SSL Vault
                </span>
              </div>
              <p className="text-xs text-[#bac9cc] mt-1">
                دفع معتمد وسريع • شحن جوي فوري لجميع أنحاء مصر والشرق الأوسط
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* PAYMENT METHOD SELECTOR - VISA / VODAFONE CASH / ORANGE CASH */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-space font-bold uppercase tracking-wider text-[#bac9cc] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#00e5ff] text-[16px]">payments</span>
                    اختر طريقة الدفع (Payment Method)
                  </label>
                  <span className="text-[11px] text-[#00e5ff] font-bold">
                    معاملات بدون رسوم إضافية
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {/* 1. VISA / MASTERCARD */}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'visa' })}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer relative ${
                      formData.paymentMethod === 'visa'
                        ? 'border-[#00e5ff] bg-[#00e5ff]/10 text-[#00e5ff] shadow-[0_0_14px_rgba(0,229,255,0.25)]'
                        : 'border-[#3b494c] bg-[#11151b] text-[#bac9cc] hover:border-[#849396]'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <span className="font-space font-black text-xs tracking-wider text-[#4da6ff]">VISA</span>
                      <span className="text-[9px] text-[#849396]">/</span>
                      <span className="font-space font-bold text-[10px] text-[#ff5f00]">MC</span>
                    </div>
                    <span className="font-space font-bold text-xs text-[#e2e2e6]">فيزا / كارت</span>
                    <span className="text-[10px] text-[#849396]">Visa / Bank Card</span>
                  </button>

                  {/* 2. VODAFONE CASH */}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'vodafone_cash' })}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer relative ${
                      formData.paymentMethod === 'vodafone_cash'
                        ? 'border-[#ff3333] bg-[#e60000]/15 text-[#ff4d4d] shadow-[0_0_14px_rgba(230,0,0,0.3)]'
                        : 'border-[#3b494c] bg-[#11151b] text-[#bac9cc] hover:border-[#ff3333]/50'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-[#e60000] text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
                      VF
                    </div>
                    <span className="font-space font-bold text-xs text-[#ff4d4d]">فودافون كاش</span>
                    <span className="text-[10px] text-[#849396]">Vodafone Cash</span>
                  </button>

                  {/* 3. ORANGE CASH */}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'orange_cash' })}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer relative ${
                      formData.paymentMethod === 'orange_cash'
                        ? 'border-[#ff7900] bg-[#ff7900]/15 text-[#ff9933] shadow-[0_0_14px_rgba(255,121,0,0.3)]'
                        : 'border-[#3b494c] bg-[#11151b] text-[#bac9cc] hover:border-[#ff7900]/50'
                    }`}
                  >
                    <div className="w-5 h-5 rounded bg-[#ff7900] text-black flex items-center justify-center text-[10px] font-bold shadow-sm">
                      OC
                    </div>
                    <span className="font-space font-bold text-xs text-[#ff9933]">أورنج كاش</span>
                    <span className="text-[10px] text-[#849396]">Orange Cash</span>
                  </button>

                  {/* 4. CASH ON DELIVERY */}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer relative ${
                      formData.paymentMethod === 'cod'
                        ? 'border-[#00e5ff] bg-[#00e5ff]/10 text-[#00e5ff] shadow-[0_0_14px_rgba(0,229,255,0.25)]'
                        : 'border-[#3b494c] bg-[#11151b] text-[#bac9cc] hover:border-[#849396]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px] text-[#00e5ff]">local_atm</span>
                    <span className="font-space font-bold text-xs text-[#e2e2e6]">عند الاستلام</span>
                    <span className="text-[10px] text-[#849396]">Cash On Delivery</span>
                  </button>
                </div>
              </div>

              {/* DYNAMIC PAYMENT METHOD DETAILS */}

              {/* 1. VISA / MASTERCARD SECTION */}
              {formData.paymentMethod === 'visa' && (
                <div className="bg-[#11151b] p-4 rounded-xl border border-[#00e5ff]/30 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs font-space">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#e2e2e6]">الدفع ببطاقة فيزا / ماستركارد</span>
                      <span className="px-2 py-0.5 rounded bg-[#4da6ff]/20 text-[#4da6ff] font-bold text-[10px]">
                        3D Secure مصدق
                      </span>
                    </div>
                    <span className="text-[#00e5ff] flex items-center gap-1 text-[11px]">
                      <span className="material-symbols-outlined text-[15px]">lock</span>
                      تشفير 256-Bit
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#849396] mb-1">
                      اسم حامل البطاقة (Cardholder Name)
                    </label>
                    <input
                      type="text"
                      name="cardHolder"
                      required
                      value={formData.cardHolder}
                      onChange={handleInputChange}
                      placeholder="e.g. AHMED MAHMOUD"
                      className="w-full bg-[#181e27] border border-[#3b494c] rounded-lg px-3 py-2 text-xs text-[#e2e2e6] uppercase font-mono-tabular focus:border-[#00e5ff] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#849396] mb-1">
                      رقم بطاقة فيزا (Visa / Mastercard Number)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cardNumber"
                        required
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="4xxx xxxx xxxx xxxx"
                        className="w-full bg-[#181e27] border border-[#3b494c] rounded-lg px-3 py-2 text-xs text-[#e2e2e6] font-mono-tabular focus:border-[#00e5ff] focus:outline-none tracking-wider"
                      />
                      <span className="absolute right-3 top-2.5 font-space font-black text-xs text-[#4da6ff]">
                        VISA
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-[#849396] mb-1">تاريخ الانتهاء (MM/YY)</label>
                      <input
                        type="text"
                        name="cardExp"
                        required
                        value={formData.cardExp}
                        onChange={handleInputChange}
                        placeholder="12/28"
                        className="w-full bg-[#181e27] border border-[#3b494c] rounded-lg px-3 py-2 text-xs text-[#e2e2e6] font-mono-tabular focus:border-[#00e5ff] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#849396] mb-1">رمز الأمان (CVC / CVV)</label>
                      <input
                        type="text"
                        name="cardCvc"
                        required
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        placeholder="884"
                        maxLength={4}
                        className="w-full bg-[#181e27] border border-[#3b494c] rounded-lg px-3 py-2 text-xs text-[#e2e2e6] font-mono-tabular focus:border-[#00e5ff] focus:outline-none"
                      />
                    </div>
                  </div>

                  <p className="text-[11px] text-[#849396] leading-relaxed pt-1">
                    🔒 سيتم تحويلك لصفحة التحقق البنكي عبر رسالة نصية OTP صادرة من البنك لضمان حماية مشترياتك.
                  </p>
                </div>
              )}

              {/* 2. VODAFONE CASH SECTION */}
              {formData.paymentMethod === 'vodafone_cash' && (
                <div className="bg-[#11151b] p-4 rounded-xl border border-[#e60000]/40 flex flex-col gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#3b494c]/30">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#e60000] text-white flex items-center justify-center text-xs font-black">
                        VF
                      </div>
                      <span className="font-space font-bold text-sm text-[#ff4d4d]">
                        محفظة فودافون كاش الرسمية (Vodafone Cash)
                      </span>
                    </div>
                    <span className="text-[11px] text-[#ff4d4d] font-bold bg-[#e60000]/10 px-2 py-0.5 rounded border border-[#e60000]/30">
                      تحويل مباشر فوري
                    </span>
                  </div>

                  {/* Merchant Wallet Box */}
                  <div className="bg-[#181e27] p-3 rounded-xl border border-[#e60000]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <p className="text-[11px] text-[#bac9cc]">رقم محفظة فودافون كاش المعتمد للتحويل:</p>
                      <p className="font-space font-extrabold text-base text-[#ff4d4d] tracking-widest mt-0.5">
                        {VODAFONE_OFFICIAL_WALLET}
                      </p>
                      <p className="text-[10px] text-[#849396]">
                        المبلغ المطلوب تحويله:{' '}
                        <strong className="text-[#00e5ff] font-space text-xs">
                          {formatPrice(total, currency)}
                        </strong>
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(VODAFONE_OFFICIAL_WALLET, 'vodafone')}
                      className="px-3 py-1.5 rounded-lg bg-[#e60000] hover:bg-[#ff1a1a] text-white text-xs font-space font-bold cursor-pointer transition-all flex items-center gap-1.5 self-end sm:self-center"
                    >
                      <span className="material-symbols-outlined text-[16px]">content_copy</span>
                      {copiedWallet === 'vodafone' ? 'تم نسخ الرقم ✓' : 'نسخ رقم المحفظة'}
                    </button>
                  </div>

                  {/* Customer Inputs for Vodafone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-[11px] text-[#bac9cc] mb-1 font-semibold">
                        رقم محفظتك الذي ستقوم بالتحويل منه:
                      </label>
                      <input
                        type="text"
                        name="vodafoneSenderPhone"
                        required
                        value={formData.vodafoneSenderPhone}
                        onChange={handleInputChange}
                        placeholder="010xxxxxxxx"
                        className="w-full bg-[#181e27] border border-[#3b494c] rounded-lg px-3 py-2 text-xs text-[#e2e2e6] font-mono-tabular focus:border-[#ff4d4d] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#bac9cc] mb-1 font-semibold">
                        رقم المعاملة / كود التحويل (Transaction ID):
                      </label>
                      <input
                        type="text"
                        name="vodafoneRefId"
                        required
                        value={formData.vodafoneRefId}
                        onChange={handleInputChange}
                        placeholder="e.g. VF-849102"
                        className="w-full bg-[#181e27] border border-[#3b494c] rounded-lg px-3 py-2 text-xs text-[#00e5ff] font-mono-tabular focus:border-[#ff4d4d] focus:outline-none font-bold"
                      />
                    </div>
                  </div>

                  <div className="bg-[#181e27]/80 p-2.5 rounded-lg text-[11px] text-[#bac9cc] leading-relaxed border border-[#3b494c]/20">
                    💡 <strong>طريقة التحويل السريع:</strong> اطلب كود{' '}
                    <code className="text-[#ff4d4d] font-mono font-bold bg-[#11151b] px-1 py-0.5 rounded">
                      *9*7*{VODAFONE_OFFICIAL_WALLET}#
                    </code>{' '}
                    أو حول مباشرة من تطبيق «أنا فودافون - Ana Vodafone»، وسنقوم بتأكيد الطلب وشحنه فوراً!
                  </div>
                </div>
              )}

              {/* 3. ORANGE CASH SECTION */}
              {formData.paymentMethod === 'orange_cash' && (
                <div className="bg-[#11151b] p-4 rounded-xl border border-[#ff7900]/40 flex flex-col gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#3b494c]/30">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-[#ff7900] text-black flex items-center justify-center text-xs font-black">
                        OC
                      </div>
                      <span className="font-space font-bold text-sm text-[#ff9933]">
                        محفظة أورنج كاش الرسمية (Orange Cash)
                      </span>
                    </div>
                    <span className="text-[11px] text-[#ff9933] font-bold bg-[#ff7900]/10 px-2 py-0.5 rounded border border-[#ff7900]/30">
                      تحويل فوري بدون رسوم
                    </span>
                  </div>

                  {/* Merchant Wallet Box */}
                  <div className="bg-[#181e27] p-3 rounded-xl border border-[#ff7900]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <p className="text-[11px] text-[#bac9cc]">رقم محفظة أورنج كاش المعتمد للتحويل:</p>
                      <p className="font-space font-extrabold text-base text-[#ff9933] tracking-widest mt-0.5">
                        {ORANGE_OFFICIAL_WALLET}
                      </p>
                      <p className="text-[10px] text-[#849396]">
                        المبلغ المطلوب تحويله:{' '}
                        <strong className="text-[#00e5ff] font-space text-xs">
                          {formatPrice(total, currency)}
                        </strong>
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(ORANGE_OFFICIAL_WALLET, 'orange')}
                      className="px-3 py-1.5 rounded-lg bg-[#ff7900] hover:bg-[#ff9433] text-black text-xs font-space font-bold cursor-pointer transition-all flex items-center gap-1.5 self-end sm:self-center"
                    >
                      <span className="material-symbols-outlined text-[16px]">content_copy</span>
                      {copiedWallet === 'orange' ? 'تم نسخ الرقم ✓' : 'نسخ رقم المحفظة'}
                    </button>
                  </div>

                  {/* Customer Inputs for Orange */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-[11px] text-[#bac9cc] mb-1 font-semibold">
                        رقم محفظتك الذي ستقوم بالتحويل منه:
                      </label>
                      <input
                        type="text"
                        name="orangeSenderPhone"
                        required
                        value={formData.orangeSenderPhone}
                        onChange={handleInputChange}
                        placeholder="012xxxxxxxx"
                        className="w-full bg-[#181e27] border border-[#3b494c] rounded-lg px-3 py-2 text-xs text-[#e2e2e6] font-mono-tabular focus:border-[#ff9933] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#bac9cc] mb-1 font-semibold">
                        رقم المعاملة / كود التحويل (Transaction ID):
                      </label>
                      <input
                        type="text"
                        name="orangeRefId"
                        required
                        value={formData.orangeRefId}
                        onChange={handleInputChange}
                        placeholder="e.g. OC-938201"
                        className="w-full bg-[#181e27] border border-[#3b494c] rounded-lg px-3 py-2 text-xs text-[#00e5ff] font-mono-tabular focus:border-[#ff9933] focus:outline-none font-bold"
                      />
                    </div>
                  </div>

                  <div className="bg-[#181e27]/80 p-2.5 rounded-lg text-[11px] text-[#bac9cc] leading-relaxed border border-[#3b494c]/20">
                    💡 <strong>طريقة التحويل السريع:</strong> اطلب كود{' '}
                    <code className="text-[#ff9933] font-mono font-bold bg-[#11151b] px-1 py-0.5 rounded">
                      #115#
                    </code>{' '}
                    واختر تحويل أموال لرقم {ORANGE_OFFICIAL_WALLET} أو عبر تطبيق «أورنج كاش - Orange Cash».
                  </div>
                </div>
              )}

              {/* 4. CASH ON DELIVERY SECTION */}
              {formData.paymentMethod === 'cod' && (
                <div className="bg-[#11151b] p-4 rounded-xl border border-[#3b494c]/60 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#00e5ff]">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    الدفع نقداً عند استلام الشحنة (معاينة المنتج قبل الدفع متاحة)
                  </div>
                  <p className="text-[11px] text-[#bac9cc] leading-relaxed">
                    سيقوم مندوب الشحن بالتواصل معك هاتفياً قبل موعد التسليم بـ 3 ساعات لتأكيد عنوانك. يرجى تجهيز المبلغ المحدد نقداً عند الاستلام.
                  </p>
                </div>
              )}

              {/* Shipping Contact Details */}
              <div className="flex flex-col gap-3 pt-1">
                <h4 className="font-space font-bold text-xs uppercase text-[#bac9cc] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#00e5ff] text-[16px]">local_shipping</span>
                  بيانات الشحن وعنوان التوصيل
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#849396] mb-1">الاسم بالكامل (Full Name)</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="أحمد محمود القاضي"
                      className="w-full bg-[#11151b] border border-[#3b494c] rounded-lg px-3 py-2 text-xs text-[#e2e2e6] focus:border-[#00e5ff] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#849396] mb-1">البريد الإلكتروني (Email Address)</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@example.com"
                      className="w-full bg-[#11151b] border border-[#3b494c] rounded-lg px-3 py-2 text-xs text-[#e2e2e6] focus:border-[#00e5ff] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#849396] mb-1">
                      رقم الهاتف المحمول (لتتبع الرسائل ومكالمة المندوب)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="01002345678"
                      className="w-full bg-[#11151b] border border-[#3b494c] rounded-lg px-3 py-2 text-xs text-[#e2e2e6] font-mono-tabular focus:border-[#00e5ff] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#849396] mb-1">دولة الشحن (Country)</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full bg-[#11151b] border border-[#3b494c] rounded-lg px-3 py-2 text-xs text-[#e2e2e6] focus:border-[#00e5ff] focus:outline-none"
                    >
                      <option value="Egypt">Egypt - جمهورية مصر العربية (شحن فوري)</option>
                      <option value="United Arab Emirates">United Arab Emirates (الإمارات)</option>
                      <option value="Saudi Arabia">Saudi Arabia (المملكة العربية السعودية)</option>
                      <option value="Kuwait">Kuwait (الكويت)</option>
                      <option value="Qatar">Qatar (قطر)</option>
                      <option value="United States">United States (USA)</option>
                      <option value="United Kingdom">United Kingdom (UK)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#849396] mb-1">المحافظة</label>
                    <select
                      name="governorate"
                      value={formData.governorate}
                      onChange={handleInputChange}
                      className="w-full bg-[#11151b] border border-[#3b494c] rounded-lg px-3 py-2 text-xs text-[#e2e2e6] focus:border-[#00e5ff] focus:outline-none"
                    >
                      <option value="القاهرة (Cairo)">القاهرة (Cairo)</option>
                      <option value="الجيزة (Giza)">الجيزة (Giza)</option>
                      <option value="الإسكندرية (Alexandria)">الإسكندرية (Alexandria)</option>
                      <option value="القليوبية (Qalyubia)">القليوبية (Qalyubia)</option>
                      <option value="الشرقية (Sharqia)">الشرقية (Sharqia)</option>
                      <option value="الدقهلية / المنصورة (Mansoura)">الدقهلية / المنصورة</option>
                      <option value="الغربية / طنطا (Tanta)">الغربية / طنطا</option>
                      <option value="البحيرة (Beheira)">البحيرة</option>
                      <option value="المنوفية (Menoufia)">المنوفية</option>
                      <option value="بورسعيد (Port Said)">بورسعيد</option>
                      <option value="السويس (Suez)">السويس</option>
                      <option value="الإسماعيلية (Ismailia)">الإسماعيلية</option>
                      <option value="الفيوم / بني سويف (Beni Suef)">الفيوم / بني سويف</option>
                      <option value="أسيوط / سوهاج / قنا / أسوان">محافظات الصعيد (شحن سريع)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-[#849396] mb-1">العنوان بالتفصيل (الشارع، العمارة، الشقة)</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="شارع التسعين الشمالي، عمارة 12، شقة 4"
                      className="w-full bg-[#11151b] border border-[#3b494c] rounded-lg px-3 py-2 text-xs text-[#e2e2e6] focus:border-[#00e5ff] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Order Final Summary */}
              <div className="bg-[#11151b] p-4 rounded-xl border border-[#3b494c]/40 flex flex-col gap-2 text-xs">
                <div className="flex justify-between text-[#bac9cc]">
                  <span>إجمالي المنتجات ({items.length} قطع)</span>
                  <span className="font-space">{formatPrice(rawSubtotal, currency)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#00e5ff]">
                    <span>كوبون الخصم الترويجي ({discountPct}%)</span>
                    <span className="font-space">-{formatPrice(discountAmount, currency)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#bac9cc]">
                  <span>مصاريف الشحن الجوي السريع</span>
                  <span className="font-space text-[#00e5ff] font-bold">
                    {shippingCost === 0 ? 'مجاني (FREE)' : formatPrice(shippingCost, currency)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#e2e2e6] pt-2 border-t border-[#3b494c]/30">
                  <span className="font-space uppercase">المبلغ الإجمالي المستحق</span>
                  <span className="font-space text-[#00e5ff] text-lg font-black">
                    {formatPrice(total, currency)}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#00e5ff] hover:bg-[#9cf0ff] text-[#001f24] font-space text-base uppercase tracking-wider font-black shadow-[0_0_28px_rgba(0,229,255,0.45)] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[22px]">verified_user</span>
                {formData.paymentMethod === 'vodafone_cash' && 'تأكيد الدفع عبر فودافون كاش وحجز الشحن'}
                {formData.paymentMethod === 'orange_cash' && 'تأكيد الدفع عبر أورنج كاش وحجز الشحن'}
                {formData.paymentMethod === 'visa' && 'إتمام الدفع ببطاقة فيزا وتأكيد الشحن'}
                {formData.paymentMethod === 'cod' && 'تأكيد الطلب بالدفع عند الاستلام'}
                {' '}({formatPrice(total, currency)})
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
