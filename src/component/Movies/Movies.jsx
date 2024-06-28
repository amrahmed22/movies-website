import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import MediaItem from '../MediaItem/MediaItem';
import ScrollToTop from './../ScrollToTop/ScrollToTop';
import { Helmet } from 'react-helmet';


const Movies = () => {
    const [movieList, setMovieList] = useState([]);
    const [flag, setFlag] = useState(false);
    const [filteredArray, setFilteredArray] = useState([]);
    async function getMovies() {
        let { data } = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=713e5b505cc52f5aa68161a6f9c471c1`)
        // console.log(data.results[0].title);
        setMovieList(data.results)
        setFilteredArray(data.results)
        setFlag(true)
    }
    useEffect(() => {
        getMovies()
    }, []);

    const search = (event) => {

        setFilteredArray(movieList.filter((x) => {
          if (x.title.toLowerCase().includes(event.target.value.toLowerCase())) return x;
    
        
        }))

    }

 
    return<>
      <Helmet>
            <title>Movies</title>
            <meta name="description" content="Helmet application" />
        </Helmet>
   <div className="container w-100 problem">
   <ScrollToTop/>

   <div className="row my-2 gy-4 px-2 ">
        <input onChange={search} type="text" className='form-control my-2' placeholder='Search For Movies' />
            <div className="col-md-3 d-flex align-items-center">
                <div>
                    <hr className='w-25' />
                    <h1 className='h2 '>Trending <br /> Movies <br /> To Watch Now</h1>
                    <h4 className='h6 text-muted'>Most Watched Tv by days</h4>
                    <hr />
                </div>
            </div>
    {flag? filteredArray.length? filteredArray.map((item, index) => <MediaItem key={index} item={item} />):
    <div className='w-100 bg-info text-center p-4 rounded-4'>
        <h2>No Results <i className='fa fa-search'></i></h2>
    </div>
        : <>
        <div className='w-100  text-center p-4 rounded-4'>
        <h2><i className='fa fa-spinner fa-spin fs-1'></i></h2>
    </div>
        </>
    }
    </div>
   </div>
    </>
}

export default Movies;
