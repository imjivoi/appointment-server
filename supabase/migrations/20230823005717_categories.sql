create table
  public.categories (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    name text not null,
    slug text not null,
    constraint categories_pkey primary key (id),
    constraint categories_slug_key unique (slug),
    constraint categories_name_key unique (name)
  ) tablespace pg_default;