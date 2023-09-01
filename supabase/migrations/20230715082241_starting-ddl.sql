-- -- Data type for hierarchical tree-like structures
-- create extension ltree;

-- create table summary_data (
--   id uuid primary key default uuid_generate_v4() not null,
--   suburb_name text,
--   state_name text,
--   post_code numeric,
--   people INT,
--   male REAL,
--   female REAL,
--   median_age INT,
--   families INT,
--   average_number_of_children_per_family text,
--   for_families_with_children REAL,
--   for_all_households REAL,
--   all_private_dwellings INT,
--   average_number_of_people_per_household REAL,
--   median_weekly_household_income INT,
--   median_monthly_mortgage_repayments INT,
--   median_weekly_rent_b INT,
--   average_number_of_motor_vehicles_per_dwelling REAL
-- );

-- -- PostgreSQL to enable RLS
-- alter table summary_data enable row level security;

-- create table main_data (
--   id uuid primary key default uuid_generate_v4() not null,
--   suburb_name text,
--   state_name text,
--   _People_who_travelled_to_work_by_public_transport_a_in_suburb INT

-- );

-- -- PostgreSQL to enable RLS
-- alter table main_data enable row level security;


-- -- Return row where suburb_name matches searchQuery
-- CREATE FUNCTION get_suburb_data(_searchquery text)
-- RETURNS table (
--     id uuid,
--     suburb_name text,
--     state_name text,
--     post_code numeric,
--     people INT,
--     male REAL,
--     female REAL,
--     median_age INT,
--     families INT,
--     average_number_of_children_per_family text,
--     for_families_with_children REAL,
--     for_all_households REAL,
--     all_private_dwellings INT,
--     average_number_of_people_per_household REAL,
--     median_weekly_household_income INT,
--     median_monthly_mortgage_repayments INT,
--     median_weekly_rent_b INT,
--     average_number_of_motor_vehicles_per_dwelling REAL
-- )
-- LANGUAGE plpgsql
-- AS $$
-- begin
--     return query
--     select id, suburb_name, state_name, post_code, people, male, female, median_age, families,
--     average_number_of_children_per_family, for_families_with_children, for_all_households,
--     all_private_dwellings, average_number_of_people_per_household, median_weekly_household_income,
--     median_monthly_mortgage_repayments, median_weekly_rent_b, average_number_of_motor_vehicles_per_dwelling
--     from summary_data
--     WHERE suburb_name ILIKE '%' || searchquery || '%'
--     AND summary_data.path ~ "root";
-- end;$$;

-- create function test_pull()
-- returns table (
-- id uuid,
-- suburb_name text,
-- state_name text,
-- post_code numeric,
-- people INT,
-- male REAL,
-- female REAL,
-- median_age INT,
-- families INT,
-- average_number_of_children_per_family text,
-- for_families_with_children REAL,
-- for_all_households REAL,
-- all_private_dwellings INT,
-- average_number_of_people_per_household REAL,
-- median_weekly_household_income INT,
-- median_monthly_mortgage_repayments INT,
-- median_weekly_rent_b INT,
-- average_number_of_motor_vehicles_per_dwelling REAL
-- )
-- language plpgsql
-- as $$
-- begin
--   return query
--   select id, suburb_name, state_name, post_code, people, male, female, median_age, families,
--           average_number_of_children_per_family, for_families_with_children, for_all_households,
--           all_private_dwellings, average_number_of_people_per_household, median_weekly_household_income,
--           median_monthly_mortgage_repayments, median_weekly_rent_b, average_number_of_motor_vehicles_per_dwelling
--   from summary_data
--   where summary_data.path ~ 'root';
-- end;$$;


-- CREATE FUNCTION get_first_10_rows()
-- RETURNS SETOF summary_data
-- LANGUAGE SQL
-- AS $$
--   SELECT *
--   FROM summary_data
--   -- LIMIT 10;
-- $$;

-- CREATE FUNCTION test_pull_v2(searchquery TEXT)
-- RETURNS TABLE (
-- id uuid,
-- suburb_name TEXT,
-- state_name TEXT,
-- post_code NUMERIC,
-- people INT,
-- male REAL,
-- female REAL,
-- median_age INT,
-- families INT,
-- average_number_of_children_per_family TEXT,
-- for_families_with_children REAL,
-- for_all_households REAL,
-- all_private_dwellings INT,
-- average_number_of_people_per_household REAL,
-- median_weekly_household_income INT,
-- median_monthly_mortgage_repayments INT,
-- median_weekly_rent_b INT,
-- average_number_of_motor_vehicles_per_dwelling REAL
-- )
-- LANGUAGE plpgsql
-- AS $$
-- BEGIN
-- RETURN QUERY
-- SELECT id, suburb_name, state_name, post_code, people, male, female, median_age, families,
-- average_number_of_children_per_family, for_families_with_children, for_all_households,
-- all_private_dwellings, average_number_of_people_per_household, median_weekly_household_income,
-- median_monthly_mortgage_repayments, median_weekly_rent_b, average_number_of_motor_vehicles_per_dwelling
-- FROM summary_data
-- WHERE suburb_name ILIKE CONCAT('%', searchquery, '%');
-- END;$$;




-- -- Add appropriate policies


-- -- Anyone can read summary_data table
-- CREATE POLICY "anyone can read summary_data table"
-- ON "public"."summary_data"
-- FOR SELECT
-- TO public
-- USING (true);

-- BEGIN;

-- DROP PUBLICATION IF EXISTS supabase_realtime CASCADE;

-- CREATE PUBLICATION supabase_realtime WITH ( publish = 'insert, update, delete' );

-- COMMIT;

-- SELECT pg_stat_clear_snapshot();



