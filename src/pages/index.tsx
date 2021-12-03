import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Endpoints from '../endpoints/endpoints';
import { Advert } from '../interfaces/advert/advert';

const Home = () => {
    const [adverts, setAdverts] = useState<Array<Advert>>([]);
    const [error, setError] = useState<any>('');
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    
    const getAdverts = () => {
        axios.get(`${Endpoints.defaultEndpoint}/api/Adverts`)
            .then(response => {
                setIsLoaded(true);
                setAdverts(response.data);
            })
            .catch(error => {
                setIsLoaded(false);
                setError(error);
            });
    };

    useEffect(() => {
        getAdverts();
    }, []);

    if (error) {
        return <div>{error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading adverts...</div>;
    } else {
        return (
            <div 
                style={{
                    display: 'block',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh'}}
            >
                {adverts.map(advert => {
                    return (
                        <div key={`${advert.id}`} id={`${advert.id}`}>
                            {advert.name}
                        </div>
                    );
                })}
            </div>
        );
    }
};

export default Home;