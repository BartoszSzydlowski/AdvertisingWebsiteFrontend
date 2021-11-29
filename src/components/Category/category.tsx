import React, { useState, useEffect } from 'react';
import Endpoints from '../../endpoints/endpoints';
import { Category } from '../../interfaces/category/category';
import axios from 'axios';

const GetCategory = ({event}: any) => {
    const [categories, setCategories] = useState<Array<Category>>([]);
    //const [selectedCategory, setSelectedCategory] = useState(props[0].value);

    useEffect(() => {
        axios.get(`${Endpoints.defaultEndpoint}/api/categories`)
        //.then(res => res.json())
        .then(data => {
            //console.log(data);
            setCategories(data.data);
        });
    }, [])
    
    return(
        <select onChange={event}>
            {categories && categories.map(el =>
                <option key={el.id.toString()} id={el.id.toString()} value={el.id}>{el.name}</option>
            )}
        </select>
    )
}

export default GetCategory;