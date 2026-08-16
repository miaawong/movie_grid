import { useEffect, useState } from 'react'

export type Movie = {
    id: number
    overview: string
    poster_path: string | null
    release_date: string
    title: string
    vote_average: number
    vote_count: number
}

export const useMovies = (year: number) => {
    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    useEffect(() => {
        let cancelled = false

        const fetchMovies = async () => {
            setLoading(true)
            setError(null)
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=1&primary_release_year=${year}`,
                )
                if (!res.ok) throw new Error(`Failed to fetch, status: ${res.status}`)
                const data: { results: Movie[] } = await res.json()
                if (!cancelled) {
                    setMovies(data.results ?? [])
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Something went wrong')
                }
            } finally {
                if (!cancelled) {
                    setLoading(false)
                }
            }
        }

        fetchMovies()
        return () => {
            cancelled = true
        }
    }, [year])
    return { movies, loading, error }
}
