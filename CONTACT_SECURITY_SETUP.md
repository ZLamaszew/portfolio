# Contact form security setup

This portfolio uses Cloudflare Turnstile plus a Supabase Edge Function.

## 1. Create Cloudflare Turnstile keys

1. Open Cloudflare Dashboard.
2. Go to Turnstile.
3. Create a new widget.
4. Add your GitHub Pages domain, for example:
   `zlamaszew.github.io`
5. Copy:
   - Site key
   - Secret key

## 2. Add the Site key to the portfolio

In `index.html`, replace:

```html
0x4AAAAAADim7WfJoRsgSa3g
```

with your Cloudflare Turnstile Site key.

The Site key is public and can be committed to GitHub.

## 3. Add the Secret key to Supabase

Do not put the Secret key in GitHub.

In Supabase, add this Edge Function secret:

```text
TURNSTILE_SECRET_KEY=your_cloudflare_turnstile_secret_key
```

The function also expects:

```text
PROJECT_URL
SERVICE_ROLE_KEY
```

If these are not available automatically in your Supabase project, add them as Edge Function secrets too.

## 4. Deploy the Edge Function

Deploy:

```bash
supabase functions deploy contact-message
```

## 5. Close direct public inserts

After the Edge Function works, remove direct browser inserts into the table:

```sql
drop policy if exists "Allow public insert messages" on public.messages;
```

The Edge Function will still save messages using the server-side service role key.
