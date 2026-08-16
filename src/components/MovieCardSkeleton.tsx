


const MovieCardSkeleton = () => (
    <section className="relative mb-2 animate-pulse">
        <div className="w-full aspect-[2/3] bg-gray-700 rounded-t-md" />
        <div className="flex flex-col items-start gap-2 absolute left-0 right-0 top-[calc(100%-6rem)]
                          bg-black p-3 rounded-b-md">
            <div className="h-6 w-3/4 bg-gray-700 rounded" />
            <div className="h-3 w-1/2 bg-gray-700 rounded" />
            <div className="h-3 w-1/3 bg-gray-700 rounded" />
        </div>
        <div className="h-24" />
    </section>
);



export default MovieCardSkeleton