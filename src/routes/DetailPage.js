import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';


function DetailPage() {
  const [movie, setMovie] = useState({});

  let {movieId} = useParams();
  console.log("movieId", movieId);
  console.log("useParams()", useParams());

  const fetchData = async () => {
    const request = await axios.get(`/movie/${movieId}`);
    console.log("request", request);
    setMovie(request.data);
  }

  useEffect(() => {
    fetchData();
  }, [movieId]);

  if (!movie) return <div>...loading</div>
  return (
    <section>
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={movie.title || movie.name || movie.original_name}
        className='modal__poster-img'
        style={{marginTop: "70px"}}
      />
      <div className="modal__content" style={{color: "#fff"}}>
        <p className="modal__details">
          <span className="modal__user_perc">100% for you</span> {movie.release_date ? movie.release_date : movie.first_air_date}
        </p>
        <h2 className="modal__title">{movie.title ? movie.title : movie.name}</h2>
        <p className="modal__details">평점: {movie.vote_average}</p>
        <p className="modal__overview">{movie.overview}</p>
        <p className="modal__genres">
          {movie.genres && movie.genres.map((genre) => (
            <span key={genre.id}>
              {genre.name}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}

export default DetailPage;