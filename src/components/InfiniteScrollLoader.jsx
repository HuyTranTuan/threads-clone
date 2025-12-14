import {useEffect, useRef} from "react";

function InfiniteScrollLoader({
                                  children,
                                  onLoadMore,
                                  hasMore = false,
                                  loading = false,
                                  LoadingComponent,
                                  loadingCount = 3,
                                  endMessage = 'Bạn đã xem hết rồi!',
                                  triggerMargin = '200px'
                              }) {

    const sentinelRef = useRef(null);

    useEffect(() => {
        if (!hasMore || loading) return;

        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const firstEntry = entries[0];

                if (firstEntry.isIntersecting) {
                    onLoadMore();
                }
            },
            {
                root: null,
                rootMargin: triggerMargin,
                threshold: 0
            }
        );

        observer.observe(sentinel);

        // Cleanup
        return () => {
            if (sentinel) {
                observer.unobserve(sentinel);
            }
        };
    }, [hasMore, loading, onLoadMore, triggerMargin]);

    return (
        <>
            {/* Render children (posts/items) */}
            {children}

            {/* Loading skeleton */}
            {loading && hasMore && LoadingComponent && (
                Array.from({ length: loadingCount }).map((_, index) => (
                    <LoadingComponent key={`loading-${index}`} />
                ))
            )}

            {/* Sentinel element - trigger load more */}
            {!loading && hasMore && (
                <div ref={sentinelRef} className="h-20" aria-hidden="true" />
            )}

            {/* End message */}
            {!loading && !hasMore && (
                <div className="text-center py-8 text-muted-foreground">
                    <p>{endMessage}</p>
                </div>
            )}
        </>
    );
}

export default InfiniteScrollLoader;