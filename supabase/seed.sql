insert into auth.users (instance_id, id, aud, role, email, encrypted_password, raw_app_meta_data, raw_user_meta_data, email_confirmed_at, created_at)
  values ('00000000-0000-0000-0000-000000000000', '185f2f83-d63a-4c9b-b4a0-7e4a885799e2', 'authenticated', 'authenticated', 'test@test.com', '$2a$10$6gPtvpqCAiwavx1EOnjIgOykKMgzRdiBuejUQGIRRjvUi/ZgMh.9C', '{"provider":"email","providers":["email"]}', '{}', timezone('utc'::text, now()), timezone('utc'::text, now()));

insert into auth.identities (id, user_id, identity_data, provider, created_at) 
  values ('185f2f83-d63a-4c9b-b4a0-7e4a885799e2', '185f2f83-d63a-4c9b-b4a0-7e4a885799e2',	'{"sub": "185f2f83-d63a-4c9b-b4a0-7e4a885799e2"}', 'email', timezone('utc'::text, now()));

insert into auth.users (instance_id, id, aud, role, email, encrypted_password, raw_app_meta_data, raw_user_meta_data, email_confirmed_at, created_at)
  values ('00000000-0000-0000-0000-000000000001', '185f2f83-d63a-4c9b-b4a0-7e4a885799e3', 'authenticated', 'authenticated', 'test2@test.com', '$2a$10$6gPtvpqCAiwavx1EOnjIgOykKMgzRdiBuejUQGIRRjvUi/ZgMh.9C', '{"provider":"email","providers":["email"]}', '{}', timezone('utc'::text, now()), timezone('utc'::text, now()));

insert into auth.identities (id, user_id, identity_data, provider, created_at) 
  values ('185f2f83-d63a-4c9b-b4a0-7e4a885799e3', '185f2f83-d63a-4c9b-b4a0-7e4a885799e3',	'{"sub": "185f2f83-d63a-4c9b-b4a0-7e4a885799e3"}', 'email', timezone('utc'::text, now()));

insert into auth.users (instance_id, id, aud, role, email, encrypted_password, raw_app_meta_data, raw_user_meta_data, email_confirmed_at, created_at)
  values ('00000000-0000-0000-0000-000000000002', '185f2f83-d63a-4c9b-b4a0-7e4a885799e4', 'authenticated', 'authenticated', 'test3@test.com', '$2a$10$6gPtvpqCAiwavx1EOnjIgOykKMgzRdiBuejUQGIRRjvUi/ZgMh.9C', '{"provider":"email","providers":["email"]}', '{}', timezone('utc'::text, now()), timezone('utc'::text, now()));

insert into auth.identities (id, user_id, identity_data, provider, created_at) 
  values ('185f2f83-d63a-4c9b-b4a0-7e4a885799e4', '185f2f83-d63a-4c9b-b4a0-7e4a885799e4',	'{"sub": "185f2f83-d63a-4c9b-b4a0-7e4a885799e4"}', 'email', timezone('utc'::text, now()));


insert into public.roles (name) values ('customer'), ('business'), ('admin');