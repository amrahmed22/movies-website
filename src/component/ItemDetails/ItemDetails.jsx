import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import pic from '../../profilee.jpg'
import icon from './icon.png'
import ScrollToTop from './../ScrollToTop/ScrollToTop';




const ItemDetails = () => {
    let params = useParams();
    // console.log(params);
    let { id, media_type } = params
    const [itemDetails, setItemDetails] = useState({});

    async function getItem(id, type) {

        let { data } = await axios(`https://api.themoviedb.org/3/${type}/${id}?api_key=713e5b505cc52f5aa68161a6f9c471c1`)
        console.log(data);
        setItemDetails(data)


    }
 
    useEffect(() => {
        getItem(id, media_type)
    }, []);

    let w;
    if (media_type == 'tv') {
        w = 'tv'
    }
    else if (media_type == 'person') {
        w = 'people'
    }
    else if (media_type == 'movie') {
        w = 'movies'
    }


    return <>
        <Helmet>
            <link rel="icon" type="image/png" href={icon} sizes="16x16" />
            <title>{itemDetails.name ? itemDetails.name : itemDetails.title}</title>
            <meta name="description" content="Helmet application" />


        </Helmet>
        {itemDetails.backdrop_path?<img src={'http://image.tmdb.org/t/p/w500/' + `${itemDetails.backdrop_path}`} className='w-100 border-0 vh-100 movieCover position-absolute top-0 bottom-0 start-0 end-0 opacity-25' alt="" />:''}


        <div className="container ">
            <ScrollToTop />

            <div className="row mt-2 d-flex align-items-center shadow-lg  position-relative">
                <Link to={`/${w}`}>
                    <button className='btn btn-danger return-btn position-absolute top-0 end-0'>
                        <i className='fa fa-x'></i>

                    </button>
                </Link>

                <div className="col-md-4 ">
                    <div className='w-100 h-100 p-2'>
                        {itemDetails.profile_path || itemDetails.poster_path ? '' : <img className='w-100 h-100' src={pic} alt="" />}
                        {itemDetails.poster_path ? <img className='w-100 rounded-4 h-100' src={'http://image.tmdb.org/t/p/w500/' + `${itemDetails.poster_path}`} alt="" /> :
                            <img className='w-100 rounded-4 h-100' src={'http://image.tmdb.org/t/p/w500/' + `${itemDetails.profile_path}`} alt="" />
                        }
                    </div>

                </div>
                <div className="col-md-8">
                    <h1 className=''>{itemDetails.original_title}{itemDetails.name}</h1>
                    <i className='fs-5'>{itemDetails.tagline}</i>

                    {itemDetails.overview ? <div className=''>
                        <button className='btn btn-outline-info px-4 me-3 py-2 mt-3 mb-2'><i className='fa fa-play'></i> &nbsp;&nbsp; watch Trailer</button>
                        {/* <button className='btn btn-outline-info me-3 py-2 px-3'><i className='fa fa-plus'></i></button> */}
                    </div> : ''}
                    <div className='row g-3 w-100 d-flex my-3 w-50'>
                        {itemDetails?.genres ? itemDetails?.genres.map((x, key) =>
                            <span key={key} className='me-3 w-auto p-1 rounded-3 bg-danger'>{x.name}</span>) : ""}
                    </div>




                    {itemDetails.vote_count ? <h6 className='my-4'>Vote Count : {itemDetails.vote_count}</h6> : <h6 className='my-5'>Date Of Birth : {itemDetails.birthday}</h6>}
                    {itemDetails.vote_average ? <h6 className='my-4'>Vote Average : {itemDetails.vote_average}</h6> : <h6 className='my-5'>Place Of Birth : {itemDetails.place_of_birth}</h6>}
                    <h6 className='my-4'>popularity : {itemDetails.popularity}</h6>
                    {itemDetails.release_date || itemDetails.first_air_date ? <h6 className='my-4'>release date : {itemDetails.release_date}{itemDetails.first_air_date}</h6> : ''}
                    {itemDetails.overview? <h6 className='text-white mt-4 mb-2'>{itemDetails.overview?.slice(0 , 140)}...... &nbsp;<u className='read fs-5'>Read More</u></h6>:''}
                </div>
                <div className="col-12 mt-3">
                    <h6>{itemDetails.biography}</h6>
                </div>
            </div>
        </div>


    </>
}

export default ItemDetails;
