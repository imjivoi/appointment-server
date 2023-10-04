create table
  public.time_slots (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone null default now(),
    updated_at timestamp with time zone null default now(),
    start_at time without time zone not null,
    end_at time without time zone not null,
    service_id uuid not null,
    day_of_week smallint not null,
    active boolean not null default true, 
    constraint time_slots_pkey primary key (id),
    constraint time_slots_service_id_fkey foreign key (service_id) references services (id) on delete set null
  ) tablespace pg_default;