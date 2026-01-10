-- TwoMakersCo Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Categories table
create table categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Products table
create table products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  description text not null,
  price integer not null, -- stored in cents
  images text[] default '{}',
  category_id uuid references categories(id) on delete set null,
  inventory_count integer default 0,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Orders table
create table orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete set null,
  email text not null,
  status text default 'pending' check (status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  total integer not null, -- stored in cents
  shipping_address jsonb not null,
  square_payment_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Order items table
create table order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references orders(id) on delete cascade not null,
  product_id uuid references products(id) on delete set null,
  product_name text not null,
  quantity integer not null,
  price integer not null, -- price at time of purchase, in cents
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes for common queries
create index products_category_id_idx on products(category_id);
create index products_is_active_idx on products(is_active);
create index products_slug_idx on products(slug);
create index orders_user_id_idx on orders(user_id);
create index orders_status_idx on orders(status);
create index order_items_order_id_idx on order_items(order_id);

-- Enable Row Level Security
alter table categories enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

-- Public read access for categories and active products
create policy "Public can view categories" on categories
  for select using (true);

create policy "Public can view active products" on products
  for select using (is_active = true);

-- Users can view their own orders
create policy "Users can view own orders" on orders
  for select using (auth.uid() = user_id);

create policy "Users can view own order items" on order_items
  for select using (
    exists (
      select 1 from orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

-- Function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Trigger for products updated_at
create trigger update_products_updated_at
  before update on products
  for each row
  execute function update_updated_at_column();

-- Trigger for orders updated_at
create trigger update_orders_updated_at
  before update on orders
  for each row
  execute function update_updated_at_column();
