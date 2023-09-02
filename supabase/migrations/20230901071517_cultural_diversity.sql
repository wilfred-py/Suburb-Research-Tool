

-- -- Cultural Diversity Table
-- create table cultural_diversity (
--   id uuid primary key default uuid_generate_v4() not null,
--   suburb_name text,
--   sal_code text,
--   state_name text, 
--   cultural_data jsonb
-- );

-- -- Enable RLS
-- alter table cultural_diversity enable row level security;


-- -- Anyone can read cultural_diversity table
-- CREATE POLICY "anyone can read cultural_diversity table"
-- on "public"."cultural_diversity"
-- FOR SELECT
-- TO public
-- USING (true);
