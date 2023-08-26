create table
  public.plan_options (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone null default now(),
    updated_at timestamp with time zone null default now(),
    time_slots_per_month bigint null,
    email_notification boolean null default true,
    sms_notification boolean null default false,
    plan_id uuid not null,
    constraint plan_options_pkey primary key (id),
    constraint plan_options_plan_id_key unique (plan_id),
    constraint plan_options_plan_id_fkey foreign key (plan_id) references plans (id) on delete set null
  ) tablespace pg_default;