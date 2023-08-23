create table
  public.roles (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone null default now(),
    update_at timestamp with time zone null default now(),
    name text not null,
    constraint role_pkey primary key (id),
    constraint role_name_key unique (name)
  ) tablespace pg_default;