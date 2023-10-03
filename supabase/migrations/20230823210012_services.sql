create table
  public.services (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone null default now(),
    updated_at timestamp with time zone null default now(),
    business_id uuid not null,
    name text not null,
    description text null,
    slug text not null,
    duration bigint not null,
    constraint services_pkey primary key (id),
    constraint services_business_id_fkey foreign key (business_id) references businesses (id) on delete cascade
  ) tablespace pg_default;