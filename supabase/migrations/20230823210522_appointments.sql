create table
  public.appointments (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone null default now(),
    start_at timestamp with time zone not null,
    end_at timestamp with time zone not null,
    canceled boolean not null default false,
    canceled_reason text null,
    service_id uuid not null,
    issuer_id uuid not null,
    created_by_id uuid not null,
    confirmed boolean null default false,
    confirmed_at timestamp with time zone null,
    canceled_at timestamp with time zone null,
    constraint appointments_pkey primary key (id),
    constraint appointments_service_id_fkey foreign key (service_id) references public.services (id) on delete cascade,
    constraint appointments_issuer_id_fkey foreign key (issuer_id) references auth.users (id) on delete set null,
    constraint appointments_created_by_id_fkey foreign key (created_by_id) references auth.users (id) on delete set null
  ) tablespace pg_default;