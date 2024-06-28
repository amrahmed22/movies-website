import React from 'react';
import { render } from "react-dom";
import { Link } from 'react-router-dom';
import pic from '../../profilee.jpg'


import AnimatedProgressProvider from '../AnimatedProgressProvider'
import 'react-circular-progressbar/dist/styles.css';
import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";
import { easeQuadInOut } from 'd3-ease';



const MediaItem = ({ item }) => {
    return <>
        <div className="col-md-3 col-6 rounded-2">
            <div className='w-100'>
            <Link to={`/ItemDetails/${item.id}/${item.media_type}`}>
                <div className="movie position-relative rounded-2">

                    {item.profile_path || item.poster_path ? '' : <img className='w-100 instead' src={pic} alt="" />}

                    {item.poster_path ? <img src={"http://image.tmdb.org/t/p/w500/" + item.poster_path} className='w-100 rounded-2' alt="" /> : <img src={"http://image.tmdb.org/t/p/w500/" + item.profile_path} className='w-100 rounded-2' alt="" />}

                    <h6 className='fs-6 text-center mt-2'>{item.title} {item.name}</h6>
                    {item.vote_average ?

                        <div className='position-absolute vote bg-light rounded-circle'>
                            
                            <AnimatedProgressProvider
                                    valueStart={0}
                                    valueEnd={Math.round(item.vote_average*10).toFixed(0)}
                                    duration={2}
                                    easingFunction={easeQuadInOut}
                                    
                                >
                                    {value => {
                                        const roundedValue = Math.round(value);
                                        return (
                                            <CircularProgressbar
                                                value={value}
                                                text={`${roundedValue}%`}
                                                styles={{
                                                    path:{transition: "none"},
                                                text:{
                                                    fontSize:'25px'
                                                }
  
                                            }}
                                            />
                                        );
                                    }}
                                </AnimatedProgressProvider>                            
                     
                        </div>

                        : ""}

                </div>
            </Link>
            </div>
        </div>


    </>
}

export default MediaItem;
