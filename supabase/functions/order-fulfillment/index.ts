// Supabase Edge Function: order-fulfillment
// Triggered after an order is marked "paid"
// Automatically forwards order to CJ Dropshipping API

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

    const { orderId } = await req.json();

    // Fetch the order
    const { data: order, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('id', orderId)
      .single();

    if (error || !order) {
      throw new Error(`Order not found: ${orderId}`);
    }

    // Forward to CJ Dropshipping API
    const cjPayload = {
      orderNumber: order.order_number,
      shippingAddress: order.shipping_address,
      items: order.order_items.map((item: { supplier_sku?: string; quantity: number }) => ({
        sku: item.supplier_sku,
        quantity: item.quantity,
      })),
    };

    const cjResponse = await fetch('https://developers.cjdropshipping.com/api2.0/v1/shopping/order/createOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'CJ-Access-Token': Deno.env.get('CJ_API_KEY') ?? '',
      },
      body: JSON.stringify(cjPayload),
    });

    const cjData = await cjResponse.json();

    if (!cjData.result) {
      throw new Error(`CJ API error: ${JSON.stringify(cjData)}`);
    }

    // Update order with supplier order ID
    await supabase
      .from('orders')
      .update({
        supplier_order_id: cjData.data?.orderId,
        status: 'processing',
      })
      .eq('id', orderId);

    return new Response(
      JSON.stringify({ success: true, supplierOrderId: cjData.data?.orderId }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 },
    );
  }
});
