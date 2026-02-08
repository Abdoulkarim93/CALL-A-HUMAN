
export interface Env {
  MY_BUCKET: R2Bucket;
  TELEGRAM_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };

    try {
      if (url.pathname === "/api/access") {
        await sendTelegramMessage(env, "🚀 Site Accessed!");
        return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
      }

      if (url.pathname === "/api/register" && request.method === "POST") {
        const data: any = await request.json();
        const message = `👤 New User Registration:\nName: ${data.name}\nPhone: ${data.phone}\nRole: ${data.role}`;
        await sendTelegramMessage(env, message);

        // Store user detail in R2
        await env.MY_BUCKET.put(`users/${data.id || Date.now()}.json`, JSON.stringify(data));

        return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
      }

      if (url.pathname === "/api/post-need" && request.method === "POST") {
        const data: any = await request.json();
        const message = `📝 New Need Posted:\nSummary: ${data.summary}\nService: ${data.intent?.serviceType}\nUrgency: ${data.intent?.urgency}`;
        await sendTelegramMessage(env, message);

        // Store need in R2
        await env.MY_BUCKET.put(`needs/${data.id || Date.now()}.json`, JSON.stringify(data));

        return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
      }

      if (url.pathname === "/api/upload" && request.method === "POST") {
        const formData = await request.formData();
        const file = formData.get("file") as File;
        if (!file) {
           return new Response("No file uploaded", { status: 400 });
        }
        const key = `media/${Date.now()}-${file.name}`;
        await env.MY_BUCKET.put(key, await file.arrayBuffer());

        await sendTelegramMessage(env, `📸 Media Uploaded: ${file.name}`);

        return new Response(JSON.stringify({ success: true, key }), { headers: corsHeaders });
      }

      return new Response("Not Found", { status: 404 });
    } catch (err: any) {
      return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
    }
  },
};

async function sendTelegramMessage(env: Env, text: string) {
  const url = `https://api.telegram.org/bot${env.TELEGRAM_TOKEN}/sendMessage`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: env.TELEGRAM_CHAT_ID,
      text: text,
    }),
  });
  return response.json();
}
