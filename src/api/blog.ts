import { createSupabaseApi } from './baseApi'
import { supabase } from '../services/supabase'
import type { BlogPost, CreateBlogPostData } from '../types'

const baseApi = createSupabaseApi<BlogPost>('blog_posts')

export const blogApi = {
  ...baseApi,
  
  // Override getAll to sort by published_date
  async getAll(): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('published_date', { ascending: false }) as { data: BlogPost[]; error: any }

    if (error) throw error
    return data || []
  },

  // Get blog post by slug
  async getBySlug(slug: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .maybeSingle() as { data: BlogPost | null; error: any }

    if (error) throw error
    return data
  }
}