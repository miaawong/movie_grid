import { useState, } from 'react'
import { useMovies } from './hooks/useMovies'

type SortBy = 'rating-desc' | 'rating-asc' | 'title-asc' | 'title-desc'

import MovieCard from './components/MovieCard'
import MovieCardSkeleton from './components/MovieCardSkeleton'

export const MovieGridClass = 'grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-4 p-4'

function App() {
  const [filterYear, setFilterYear] = useState<number>(2026)
  const [sortBy, setSortBy] = useState<SortBy>('rating-desc')


  const { movies, loading, error } = useMovies(filterYear)

  const sortedMovies = [...movies].sort((a, b) => {
    switch (sortBy) {
      case 'rating-desc': return b.vote_average - a.vote_average;
      case 'rating-asc': return a.vote_average - b.vote_average;
      case 'title-asc': return a.title.localeCompare(b.title);
      case 'title-desc': return b.title.localeCompare(a.title)
      default: return b.vote_average - a.vote_average;

    }
  });

  const handleFilterChange = (val: string) => {
    setFilterYear(Number(val))
  }

  const onSortChange = (val: SortBy) => {
    setSortBy(val)
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);
  return (
    <>
      <h1>Movie Grid</h1>
      <section className='flex items-end gap-4 mx-4'>
        <label>
          Filter By Year:
          <select value={filterYear} onChange={e => handleFilterChange(e.target.value)}>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </label>
        <label>Sort By
          <select value={sortBy} onChange={e => onSortChange(e.target.value as SortBy)}>
            <option value="rating-desc" >Highest rated</option>
            <option value="rating-asc">Lowest rated</option>
            <option value="title-asc">Title A–Z</option>
            <option value="title-desc">Title Z-A</option>
          </select>
        </label >
      </section>
      {!loading && !error && movies.length > 0 && (
        < div className={MovieGridClass}>
          {sortedMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      {loading && (
        <div className={MovieGridClass}>
          {Array.from({ length: 20 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!loading && error && (
        <p>Sorry, {error} </p>
      )}

      {!loading && !error && movies.length === 0 && (
        <p> No movies found</p>
      )}
    </>
  )
}

export default App
