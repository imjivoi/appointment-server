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
      appointments: {
        Row: {
          business_id: string
          canceled: boolean
          canceled_reason: string | null
          created_at: string
          id: string
          issuer_id: string
          time_slot_id: string
        }
        Insert: {
          business_id: string
          canceled?: boolean
          canceled_reason?: string | null
          created_at?: string
          id: string
          issuer_id: string
          time_slot_id: string
        }
        Update: {
          business_id?: string
          canceled?: boolean
          canceled_reason?: string | null
          created_at?: string
          id?: string
          issuer_id?: string
          time_slot_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_business_id_fkey"
            columns: ["business_id"]
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_issuer_id_fkey"
            columns: ["issuer_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_time_slot_id_fkey"
            columns: ["time_slot_id"]
            referencedRelation: "time_slots"
            referencedColumns: ["id"]
          }
        ]
      }
      business_user: {
        Row: {
          business_id: string
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          business_id: string
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          business_id?: string
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_user_business_id_fkey"
            columns: ["business_id"]
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_user_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      businesses: {
        Row: {
          category_id: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "businesses_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_category"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
      categories: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      invoices: {
        Row: {
          created_at: string | null
          currency: string | null
          id: string
          plan_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          currency?: string | null
          id?: string
          plan_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          currency?: string | null
          id?: string
          plan_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_plan_id_fkey"
            columns: ["plan_id"]
            referencedRelation: "plans"
            referencedColumns: ["id"]
          }
        ]
      }
      plan_options: {
        Row: {
          created_at: string | null
          email_notification: boolean | null
          id: string
          plan_id: string
          sms_notification: boolean | null
          time_slots_per_month: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email_notification?: boolean | null
          id?: string
          plan_id: string
          sms_notification?: boolean | null
          time_slots_per_month?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email_notification?: boolean | null
          id?: string
          plan_id?: string
          sms_notification?: boolean | null
          time_slots_per_month?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "plan_options_plan_id_fkey"
            columns: ["plan_id"]
            referencedRelation: "plans"
            referencedColumns: ["id"]
          }
        ]
      }
      plans: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string | null
          price_per_month: number | null
          price_per_year: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string | null
          price_per_month?: number | null
          price_per_year?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string | null
          price_per_month?: number | null
          price_per_year?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      role_user: {
        Row: {
          created_at: string | null
          id: string
          role_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_user_role_id_fkey"
            columns: ["role_id"]
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_user_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      roles: {
        Row: {
          created_at: string | null
          id: string
          name: string
          update_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          update_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          update_at?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          business_id: string
          created_at: string | null
          description: string | null
          id: string
          name: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          business_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          business_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "services_business_id_fkey"
            columns: ["business_id"]
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          }
        ]
      }
      subscriptions: {
        Row: {
          "cancelled_at ": string | null
          created_at: string | null
          "downgraded_at ": string | null
          "downgraded_to_plan_id ": string | null
          ends_at: string | null
          id: string
          invoice_id: string | null
          plan_id: string | null
          "renewed_at ": string | null
          "renewed_subscription_id ": string | null
          starts_at: string
          updated_at: string | null
          "upgraded_at ": string | null
          "upgraded_to_plan_id ": string | null
        }
        Insert: {
          "cancelled_at "?: string | null
          created_at?: string | null
          "downgraded_at "?: string | null
          "downgraded_to_plan_id "?: string | null
          ends_at?: string | null
          id?: string
          invoice_id?: string | null
          plan_id?: string | null
          "renewed_at "?: string | null
          "renewed_subscription_id "?: string | null
          starts_at: string
          updated_at?: string | null
          "upgraded_at "?: string | null
          "upgraded_to_plan_id "?: string | null
        }
        Update: {
          "cancelled_at "?: string | null
          created_at?: string | null
          "downgraded_at "?: string | null
          "downgraded_to_plan_id "?: string | null
          ends_at?: string | null
          id?: string
          invoice_id?: string | null
          plan_id?: string | null
          "renewed_at "?: string | null
          "renewed_subscription_id "?: string | null
          starts_at?: string
          updated_at?: string | null
          "upgraded_at "?: string | null
          "upgraded_to_plan_id "?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_downgraded_to_plan_id _fkey"
            columns: ["downgraded_to_plan_id "]
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_invoice_id_fkey"
            columns: ["invoice_id"]
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_renewed_subscription_id _fkey"
            columns: ["renewed_subscription_id "]
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_upgraded_to_plan_id _fkey"
            columns: ["upgraded_to_plan_id "]
            referencedRelation: "plans"
            referencedColumns: ["id"]
          }
        ]
      }
      time_slots: {
        Row: {
          business_id: string
          created_at: string | null
          end_at: string
          id: string
          start_at: string
          updated_at: string | null
        }
        Insert: {
          business_id: string
          created_at?: string | null
          end_at: string
          id?: string
          start_at: string
          updated_at?: string | null
        }
        Update: {
          business_id?: string
          created_at?: string | null
          end_at?: string
          id?: string
          start_at?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "time_slots_business_id_fkey"
            columns: ["business_id"]
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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

