import { useState, useEffect } from 'react'
import type { AutomotiveBlogPost } from '../types/automotive'
import { 
  mockAutomotiveBlogPosts,
  getFeaturedBlogPosts,
  getBlogPostsByCategory,
  getBlogPostBySlug,
  getRecentBlogPosts,
  searchBlogPosts
} from '../data/mockAutomotiveBlog'

// Simulate API delay
const simulateDelay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms))

export function useMockAutomotiveBlog() {
  const [blogPosts, setBlogPosts] = useState<AutomotiveBlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        setLoading(true)
        setError(null)
        await simulateDelay()
        setBlogPosts(mockAutomotiveBlogPosts)
      } catch (err) {
        setError('Failed to load blog posts')
      } finally {
        setLoading(false)
      }
    }

    loadBlogPosts()
  }, [])

  const refreshBlogPosts = async () => {
    try {
      setLoading(true)
      setError(null)
      await simulateDelay()
      setBlogPosts(mockAutomotiveBlogPosts)
    } catch (err) {
      setError('Failed to refresh blog posts')
    } finally {
      setLoading(false)
    }
  }

  const createBlogPost = async (postData: {
    title: string
    slug?: string
    content: string
    excerpt?: string
    author?: string
    image_url?: string
    category: AutomotiveBlogPost['category']
    tags: string[]
  }): Promise<AutomotiveBlogPost> => {
    try {
      await simulateDelay()
      
      const slug = postData.slug || postData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      const newBlogPost: AutomotiveBlogPost = {
        id: `blog-${Date.now()}`,
        title: postData.title,
        slug,
        content: postData.content,
        excerpt: postData.excerpt || postData.content.substring(0, 200) + '...',
        published_date: new Date().toISOString(),
        author: postData.author || 'Shop Team',
        image_url: postData.image_url || null,
        category: postData.category,
        tags: postData.tags,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      setBlogPosts(prev => [newBlogPost, ...prev])
      return newBlogPost
    } catch (err) {
      throw new Error('Failed to create blog post')
    }
  }

  const updateBlogPost = async (id: string, updates: {
    title?: string
    slug?: string
    content?: string
    excerpt?: string
    author?: string
    image_url?: string
    category?: AutomotiveBlogPost['category']
    tags?: string[]
  }): Promise<AutomotiveBlogPost> => {
    try {
      await simulateDelay()
      
      const postIndex = blogPosts.findIndex(p => p.id === id)
      if (postIndex === -1) {
        throw new Error('Blog post not found')
      }

      const updatedPost: AutomotiveBlogPost = {
        ...blogPosts[postIndex],
        ...updates,
        updated_at: new Date().toISOString()
      }

      setBlogPosts(prev => prev.map(p => p.id === id ? updatedPost : p))
      return updatedPost
    } catch (err) {
      throw new Error('Failed to update blog post')
    }
  }

  const deleteBlogPost = async (id: string): Promise<void> => {
    try {
      await simulateDelay()
      setBlogPosts(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      throw new Error('Failed to delete blog post')
    }
  }

  return {
    blogPosts,
    loading,
    error,
    refreshBlogPosts,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    // Helper functions
    getFeaturedBlogPosts: () => getFeaturedBlogPosts(),
    getBlogPostsByCategory: (category: AutomotiveBlogPost['category']) => getBlogPostsByCategory(category),
    getBlogPostBySlug: (slug: string) => getBlogPostBySlug(slug),
    getRecentBlogPosts: (limit?: number) => getRecentBlogPosts(limit),
    searchBlogPosts: (query: string) => searchBlogPosts(query)
  }
}

// Hook for featured blog posts
export function useMockFeaturedBlogPosts() {
  const { blogPosts, loading, error } = useMockAutomotiveBlog()
  
  const featuredPosts = blogPosts.slice(0, 3)

  return {
    blogPosts: featuredPosts,
    loading,
    error
  }
}

// Hook for blog posts by category
export function useMockBlogPostsByCategory(category: AutomotiveBlogPost['category']) {
  const { blogPosts, loading, error } = useMockAutomotiveBlog()
  
  const categoryPosts = blogPosts.filter(post => post.category === category)

  return {
    blogPosts: categoryPosts,
    loading,
    error
  }
}

// Hook for single blog post by slug
export function useMockBlogPostBySlug(slug: string) {
  const { blogPosts, loading, error } = useMockAutomotiveBlog()
  
  const blogPost = blogPosts.find(post => post.slug === slug)

  return {
    blogPost,
    loading,
    error,
    found: !!blogPost
  }
}

// Hook for blog search
export function useMockBlogSearch(query: string) {
  const { blogPosts, loading, error } = useMockAutomotiveBlog()
  
  const searchResults = query.trim() 
    ? searchBlogPosts(query)
    : []

  return {
    blogPosts: searchResults,
    loading,
    error,
    hasQuery: query.trim().length > 0
  }
}