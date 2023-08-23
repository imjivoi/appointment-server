create table
  public.profiles (
    id uuid not null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    first_name text null,
    last_name text null,
    avatar_url text null,
    constraint profiles_pkey primary key (id),
    constraint profiles_id_fkey foreign key (id) references auth.users (id) on delete set null
  ) tablespace pg_default;