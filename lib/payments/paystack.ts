import axios from 'axios';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export const initializeTransaction = async (amount: number, email: string, metadata: any) => {
  try {
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        amount: amount * 100, // Paystack expects amount in kobo
        email,
        metadata,
        callback_url: `${process.env.APP_URL}/user/e-filing/success`,
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error('Paystack initialization error:', error);
    throw error;
  }
};

export const verifyTransaction = async (reference: string) => {
  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error('Paystack verification error:', error);
    throw error;
  }
};
