import { useState, useEffect } from 'react';
import fetchAPI from '../utils/api';

export default function Home() {
    const [content, setContent] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchContent = async () => {
        try{
            // modify home-page controller if you dont want to pass additional options
            const data = await fetchAPI('/api/home-page', { populate: ['deep'] });
            setContent(data.data.attributes);
            setLoading(false);
        }
        catch(err){
            setError(err.status + ": " + err.statusText);
        }
    }

    useEffect(() => {
        fetchContent();
    }, [])


    return (
        <h1>home</h1>
    )
}