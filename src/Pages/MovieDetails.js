import React from 'react';
import  {useEffect,useState}from 'react'
import banner from "../Assets/Images/Group 56.jpg"
import banner2 from "../Assets/Images/Rectangle 37.jpg"
import star from "../Assets/Images/Star.png"
import { useParams } from 'react-router-dom'
import Axios from 'axios';
import tv from "../Assets/Images/tv.png"
import Button from 'react-bootstrap/Button';
import { css } from '@emotion/react';
import BarLoader from "react-spinners/BarLoader";
import toast, { Toaster } from 'react-hot-toast';

const MovieDetails = () => {
    const [movie,setMovie] = useState(null)
     const [isloading, setisloading] = useState(true);
    const [isError, setIsError] = useState(false);
    const { id } = useParams()
    const TMDB_API_KEY = process.env.REACT_APP_API_KEY
    const imgPath = "https://image.tmdb.org/t/p/w500"

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchsingleMovie = () => {
      setTimeout(() => { 
        Axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`)
            .then((response) => {

                if (response.status === 200) {
                    setMovie(response.data);
                    setisloading(false);
                } else {
                    setIsError(true); 
                    setisloading(false);
                    console.error('Failed to fetch data');
                }
            })
            .catch((error) => {
                setIsError(true); 
                setisloading(false);
               toast.error("Oops, Movie cannot be fetched! Check your internet connection");;
            });
    }, 3000); 
};

      useEffect(()=>{
            fetchsingleMovie()
    },[id, TMDB_API_KEY, fetchsingleMovie])
    console.log(movie)
      function convertToUTC(itemDate) {
  
        const dateObject = new Date(itemDate);
        if (!isNaN(dateObject)) {
        
            const year = dateObject.getUTCFullYear();
            const month = dateObject.getUTCMonth() + 1; 
            const day = dateObject.getUTCDate();
        
            const utcDateString = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

            return utcDateString;
        } else {
            return "Invalid Date";
        }
    }
      function formatRuntime(runtime) {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    const hoursText = hours > 0 ? `${hours}h` : '';
    const minutesText = minutes > 0 ? `${minutes}m` : '';

    return `${hoursText} ${minutesText}`;
  }
  
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
 
`;
 
  return (
    <div className='Movie_details_container'>
      {isloading &&
        <div className='loader'>
            <div className='loader-inner'>  
                <BarLoader color={'red'} css={override} isloading={true}  style={{ width: '50%' ,}}/>
                <p>Loading movie Information....</p>
            </div>
        </div>
       }
      {isError && <Toaster position="top-center"/>}
      {!isloading && !isError && movie && (
        <>
            <div className='movie_details_sidebar'>
                <div className='sidebar_header'>
                    <img src={tv} alt='tv'/>
                    <span>Movies</span>
                </div>
                <div className='sidebar_list_items'>
                <ul>
                    <li>Home</li>
                    <li>Movies</li>
                    <li>TV series</li>
                    <li>Upcoming</li>
                    
                
                </ul>
            </div>

            <div className='play_movies'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus rerum impedit harum, vero necessitatibus aliquid, earum repudiandae 
                    perspiciatis perferendis placeat minus at tempora. Aliquid id possimus, ea recusandae ab ratione!
                </p>
                <Button>Start Playing</Button>
            </div>
            <div className='logout'>
               <p>Logout</p>
            </div>
        </div>
        
        <div className='Movie_details_body'>
            <div className='Movie_details_image'>
                {/* <img src={banner} alt="banner"/> */}
                <img src={`${imgPath}${movie?.backdrop_path}`} alt='movieBanner'/>
            </div>

            <div className='movie_details'>
                <div className='movie_details_left'>
                    <div className="movie_type" >  
                        <h2 data-test-id="movie-title" className='movie-title'style={{color:"#BE123C", fontSize:"3rem"}}>{movie?.title}</h2>
                        <div className='movie_type_button'>
                            <button>Action</button>
                            <button>Drama</button>
                        </div>
                        
                    </div>
                    <div className='movie_overview'>
                        <p data-test-id="movie-overview">
                           {movie?.overview}
                        </p>
                    </div>

                 
                    <p data-test-id="movie-release-date">Release date: <span> {`${convertToUTC(movie?.release_date)} `}</span></p>
                    <p data-test-id="movie-runtime">Runtime : <span>{formatRuntime(movie?.runtime)}</span></p>
                   
                </div>

                <div className='movie_details_right'>
                    <div className="rating_star">
                        <img src={star} alt="start"/>
                        <p>8.5/10</p>
                    </div>
                    <div className='movie_details_button'>
                        <Button variant="danger" size='lg'>See Showtimes</Button>
                       
                    </div>
                    <div className='movie_details_button'>
                        <Button variant="danger" size='lg'>More Watch options</Button>
                       
                    </div>
                  
                    <img src={banner2} alt="banner2" />
                </div>
            </div>
        
        </div>
            </>
      )
}
       
    </div>
  )
}

export default MovieDetails