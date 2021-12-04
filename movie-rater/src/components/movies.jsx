import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';

// in this component 25 moives will be fetched
const Movies = () => {
    const [data, setData] = useState({ hits: [] });
    
    useEffect(async () => {
      const result = await axios(
        'http://localhost:5000/moviesList',
      );

      setData(result.data);
    });
    

    return ( 
        <ul>
        {data.hits.map(item => (
          <li key={item._id}>
            <a href={item.image}>{item.title}</a>
          </li>
        ))}
      </ul>
      
     );
}
 
export default Movies;