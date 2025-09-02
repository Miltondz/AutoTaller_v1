import { supabase } from '../services/supabase';
import type { SiteContent } from '../types';

export const contentApi = {
  async getAll(): Promise<SiteContent[]> {
    const { data, error } = await supabase
      .from('site_content')
      .select('*') as { data: SiteContent[]; error: any };

    if (error) throw error;
    return data || [];
  },

  async update(content: Partial<SiteContent>[]): Promise<SiteContent[]> {
    const { data, error } = await supabase
      .from('site_content')
      .upsert(content)
      .select() as { data: SiteContent[]; error: any };

    if (error) throw error;
    return data;
  },
};