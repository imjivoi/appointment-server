/** 
 * Users 
 */

INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at) VALUES ('00000000-0000-0000-0000-000000000000', 'ce208151-2747-48e3-afa0-4a3f6a7cd8f3', 'authenticated', 'authenticated', 'test2@test.com', '$2a$10$h7HtZT4b5ROmRn/DCVqtqOs6HQPUte3.yaClAoF.V/8VRw.FCrNKa', '2023-08-24 20:53:16.483292+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-08-24 20:53:16.456533+00', '2023-08-24 20:53:16.483817+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL);
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at) VALUES ('00000000-0000-0000-0000-000000000000', '8a4287a1-c973-4da4-b6ca-68308ca532ef', 'authenticated', 'authenticated', 'test@test.com', '$2a$10$Lr1F0FwFjt92g9kIWxXLNOwwSjxbv8ca733WDn50LAx3ZSC8X5xCW', '2023-08-24 20:54:16.363602+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-08-24 20:54:16.354956+00', '2023-08-24 20:54:16.363988+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL);
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at) VALUES ('00000000-0000-0000-0000-000000000000', 'bb36dc5e-9b08-4675-8040-5a337131f7a8', 'authenticated', 'authenticated', 'test3@test.com', '$2a$10$jLAHj6IqQDh7VSg6nXvVY.8m9AWBPKJG6bcht6YCRjvBJTTNvjqmG', '2023-08-24 20:54:33.195757+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-08-24 20:54:33.186748+00', '2023-08-24 20:54:33.196161+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL);


INSERT INTO auth.identities (id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at) VALUES ('ce208151-2747-48e3-afa0-4a3f6a7cd8f3', 'ce208151-2747-48e3-afa0-4a3f6a7cd8f3', '{"sub": "ce208151-2747-48e3-afa0-4a3f6a7cd8f3", "email": "test2@test.com"}', 'email', '2023-08-24 20:53:16.468918+00', '2023-08-24 20:53:16.468999+00', '2023-08-24 20:53:16.468999+00');
INSERT INTO auth.identities (id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at) VALUES ('8a4287a1-c973-4da4-b6ca-68308ca532ef', '8a4287a1-c973-4da4-b6ca-68308ca532ef', '{"sub": "8a4287a1-c973-4da4-b6ca-68308ca532ef", "email": "test@test.com"}', 'email', '2023-08-24 20:54:16.358074+00', '2023-08-24 20:54:16.358127+00', '2023-08-24 20:54:16.358127+00');
INSERT INTO auth.identities (id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at) VALUES ('bb36dc5e-9b08-4675-8040-5a337131f7a8', 'bb36dc5e-9b08-4675-8040-5a337131f7a8', '{"sub": "bb36dc5e-9b08-4675-8040-5a337131f7a8", "email": "test3@test.com"}', 'email', '2023-08-24 20:54:33.190047+00', '2023-08-24 20:54:33.19013+00', '2023-08-24 20:54:33.19013+00');

/** 
 * Role user 
 */

-- DO $$
-- DECLARE 
--   customer_role_id uuid;
--   business_role_id uuid;
-- BEGIN
--   SELECT id FROM public.roles WHERE name = 'customer' INTO customer_role_id;
--   SELECT id FROM public.roles WHERE name = 'business' INTO business_role_id;

--   INSERT INTO public.role_user (role_id, user_id) VALUES (customer_role_id, 'ce208151-2747-48e3-afa0-4a3f6a7cd8f3');
--   INSERT INTO public.role_user (role_id, user_id) VALUES (customer_role_id, '8a4287a1-c973-4da4-b6ca-68308ca532ef');
--   INSERT INTO public.role_user (role_id, user_id) VALUES (business_role_id, 'bb36dc5e-9b08-4675-8040-5a337131f7a8');
-- END $$;
