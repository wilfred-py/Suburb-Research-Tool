-- Data type for hierarchical tree-like structures
create extension ltree;

create table summary_data (
  id uuid primary key default uuid_generate_v4() not null,
  suburb_name text,
  state_name text,
  post_code numeric,
  people INT,
  male REAL,
  female REAL,
  median_age INT,
  families INT,
  average_number_of_children_per_family text,
  for_families_with_children REAL,
  for_all_households REAL,
  all_private_dwellings INT,
  average_number_of_people_per_household REAL,
  median_weekly_household_income INT,
  median_monthly_mortgage_repayments INT,
  median_weekly_rent_b INT,
  average_number_of_motor_vehicles_per_dwelling REAL
);

-- PostgreSQL to enable RLS
alter table summary_data enable row level security;

create table user_profiles (
  user_id uuid primary key references auth.users (id) not null,
  username text unique not null
  CONSTRAINT proper_username CHECK (username ~* '^[a-zA-Z0-9_]+$')
  CONSTRAINT username_length CHECK (char_length(username) > 3 and char_length(username) < 15)
);

-- Return row where suburb_name matches searchQuery
create function get_suburb_data(searchQuery text)
returns table (
  id uuid,
  suburb_name text,
  state_name text,
  post_code numeric,
  people INT,
  male REAL,
  female REAL,
  median_age INT,
  families INT,
  average_number_of_children_per_family text,
  for_families_with_children REAL,
  for_all_households REAL,
  all_private_dwellings INT,
  average_number_of_people_per_household REAL,
  median_weekly_household_income INT,
  median_monthly_mortgage_repayments INT,
  median_weekly_rent_b INT,
  average_number_of_motor_vehicles_per_dwelling REAL
)
language plpgsql
as $$
begin
    return query
    select id, suburb_name, state_name, post_code, people, male, female, median_age, families,
           average_number_of_children_per_family, for_families_with_children, for_all_households,
           all_private_dwellings, average_number_of_people_per_household, median_weekly_household_income,
           median_monthly_mortgage_repayments, median_weekly_rent_b, average_number_of_motor_vehicles_per_dwelling
    from summary_data
    where summary_data.path ~ 'root' and suburb_name ILIKE searchQuery;
end;$$;


-- Add appropriate policies

-- Anyone can read summary_data table
CREATE POLICY "anyone can read summary_data table"
ON "public"."summary_data"
FOR SELECT
TO public
USING (true);

BEGIN;

DROP PUBLICATION IF EXISTS supabase_realtime CASCADE;

CREATE PUBLICATION supabase_realtime WITH ( publish = 'insert, update, delete' );

COMMIT;