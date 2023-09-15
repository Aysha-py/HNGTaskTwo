import React,{ useEffect, useState } from 'react'
import tv from "../Assets/Images/tv.png"
import { BsSearch } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import { ImFacebook2 } from 'react-icons/im';
import { BsInstagram, BsYoutube,BsFillPlayFill } from 'react-icons/bs';
import { BiLogoTwitter } from 'react-icons/bi';
import MovieCard from '../Components/MovieCard';
import BarLoader from "react-spinners/BarLoader";
import Axios from 'axios';
import { css } from '@emotion/react';
import toast, { Toaster } from 'react-hot-toast';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';




const Homepage = () => {
    
    const [topTenMovies, setTopTenMovies] = useState([])
    const [isLoading, setisLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [includeSearch, setIncludeSearch] = useState(false);
   
    const TMDB_API_KEY = process.env.REACT_APP_API_KEY

   

   const fetchTrending = (searchQuery = '') => {
    setisLoading(true);
     const searchURL = searchQuery
    ? `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${searchQuery}`
    : `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}`;
    setTimeout(() => { 
        Axios.get(searchURL)
            .then((response) => {
            if (response.status === 200) {
                 setisLoading(false); 
                const Results = response?.data?.results.slice(0, 10);
                setTopTenMovies(Results)
                  if (searchQuery) {
                     setSearchResults(Results);
                     setIncludeSearch(searchQuery.length > 0 && Results.length > 0)
                }
            } else {
                console.error('Failed to fetch data');
            }
            })
            .catch((error) => {
                setisLoading(false); 
                setIsError(true);
                toast.error("Oops, data cannot be fetched! Check your internet connection");
            });
        }, 2000); 
};
 const handleSearch = (e) => {
        const updatedSearchQuery = e.target.value;
        setSearchQuery(updatedSearchQuery);
        
        
        fetchTrending(updatedSearchQuery);
    };


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
 
`;


    useEffect(()=>{
    fetchTrending()
    },[])
    console.log(topTenMovies)



  return (
    <div className='homepage_container'>



        <header>
            <div className='header-items'>
                <div className='sub-header-items'>
                    <div className='header-logo'>
                       <Link to="/"><img src={tv} alt='tv'/></Link> 
                        <span>MovieBox</span>
                    </div>

                    <div className='search-items'>
                        <div className='search-items-box'>
                             <input  name="search"
                                id='search'
                                placeholder='What did you want to watch'
                                value={searchQuery}
                                 onChange={(e) => handleSearch(e)}/>
                            <span><BsSearch size={24} onClick={fetchTrending}/></span>
                        </div>
                       
                    </div>

                    <div className='sign-in'>
                       <span>Sign In</span>
                       <span><GiHamburgerMenu size={24}/></span>
                    </div>
                </div>

                <div className='movie_info'>
                    <h1>John Wick 3 : Parabellum</h1>
                   
                    <div className='movie_details'>
                        <p>
                            John Wick is on the run after killing a member of the 
                            international assassins' guild, and with a $14 million price tag 
                            on his head, he is the target of hit men and women everywhere.
                        </p>
                    </div>
                    <div className='watch_trailer'>
                        <Button variant="danger" size='lg'><BsFillPlayFill size={30}/>WATCH TRAILER</Button>
                    </div>
                    
                </div>
               
               
            </div>
        </header>
       
        <div className='movie_card_container'>
        {isLoading ? (
            <div className='loader-inner'>
                <BarLoader
                color={'red'}
                css={override}
                isLoading={true}
                style={{ width: '50%' }}
                />
                {searchQuery.length > 0  ? (<p>Search result for "{searchQuery}"...</p> ) :
                
                (<p>Loading Movie Collection....</p>)
                
                }
            </div>
            ) : isError ? (
            <Toaster position='top-center' />
            ) :  <>
                    {searchResults.length > 0 ? (
                      <MovieCard topMovies={searchQuery ? searchResults : topTenMovies} />
                        
                    ) : (
                        <div className='loader-inner'>
                            <p>{searchQuery.length > 0 ? `No search results for "${searchQuery}"`: <MovieCard topMovies={searchQuery ? searchResults : topTenMovies} /> }</p>
                        </div>
                    )}
                </>
            }
      </div>

        <footer>
            <div className='social_media'>
                <div className='social_media_icons'>
                    <span><ImFacebook2 size={24}/></span>
                    <span><BsInstagram size={24}/></span>
                    <span><BiLogoTwitter size={24}/></span>
                    <span><BsYoutube size={24}/></span>
                </div>
               
                <div className='terms_and_condition'>
                    <p>Conditions of Use</p>
                    <p>Privacy & Policy</p>
                    <p>Press Room</p>

                </div>
                <div className='copyright'>
                    © 2021 MovieBox by Aisha
                </div>
            </div>

           
           

        </footer>
        
    </div>
  )
}

export default Homepage