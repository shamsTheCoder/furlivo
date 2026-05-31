import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321',
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy'
  );

  try {
    const textBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!signature || !secret) {
      return NextResponse.json({ error: 'Missing signature or secret' }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(textBody)
      .digest('hex');

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(textBody);

    if (event.event === 'payment.captured' || event.event === 'order.paid') {
      const payment = event.payload.payment.entity;
      const orderId = payment.order_id; // Razorpay order id

      // Update the Furlivo order status to paid
      const { error } = await supabase
        .from('orders')
        .update({ status: 'paid', razorpay_payment_id: payment.id })
        .eq('razorpay_order_id', orderId);

      if (error) {
        console.error('Error updating order status:', error);
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error: any) {
    console.error('Error handling Razorpay webhook:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
