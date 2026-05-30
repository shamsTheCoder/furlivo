// Supabase Edge Function: supplier-sync
// Syncs inventory levels from CJ Dropshipping every 6 hours
// Triggered by Supabase cron or external scheduler

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

    // Fetch all active products with supplier SKUs
    const { data: products } = await supabase
      .from('products')
      .select('id, supplier_sku, inventory')
      .eq('is_active', true)
      .not('supplier_sku', 'is', null);

    if (!products?.length) {
      return new Response(JSON.stringify({ synced: 0 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let synced = 0;
    for (const product of products) {
      try {
        // Get stock level from CJ Dropshipping
        const cjRes = await fetch(
          `https://developers.cjdropshipping.com/api2.0/v1/product/query?pid=${product.supplier_sku}`,
          {
            headers: { 'CJ-Access-Token': Deno.env.get('CJ_API_KEY') ?? '' },
          }
        );
        const cjData = await cjRes.json();
        const stock = cjData?.data?.stock ?? product.inventory;

        // Update inventory in Supabase
        await supabase
          .from('products')
          .update({ inventory: stock, is_active: stock > 0 })
          .eq('id', product.id);

        synced++;
      } catch {
        console.error(`Failed to sync SKU: ${product.supplier_sku}`);
      }
    }

    return new Response(JSON.stringify({ synced, total: products.length }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 },
    );
  }
});
