import React, { useEffect } from "react";

function useQuery() {
    const [query, setQuery] = React.useState<{ [key: string]: string }>({});

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const query = Object.fromEntries(searchParams.entries());
        setQuery(query);
    }, [window.location.search]);

    return query;
}

export default useQuery;
