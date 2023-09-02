-- Create Income and Work Table
create table income_and_work (
    id uuid primary key default uuid_generate_v4() not null,
    suburb_name text, 
    sal_code text,
    state_name text, 
    income_data jsonb
);

-- Enable RLS
alter table income_and_work enable row level security;

-- Allow anyone to read
CREATE POLICY "anyone can read income_and_work table"
on "public"."income_and_work"
FOR SELECT
TO public
USING (true);