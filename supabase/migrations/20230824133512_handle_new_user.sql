create function public.handle_new_user()
returns trigger as $$
declare
  role_id uuid;
begin
  select id from public.roles where name = new.raw_user_meta_data->>'role' or name = 'business' into role_id;
  insert into public.role_user (role_id, user_id)
  values (role_id, new.id);
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();