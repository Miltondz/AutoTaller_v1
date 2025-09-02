import { useState, useEffect } from 'react'

interface SiteContentItem {
  idx: number
  key: string
  value: string
  created_at: string
  updated_at: string
}

export const useSiteContent = () => {
  const [content, setContent] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true)
        // In mock mode, load from JSON file
        const response = await fetch('/data/siteContent.json')
        if (!response.ok) {
          throw new Error('Failed to load site content')
        }
        
        const data: SiteContentItem[] = await response.json()
        
        // Convert array to key-value object for easy access
        const contentMap = data.reduce((acc, item) => {
          acc[item.key] = item.value
          return acc
        }, {} as Record<string, string>)
        
        setContent(contentMap)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        console.error('Error loading site content:', err)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [])

  const getContent = (key: string, fallback: string = '') => {
    return content[key] || fallback
  }

  return {
    content,
    loading,
    error,
    getContent
  }
}