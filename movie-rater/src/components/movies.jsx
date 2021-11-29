import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';

// in this component 25 moives will be fetched
const Movies = () => {
    const [data, setData] = useState({ hits: [] });
    
    useEffect(async () => {
      const result = await axios(
        'https://imdb-api.com/en/API/Top250Movies/k_tqc3a27f',
      );

      setData(result.data);
    });
    

    return ( 
        <ul>
        {data.hits.map(item => (
          <li key={item.id}>
            <a href={item.image}>{item.title}</a>
          </li>
        ))}
      </ul>
     );
}
 
export default Movies;