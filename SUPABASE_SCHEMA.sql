-- Create People (Customers/Vendors) Table
create table public.people (
  id uuid not null default gen_random_uuid (),
  name text not null,
  phone text unique not null,
  type text check (type in ('customer', 'vendor')),
  balance numeric default 0,
  return_count integer default 0,
  is_blacklisted boolean default false,
  created_at timestamp with time zone default timezone ('utc'::text, now()) not null,
  constraint people_pkey primary key (id)
);

-- Create Products Table
create table public.products (
  id uuid not null default gen_random_uuid (),
  sku text unique,
  name text not null,
  purchase_price numeric default 0,
  shipping_cost numeric default 0,
  packaging_cost numeric default 0,
  landed_cost numeric default 0,
  retail_price numeric default 0,
  stock_level integer default 0,
  alert_threshold integer default 10,
  category text,
  shopify_product_id text,
  woocommerce_product_id text,
  created_at timestamp with time zone default timezone ('utc'::text, now()) not null,
  constraint products_pkey primary key (id)
);

-- Create Orders Table
create table public.orders (
  id uuid not null default gen_random_uuid (),
  invoice_number text unique not null,
  customer_name text not null,
  customer_phone text not null,
  customer_address text,
  city text,
  items jsonb not null default '[]'::jsonb,
  total numeric not null,
  status text default 'Pending',
  courier text,
  tracking_id text,
  source text default 'manual',
  external_order_id text,
  is_high_risk boolean default false,
  risk_reason text,
  created_at timestamp with time zone default timezone ('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone ('utc'::text, now()) not null,
  constraint orders_pkey primary key (id)
);

-- Create Expenses Table
create table public.expenses (
  id uuid not null default gen_random_uuid (),
  description text not null,
  amount numeric not null,
  category text,
  date date default CURRENT_DATE,
  project_id uuid,
  created_at timestamp with time zone default timezone ('utc'::text, now()) not null,
  constraint expenses_pkey primary key (id)
);

-- Create Ad Spends Table
create table public.ad_spends (
  id uuid not null default gen_random_uuid (),
  date date default CURRENT_DATE,
  platform text check (platform in ('Facebook', 'TikTok', 'Google', 'Other')),
  amount numeric not null,
  notes text,
  created_at timestamp with time zone default timezone ('utc'::text, now()) not null,
  constraint ad_spends_pkey primary key (id)
);

-- Enable RLS (Row Level Security)
alter table public.people enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.expenses enable row level security;
alter table public.ad_spends enable row level security;

-- Create Policy to allow authenticated users to see everything (for now)
-- In a real multi-tenant app, you would filter by 'organization_id'
create policy "Enable all access for authenticated users" on public.people for all to authenticated using (true);
create policy "Enable all access for authenticated users" on public.products for all to authenticated using (true);
create policy "Enable all access for authenticated users" on public.orders for all to authenticated using (true);
create policy "Enable all access for authenticated users" on public.expenses for all to authenticated using (true);
create policy "Enable all access for authenticated users" on public.ad_spends for all to authenticated using (true);
