import { useState, useEffect, useCallback } from 'react'

export function useData<T>(fetchFn: () => Promise<T[]>) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await fetchFn()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [fetchFn])

  useEffect(() => {
    loadData()
  }, [loadData])

  return { data, loading, error, refresh: loadData }
}