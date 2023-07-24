export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      summary_data: {
        Row: {
          all_private_dwellings: number | null
          average_number_of_children_per_family: string | null
          average_number_of_motor_vehicles_per_dwelling: number | null
          average_number_of_people_per_household: number | null
          families: number | null
          female: number | null
          for_all_households: number | null
          for_families_with_children: number | null
          id: string
          male: number | null
          median_age: number | null
          median_monthly_mortgage_repayments: number | null
          median_weekly_household_income: number | null
          median_weekly_rent_b: number | null
          people: number | null
          post_code: number | null
          state_name: string | null
          suburb_name: string | null
        }
        Insert: {
          all_private_dwellings?: number | null
          average_number_of_children_per_family?: string | null
          average_number_of_motor_vehicles_per_dwelling?: number | null
          average_number_of_people_per_household?: number | null
          families?: number | null
          female?: number | null
          for_all_households?: number | null
          for_families_with_children?: number | null
          id?: string
          male?: number | null
          median_age?: number | null
          median_monthly_mortgage_repayments?: number | null
          median_weekly_household_income?: number | null
          median_weekly_rent_b?: number | null
          people?: number | null
          post_code?: number | null
          state_name?: string | null
          suburb_name?: string | null
        }
        Update: {
          all_private_dwellings?: number | null
          average_number_of_children_per_family?: string | null
          average_number_of_motor_vehicles_per_dwelling?: number | null
          average_number_of_people_per_household?: number | null
          families?: number | null
          female?: number | null
          for_all_households?: number | null
          for_families_with_children?: number | null
          id?: string
          male?: number | null
          median_age?: number | null
          median_monthly_mortgage_repayments?: number | null
          median_weekly_household_income?: number | null
          median_weekly_rent_b?: number | null
          people?: number | null
          post_code?: number | null
          state_name?: string | null
          suburb_name?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          user_id: string
          username: string
          username: string
        }
        Insert: {
          user_id: string
          username: string
          username: string
        }
        Update: {
          user_id?: string
          username?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      _ltree_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      _ltree_gist_options: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      get_first_10_rows: {
        Args: Record<PropertyKey, never>
        Returns: {
          all_private_dwellings: number | null
          average_number_of_children_per_family: string | null
          average_number_of_motor_vehicles_per_dwelling: number | null
          average_number_of_people_per_household: number | null
          families: number | null
          female: number | null
          for_all_households: number | null
          for_families_with_children: number | null
          id: string
          male: number | null
          median_age: number | null
          median_monthly_mortgage_repayments: number | null
          median_weekly_household_income: number | null
          median_weekly_rent_b: number | null
          people: number | null
          post_code: number | null
          state_name: string | null
          suburb_name: string | null
        }[]
      }
      get_suburb_data: {
        Args: {
          _searchquery: string
        }
        Returns: {
          id: string
          suburb_name: string
          state_name: string
          post_code: number
          people: number
          male: number
          female: number
          median_age: number
          families: number
          average_number_of_children_per_family: string
          for_families_with_children: number
          for_all_households: number
          all_private_dwellings: number
          average_number_of_people_per_household: number
          median_weekly_household_income: number
          median_monthly_mortgage_repayments: number
          median_weekly_rent_b: number
          average_number_of_motor_vehicles_per_dwelling: number
        }[]
      }
      lca: {
        Args: {
          "": unknown[]
        }
        Returns: unknown
      }
      lquery_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      lquery_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      lquery_recv: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      lquery_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      ltree_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ltree_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ltree_gist_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ltree_gist_options: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      ltree_gist_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ltree_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ltree_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ltree_recv: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ltree_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      ltree2text: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      ltxtq_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ltxtq_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ltxtq_recv: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ltxtq_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      nlevel: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      test_pull: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          suburb_name: string
          state_name: string
          post_code: number
          people: number
          male: number
          female: number
          median_age: number
          families: number
          average_number_of_children_per_family: string
          for_families_with_children: number
          for_all_households: number
          all_private_dwellings: number
          average_number_of_people_per_household: number
          median_weekly_household_income: number
          median_monthly_mortgage_repayments: number
          median_weekly_rent_b: number
          average_number_of_motor_vehicles_per_dwelling: number
        }[]
      }
      test_pull_v2: {
        Args: {
          searchquery: string
        }
        Returns: {
          id: string
          suburb_name: string
          state_name: string
          post_code: number
          people: number
          male: number
          female: number
          median_age: number
          families: number
          average_number_of_children_per_family: string
          for_families_with_children: number
          for_all_households: number
          all_private_dwellings: number
          average_number_of_people_per_household: number
          median_weekly_household_income: number
          median_monthly_mortgage_repayments: number
          median_weekly_rent_b: number
          average_number_of_motor_vehicles_per_dwelling: number
        }[]
      }
      text2ltree: {
        Args: {
          "": string
        }
        Returns: unknown
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

