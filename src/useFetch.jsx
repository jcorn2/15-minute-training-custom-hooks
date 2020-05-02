import { useEffect, useState } from 'react';

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async (url) => {
            const response = await fetch(url);
            const json = await response.json();
            setData(json);
            setLoading(false);
        };

        setTimeout(() => fetchData(url), 2000);
    }, [url]);

    return { data, loading };
}

export default useFetch;
