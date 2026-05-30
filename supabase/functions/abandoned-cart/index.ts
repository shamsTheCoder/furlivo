// Supabase Edge Function: abandoned-cart
// Called by a Supabase scheduled job every 30 minutes
// Sends recovery email to users who added to cart but didn't check out

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Find orders that are still "pending" after 1 hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    const { data: abandonedOrders } = await supabase
      .from('orders')
      .select('id, guest_email, customer_id, total, order_items(*)')
      .eq('status', 'pending')
      .lt('created_at', oneHourAgo)
      .limit(50);

    if (!abandonedOrders?.length) {
      return new Response(JSON.stringify({ processed: 0 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let sent = 0;
    for (const order of abandonedOrders) {
      const email = order.guest_email;
      if (!email) continue;

      // Send recovery email via Resend
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        },
        body: JSON.stringify({
          from: 'Furlivo <hello@furlivo.shop>',
          to: email,
          subject: '🐾 You left something behind...',
          html: `
            <h1>Your cart misses you!</h1>
            <p>You left items worth $${(order.total / 100).toFixed(2)} in your cart.</p>
            <a href="https://furlivo.shop/checkout?recover=${order.id}">Complete your order</a>
            <p>Use code <strong>COMEBACK10</strong> for 10% off!</p>
          `,
        }),
      });

      sent++;
    }

    return new Response(JSON.stringify({ processed: sent }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 },
    );
  }
});
