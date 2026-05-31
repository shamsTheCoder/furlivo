import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || '',
    key_secret: process.env.RAZORPAY_KEY_SECRET || '',
  });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321',
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy'
  );

  try {
    const body = await req.json();
    const { amount, receipt, notes } = body;

    if (!amount) {
      return NextResponse.json({ error: 'Amount is required' }, { status: 400 });
    }

    const options = {
      amount: Math.round(amount * 100), // convert to paise
      currency: "INR",
      receipt: receipt || `rcpt_${Date.now()}`,
      notes: notes || {},
    };

    const order = await razorpay.orders.create(options);

    // If you have a backend order, update it here with razorpay_order_id.
    // For now, we return the razorpay order so the frontend can initiate checkout.

    return NextResponse.json(order, { status: 200 });
  } catch (error: any) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
