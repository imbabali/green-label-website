// ============================================================================
// Green Label Services - Supabase Database Types
// Auto-generated from 001_initial_schema.sql
// ============================================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          first_name: string | null
          last_name: string | null
          bio: string | null
          date_of_birth: string | null
          phone: string | null
          photo_url: string | null
          location: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          first_name?: string | null
          last_name?: string | null
          bio?: string | null
          date_of_birth?: string | null
          phone?: string | null
          photo_url?: string | null
          location?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          first_name?: string | null
          last_name?: string | null
          bio?: string | null
          date_of_birth?: string | null
          phone?: string | null
          photo_url?: string | null
          location?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      comments: {
        Row: {
          id: string
          post_slug: string
          parent_id: string | null
          name: string
          email: string
          website: string | null
          content: string
          status: 'pending' | 'approved' | 'rejected' | 'spam'
          ip_address: string | null
          user_agent: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          post_slug: string
          parent_id?: string | null
          name: string
          email: string
          website?: string | null
          content: string
          status?: 'pending' | 'approved' | 'rejected' | 'spam'
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          post_slug?: string
          parent_id?: string | null
          name?: string
          email?: string
          website?: string | null
          content?: string
          status?: 'pending' | 'approved' | 'rejected' | 'spam'
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'comments_parent_id_fkey'
            columns: ['parent_id']
            isOneToOne: false
            referencedRelation: 'comments'
            referencedColumns: ['id']
          },
        ]
      }
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          name: string | null
          is_active: boolean
          frequency: 'D' | 'W' | 'M'
          unsubscribe_token: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          is_active?: boolean
          frequency?: 'D' | 'W' | 'M'
          unsubscribe_token?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          is_active?: boolean
          frequency?: 'D' | 'W' | 'M'
          unsubscribe_token?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string | null
          company: string | null
          subject: string
          message: string
          location: string | null
          preferred_contact: string
          marketing_consent: boolean
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          full_name: string
          email: string
          phone?: string | null
          company?: string | null
          subject: string
          message: string
          location?: string | null
          preferred_contact?: string
          marketing_consent?: boolean
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          phone?: string | null
          company?: string | null
          subject?: string
          message?: string
          location?: string | null
          preferred_contact?: string
          marketing_consent?: boolean
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Relationships: []
      }
      quote_requests: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          company: string | null
          service_type: string
          location: string | null
          frequency: string | null
          estimated_volume: string | null
          message: string
          timeline: string | null
          budget_range: string | null
          marketing_consent: boolean
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          company?: string | null
          service_type: string
          location?: string | null
          frequency?: string | null
          estimated_volume?: string | null
          message: string
          timeline?: string | null
          budget_range?: string | null
          marketing_consent?: boolean
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          company?: string | null
          service_type?: string
          location?: string | null
          frequency?: string | null
          estimated_volume?: string | null
          message?: string
          timeline?: string | null
          budget_range?: string | null
          marketing_consent?: boolean
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Relationships: []
      }
      service_inquiries: {
        Row: {
          id: string
          service_slug: string
          name: string
          email: string
          phone: string | null
          company: string | null
          message: string
          location: string | null
          preferred_contact: string
          status: 'new' | 'contacted' | 'quoted' | 'converted' | 'closed'
          follow_up_date: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          service_slug: string
          name: string
          email: string
          phone?: string | null
          company?: string | null
          message: string
          location?: string | null
          preferred_contact?: string
          status?: 'new' | 'contacted' | 'quoted' | 'converted' | 'closed'
          follow_up_date?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          service_slug?: string
          name?: string
          email?: string
          phone?: string | null
          company?: string | null
          message?: string
          location?: string | null
          preferred_contact?: string
          status?: 'new' | 'contacted' | 'quoted' | 'converted' | 'closed'
          follow_up_date?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          id: string
          job_slug: string
          first_name: string
          last_name: string
          email: string
          phone: string
          resume_url: string
          cover_letter: string | null
          current_company: string | null
          current_position: string | null
          linkedin_profile: string | null
          portfolio_url: string | null
          status: 'new' | 'reviewed' | 'shortlisted' | 'interviewed' | 'rejected' | 'hired'
          ip_address: string | null
          user_agent: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          job_slug: string
          first_name: string
          last_name: string
          email: string
          phone: string
          resume_url: string
          cover_letter?: string | null
          current_company?: string | null
          current_position?: string | null
          linkedin_profile?: string | null
          portfolio_url?: string | null
          status?: 'new' | 'reviewed' | 'shortlisted' | 'interviewed' | 'rejected' | 'hired'
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          job_slug?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string
          resume_url?: string
          cover_letter?: string | null
          current_company?: string | null
          current_position?: string | null
          linkedin_profile?: string | null
          portfolio_url?: string | null
          status?: 'new' | 'reviewed' | 'shortlisted' | 'interviewed' | 'rejected' | 'hired'
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          id: string
          user_id: string
          service_type: string
          service_name: string
          overall_rating: number
          quality_rating: number | null
          value_rating: number | null
          customer_service_rating: number | null
          title: string
          comment: string
          would_recommend: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          service_type: string
          service_name: string
          overall_rating: number
          quality_rating?: number | null
          value_rating?: number | null
          customer_service_rating?: number | null
          title: string
          comment: string
          would_recommend?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          service_type?: string
          service_name?: string
          overall_rating?: number
          quality_rating?: number | null
          value_rating?: number | null
          customer_service_rating?: number | null
          title?: string
          comment?: string
          would_recommend?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'reviews_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      view_counts: {
        Row: {
          entity_type: string
          entity_slug: string
          count: number
        }
        Insert: {
          entity_type: string
          entity_slug: string
          count?: number
        }
        Update: {
          entity_type?: string
          entity_slug?: string
          count?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_view_count: {
        Args: {
          p_entity_type: string
          p_entity_slug: string
        }
        Returns: number
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

// ============================================================================
// Convenience type aliases
// ============================================================================

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']

export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']

// Row types
export type Profile = Tables<'profiles'>
export type Comment = Tables<'comments'>
export type NewsletterSubscriber = Tables<'newsletter_subscribers'>
export type ContactSubmission = Tables<'contact_submissions'>
export type QuoteRequest = Tables<'quote_requests'>
export type ServiceInquiry = Tables<'service_inquiries'>
export type JobApplication = Tables<'job_applications'>
export type Review = Tables<'reviews'>
export type ViewCount = Tables<'view_counts'>

// Insert types
export type ProfileInsert = InsertTables<'profiles'>
export type CommentInsert = InsertTables<'comments'>
export type NewsletterSubscriberInsert = InsertTables<'newsletter_subscribers'>
export type ContactSubmissionInsert = InsertTables<'contact_submissions'>
export type QuoteRequestInsert = InsertTables<'quote_requests'>
export type ServiceInquiryInsert = InsertTables<'service_inquiries'>
export type JobApplicationInsert = InsertTables<'job_applications'>
export type ReviewInsert = InsertTables<'reviews'>
export type ViewCountInsert = InsertTables<'view_counts'>

// Update types
export type ProfileUpdate = UpdateTables<'profiles'>
export type CommentUpdate = UpdateTables<'comments'>
export type NewsletterSubscriberUpdate = UpdateTables<'newsletter_subscribers'>
export type ContactSubmissionUpdate = UpdateTables<'contact_submissions'>
export type QuoteRequestUpdate = UpdateTables<'quote_requests'>
export type ServiceInquiryUpdate = UpdateTables<'service_inquiries'>
export type JobApplicationUpdate = UpdateTables<'job_applications'>
export type ReviewUpdate = UpdateTables<'reviews'>
export type ViewCountUpdate = UpdateTables<'view_counts'>

// Status enums as union types
export type CommentStatus = Comment['status']
export type ServiceInquiryStatus = ServiceInquiry['status']
export type JobApplicationStatus = JobApplication['status']
export type NewsletterFrequency = NewsletterSubscriber['frequency']
