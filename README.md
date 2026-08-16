# Movie Grid

Fetches movies from TMDB and displays them in a filterable, sortable grid.

## Setup

    git clone https://github.com/miaawong/movie_grid.git
    cd movie_grid
    npm i
    cp .env.example .env   # add your TMDB API key
    npm start

## Decisions

**Filter server-side, sort client-side.**
The year filter goes on the API request because it changes which movies are in
the result set — filtering locally would only search within a page TMDB already
picked by popularity. Sorting stays client-side because the page is already
loaded and reordering doesn't need a round trip. If this were paginated, sort
would have to move server-side too, since sorting one page at a time gives an
ordering that doesn't hold across pages.

**`primary_release_year` over `year`.**
`year` matches any release date on the record, including re-releases — filtering
to 2024 returned The Godfather. `primary_release_year` matches the original
release, which is what "movies from 2024" means.

**A `<select>` for the year rather than free text.**
A number input fires a request on every keystroke, so it would need debouncing.
A select of the last 30 years avoids that, and removes the invalid-input and
empty-field cases entirely.

**Data fetching in a hook.**
`useMovies` owns the fetch, loading and error state so `App` stays composition.
Kept specific to this endpoint rather than generalised into a `useFetch<T>` —
there's only one call.

**Cancellation.**
Changing the year twice quickly can land responses out of order, so the effect
sets a `cancelled` flag on cleanup and every path - success, error, and
finally — checks it before setting state. A request that's been superseded
shouldn't be able to write anything. 
AbortController for when requests are expensive or a user can trigger many quickly. 

**Sorting in render, not memoised.**
`[...movies].sort()` runs each render. At 20 items that's not worth memoising;
at a few thousand I'd wrap it in `useMemo` keyed on `[movies, sortBy]`.

**MovieCard Details** 
Release Date is displayed to allow users to view the newest movies. 
Rating is displayed to get a general consensus of the movie. 

**Loading and Error States** 
Loading skeletons matching the card's dimensions so it feels as if it is fetching rather than a spinner. 
3 Failure levels - API error, image missing, fields absent, all with different handling for each. 

**Typing Movie response** 
Movie type only contains what the application consumes. 

**Hover Interaction** 
Overview reveals on hover, with focus-within and tabIndex, keyboard users will be able to get information as well. 

**Component Boundaries** 
App, useMovie hook, MovieCard, MovieSkeleton, because this is only a small webapp with a few components and not much data, Context or Redux is not necessary yet. It will be necessary as the app has more components, requirements for sharing state, or bumping into prop drilling. 

**Known Limitations** 
Long titles make cards taller since the card resizes to fit content causing visual inconsistencies. 
