import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

/**
 * Module-level singleton — the Razorpay SDK validates credentials and sets up
 * internal HTTP agent pools on construction. Creating a new instance per
 * request (Async 3) wastes those resources. Hoisting to module scope means
 * it's instantiated once per Node.js process and reused for every call.
 *
 * The unused Supabase admin client that was here has been removed (Leak 5) —
 * it was allocating connection pools on every request without being used.
 */
let razorpayInstance: Razorpay | null = null;

function getRazorpay(): Razorpay {
  if (!razorpayInstance) {
    razorpayInstance = new Razorpay({
      key_id:     process.env.RAZORPAY_KEY_ID     ?? '',
      key_secret: process.env.RAZORPAY_KEY_SECRET ?? '',
    });
  }
  return razorpayInstance;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, receipt, notes } = body;

    if (!amount) {
      return NextResponse.json({ error: 'Amount is required' }, { status: 400 });
    }

    const order = await getRazorpay().orders.create({
      amount:   Math.round(amount * 100), // paise
      currency: 'INR',
      receipt:  receipt ?? `rcpt_${Date.now()}`,
      notes:    notes   ?? {},
    });

    return NextResponse.json(order, { status: 200 });
  } catch (error: any) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
