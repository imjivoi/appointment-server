create function public.handle_new_user()
returns trigger as $$
declare
  role_id uuid;
begin
  select id from public.roles where name = new.raw_user_meta_data->>'role' or name = 'business' into role_id;
  insert into public.role_user (role_id, user_id)
  values (role_id, new.id);
  insert into public.profiles (id, email, phone)
  values (new.id, new.email, new.phone);

  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();



create or replace function public.handle_update_user() 
returns trigger 
language plpgsql 
security definer set search_path = public
as $$
begin
  update public.profiles set email = new.email, phone = new.phone where id = new.id;
  return new;
end;
$$;
create trigger on_auth_user_updated
  after update on auth.users
  for each row execute procedure public.handle_update_user();