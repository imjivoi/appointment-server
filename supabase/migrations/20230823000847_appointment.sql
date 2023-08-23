create table
  public.appointments (
    id uuid not null,
    created_at timestamp with time zone not null default now(),
    canceled boolean not null default false,
    canceled_reason text null,
    start_at timestamp with time zone not null,
    end_at timestamp with time zone not null,
    business_id uuid not null,
    issuer_id uuid not null,
    end_at_expect timestamp with time zone null,
    constraint appointments_pkey primary key (id),
    constraint appointments_business_id_fkey foreign key (business_id) references businesses (id) on delete cascade,
    constraint appointments_issuer_id_fkey foreign key (issuer_id) references auth.users (id) on delete set null
  ) tablespace pg_default;