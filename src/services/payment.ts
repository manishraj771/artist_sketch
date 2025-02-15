import { SketchType } from '../types';

interface PaymentOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: {
    address: string;
  };
  theme: {
    color: string;
  };
}

export const initializePayment = async (
  sketchType: SketchType,
  customerDetails: {
    name: string;
    email: string;
    phone: string;
    address: string;
  },
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) => {
  try {
    // Load Razorpay script
    await loadRazorpayScript();

    // Convert price to paise (Razorpay expects amount in smallest currency unit)
    const amount = Math.round(sketchType.price * 100);

    const options: PaymentOptions = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || '',
      amount: amount,
      currency: 'INR',
      name: 'ArtisticSketches',
      description: `Payment for ${sketchType.name}`,
      order_id: '', // This should come from your backend
      prefill: {
        name: customerDetails.name,
        email: customerDetails.email,
        contact: customerDetails.phone,
      },
      notes: {
        address: customerDetails.address,
      },
      theme: {
        color: '#4F46E5', // Indigo-600
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.on('payment.success', onSuccess);
    razorpay.on('payment.error', onError);

    razorpay.open();
  } catch (error) {
    console.error('Payment initialization failed:', error);
    onError(error);
  }
};

const loadRazorpayScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
    document.body.appendChild(script);
  });
};