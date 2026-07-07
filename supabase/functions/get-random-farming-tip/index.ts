
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

serve(async (_req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    { global: { headers: { Authorization: _req.headers.get("Authorization")! } } }
  )

  const { data, error } = await supabase
    .from("farming_tips")
    .select("*")
    .limit(1)

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    })
  }

  return new Response(JSON.stringify({ tip: data[0] }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  })
})
