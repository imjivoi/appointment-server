create table
  public.role_user (
    user_id uuid not null,
    created_at timestamp with time zone null default now(),
    role_id uuid not null,
    id uuid not null default gen_random_uuid (),
    constraint role_user_pkey primary key (id),
    constraint role_user_id_key unique (id),
    constraint role_user_role_id_fkey foreign key (role_id) references roles (id) on delete cascade,
    constraint role_user_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade
  ) tablespace pg_default;