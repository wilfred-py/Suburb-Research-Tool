-- Create 2006 table
create table data_2016 (
    id uuid primary key default uuid_generate_v4() not null,
    suburb_name text,
    ssc_code text,
    state_name text,
    people INT,
    male REAL,
    female REAL,
    median_age INT,
    families INT,
    average_children_per_family REAL,
    average_children_per_family_with_children REAL,
    average_children_per_family_for_all_households REAL,
    all_private_dwellings INT, 
    average_people_per_household REAL, 
    median_weekly_household_income INT, 
    median_monthly_mortgage_payment INT, 
    median_weekly_rent INT, 
    average_motor_vehicles_per_dwelling REAL, 
    Male_in_suburb INT, 
    percentage_Male_in_suburb REAL, 
    Male_in_state INT, 
    percentage_Male_in_state REAL, 
    Male_in_australia INT, 
    percentage_Male_in_australia REAL, 
    Female_in_suburb INT, 
    percentage_Female_in_suburb REAL, 
    Female_in_state INT, 
    percentage_Female_in_state REAL, 
    Female_in_australia INT, 
    percentage_Female_in_australia REAL, 
    atsi_people_in_suburb INT, 
    percentage_atsi_people_in_suburb REAL, 
    atsi_people_in_state INT, 
    percentage_atsi_people_in_state REAL, 
    atsi_people_in_australia INT, 
    percentage_atsi_people_in_australia REAL, 
    Median_age_in_suburb INT, 
    percentage_Median_age_in_suburb REAL, 
    Median_age_in_state INT, 
    percentage_Median_age_in_state REAL, 
    Median_age_in_australia INT, 
    percentage_Median_age_in_australia REAL, 
    _0_4_years_in_suburb INT, 
    percentage_0_4_years_in_suburb REAL, 
    _0_4_years_in_state INT, 
    percentage_0_4_years_in_state REAL, 
    _0_4_years_in_australia INT, 
    percentage_0_4_years_in_australia REAL, 
    _5_9_years_in_suburb INT, 
    percentage_5_9_years_in_suburb REAL, 
    _5_9_years_in_state INT, 
    percentage_5_9_years_in_state REAL, 
    _5_9_years_in_australia INT, 
    percentage_5_9_years_in_australia REAL, 
    _10_14_years_in_suburb INT, 
    percentage_10_14_years_in_suburb REAL, 
    _10_14_years_in_state INT, 
    percentage_10_14_years_in_state REAL, 
    _10_14_years_in_australia INT, 
    percentage_10_14_years_in_australia REAL, 
    _15_19_years_in_suburb INT, 
    percentage_15_19_years_in_suburb REAL, 
    _15_19_years_in_state INT, 
    percentage_15_19_years_in_state REAL, 
    _15_19_years_in_australia INT, 
    percentage_15_19_years_in_australia REAL, 
    _20_24_years_in_suburb INT, 
    percentage_20_24_years_in_suburb REAL, 
    _20_24_years_in_state INT, 
    percentage_20_24_years_in_state REAL, 
    _20_24_years_in_australia INT, 
    percentage_20_24_years_in_australia REAL, 
    _25_29_years_in_suburb INT, 
    percentage_25_29_years_in_suburb REAL, 
    _25_29_years_in_state INT, 
    percentage_25_29_years_in_state REAL, 
    _25_29_years_in_australia INT, 
    percentage_25_29_years_in_australia REAL, 
    _30_34_years_in_suburb INT, 
    percentage_30_34_years_in_suburb REAL, 
    _30_34_years_in_state INT, 
    percentage_30_34_years_in_state REAL, 
    _30_34_years_in_australia INT, 
    percentage_30_34_years_in_australia REAL, 
    _35_39_years_in_suburb INT, 
    percentage_35_39_years_in_suburb REAL, 
    _35_39_years_in_state INT, 
    percentage_35_39_years_in_state REAL, 
    _35_39_years_in_australia INT, 
    percentage_35_39_years_in_australia REAL, 
    _40_44_years_in_suburb INT, 
    percentage_40_44_years_in_suburb REAL, 
    _40_44_years_in_state INT, 
    percentage_40_44_years_in_state REAL, 
    _40_44_years_in_australia INT, 
    percentage_40_44_years_in_australia REAL, 
    _45_49_years_in_suburb INT, 
    percentage_45_49_years_in_suburb REAL, 
    _45_49_years_in_state INT, 
    percentage_45_49_years_in_state REAL, 
    _45_49_years_in_australia INT, 
    percentage_45_49_years_in_australia REAL, 
    _50_54_years_in_suburb INT, 
    percentage_50_54_years_in_suburb REAL, 
    _50_54_years_in_state INT, 
    percentage_50_54_years_in_state REAL, 
    _50_54_years_in_australia INT, 
    percentage_50_54_years_in_australia REAL, 
    _55_59_years_in_suburb INT, 
    percentage_55_59_years_in_suburb REAL, 
    _55_59_years_in_state INT, 
    percentage_55_59_years_in_state REAL, 
    _55_59_years_in_australia INT, 
    percentage_55_59_years_in_australia REAL, 
    _60_64_years_in_suburb INT, 
    percentage_60_64_years_in_suburb REAL, 
    _60_64_years_in_state INT, 
    percentage_60_64_years_in_state REAL, 
    _60_64_years_in_australia INT, 
    percentage_60_64_years_in_australia REAL, 
    _65_69_years_in_suburb INT, 
    percentage_65_69_years_in_suburb REAL, 
    _65_69_years_in_state INT, 
    percentage_65_69_years_in_state REAL, 
    _65_69_years_in_australia INT, 
    percentage_65_69_years_in_australia REAL, 
    _70_74_years_in_suburb INT, 
    percentage_70_74_years_in_suburb REAL, 
    _70_74_years_in_state INT, 
    percentage_70_74_years_in_state REAL, 
    _70_74_years_in_australia INT, 
    percentage_70_74_years_in_australia REAL, 
    _75_79_years_in_suburb INT, 
    percentage_75_79_years_in_suburb REAL, 
    _75_79_years_in_state INT, 
    percentage_75_79_years_in_state REAL, 
    _75_79_years_in_australia INT, 
    percentage_75_79_years_in_australia REAL, 
    _80_84_years_in_suburb INT, 
    percentage_80_84_years_in_suburb REAL, 
    _80_84_years_in_state INT, 
    percentage_80_84_years_in_state REAL, 
    _80_84_years_in_australia INT, 
    percentage_80_84_years_in_australia REAL, 
    _85_years_and_over_in_suburb INT, 
    percentage_85_years_and_over_in_suburb REAL, 
    _85_years_and_over_in_state INT, 
    percentage_85_years_and_over_in_state REAL, 
    _85_years_and_over_in_australia INT, 
    percentage_85_years_and_over_in_australia REAL, 
    Married_in_suburb INT, 
    percentage_Married_in_suburb REAL, 
    Married_in_state INT, 
    percentage_Married_in_state REAL, 
    Married_in_australia INT, 
    percentage_Married_in_australia REAL, 
    Separated_in_suburb INT, 
    percentage_Separated_in_suburb REAL, 
    Separated_in_state INT, 
    percentage_Separated_in_state REAL, 
    Separated_in_australia INT, 
    percentage_Separated_in_australia REAL, 
    Divorced_in_suburb INT, 
    percentage_Divorced_in_suburb REAL, 
    Divorced_in_state INT, 
    percentage_Divorced_in_state REAL, 
    Divorced_in_australia INT, 
    percentage_Divorced_in_australia REAL, 
    Widowed_in_suburb INT, 
    percentage_Widowed_in_suburb REAL, 
    Widowed_in_state INT, 
    percentage_Widowed_in_state REAL, 
    Widowed_in_australia INT, 
    percentage_Widowed_in_australia REAL, 
    Never_married_in_suburb INT, 
    percentage_Never_married_in_suburb REAL, 
    Never_married_in_state INT, 
    percentage_Never_married_in_state REAL, 
    Never_married_in_australia INT, 
    percentage_Never_married_in_australia REAL, 
    Registered_marriage_in_suburb INT, 
    percentage_Registered_marriage_in_suburb REAL, 
    Registered_marriage_in_state INT, 
    percentage_Registered_marriage_in_state REAL, 
    Registered_marriage_in_australia INT, 
    percentage_Registered_marriage_in_australia REAL, 
    De_facto_marriage_in_suburb INT, 
    percentage_De_facto_marriage_in_suburb REAL, 
    De_facto_marriage_in_state INT, 
    percentage_De_facto_marriage_in_state REAL, 
    De_facto_marriage_in_australia INT, 
    percentage_De_facto_marriage_in_australia REAL, 
    Not_married_in_suburb INT, 
    percentage_Not_married_in_suburb REAL, 
    Not_married_in_state INT, 
    percentage_Not_married_in_state REAL, 
    Not_married_in_australia INT, 
    percentage_Not_married_in_australia REAL, 
    Preschool_in_suburb INT, 
    percentage_Preschool_in_suburb REAL, 
    Preschool_in_state INT, 
    percentage_Preschool_in_state REAL, 
    Preschool_in_australia INT, 
    percentage_Preschool_in_australia REAL, 
    Primary___Government_in_suburb INT, 
    percentage_Primary___Government_in_suburb REAL, 
    Primary___Government_in_state INT, 
    percentage_Primary___Government_in_state REAL, 
    Primary___Government_in_australia INT, 
    percentage_Primary___Government_in_australia REAL, 
    Primary___Catholic_in_suburb INT, 
    percentage_Primary___Catholic_in_suburb REAL, 
    Primary___Catholic_in_state INT, 
    percentage_Primary___Catholic_in_state REAL, 
    Primary___Catholic_in_australia INT, 
    percentage_Primary___Catholic_in_australia REAL, 
    Primary___other_non_Government_in_suburb INT, 
    percentage_Primary___other_non_Government_in_suburb REAL, 
    Primary___other_non_Government_in_state INT, 
    percentage_Primary___other_non_Government_in_state REAL, 
    Primary___other_non_Government_in_australia INT, 
    percentage_Primary___other_non_Government_in_australia REAL, 
    Secondary___Government_in_suburb INT, 
    percentage_Secondary___Government_in_suburb REAL, 
    Secondary___Government_in_state INT, 
    percentage_Secondary___Government_in_state REAL, 
    Secondary___Government_in_australia INT, 
    percentage_Secondary___Government_in_australia REAL, 
    Secondary___Catholic_in_suburb INT, 
    percentage_Secondary___Catholic_in_suburb REAL, 
    Secondary___Catholic_in_state INT, 
    percentage_Secondary___Catholic_in_state REAL, 
    Secondary___Catholic_in_australia INT, 
    percentage_Secondary___Catholic_in_australia REAL, 
    Secondary___other_non_Government_in_suburb INT, 
    percentage_Secondary___other_non_Government_in_suburb REAL, 
    Secondary___other_non_Government_in_state INT, 
    percentage_Secondary___other_non_Government_in_state REAL, 
    Secondary___other_non_Government_in_australia INT, 
    percentage_Secondary___other_non_Government_in_australia REAL, 
    Technical_or_further_education_institution_in_suburb INT, 
    percentage_Technical_or_further_education_institution_in_suburb REAL, 
    Technical_or_further_education_institution_in_state INT, 
    percentage_Technical_or_further_education_institution_in_state REAL, 
    Technical_or_further_education_institution_in_australia INT, 
    percentage_technical_or_further_education_institution_in_au REAL, 
    University_or_tertiary_institution_in_suburb INT, 
    percentage_University_or_tertiary_institution_in_suburb REAL, 
    University_or_tertiary_institution_in_state INT, 
    percentage_University_or_tertiary_institution_in_state REAL, 
    University_or_tertiary_institution_in_australia INT, 
    percentage_University_or_tertiary_institution_in_australia REAL, 
    Other_in_suburb INT, 
    percentage_Other_in_suburb REAL, 
    Other_in_state INT, 
    percentage_Other_in_state REAL, 
    Other_in_australia INT, 
    percentage_Other_in_australia REAL, 
    education_not_stated_in_suburb INT, 
    percentage_education_not_stated_in_suburb REAL, 
    education_not_stated_in_state INT, 
    percentage_education_not_stated_in_state REAL, 
    education_not_stated_in_australia INT, 
    percentage_education_not_stated_in_australia REAL, 
    Bachelor_Degree_level_and_above_in_suburb INT, 
    percentage_Bachelor_Degree_level_and_above_in_suburb REAL, 
    Bachelor_Degree_level_and_above_in_state INT, 
    percentage_Bachelor_Degree_level_and_above_in_state REAL, 
    Bachelor_Degree_level_and_above_in_australia INT, 
    percentage_Bachelor_Degree_level_and_above_in_australia REAL, 
    Advanced_Diploma_and_Diploma_level_in_suburb INT, 
    percentage_Advanced_Diploma_and_Diploma_level_in_suburb REAL, 
    Advanced_Diploma_and_Diploma_level_in_state INT, 
    percentage_Advanced_Diploma_and_Diploma_level_in_state REAL, 
    Advanced_Diploma_and_Diploma_level_in_australia INT, 
    percentage_Advanced_Diploma_and_Diploma_level_in_australia REAL, 
    Certificate_level_IV_in_suburb INT, 
    percentage_Certificate_level_IV_in_suburb REAL, 
    Certificate_level_IV_in_state INT, 
    percentage_Certificate_level_IV_in_state REAL, 
    Certificate_level_IV_in_australia INT, 
    percentage_Certificate_level_IV_in_australia REAL, 
    Certificate_level_III_in_suburb INT, 
    percentage_Certificate_level_III_in_suburb REAL, 
    Certificate_level_III_in_state INT, 
    percentage_Certificate_level_III_in_state REAL, 
    Certificate_level_III_in_australia INT, 
    percentage_Certificate_level_III_in_australia REAL, 
    Year_12_in_suburb INT, 
    percentage_Year_12_in_suburb REAL, 
    Year_12_in_state INT, 
    percentage_Year_12_in_state REAL, 
    Year_12_in_australia INT, 
    percentage_Year_12_in_australia REAL, 
    Year_11_in_suburb INT, 
    percentage_Year_11_in_suburb REAL, 
    Year_11_in_state INT, 
    percentage_Year_11_in_state REAL, 
    Year_11_in_australia INT, 
    percentage_Year_11_in_australia REAL, 
    Year_10_in_suburb INT, 
    percentage_Year_10_in_suburb REAL, 
    Year_10_in_state INT, 
    percentage_Year_10_in_state REAL, 
    Year_10_in_australia INT, 
    percentage_Year_10_in_australia REAL, 
    Certificate_level_II_in_suburb INT, 
    percentage_Certificate_level_II_in_suburb REAL, 
    Certificate_level_II_in_state INT, 
    percentage_Certificate_level_II_in_state REAL, 
    Certificate_level_II_in_australia INT, 
    percentage_Certificate_level_II_in_australia REAL, 
    Certificate_level_I_in_suburb INT, 
    percentage_Certificate_level_I_in_suburb REAL, 
    Certificate_level_I_in_state INT, 
    percentage_Certificate_level_I_in_state REAL, 
    Certificate_level_I_in_australia INT, 
    percentage_Certificate_level_I_in_australia REAL, 
    Year_9_or_below_in_suburb INT, 
    percentage_Year_9_or_below_in_suburb REAL, 
    Year_9_or_below_in_state INT, 
    percentage_Year_9_or_below_in_state REAL, 
    Year_9_or_below_in_australia INT, 
    percentage_Year_9_or_below_in_australia REAL, 
    No_educational_attainment_in_suburb INT, 
    percentage_No_educational_attainment_in_suburb REAL, 
    No_educational_attainment_in_state INT, 
    percentage_No_educational_attainment_in_state REAL, 
    No_educational_attainment_in_australia INT, 
    percentage_No_educational_attainment_in_australia REAL, 
    highest_education_not_stated_in_suburb INT, 
    percentage_highest_education_not_stated_in_suburb REAL, 
    highest_education_not_stated_in_state INT, 
    percentage_highest_education_not_stated_in_state REAL, 
    highest_education_not_stated_in_australia INT, 
    percentage_highest_education_not_stated_in_australia REAL, 
    cultural_data jsonb,
    employment_data jsonb,
    Couple_family_without_children_in_suburb INT, 
    percentage_Couple_family_without_children_in_suburb REAL, 
    Couple_family_without_children_in_state INT, 
    percentage_Couple_family_without_children_in_state REAL, 
    Couple_family_without_children_in_australia INT, 
    percentage_Couple_family_without_children_in_australia REAL, 
    Couple_family_with_children_in_suburb INT, 
    percentage_Couple_family_with_children_in_suburb REAL, 
    Couple_family_with_children_in_state INT, 
    percentage_Couple_family_with_children_in_state REAL, 
    Couple_family_with_children_in_australia INT, 
    percentage_Couple_family_with_children_in_australia REAL, 
    One_parent_family_in_suburb INT, 
    percentage_One_parent_family_in_suburb REAL, 
    One_parent_family_in_state INT, 
    percentage_One_parent_family_in_state REAL, 
    One_parent_family_in_australia INT, 
    percentage_One_parent_family_in_australia REAL, 
    Other_family_in_suburb INT, 
    percentage_Other_family_in_suburb REAL, 
    Other_family_in_state INT, 
    percentage_Other_family_in_state REAL, 
    Other_family_in_australia INT, 
    percentage_Other_family_in_australia REAL, 
    single_male_parent_in_suburb INT, 
    percentage_single_male_parent_in_suburb REAL, 
    single_male_parent_in_state INT, 
    percentage_single_male_parent_in_state REAL, 
    single_male_parent_in_australia INT, 
    percentage_single_male_parent_in_australia REAL, 
    single_female_parent_in_suburb INT, 
    percentage_single_female_parent_in_suburb REAL, 
    single_female_parent_in_state INT, 
    percentage_single_female_parent_in_state REAL, 
    single_female_parent_in_australia INT, 
    percentage_single_female_parent_in_australia REAL, 
    Both_employed_worked_full_time_in_suburb INT, 
    percentage_Both_employed_worked_full_time_in_suburb REAL, 
    Both_employed_worked_full_time_in_state INT, 
    percentage_Both_employed_worked_full_time_in_state REAL, 
    Both_employed_worked_full_time_in_australia INT, 
    percentage_Both_employed_worked_full_time_in_australia REAL, 
    Both_employed_worked_part_time_in_suburb INT, 
    percentage_Both_employed_worked_part_time_in_suburb REAL, 
    Both_employed_worked_part_time_in_state INT, 
    percentage_Both_employed_worked_part_time_in_state REAL, 
    Both_employed_worked_part_time_in_australia INT, 
    percentage_Both_employed_worked_part_time_in_australia REAL, 
    One_employed_full_time_one_part_time_in_suburb INT, 
    percentage_One_employed_full_time_one_part_time_in_suburb REAL, 
    One_employed_full_time_one_part_time_in_state INT, 
    percentage_One_employed_full_time_one_part_time_in_state REAL, 
    One_employed_full_time_one_part_time_in_australia INT, 
    percentage_One_employed_full_time_one_part_time_in_australia REAL, 
    One_employed_full_time_other_not_working_in_suburb INT, 
    percentage_One_employed_full_time_other_not_working_in_suburb REAL, 
    One_employed_full_time_other_not_working_in_state INT, 
    percentage_One_employed_full_time_other_not_working_in_state REAL, 
    One_employed_full_time_other_not_working_in_australia INT, 
    percentage_One_employed_full_time_other_not_working_in_au REAL, 
    One_employed_part_time_other_not_working_in_suburb INT, 
    percentage_One_employed_part_time_other_not_working_in_suburb REAL, 
    One_employed_part_time_other_not_working_in_state INT, 
    percentage_One_employed_part_time_other_not_working_in_state REAL, 
    One_employed_part_time_other_not_working_in_australia INT, 
    percentage_One_employed_part_time_other_not_working_in_au REAL, 
    Both_not_working_in_suburb INT, 
    percentage_Both_not_working_in_suburb REAL, 
    Both_not_working_in_state INT, 
    percentage_Both_not_working_in_state REAL, 
    Both_not_working_in_australia INT, 
    percentage_Both_not_working_in_australia REAL, 
    Other_includes_away_from_work_in_suburb INT, 
    percentage_Other_includes_away_from_work_in_suburb REAL, 
    Other_includes_away_from_work_in_state INT, 
    percentage_Other_includes_away_from_work_in_state REAL, 
    Other_includes_away_from_work_in_australia INT, 
    percentage_Other_includes_away_from_work_in_australia REAL, 
    labour_force_not_stated_in_suburb INT, 
    percentage_labour_force_not_stated_in_suburb REAL, 
    labour_force_not_stated_in_state INT, 
    percentage_labour_force_not_stated_in_state REAL, 
    labour_force_not_stated_in_australia INT, 
    percentage_labour_force_not_stated_in_australia REAL, 
    Occupied_private_dwellings_in_suburb INT, 
    percentage_Occupied_private_dwellings_in_suburb REAL, 
    Occupied_private_dwellings_in_state INT, 
    percentage_Occupied_private_dwellings_in_state REAL, 
    Occupied_private_dwellings_in_australia INT, 
    percentage_Occupied_private_dwellings_in_australia REAL, 
    Unoccupied_private_dwellings_in_suburb INT, 
    percentage_Unoccupied_private_dwellings_in_suburb REAL, 
    Unoccupied_private_dwellings_in_state INT, 
    percentage_Unoccupied_private_dwellings_in_state REAL, 
    Unoccupied_private_dwellings_in_australia INT, 
    percentage_Unoccupied_private_dwellings_in_australia REAL, 
    Separate_house_in_suburb INT, 
    percentage_Separate_house_in_suburb REAL, 
    Separate_house_in_state INT, 
    percentage_Separate_house_in_state REAL, 
    Separate_house_in_australia INT, 
    percentage_Separate_house_in_australia REAL, 
    Semi_detached_in_suburb INT, 
    percentage_Semi_detached_in_suburb REAL, 
    Semi_detached_in_state INT, 
    percentage_Semi_detached_in_state REAL, 
    Semi_detached_in_australia INT, 
    percentage_Semi_detached_in_australia REAL, 
    Flat_or_apartment_in_suburb INT, 
    percentage_Flat_or_apartment_in_suburb REAL, 
    Flat_or_apartment_in_state INT, 
    percentage_Flat_or_apartment_in_state REAL, 
    Flat_or_apartment_in_australia INT, 
    percentage_Flat_or_apartment_in_australia REAL, 
    Other_dwelling_in_suburb INT, 
    percentage_Other_dwelling_in_suburb REAL, 
    Other_dwelling_in_state INT, 
    percentage_Other_dwelling_in_state REAL, 
    Other_dwelling_in_australia INT, 
    percentage_Other_dwelling_in_australia REAL, 
    None_includes_bedsitters_in_suburb INT, 
    percentage_None_includes_bedsitters_in_suburb REAL, 
    None_includes_bedsitters_in_state INT, 
    percentage_None_includes_bedsitters_in_state REAL, 
    None_includes_bedsitters_in_australia INT, 
    percentage_None_includes_bedsitters_in_australia REAL, 
    _1_bedroom_in_suburb INT, 
    percentage_1_bedroom_in_suburb REAL, 
    _1_bedroom_in_state INT, 
    percentage_1_bedroom_in_state REAL, 
    _1_bedroom_in_australia INT, 
    percentage_1_bedroom_in_australia REAL, 
    _2_bedrooms_in_suburb INT, 
    percentage_2_bedrooms_in_suburb REAL, 
    _2_bedrooms_in_state INT, 
    percentage_2_bedrooms_in_state REAL, 
    _2_bedrooms_in_australia INT, 
    percentage_2_bedrooms_in_australia REAL, 
    _3_bedrooms_in_suburb INT, 
    percentage_3_bedrooms_in_suburb REAL, 
    _3_bedrooms_in_state INT, 
    percentage_3_bedrooms_in_state REAL, 
    _3_bedrooms_in_australia INT, 
    percentage_3_bedrooms_in_australia REAL, 
    _4_or_more_bedrooms_in_suburb INT, 
    percentage_4_or_more_bedrooms_in_suburb REAL, 
    _4_or_more_bedrooms_in_state INT, 
    percentage_4_or_more_bedrooms_in_state REAL, 
    _4_or_more_bedrooms_in_australia INT, 
    percentage_4_or_more_bedrooms_in_australia REAL, 
    Number_of_bedrooms_not_stated_in_suburb INT, 
    percentage_Number_of_bedrooms_not_stated_in_suburb REAL, 
    Number_of_bedrooms_not_stated_in_state INT, 
    percentage_Number_of_bedrooms_not_stated_in_state REAL, 
    Number_of_bedrooms_not_stated_in_australia INT, 
    percentage_Number_of_bedrooms_not_stated_in_australia REAL, 
    Average_number_of_bedrooms_per_dwelling_in_suburb REAL, 
    percentage_Average_number_of_bedrooms_per_dwelling_in_suburb REAL, 
    Average_number_of_bedrooms_per_dwelling_in_state REAL, 
    percentage_Average_number_of_bedrooms_per_dwelling_in_state REAL, 
    Average_number_of_bedrooms_per_dwelling_in_australia REAL, 
    percentage_Average_number_of_bedrooms_per_dwelling_in_australia REAL, 
    Average_number_of_people_per_household_in_suburb REAL, 
    percentage_Average_number_of_people_per_household_in_suburb REAL, 
    Average_number_of_people_per_household_in_state REAL, 
    percentage_Average_number_of_people_per_household_in_state REAL, 
    Average_number_of_people_per_household_in_australia REAL, 
    percentage_Average_number_of_people_per_household_in_australia REAL, 
    Owned_outright_in_suburb INT, 
    percentage_Owned_outright_in_suburb REAL, 
    Owned_outright_in_state INT, 
    percentage_Owned_outright_in_state REAL, 
    Owned_outright_in_australia INT, 
    percentage_Owned_outright_in_australia REAL, 
    Owned_with_a_mortgage_in_suburb INT, 
    percentage_Owned_with_a_mortgage_in_suburb REAL, 
    Owned_with_a_mortgage_in_state INT, 
    percentage_Owned_with_a_mortgage_in_state REAL, 
    Owned_with_a_mortgage_in_australia INT, 
    percentage_Owned_with_a_mortgage_in_australia REAL, 
    Rented_in_suburb INT, 
    percentage_Rented_in_suburb REAL, 
    Rented_in_state INT, 
    percentage_Rented_in_state REAL, 
    Rented_in_australia INT, 
    percentage_Rented_in_australia REAL, 
    Other_tenure_type_in_suburb INT, 
    percentage_Other_tenure_type_in_suburb REAL, 
    Other_tenure_type_in_state INT, 
    percentage_Other_tenure_type_in_state REAL, 
    Other_tenure_type_in_australia INT, 
    percentage_Other_tenure_type_in_australia REAL, 
    Tenure_type_not_stated_in_suburb INT, 
    percentage_Tenure_type_not_stated_in_suburb REAL, 
    Tenure_type_not_stated_in_state INT, 
    percentage_Tenure_type_not_stated_in_state REAL, 
    Tenure_type_not_stated_in_australia INT, 
    percentage_Tenure_type_not_stated_in_australia REAL, 
    Family_households_in_suburb INT, 
    percentage_Family_households_in_suburb REAL, 
    Family_households_in_state INT, 
    percentage_Family_households_in_state REAL, 
    Family_households_in_australia INT, 
    percentage_Family_households_in_australia REAL, 
    Single_or_lone_person_households_in_suburb INT, 
    percentage_Single_or_lone_person_households_in_suburb REAL, 
    Single_or_lone_person_households_in_state INT, 
    percentage_Single_or_lone_person_households_in_state REAL, 
    Single_or_lone_person_households_in_australia INT, 
    percentage_Single_or_lone_person_households_in_australia REAL, 
    Group_households_in_suburb INT, 
    percentage_Group_households_in_suburb REAL, 
    Group_households_in_state INT, 
    percentage_Group_households_in_state REAL, 
    Group_households_in_australia INT, 
    percentage_Group_households_in_australia REAL, 
    Less_than_650_gross_weekly_income_in_suburb INT, 
    percentage_Less_than_650_gross_weekly_income_in_suburb REAL, 
    Less_than_650_gross_weekly_income_in_state INT, 
    percentage_Less_than_650_gross_weekly_income_in_state REAL, 
    Less_than_650_gross_weekly_income_in_australia INT, 
    percentage_Less_than_650_gross_weekly_income_in_australia REAL, 
    More_than_3000_gross_weekly_income_in_suburb INT, 
    percentage_More_than_3000_gross_weekly_income_in_suburb REAL, 
    More_than_3000_gross_weekly_income_in_state INT, 
    percentage_More_than_3000_gross_weekly_income_in_state REAL, 
    More_than_3000_gross_weekly_income_in_australia INT, 
    percentage_More_than_3000_gross_weekly_income_in_australia REAL, 
    Median_rent_in_suburb INT, 
    percentage_Median_rent_in_suburb REAL, 
    Median_rent_in_state INT, 
    percentage_Median_rent_in_state REAL, 
    Median_rent_in_australia INT, 
    percentage_Median_rent_in_australia REAL, 
    rent_payments_less_than_30_of_household_income_in_suburb INT, 
    percentage_rent_less_than_30_of_income_in_suburb REAL, 
    rent_payments_less_than_30_of_household_income_in_state INT, 
    percentage_rent_less_than_30_of_income_in_state REAL, 
    rent_payments_less_than_30_of_household_income_in_australia INT, 
    percentage_rent_less_than_30_of_income_in_au REAL, 
    rent_payments_more_than_30_of_household_income_in_suburb INT, 
    percentage_rent_more_than_30_of_income_in_suburb REAL, 
    rent_payments_more_than_30_of_household_income_in_state INT, 
    percentage_rent_more_than_30_of_income_in_state REAL, 
    rent_payments_more_than_30_of_household_income_in_australia INT, 
    percentage_rent_more_than_30_of_income_in_au REAL, 
    Median_mortgage_repayments_in_suburb INT, 
    percentage_Median_mortgage_repayments_in_suburb REAL, 
    Median_mortgage_repayments_in_state INT, 
    percentage_Median_mortgage_repayments_in_state REAL, 
    Median_mortgage_repayments_in_australia INT, 
    percentage_Median_mortgage_repayments_in_australia REAL, 
    mortgage_repayments_less_than_30_of_income_in_suburb INT, 
    percentage_mortgage_repayments_less_than_30_of_income_in_suburb REAL, 
    mortgage_repayments_less_than_30_of_income_in_state INT, 
    percentage_mortgage_repayments_less_than_30_of_income_in_state REAL, 
    mortgage_repayments_less_than_30_of_income_in_australia INT, 
    percentage_mortgage_repayments_less_than_30_of_income_in_au REAL, 
    mortgage_payments_more_than_30_of_income_in_suburb INT, 
    mortgage_more_than_30_of_income_in_suburb REAL, 
    mortgage_payments_more_than_30_of_income_in_state INT, 
    mortgage_more_than_30_of_income_in_state REAL, 
    mortgage_payments_more_than_30_of_income_in_au INT, 
    mortgage_more_than_30_of_income_in_au REAL, 
    None_in_suburb INT, 
    percentage_None_in_suburb REAL, 
    None_in_state INT, 
    percentage_None_in_state REAL, 
    None_in_australia INT, 
    percentage_None_in_australia REAL, 
    _1_motor_vehicle_in_suburb INT, 
    percentage_1_motor_vehicle_in_suburb REAL, 
    _1_motor_vehicle_in_state INT, 
    percentage_1_motor_vehicle_in_state REAL, 
    _1_motor_vehicle_in_australia INT, 
    percentage_1_motor_vehicle_in_australia REAL, 
    _2_motor_vehicles_in_suburb INT, 
    percentage_2_motor_vehicles_in_suburb REAL, 
    _2_motor_vehicles_in_state INT, 
    percentage_2_motor_vehicles_in_state REAL, 
    _2_motor_vehicles_in_australia INT, 
    percentage_2_motor_vehicles_in_australia REAL, 
    _3_or_more_vehicles_in_suburb INT, 
    percentage_3_or_more_vehicles_in_suburb REAL, 
    _3_or_more_vehicles_in_state INT, 
    percentage_3_or_more_vehicles_in_state REAL, 
    _3_or_more_vehicles_in_australia INT, 
    percentage_3_or_more_vehicles_in_australia REAL, 
    Number_of_motor_vehicles_not_stated_in_suburb INT, 
    percentage_Number_of_motor_vehicles_not_stated_in_suburb REAL, 
    Number_of_motor_vehicles_not_stated_in_state INT, 
    percentage_Number_of_motor_vehicles_not_stated_in_state REAL, 
    Number_of_motor_vehicles_not_stated_in_australia INT, 
    percentage_Number_of_motor_vehicles_not_stated_in_australia REAL, 
    Internet_not_accessed_from_dwelling_in_suburb INT, 
    percentage_Internet_not_accessed_from_dwelling_in_suburb REAL, 
    Internet_not_accessed_from_dwelling_in_state INT, 
    percentage_Internet_not_accessed_from_dwelling_in_state REAL, 
    Internet_not_accessed_from_dwelling_in_australia INT, 
    percentage_Internet_not_accessed_from_dwelling_in_australia REAL, 
    Internet_accessed_from_dwelling_in_suburb INT, 
    percentage_Internet_accessed_from_dwelling_in_suburb REAL, 
    Internet_accessed_from_dwelling_in_state INT, 
    percentage_Internet_accessed_from_dwelling_in_state REAL, 
    Internet_accessed_from_dwelling_in_australia INT, 
    percentage_Internet_accessed_from_dwelling_in_australia REAL, 
    internet_access_not_stated_in_suburb INT, 
    percentage_internet_access_not_stated_in_suburb REAL, 
    internet_access_not_stated_in_state INT, 
    percentage_internet_access_not_stated_in_state REAL, 
    internet_access_not_stated_in_australia INT, 
    percentage_internet_access_not_stated_in_australia REAL, 
    Median_weekly_rent_in_suburb INT, 
    percentage_Median_weekly_rent_in_suburb REAL, 
    Median_weekly_rent_in_state INT, 
    percentage_Median_weekly_rent_in_state REAL, 
    Median_weekly_rent_in_australia INT, 
    percentage_Median_weekly_rent_in_australia REAL, 
    Median_monthly_mortgage_repayments_in_suburb INT, 
    percentage_Median_monthly_mortgage_repayments_in_suburb REAL, 
    Median_monthly_mortgage_repayments_in_state INT, 
    percentage_Median_monthly_mortgage_repayments_in_state REAL, 
    Median_monthly_mortgage_repayments_in_australia INT, 
    percentage_median_monthly_mortgage_repayments_in_au REAL
);

-- Enable RLS
alter table data_2016 enable row level security;

-- Allow anyone to read
CREATE POLICY "anyone can read income_and_work table"
on "public"."data_2016"
FOR SELECT
TO public
USING (true);

