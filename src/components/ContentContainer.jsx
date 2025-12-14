function ContentContainer( {children} ) {
    return (
        <div
            className="border-l border-r border-border h-full bg-content-background overflow-hidden"
            style={{
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.06)'
            }}
        >
            {children}
        </div>
    )
}

export default ContentContainer;