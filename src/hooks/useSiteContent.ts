import { useState, useEffect } from 'react';
import { contentApi } from '../api/content';
import type { SiteContent } from '../types';

export function useSiteContent() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      const data = await contentApi.getAll();
      const contentMap = data.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {} as Record<string, string>);
      setContent(contentMap);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load site content');
    } finally {
      setLoading(false);
    }
  };

  return { content, loading, error, refreshContent: loadContent };
}
