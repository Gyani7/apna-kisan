
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    { global: { headers: { Authorization: req.headers.get("Authorization")! } } }
  )

  const { userId, productId } = await req.json()

  const { data, error } = await supabase
    .from("wishlist_items")
    .insert([{ user_id: userId, product_id: productId }])
    .select()

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    })
  }

  return new Response(JSON.stringify({ item: data[0] }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  })
})
