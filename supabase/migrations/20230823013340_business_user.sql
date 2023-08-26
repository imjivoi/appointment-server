create table
  public.business_user (
    business_id uuid not null,
    created_at timestamp with time zone null default now(),
    user_id uuid not null,
    id uuid not null default gen_random_uuid (),
    constraint business_user_pkey primary key (id),
    constraint business_user_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade,
    constraint business_user_business_id_fkey foreign key (business_id) references businesses (id) on delete cascade
  ) tablespace pg_default;