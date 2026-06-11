const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const jsonHeaders = {
  ...corsHeaders,
  "Content-Type": "application/json",
};

const limits = {
  name: 80,
  email: 120,
  message: 1200,
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: jsonHeaders,
  });
}

function cleanText(value: unknown, maxLength: number) {
  return String(value || "").trim().slice(0, maxLength);
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  const supabaseUrl = Deno.env.get("PROJECT_URL");
  const serviceRoleKey = Deno.env.get("SERVICE_ROLE_KEY");
  const turnstileSecret = Deno.env.get("TURNSTILE_SECRET_KEY");

  if (!supabaseUrl || !serviceRoleKey || !turnstileSecret) {
    return jsonResponse({ error: "Server is not configured" }, 500);
  }

  let payload: Record<string, unknown>;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON" }, 400);
  }

  const token = cleanText(payload.turnstileToken, 4096);
  const name = cleanText(payload.name, limits.name);
  const email = cleanText(payload.email, limits.email);
  const message = cleanText(payload.message, limits.message);

  if (!token) {
    return jsonResponse({ error: "Missing Turnstile token" }, 400);
  }

  if (!name || !email || !message) {
    return jsonResponse({ error: "Missing required fields" }, 400);
  }

  const turnstileBody = new FormData();
  turnstileBody.append("secret", turnstileSecret);
  turnstileBody.append("response", token);

  const ip = request.headers.get("CF-Connecting-IP");
  if (ip) {
    turnstileBody.append("remoteip", ip);
  }

  const turnstileResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: turnstileBody,
  });
  const turnstileResult = await turnstileResponse.json();

  if (!turnstileResult.success) {
    return jsonResponse({ error: "Turnstile verification failed" }, 403);
  }

  const insertResponse = await fetch(`${supabaseUrl}/rest/v1/messages`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ name, email, message }),
  });

  if (!insertResponse.ok) {
    const errorText = await insertResponse.text();
    console.error("Supabase insert failed", insertResponse.status, errorText);
    return jsonResponse({ error: "Message could not be saved" }, 500);
  }

  return jsonResponse({ ok: true });
});
