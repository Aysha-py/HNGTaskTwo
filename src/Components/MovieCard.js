import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Imdb from "../Assets/Images/IMDB.png"
import orange from "../Assets/Images/PngItem_1381056 1.jpg"
import { FaGreaterThan } from 'react-icons/fa';
import { FiHeart } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import { Link } from 'react-router-dom'; 


const MovieCard = ({topMovies}) => {
     const [favoriteMovies, setFavoriteMovies] = useState(new Array(topMovies.length).fill(false));
    const imgPath = "https://image.tmdb.org/t/p/w500"
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
    const toggleFavorite = (index) => {
    const updatedFavorites = [...favoriteMovies];
    updatedFavorites[index] = !updatedFavorites[index];
    setFavoriteMovies(updatedFavorites);
  };

  return (
    <div>

            <div className='movie_card_box'>
                <div className='movie_cards_title'>
                    <h4>Featured</h4>
                    <h5>See More <span><FaGreaterThan size={20}/></span></h5>
                </div>
                <div className='movie_cards_container'>  
        
            {
             topMovies.map((item,i)=>(
                <div>
               
                    
                    <Card style={{ width: '18rem' }} className="movie_card" data-testid="movie-card">
                        <div className ="moviePoster" onClick={() => toggleFavorite(i)}>
                            {favoriteMovies[i]? <span className='favorites'> <AiFillHeart size={30} color="pink" /></span> : <span className='favorites'><FiHeart size={30}/></span> }
                            {item?.poster_path? 
                                <Card.Img variant="top" src={`${imgPath}${item?.poster_path}`} data-testid="movie-poster"/>
                                :"No Image Available"
                            } 
                        </div>
                        
                    <Link to={`/movies/${item.id}`} key={item.id}>
                        <Card.Body>
                            <Card.Title data-testid="movie-title">Movie Title: {item?.title}</Card.Title>
                            <Card.Text>
                                <div className='imdb_data'>
                                    <div className="imdb_data_right">
                                        <img src={Imdb} alt='IMDB' />
                                        <p>{item?.vote_average.toFixed(1)}/10</p>
                                    </div>
                                    <div className="imdb_data_left">
                                        <img src={orange} alt='orange'/>
                                        <p>97%</p>
                                    </div>
                                    
                                
                                </div>
                            </Card.Text>
                            

                            <Card.Text data-testid="movie-release-date">
                               <h5> {`Release date: ${convertToUTC(item?.release_date)} `}</h5>
                            </Card.Text>
                            
                            
                        </Card.Body>
                    </Link>  
                </Card>
            </div>
           
            ))
        
         }
           
       
           
        
        </div>
        
        </div>
            
        

    </div>
  
  )
  
}

export default MovieCard