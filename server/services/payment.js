import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const initializePayment = async (order) => {
  const options = {
    amount: Math.round(order.amount * 100), // amount in paise
    currency: 'INR',
    receipt: order._id.toString(),
    notes: {
      orderType: order.sketchType,
      customerEmail: order.customerEmail,
    },
  };

  try {
    const response = await razorpay.orders.create(options);
    return response;
  } catch (error) {
    throw new Error('Payment initialization failed');
  }
};

export const verifyPayment = (razorpayOrderId, razorpayPaymentId, signature) => {
  const text = `${razorpayOrderId}|${razorpayPaymentId}`;
  const generated_signature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(text)
    .digest('hex');
    
  return generated_signature === signature;
};