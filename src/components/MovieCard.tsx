import { useState } from "react";
import type { Movie } from "../hooks/useMovies"
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w342';

type Props = {
    movie: Movie
}

// utils -> will be moved to a utils file if app gets bigger
const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US')
}

const MovieCard = ({ movie }: Props) => {
    const [imgFailed, setImgFailed] = useState(false)
    return (
        <section
            tabIndex={0}
            style={{ '--details-h': '8rem' } as React.CSSProperties}
            className="group relative mb-2 z-10 hover:z-50
                    transition-transform duration-200
                    hover:scale-105 focus-within:scale-105 ">
            {movie.poster_path && !imgFailed ? (
                <img src={`${IMAGE_BASE}${movie.poster_path}`} alt={`Poster for ${movie.title}`} className="w-full rounded-t-md" onError={() => setImgFailed(true)} />
            ) : (
                <div className="w-full aspect-[2/3] bg-gray-800 rounded-t-md flex items-center justify-center p-4">
                    <span className="text-xs text-gray-400">{movie.title}</span>
                </div>
            )}

            <div className="flex flex-col items-start gap-2 absolute left-0 right-0 top-[calc(100%-var(--details-h))]
                bg-black p-3 rounded-b-md
                transition-all duration-200 text-white">
                <p className="font-semibold text-lg line-clamp-2">{movie.title}</p>
                <p className="text-xs">Release Date: {movie.release_date ? formatDate(movie.release_date) : 'TBA'}</p>
                <p className="text-xs">Rating: {movie.vote_count > 0 ? (movie.vote_average).toFixed(1) : 'TBA'}</p>
                <p className="text-xs group-hover:mt-4 max-h-0 overflow-hidden opacity-0
                transition-all duration-200
                group-hover:max-h-40 group-hover:opacity-100 text-left group-focus-within:max-h-40">{movie.overview ? movie.overview : 'No description available'}</p>
            </div>
            <div className="h-[var(--details-h)]" />

        </section >
    )
}

export default MovieCard