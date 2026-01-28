# Backend Management & Supabase Setup Guide

HisaabOS is currently running in **Demo Mode** (local state only). To enable real user authentication, database persistence, and multi-user support, you need to connect it to a backend service. 

We recommend **Supabase** (an open-source Firebase alternative) as it is perfect for this tech stack.

## 1. Create a Supabase Project

1. Go to [database.new](https://database.new) and sign in/up.
2. Create a new project named `hisaab-os`.
3. Set the database password (save this!).
4. Choose a region close to Pakistan (e.g., Singapore or Mumbai) for best performance.

## 2. Get API Credentials

Once the project is created:
1. Go to **Project Settings** (cog icon) -> **API**.
2. Copy the `Project URL` and `anon public` key.

## 3. Connect to HisaabOS

1. Create a file named `.env` in the root of your `HisaabOS` folder.
2. Add the following lines:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## 4. Enable Authentication

1. In Supabase Dashboard, go to **Authentication** -> **Providers**.
2. Enable **Email**.
3. Enable **Google**.
   - You will need to set up a Google Cloud Project to get the Client ID and Secret.
   - [Supabase Google Auth Guide](https://supabase.com/docs/guides/auth/social/google)

## 5. Where is the Admin Dashboard?

*   **Business Admin**: The dashboard you see at `/` (Dashboard, Inventory, etc.) **IS** the Business Admin dashboard.
*   **Database Admin**: The **Supabase Dashboard** acts as your Super Admin panel where you can browse raw data, manage users directly, and set up Row Level Security (RLS) policies.

## 6. How to Onboard People?

Currently, the app is in single-tenant demo mode. To onboard employees:

1. **Invite System**: You can build an "Invite User" feature in the `People` or `Settings` page that sends an email via Supabase Auth.
2. **Manual Onboarding**: 
    - Go to Supabase > Authentication > Users > "Invite User".
    - Send the invite to your employee's email.
    - When they log in, they will access the same data if you set up RLS policies to allow "Organization-based access".

## Next Steps for Development

To make this app production-ready, you need to:
1. Install the Supabase client: `npm install @supabase/supabase-js`
2. Create a `src/lib/supabase.ts` file to initialize the client.
3. Replace the `mock` auth calls in `LoginPage.tsx` with `supabase.auth.signInWithOAuth()`.
4. Update `useStore.ts` to fetch data from Supabase tables (`products`, `orders`) instead of local dummy arrays.

Need help implementing this? Just ask Antigravity to "Connect Supabase" and provide your credentials!
