create table
  public.appointment_tokens (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone null default now(),
    updated_at timestamp with time zone null default now(),
    token text not null,
    appointment_id uuid not null,
    constraint appointment_tokens_pkey primary key (id),
    constraint appointment_tokens_appointment_id_key unique (appointment_id),
    constraint appointment_tokens_appointment_id_fkey foreign key (appointment_id) references appointments (id) on delete cascade
  ) tablespace pg_default;