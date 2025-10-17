import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Non autenticato" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verifica piano premium
    const { data: profile } = await supabaseClient
      .from("profiles")
      .select("subscription_tier, profession, niche, tone")
      .eq("id", user.id)
      .single();

    if (profile?.subscription_tier !== "premium") {
      return new Response(
        JSON.stringify({ error: "Piano Premium richiesto" }),
        {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `Sei un esperto di content marketing per social media. Genera idee di contenuto per un professionista nel settore ${profile.niche} con tono ${profile.tone}.`
          },
          {
            role: "user",
            content: "Genera 6 idee di contenuto uniche per questa settimana. Includi hook, caption completa, CTA e 3 hashtag per ogni idea. Fornisci output in JSON.",
          },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Limite richieste superato, riprova più tardi" }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      throw new Error("Errore AI Gateway");
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Salva le idee nel database
    const ideas = JSON.parse(content);
    const contentIdeas = ideas.map((idea: any) => ({
      user_id: user.id,
      type: idea.type,
      hook: idea.hook,
      caption: idea.caption,
      cta: idea.cta,
      hashtags: idea.hashtags,
    }));

    const { error: insertError } = await supabaseClient
      .from("content_ideas")
      .insert(contentIdeas);

    if (insertError) throw insertError;

    return new Response(JSON.stringify({ success: true, ideas: contentIdeas }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Errore generate-content:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
