import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MediaItem from './../MediaItem/MediaItem';
import { Helmet } from 'react-helmet';
import slider5 from '../../slider-1.jpg'
import slider6 from '../../slider-2.jpg'
import slider7 from '../../slider-3.jpg'
import slider8 from '../../slider-4.jpeg'
import img1 from '../../disnep.png'
import img2 from '../../marvel.png'
import img3 from '../../pixar.png'
import img4 from '../../national-geographic.png'
import ScrollToTop from './../ScrollToTop/ScrollToTop';

const Home = () => {

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTv, setTrendingTv] = useState([]);
  const [trendingPeople, setTrendingPeople] = useState([]);
  const [flag, setFlag] = useState(false);

  async function getTrending(mediaType, callback) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=713e5b505cc52f5aa68161a6f9c471c1`)
    callback(data.results)
    setFlag(true)
    // console.log(data.results);
  }
  useEffect(() => {
    getTrending('movie', setTrendingMovies)
    getTrending('tv', setTrendingTv)
    getTrending('person', setTrendingPeople)
  }, []);
  let x = []
  trendingMovies.map((item, index) => x.push(item.poster_path))
  // console.log(x);
  return <>
  <ScrollToTop/>
    <Helmet>
      <title>Disney</title>
      <meta name="description" content="Helmet application" />
    </Helmet>
  <div className="container w-100 problem">
  <section className='mt-4'>
      <div id="carouselExampleAutoplaying" className="carousel slide " data-bs-ride="carousel">
        <div className="carousel-inner">
        </div>
        <div className="carousel-inner rounded-4">
          <div className="carousel-item  active">
            <img src={slider5} className='w-100' alt="" />
            <div className="carousel-caption d-none d-md-block text-start">
              <h5>Wish You Enjoy</h5>
              <p>Most Viewed Movies May You Like .</p>
            </div>
          </div>
          <div className="carousel-item ">
            <img src={slider6} className='w-100' alt="" />

            <div className="carousel-caption d-none d-md-block  text-start">
              <h5>Wish You Enjoy</h5>
              <p>Most Viewed Movies May You Like .</p>
            </div>
          </div>
          <div className="carousel-item ">
            <img src={slider7} className='w-100' alt="" />

            <div className="carousel-caption d-none d-md-block text-start">
              <h5>Wish You Enjoy</h5>
              <p>Most Viewed Movies May You Like .</p>
            </div>
          </div>
          <div className="carousel-item ">
            <img src={slider8} className='w-100' alt="" />

            <div className="carousel-caption d-none d-md-block text-start">
              <h5>Wish You Enjoy</h5>
              <p>Most Viewed Movies May You Like .</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>



    </section>


    <div className="container">
      <div className="row mb-3 py-5 g-4">
        <div className="col-6 col-md-3 col-sm-6">
          <div className='box border border-3 rounded-4 d-flex justify-content-center align-items-center'>
            <img src={img1} className='w-100' alt="" />
          </div>
        </div>
        <div className="col-6 col-md-3 col-sm-6">
          <div className='box border border-3 rounded-4 d-flex justify-content-center align-items-center'>
            <img src={img2} className='w-100' alt="" />
          </div>
        </div>
        <div className="col-6 col-md-3 col-sm-6">
          <div className='box border border-3 rounded-4 d-flex justify-content-center align-items-center'>
            <img src={img3} className='w-100' alt="" />
          </div>
        </div>
        <div className="col-6 col-md-3 col-sm-6">
          <div className='box border border-3 rounded-4 d-flex justify-content-center align-items-center'>
            <img src={img4} className='w-100' alt="" />
          </div>
        </div>
      </div>
     {
      flag? <div className="row my-3 gy-3 d-flex justify-content-center">
      <div className="col-md-3 d-flex align-items-center">
        <div>
          <hr className='w-25' />
          <h1 className='h2 '>Trending <br /> Movies <br /> To Watch Now</h1>
          <h4 className='h6 text-muted'>Most Watched Movies by days</h4>
          <hr />
        </div>
      </div>
      {trendingMovies.slice(0, 10).map((item, index) => <MediaItem key={index} item={item} />)}
      <hr className='mb-4' />
      <div className="col-md-3 d-flex align-items-center">
        <div>
          <hr className='w-25' />
          <h1 className='h2 '>Trending <br /> Tv <br /> To Watch Now</h1>
          <h4 className='h6 text-muted'>Most Watched Tv by days</h4>
          <hr />
        </div>
      </div>
      {trendingTv.slice(0, 10).map((item, index) => <MediaItem key={index} item={item} />)}
      <hr className='mb-4' />
      <div className="col-md-3 d-flex align-items-center">
        <div>
          <hr className='w-25' />
          <h1 className='h2 '>Trending <br /> People <br /> To Watch Now</h1>
          <h4 className='h6 text-muted'>Most Watched People by days</h4>
          <hr />
        </div>
      </div>
      {trendingPeople.slice(0, 10).map((item, index) => <MediaItem key={index} item={item} />)}


    </div>: <>
                 <div className='w-100  text-center p-4 rounded-4'>
                     <h2><i className='fa fa-spinner fa-spin fs-1'></i></h2>
                 </div>
             </>
     }
    </div>

  </div>



  </>
}

export default Home;
