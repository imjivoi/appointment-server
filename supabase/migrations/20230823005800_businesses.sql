create table
  public.businesses (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    name text not null,
    description text null,
    slug text not null,
    category_id uuid null,
    constraint businesses_pkey primary key (id),
    constraint businesses_slug_key unique (slug),
    constraint businesses_category_id_fkey foreign key (category_id) references categories (id),
    constraint fk_category foreign key (category_id) references categories (id) on delete set null
  ) tablespace pg_default;