create table
  public.role_user (
    user_id uuid not null,
    created_at timestamp with time zone null default now(),
    role_id uuid not null,
    constraint role_user_pkey primary key (user_id, role_id),
    constraint role_user_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade,
    constraint role_user_role_id_fkey foreign key (role_id) references roles (id) on delete cascade
  ) tablespace pg_default;