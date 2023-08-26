create table
  public.plans (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone null default now(),
    updated_at timestamp with time zone null default now(),
    name text null,
    description text null,
    price_per_month bigint null,
    price_per_year bigint null,
    constraint plans_pkey primary key (id)
  ) tablespace pg_default;