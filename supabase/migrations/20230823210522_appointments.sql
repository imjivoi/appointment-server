create table
  public.appointments (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    canceled boolean not null default false,
    canceled_reason text null,
    business_id uuid not null,
    issuer_id uuid not null,
    time_slot_id uuid not null,
    constraint appointments_pkey primary key (id),
    constraint appointments_time_slot_id_key unique (time_slot_id),
    constraint appointments_business_id_fkey foreign key (business_id) references businesses (id) on delete cascade,
    constraint appointments_issuer_id_fkey foreign key (issuer_id) references auth.users (id) on delete set null,
    constraint appointments_time_slot_id_fkey foreign key (time_slot_id) references time_slots (id) on delete set null
  ) tablespace pg_default;