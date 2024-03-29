-- -- Create 2006 table
-- create table data_2011 (
--     id uuid primary key default uuid_generate_v4() not null,
--     suburb_name text,
--     ssc_code text,
--     state_name text,
--     people REAL,
--     male REAL,
--     female REAL,
--     median_age REAL,
--     families REAL,
--     average_children_per_family REAL,
--     all_private_dwellings REAL,
--     average_people_per_household REAL,
--     median_weekly_household_income REAL,
--     median_monthly_mortgage_payment REAL,
--     median_weekly_rent REAL,
--     average_motor_vehicles_per_dwelling REAL,
--     Total_people_in_suburb REAL, 
--     percentage_Total_people_in_suburb REAL, 
--     Total_people_in_state REAL, 
--     percentage_Total_people_in_state REAL, 
--     Total_people_in_australia REAL, 
--     percentage_Total_people_in_australia REAL, 
--     Male_in_suburb REAL, 
--     percentage_Male_in_suburb REAL, 
--     Male_in_state REAL, 
--     percentage_Male_in_state REAL, 
--     Male_in_australia REAL, 
--     percentage_Male_in_australia REAL, 
--     Female_in_suburb REAL, 
--     percentage_Female_in_suburb REAL, 
--     Female_in_state REAL, 
--     percentage_Female_in_state REAL, 
--     Female_in_australia REAL, 
--     percentage_Female_in_australia REAL, 
--     atsi_people_in_suburb REAL, 
--     percentage_atsi_people_in_suburb REAL, 
--     atsi_people_in_state REAL, 
--     percentage_atsi_people_in_state REAL, 
--     atsi_people_in_australia REAL, 
--     percentage_atsi_people_in_australia REAL, 
--     _0_4_years_in_suburb REAL, 
--     percentage_0_4_years_in_suburb REAL, 
--     _0_4_years_in_state REAL, 
--     percentage_0_4_years_in_state REAL, 
--     _0_4_years_in_australia REAL, 
--     percentage_0_4_years_in_australia REAL, 
--     _5_9_years_in_suburb REAL, 
--     percentage_5_9_years_in_suburb REAL, 
--     _5_9_years_in_state REAL, 
--     percentage_5_9_years_in_state REAL, 
--     _5_9_years_in_australia REAL, 
--     percentage_5_9_years_in_australia REAL, 
--     _10_14_years_in_suburb REAL, 
--     percentage_10_14_years_in_suburb REAL, 
--     _10_14_years_in_state REAL, 
--     percentage_10_14_years_in_state REAL, 
--     _10_14_years_in_australia REAL, 
--     percentage_10_14_years_in_australia REAL, 
--     _15_19_years_in_suburb REAL, 
--     percentage_15_19_years_in_suburb REAL, 
--     _15_19_years_in_state REAL, 
--     percentage_15_19_years_in_state REAL, 
--     _15_19_years_in_australia REAL, 
--     percentage_15_19_years_in_australia REAL, 
--     _20_24_years_in_suburb REAL, 
--     percentage_20_24_years_in_suburb REAL, 
--     _20_24_years_in_state REAL, 
--     percentage_20_24_years_in_state REAL, 
--     _20_24_years_in_australia REAL, 
--     percentage_20_24_years_in_australia REAL, 
--     _25_29_years_in_suburb REAL, 
--     percentage_25_29_years_in_suburb REAL, 
--     _25_29_years_in_state REAL, 
--     percentage_25_29_years_in_state REAL, 
--     _25_29_years_in_australia REAL, 
--     percentage_25_29_years_in_australia REAL, 
--     _30_34_years_in_suburb REAL, 
--     percentage_30_34_years_in_suburb REAL, 
--     _30_34_years_in_state REAL, 
--     percentage_30_34_years_in_state REAL, 
--     _30_34_years_in_australia REAL, 
--     percentage_30_34_years_in_australia REAL, 
--     _35_39_years_in_suburb REAL, 
--     percentage_35_39_years_in_suburb REAL, 
--     _35_39_years_in_state REAL, 
--     percentage_35_39_years_in_state REAL, 
--     _35_39_years_in_australia REAL, 
--     percentage_35_39_years_in_australia REAL, 
--     _40_44_years_in_suburb REAL, 
--     percentage_40_44_years_in_suburb REAL, 
--     _40_44_years_in_state REAL, 
--     percentage_40_44_years_in_state REAL, 
--     _40_44_years_in_australia REAL, 
--     percentage_40_44_years_in_australia REAL, 
--     _45_49_years_in_suburb REAL, 
--     percentage_45_49_years_in_suburb REAL, 
--     _45_49_years_in_state REAL, 
--     percentage_45_49_years_in_state REAL, 
--     _45_49_years_in_australia REAL, 
--     percentage_45_49_years_in_australia REAL, 
--     _50_54_years_in_suburb REAL, 
--     percentage_50_54_years_in_suburb REAL, 
--     _50_54_years_in_state REAL, 
--     percentage_50_54_years_in_state REAL, 
--     _50_54_years_in_australia REAL, 
--     percentage_50_54_years_in_australia REAL, 
--     _55_59_years_in_suburb REAL, 
--     percentage_55_59_years_in_suburb REAL, 
--     _55_59_years_in_state REAL, 
--     percentage_55_59_years_in_state REAL, 
--     _55_59_years_in_australia REAL, 
--     percentage_55_59_years_in_australia REAL, 
--     _60_64_years_in_suburb REAL, 
--     percentage_60_64_years_in_suburb REAL, 
--     _60_64_years_in_state REAL, 
--     percentage_60_64_years_in_state REAL, 
--     _60_64_years_in_australia REAL, 
--     percentage_60_64_years_in_australia REAL, 
--     _65_69_years_in_suburb REAL, 
--     percentage_65_69_years_in_suburb REAL, 
--     _65_69_years_in_state REAL, 
--     percentage_65_69_years_in_state REAL, 
--     _65_69_years_in_australia REAL, 
--     percentage_65_69_years_in_australia REAL, 
--     _70_74_years_in_suburb REAL, 
--     percentage_70_74_years_in_suburb REAL, 
--     _70_74_years_in_state REAL, 
--     percentage_70_74_years_in_state REAL, 
--     _70_74_years_in_australia REAL, 
--     percentage_70_74_years_in_australia REAL, 
--     _75_79_years_in_suburb REAL, 
--     percentage_75_79_years_in_suburb REAL, 
--     _75_79_years_in_state REAL, 
--     percentage_75_79_years_in_state REAL, 
--     _75_79_years_in_australia REAL, 
--     percentage_75_79_years_in_australia REAL, 
--     _80_84_years_in_suburb REAL, 
--     percentage_80_84_years_in_suburb REAL, 
--     _80_84_years_in_state REAL, 
--     percentage_80_84_years_in_state REAL, 
--     _80_84_years_in_australia REAL, 
--     percentage_80_84_years_in_australia REAL, 
--     _85_years_and_over_in_suburb REAL, 
--     percentage_85_years_and_over_in_suburb REAL, 
--     _85_years_and_over_in_state REAL, 
--     percentage_85_years_and_over_in_state REAL, 
--     _85_years_and_over_in_australia REAL, 
--     percentage_85_years_and_over_in_australia REAL, 
--     Median_age_in_suburb REAL, 
--     percentage_Median_age_in_suburb REAL, 
--     Median_age_in_state REAL, 
--     percentage_Median_age_in_state REAL, 
--     Median_age_in_australia REAL, 
--     percentage_Median_age_in_australia REAL, 
--     Married_in_suburb REAL, 
--     percentage_Married_in_suburb REAL, 
--     Married_in_state REAL, 
--     percentage_Married_in_state REAL, 
--     Married_in_australia REAL, 
--     percentage_Married_in_australia REAL, 
--     Separated_in_suburb REAL, 
--     percentage_Separated_in_suburb REAL, 
--     Separated_in_state REAL, 
--     percentage_Separated_in_state REAL, 
--     Separated_in_australia REAL, 
--     percentage_Separated_in_australia REAL, 
--     Divorced_in_suburb REAL, 
--     percentage_Divorced_in_suburb REAL, 
--     Divorced_in_state REAL, 
--     percentage_Divorced_in_state REAL, 
--     Divorced_in_australia REAL, 
--     percentage_Divorced_in_australia REAL, 
--     Widowed_in_suburb REAL, 
--     percentage_Widowed_in_suburb REAL, 
--     Widowed_in_state REAL, 
--     percentage_Widowed_in_state REAL, 
--     Widowed_in_australia REAL, 
--     percentage_Widowed_in_australia REAL, 
--     Never_married_in_suburb REAL, 
--     percentage_Never_married_in_suburb REAL, 
--     Never_married_in_state REAL, 
--     percentage_Never_married_in_state REAL, 
--     Never_married_in_australia REAL, 
--     percentage_Never_married_in_australia REAL, 
--     median_age_Married_in_suburb REAL, 
--     percentage_median_age_Married_in_suburb REAL, 
--     median_age_Married_in_state REAL, 
--     percentage_median_age_Married_in_state REAL, 
--     median_age_Married_in_australia REAL, 
--     percentage_median_age_Married_in_australia REAL, 
--     median_age_Separated_in_suburb REAL, 
--     percentage_median_age__Separated_in_suburb REAL, 
--     median_age_Separated_in_state REAL, 
--     percentage_median_age_Separated_in_state REAL, 
--     median_age_Separated_in_australia REAL, 
--     percentage_median_age_Separated_in_australia REAL, 
--     median_age_Divorced_in_suburb REAL, 
--     percentage_median_age_Divorced_in_suburb REAL, 
--     median_age_Divorced_in_state REAL, 
--     percentage_median_age_Divorced_in_state REAL, 
--     median_age_Divorced_in_australia REAL, 
--     percentage_median_age_Divorced_in_australia REAL, 
--     median_age_Widowed_in_suburb REAL, 
--     percentage_median_age_Widowed_in_suburb REAL, 
--     median_age_Widowed_in_state REAL, 
--     percentage_median_age_Widowed_in_state REAL, 
--     median_age_Widowed_in_australia REAL, 
--     percentage_median_age_Widowed_in_australia REAL, 
--     median_age_Never_married_in_suburb REAL, 
--     percentage_median_age_Never_married_in_suburb REAL, 
--     median_age_Never_married_in_state REAL, 
--     percentage_median_age_Never_married_in_state REAL, 
--     median_age_Never_married_in_australia REAL, 
--     percentage_median_age_Never_married_in_australia REAL, 
--     Registered_marriage_in_suburb REAL, 
--     percentage_Registered_marriage_in_suburb REAL, 
--     Registered_marriage_in_state REAL, 
--     percentage_Registered_marriage_in_state REAL, 
--     Registered_marriage_in_australia REAL, 
--     percentage_Registered_marriage_in_australia REAL, 
--     De_facto_marriage_in_suburb REAL, 
--     percentage_De_facto_marriage_in_suburb REAL, 
--     De_facto_marriage_in_state REAL, 
--     percentage_De_facto_marriage_in_state REAL, 
--     De_facto_marriage_in_australia REAL, 
--     percentage_De_facto_marriage_in_australia REAL, 
--     Not_married_in_suburb REAL, 
--     percentage_Not_married_in_suburb REAL, 
--     Not_married_in_state REAL, 
--     percentage_Not_married_in_state REAL, 
--     Not_married_in_australia REAL, 
--     percentage_Not_married_in_australia REAL, 
--     median_age_Registered_marriage_in_suburb REAL, 
--     percentage_median_age_Registered_marriage_in_suburb REAL, 
--     median_age_Registered_marriage_in_state REAL, 
--     percentage_median_age_Registered_marriage_in_state REAL, 
--     median_age_Registered_marriage_in_australia REAL, 
--     percentage_median_age_Registered_marriage_in_australia REAL, 
--     median_age_De_facto_marriage_in_suburb REAL, 
--     percentage_median_age_De_facto_marriage_in_suburb REAL, 
--     median_age_De_facto_marriage_in_state REAL, 
--     percentage_median_age_De_facto_marriage_in_state REAL, 
--     median_age_De_facto_marriage_in_australia REAL, 
--     percentage_median_age_De_facto_marriage_in_australia REAL, 
--     median_age_Not_married_in_suburb REAL, 
--     percentage_median_age_Not_married_in_suburb REAL, 
--     median_age_Not_married_in_state REAL, 
--     percentage_median_age_Not_married_in_state REAL, 
--     median_age_Not_married_in_australia REAL, 
--     percentage_median_age_Not_married_in_australia REAL, 
--     Pre_school_in_suburb REAL, 
--     percentage_Pre_school_in_suburb REAL, 
--     Pre_school_in_state REAL, 
--     percentage_Pre_school_in_state REAL, 
--     Pre_school_in_australia REAL, 
--     percentage_Pre_school_in_australia REAL, 
--     Primary_Government_in_suburb REAL, 
--     percentage_Primary_Government_in_suburb REAL, 
--     Primary_Government_in_state REAL, 
--     percentage_Primary_Government_in_state REAL, 
--     Primary_Government_in_australia REAL, 
--     percentage_Primary_Government_in_australia REAL, 
--     Primary_Catholic_in_suburb REAL, 
--     percentage_Primary_Catholic_in_suburb REAL, 
--     Primary_Catholic_in_state REAL, 
--     percentage_Primary_Catholic_in_state REAL, 
--     Primary_Catholic_in_australia REAL, 
--     percentage_Primary_Catholic_in_australia REAL, 
--     Primary_Other_Non_Government_in_suburb REAL, 
--     percentage_Primary_Other_Non_Government_in_suburb REAL, 
--     Primary_Other_Non_Government_in_state REAL, 
--     percentage_Primary_Other_Non_Government_in_state REAL, 
--     Primary_Other_Non_Government_in_australia REAL, 
--     percentage_Primary_Other_Non_Government_in_australia REAL, 
--     Secondary_Government_in_suburb REAL, 
--     percentage_Secondary_Government_in_suburb REAL, 
--     Secondary_Government_in_state REAL, 
--     percentage_Secondary_Government_in_state REAL, 
--     Secondary_Government_in_australia REAL, 
--     percentage_Secondary_Government_in_australia REAL, 
--     Secondary_Catholic_in_suburb REAL, 
--     percentage_Secondary_Catholic_in_suburb REAL, 
--     Secondary_Catholic_in_state REAL, 
--     percentage_Secondary_Catholic_in_state REAL, 
--     Secondary_Catholic_in_australia REAL, 
--     percentage_Secondary_Catholic_in_australia REAL, 
--     Secondary_Other_Non_Government_in_suburb REAL, 
--     percentage_Secondary_Other_Non_Government_in_suburb REAL, 
--     Secondary_Other_Non_Government_in_state REAL, 
--     percentage_Secondary_Other_Non_Government_in_state REAL, 
--     Secondary_Other_Non_Government_in_australia REAL, 
--     percentage_Secondary_Other_Non_Government_in_australia REAL, 
--     technical_or_further_education_in_suburb REAL, 
--     percentage_technical_or_further_education_in_suburb REAL, 
--     technical_or_further_education_in_state REAL, 
--     percentage_technical_or_further_education_in_state REAL, 
--     technical_or_further_education_in_australia REAL, 
--     percentage_technical_or_further_education_in_australia REAL, 
--     University_or_tertiary_in_suburb REAL, 
--     percentage_University_or_tertiary_in_suburb REAL, 
--     University_or_tertiary_in_state REAL, 
--     percentage_University_or_tertiary_in_state REAL, 
--     University_or_tertiary_in_australia REAL, 
--     percentage_University_or_tertiary_in_australia REAL, 
--     Other_education_in_suburb REAL, 
--     percentage_Other_education_in_suburb REAL, 
--     Other_education_in_state REAL, 
--     percentage_Other_education_in_state REAL, 
--     Other_education_in_australia REAL, 
--     percentage_Other_education_in_australia REAL, 
--     Not_Stated_in_suburb REAL, 
--     percentage_Not_Stated_in_suburb REAL, 
--     Not_Stated_in_state REAL, 
--     percentage_Not_Stated_in_state REAL, 
--     Not_Stated_in_australia REAL, 
--     percentage_Not_Stated_in_australia REAL, 
--     Total_education_in_suburb REAL, 
--     percentage_Total_education_in_suburb REAL, 
--     Total_education_in_state REAL, 
--     percentage_Total_education_in_state REAL, 
--     Total_education_in_australia REAL, 
--     percentage_Total_education_in_australia REAL, 
--     cultural_data jsonb, 
--     employment_data jsonb, 
--     Couple_family_without_children_in_suburb REAL, 
--     percentage_Couple_family_without_children_in_suburb REAL, 
--     Couple_family_without_children_in_state REAL, 
--     percentage_Couple_family_without_children_in_state REAL, 
--     Couple_family_without_children_in_australia REAL, 
--     percentage_Couple_family_without_children_in_australia REAL, 
--     Couple_family_with_children_in_suburb REAL, 
--     percentage_Couple_family_with_children_in_suburb REAL, 
--     Couple_family_with_children_in_state REAL, 
--     percentage_Couple_family_with_children_in_state REAL, 
--     Couple_family_with_children_in_australia REAL, 
--     percentage_Couple_family_with_children_in_australia REAL, 
--     One_parent_family_in_suburb REAL, 
--     percentage_One_parent_family_in_suburb REAL, 
--     One_parent_family_in_state REAL, 
--     percentage_One_parent_family_in_state REAL, 
--     One_parent_family_in_australia REAL, 
--     percentage_One_parent_family_in_australia REAL, 
--     Other_family_in_suburb REAL, 
--     percentage_Other_family_in_suburb REAL, 
--     Other_family_in_state REAL, 
--     percentage_Other_family_in_state REAL, 
--     Other_family_in_australia REAL, 
--     percentage_Other_family_in_australia REAL, 
--     single_parent_Male_in_suburb REAL, 
--     percentage_single_parent_Male_in_suburb REAL, 
--     single_parent_Male_in_state REAL, 
--     percentage_single_parent_Male_in_state REAL, 
--     single_parent_Male_in_australia REAL, 
--     percentage_single_parent_Male_in_australia REAL, 
--     single_parent_Female_in_suburb REAL, 
--     percentage_single_parent_Female_in_suburb REAL, 
--     single_parent_Female_in_state REAL, 
--     percentage_single_parent_Female_in_state REAL, 
--     single_parent_Female_in_australia REAL, 
--     percentage_single_parent_Female_in_australia REAL, 
--     Families_without_children_in_suburb REAL, 
--     percentage_Families_without_children_in_suburb REAL, 
--     Families_without_children_in_state REAL, 
--     percentage_Families_without_children_in_state REAL, 
--     Families_without_children_in_australia REAL, 
--     percentage_Families_without_children_in_australia REAL, 
--     Families_with_children_in_suburb REAL, 
--     percentage_Families_with_children_in_suburb REAL, 
--     Families_with_children_in_state REAL, 
--     percentage_Families_with_children_in_state REAL, 
--     Families_with_children_in_australia REAL, 
--     percentage_Families_with_children_in_australia REAL, 
--     both_employed_worked_full_time_in_suburb REAL, 
--     percentage_both_employed_worked_full_time_in_suburb REAL, 
--     both_employed_worked_full_time_in_state REAL, 
--     percentage_both_employed_worked_full_time_in_state REAL, 
--     both_employed_worked_full_time_in_australia REAL, 
--     percentage_both_employed_worked_full_time_in_australia REAL, 
--     both_employed_worked_part_time_in_suburb REAL, 
--     percentage_both_employed_worked_part_time_in_suburb REAL, 
--     both_employed_worked_part_time_in_state REAL, 
--     percentage_both_employed_worked_part_time_in_state REAL, 
--     both_employed_worked_part_time_in_australia REAL, 
--     percentage_both_employed_worked_part_time_in_australia REAL, 
--     one_employed_full_time_one_part_time_in_suburb REAL, 
--     percentage_one_employed_full_time_one_part_time_in_suburb REAL, 
--     one_employed_full_time_one_part_time_in_state REAL, 
--     percentage_one_employed_full_time_one_part_time_in_state REAL, 
--     one_employed_full_time_one_part_time_in_australia REAL, 
--     percentage_one_employed_full_time_one_part_time_in_australia REAL, 
--     one_employed_full_time_other_not_working_in_suburb REAL, 
--     percentage_one_employed_full_time_other_not_working_in_suburb REAL, 
--     one_employed_full_time_other_not_working_in_state REAL, 
--     percentage_one_employed_full_time_other_not_working_in_state REAL, 
--     one_employed_full_time_other_not_working_in_australia REAL, 
--     percentage_one_employed_full_time_other_not_working_in_au REAL, 
--     one_employed_part_time_other_not_working_in_suburb REAL, 
--     percentage_one_employed_part_time_other_not_working_in_suburb REAL, 
--     one_employed_part_time_other_not_working_in_state REAL, 
--     percentage_one_employed_part_time_other_not_working_in_state REAL, 
--     one_employed_part_time_other_not_working_in_australia REAL, 
--     percentage_one_employed_part_time_other_not_working_in_au REAL, 
--     both_not_working_in_suburb REAL, 
--     percentage_both_not_working_in_suburb REAL, 
--     both_not_working_in_state REAL, 
--     percentage_both_not_working_in_state REAL, 
--     both_not_working_in_australia REAL, 
--     percentage_both_not_working_in_australia REAL, 
--     Other_employment_in_suburb REAL, 
--     percentage_Other_employment_in_suburb REAL, 
--     Other_employment_in_state REAL, 
--     percentage_Other_employment_in_state REAL, 
--     Other_employment_in_australia REAL, 
--     percentage_Other_employment_in_australia REAL, 
--     Labour_force_status_not_stated_in_suburb REAL, 
--     percentage_Labour_force_status_not_stated_in_suburb REAL, 
--     Labour_force_status_not_stated_in_state REAL, 
--     percentage_Labour_force_status_not_stated_in_state REAL, 
--     Labour_force_status_not_stated_in_australia REAL, 
--     percentage_Labour_force_status_not_stated_in_australia REAL, 
--     Occupied_private_dwellings_in_suburb REAL, 
--     percentage_Occupied_private_dwellings_in_suburb REAL, 
--     Occupied_private_dwellings_in_state REAL, 
--     percentage_Occupied_private_dwellings_in_state REAL, 
--     Occupied_private_dwellings_in_australia REAL, 
--     percentage_Occupied_private_dwellings_in_australia REAL, 
--     Unoccupied_private_dwellings_in_suburb REAL, 
--     percentage_Unoccupied_private_dwellings_in_suburb REAL, 
--     Unoccupied_private_dwellings_in_state REAL, 
--     percentage_Unoccupied_private_dwellings_in_state REAL, 
--     Unoccupied_private_dwellings_in_australia REAL, 
--     percentage_Unoccupied_private_dwellings_in_australia REAL, 
--     Separate_house_in_suburb REAL, 
--     percentage_Separate_house_in_suburb REAL, 
--     Separate_house_in_state REAL, 
--     percentage_Separate_house_in_state REAL, 
--     Separate_house_in_australia REAL, 
--     percentage_Separate_house_in_australia REAL, 
--     Semi_detached_in_suburb REAL, 
--     percentage_Semi_detached_in_suburb REAL, 
--     Semi_detached_in_state REAL, 
--     percentage_Semi_detached_in_state REAL, 
--     Semi_detached_in_australia REAL, 
--     percentage_Semi_detached_in_australia REAL, 
--     Flat_unit_or_apartment_in_suburb REAL, 
--     percentage_Flat_unit_or_apartment_in_suburb REAL, 
--     Flat_unit_or_apartment_in_state REAL, 
--     percentage_Flat_unit_or_apartment_in_state REAL, 
--     Flat_unit_or_apartment_in_australia REAL, 
--     percentage_Flat_unit_or_apartment_in_australia REAL, 
--     Other_dwelling_in_suburb REAL, 
--     percentage_Other_dwelling_in_suburb REAL, 
--     Other_dwelling_in_state REAL, 
--     percentage_Other_dwelling_in_state REAL, 
--     Other_dwelling_in_australia REAL, 
--     percentage_Other_dwelling_in_australia REAL, 
--     None_includes_bedsitters_in_suburb REAL, 
--     percentage_None_includes_bedsitters_in_suburb REAL, 
--     None_includes_bedsitters_in_state REAL, 
--     percentage_None_includes_bedsitters_in_state REAL, 
--     None_includes_bedsitters_in_australia REAL, 
--     percentage_None_includes_bedsitters_in_australia REAL, 
--     _1_bedroom_in_suburb REAL, 
--     percentage_1_bedroom_in_suburb REAL, 
--     _1_bedroom_in_state REAL, 
--     percentage_1_bedroom_in_state REAL, 
--     _1_bedroom_in_australia REAL, 
--     percentage_1_bedroom_in_australia REAL, 
--     _2_bedrooms_in_suburb REAL, 
--     percentage_2_bedrooms_in_suburb REAL, 
--     _2_bedrooms_in_state REAL, 
--     percentage_2_bedrooms_in_state REAL, 
--     _2_bedrooms_in_australia REAL, 
--     percentage_2_bedrooms_in_australia REAL, 
--     _3_bedrooms_in_suburb REAL, 
--     percentage_3_bedrooms_in_suburb REAL, 
--     _3_bedrooms_in_state REAL, 
--     percentage_3_bedrooms_in_state REAL, 
--     _3_bedrooms_in_australia REAL, 
--     percentage_3_bedrooms_in_australia REAL, 
--     _4_or_more_bedrooms_in_suburb REAL, 
--     percentage_4_or_more_bedrooms_in_suburb REAL, 
--     _4_or_more_bedrooms_in_state REAL, 
--     percentage_4_or_more_bedrooms_in_state REAL, 
--     _4_or_more_bedrooms_in_australia REAL, 
--     percentage_4_or_more_bedrooms_in_australia REAL, 
--     Number_of_bedrooms_not_stated_in_suburb REAL, 
--     percentage_Number_of_bedrooms_not_stated_in_suburb REAL, 
--     Number_of_bedrooms_not_stated_in_state REAL, 
--     percentage_Number_of_bedrooms_not_stated_in_state REAL, 
--     Number_of_bedrooms_not_stated_in_australia REAL, 
--     percentage_Number_of_bedrooms_not_stated_in_australia REAL, 
--     Average_number_of_bedrooms_per_dwelling_in_suburb REAL, 
--     percentage_Average_number_of_bedrooms_per_dwelling_in_suburb REAL, 
--     Average_number_of_bedrooms_per_dwelling_in_state REAL, 
--     percentage_Average_number_of_bedrooms_per_dwelling_in_state REAL, 
--     Average_number_of_bedrooms_per_dwelling_in_australia REAL, 
--     percentage_Average_number_of_bedrooms_per_dwelling_in_australia REAL, 
--     Average_number_of_people_per_household_in_suburb REAL, 
--     percentage_Average_number_of_people_per_household_in_suburb REAL, 
--     Average_number_of_people_per_household_in_state REAL, 
--     percentage_Average_number_of_people_per_household_in_state REAL, 
--     Average_number_of_people_per_household_in_australia REAL, 
--     percentage_Average_number_of_people_per_household_in_australia REAL, 
--     Owned_outright_in_suburb REAL, 
--     percentage_Owned_outright_in_suburb REAL, 
--     Owned_outright_in_state REAL, 
--     percentage_Owned_outright_in_state REAL, 
--     Owned_outright_in_australia REAL, 
--     percentage_Owned_outright_in_australia REAL, 
--     Owned_with_a_mortgage_in_suburb REAL, 
--     percentage_Owned_with_a_mortgage_in_suburb REAL, 
--     Owned_with_a_mortgage_in_state REAL, 
--     percentage_Owned_with_a_mortgage_in_state REAL, 
--     Owned_with_a_mortgage_in_australia REAL, 
--     percentage_Owned_with_a_mortgage_in_australia REAL, 
--     Rented_in_suburb REAL, 
--     percentage_Rented_in_suburb REAL, 
--     Rented_in_state REAL, 
--     percentage_Rented_in_state REAL, 
--     Rented_in_australia REAL, 
--     percentage_Rented_in_australia REAL, 
--     Other_tenure_type_in_suburb REAL, 
--     percentage_Other_tenure_type_in_suburb REAL, 
--     Other_tenure_type_in_state REAL, 
--     percentage_Other_tenure_type_in_state REAL, 
--     Other_tenure_type_in_australia REAL, 
--     percentage_Other_tenure_type_in_australia REAL, 
--     Tenure_type_not_stated_in_suburb REAL, 
--     percentage_Tenure_type_not_stated_in_suburb REAL, 
--     Tenure_type_not_stated_in_state REAL, 
--     percentage_Tenure_type_not_stated_in_state REAL, 
--     Tenure_type_not_stated_in_australia REAL, 
--     percentage_Tenure_type_not_stated_in_australia REAL, 
--     Family_households_in_suburb REAL, 
--     percentage_Family_households_in_suburb REAL, 
--     Family_households_in_state REAL, 
--     percentage_Family_households_in_state REAL, 
--     Family_households_in_australia REAL, 
--     percentage_Family_households_in_australia REAL, 
--     Single_or_lone_person_households_in_suburb REAL, 
--     percentage_Single_or_lone_person_households_in_suburb REAL, 
--     Single_or_lone_person_households_in_state REAL, 
--     percentage_Single_or_lone_person_households_in_state REAL, 
--     Single_or_lone_person_households_in_australia REAL, 
--     percentage_Single_or_lone_person_households_in_australia REAL, 
--     Group_households_in_suburb REAL, 
--     percentage_Group_households_in_suburb REAL, 
--     Group_households_in_state REAL, 
--     percentage_Group_households_in_state REAL, 
--     Group_households_in_australia REAL, 
--     percentage_Group_households_in_australia REAL, 
--     Less_than_600_gross_weekly_income_in_suburb REAL, 
--     percentage_Less_than_600_gross_weekly_income_in_suburb REAL, 
--     Less_than_600_gross_weekly_income_in_state REAL, 
--     percentage_Less_than_600_gross_weekly_income_in_state REAL, 
--     Less_than_600_gross_weekly_income_in_australia REAL, 
--     percentage_Less_than_600_gross_weekly_income_in_australia REAL, 
--     More_than_3000_gross_weekly_income_in_suburb REAL, 
--     percentage_More_than_3000_gross_weekly_income_in_suburb REAL, 
--     More_than_3000_gross_weekly_income_in_state REAL, 
--     percentage_More_than_3000_gross_weekly_income_in_state REAL, 
--     More_than_3000_gross_weekly_income_in_australia REAL, 
--     percentage_More_than_3000_gross_weekly_income_in_australia REAL, 
--     Median_rent_in_suburb REAL, 
--     percentage_Median_rent_in_suburb REAL, 
--     Median_rent_in_state REAL, 
--     percentage_Median_rent_in_state REAL, 
--     Median_rent_in_australia REAL, 
--     percentage_Median_rent_in_australia REAL, 
--     rent_30_of_household_income_in_suburb REAL, 
--     percentage_rent_30_of_household_income_in_suburb REAL, 
--     rent_30_of_household_income_in_state REAL, 
--     percentage_rent_30_of_household_income_in_state REAL, 
--     rent_30_of_household_income_in_australia REAL, 
--     percentage_rent_30_of_household_income_in_australia REAL, 
--     rent_are_30_or_greater_of_household_income_in_suburb REAL, 
--     percentage_rent_30_or_greater_of_household_income_in_suburb REAL, 
--     rent_30_or_greater_of_household_income_in_state REAL, 
--     percentage_rent_30_or_greater_of_household_income_in_state REAL, 
--     rent_30_or_greater_of_household_income_in_australia REAL, 
--     percentage_rent_30_or_greater_of_household_income_in_australia REAL, 
--     Median_mortgage_in_suburb REAL, 
--     percentage_Median_mortgage_in_suburb REAL, 
--     Median_mortgage_in_state REAL, 
--     percentage_Median_mortgage_in_state REAL, 
--     Median_mortgage_in_australia REAL, 
--     percentage_Median_mortgage_in_australia REAL, 
--     mortgage_less_than_30_of_household_income_in_suburb REAL, 
--     percentage_mortgage_less_30_of_household_income_in_suburb REAL, 
--     mortgage_less_than_30_of_household_income_in_state REAL, 
--     percentage_mortgage_less_than_30_of_household_income_in_state REAL, 
--     mortgage_less_than_30_of_household_income_in_australia REAL, 
--     percentage_mortgage_less_than_30_of_household_income_in_au REAL, 
--     mortgage_30_or_greater_of_household_income_in_suburb REAL, 
--     percentage_mortgage_30_or_greater_of_household_income_in_suburb REAL, 
--     mortgage_30_or_greater_of_household_income_in_state REAL, 
--     percentage_mortgage_30_or_greater_of_household_income_in_state REAL, 
--     mortgage_30_or_greater_of_household_income_in_australia REAL, 
--     percentage_mortgage_30_or_greater_of_household_income_in_au REAL, 
--     None_in_suburb REAL, 
--     percentage_None_in_suburb REAL, 
--     None_in_state REAL, 
--     percentage_None_in_state REAL, 
--     None_in_australia REAL, 
--     percentage_None_in_australia REAL, 
--     _1_motor_vehicle_in_suburb REAL, 
--     percentage_1_motor_vehicle_in_suburb REAL, 
--     _1_motor_vehicle_in_state REAL, 
--     percentage_1_motor_vehicle_in_state REAL, 
--     _1_motor_vehicle_in_australia REAL, 
--     percentage_1_motor_vehicle_in_australia REAL, 
--     _2_motor_vehicles_in_suburb REAL, 
--     percentage_2_motor_vehicles_in_suburb REAL, 
--     _2_motor_vehicles_in_state REAL, 
--     percentage_2_motor_vehicles_in_state REAL, 
--     _2_motor_vehicles_in_australia REAL, 
--     percentage_2_motor_vehicles_in_australia REAL, 
--     _3_or_more_vehicles_in_suburb REAL, 
--     percentage_3_or_more_vehicles_in_suburb REAL, 
--     _3_or_more_vehicles_in_state REAL, 
--     percentage_3_or_more_vehicles_in_state REAL, 
--     _3_or_more_vehicles_in_australia REAL, 
--     percentage_3_or_more_vehicles_in_australia REAL, 
--     Number_of_motor_vehicles_not_stated_in_suburb REAL, 
--     percentage_Number_of_motor_vehicles_not_stated_in_suburb REAL, 
--     Number_of_motor_vehicles_not_stated_in_state REAL, 
--     percentage_Number_of_motor_vehicles_not_stated_in_state REAL, 
--     Number_of_motor_vehicles_not_stated_in_australia REAL, 
--     percentage_Number_of_motor_vehicles_not_stated_in_australia REAL, 
--     Median_weekly_rent_in_suburb REAL, 
--     percentage_Median_weekly_rent_in_suburb REAL, 
--     Median_weekly_rent_in_state REAL, 
--     percentage_Median_weekly_rent_in_state REAL, 
--     Median_weekly_rent_in_australia REAL, 
--     percentage_Median_weekly_rent_in_australia REAL, 
--     Median_monthly_mortgage_repayments_in_suburb REAL, 
--     percentage_Median_monthly_mortgage_repayments_in_suburb REAL, 
--     Median_monthly_mortgage_repayments_in_state REAL, 
--     percentage_Median_monthly_mortgage_repayments_in_state REAL, 
--     Median_monthly_mortgage_repayments_in_australia REAL, 
--     percentage_Median_monthly_mortgage_repayments_in_australia REAL
-- );

-- -- Enable RLS
-- alter table data_2011 enable row level security;

-- -- Allow anyone to read
-- CREATE POLICY "anyone can read income_and_work table"
-- on "public"."data_2011"
-- FOR SELECT
-- TO public
-- USING (true);

