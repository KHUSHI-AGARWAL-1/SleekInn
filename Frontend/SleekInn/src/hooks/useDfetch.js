 import {useEffect,useState} from 'react'
import {token} from '../utils/config'
 
function useDfetch(url) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(url,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                });
                console.log(res);
                
                if (!res.ok) {
                    setError("Failed to fetch");
                }
              
                const result = await res.json(); // Corrected line
                setData(result.data);
                setLoading(false);
              
               
               
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }
        fetchData();
    }, [url]);

    return {
        data,
        error,
        loading,
    };
}

export default useDfetch
