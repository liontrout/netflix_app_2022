import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
import { useDebounce } from '../hooks/useDebounce';
import '../styles/SearchPage.css';


function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);

  // console.log("useLocation()", useLocation());
  const useQuery = () => {
    return new URLSearchParams(useLocation().search)
  }
  let query = useQuery();
  const searchTerm = query.get("q");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  // console.log("searchTerm", searchTerm);

  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    try {
    const request = await axios.get(
      `search/multi?include_adult=false&query=${searchTerm}`
      );
      console.log("request", request);
      setSearchResults(request.data.results);
    } catch (error) {
      console.log("error", error);
    }
  }

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <section className="search-container">
        {searchResults.map(movie => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            return (
              <div
                key={movie.id}
                className="movie"
              >
                <div
                  onClick={() => navigate(`/${movie.id}`)}
                  className='movie__column-poster'
                >
                  <img
                    src={movieImageUrl}
                    alt={
                      movie.title || movie.name || movie.original_name
                    }
                    className="movie__poster"
                  />
                  <div className="movie__content" style={{color: "#fff"}}>
                    <span className="movie__user_perc">100% for you</span>
                    <span className="movie__date">
                      {movie.release_date ? movie.release_date : movie.first_air_date}
                    </span>
                    <span className="movie__points">평점: {movie.vote_average}</span>
                    <h2 className="movie__title">{movie.title ? movie.title : movie.name}</h2>
                  </div>
                </div>
              </div>
            )
          }
        })}
      </section>
    ) : (
      <section className="no-results">
        <div className="no-result__text">
          <p>
            입력하신 검색어 "{searchTerm}"에 맞는 결과가 없습니다.
          </p>
        </div>
      </section>
    );
  };

  return renderSearchResults();
}

export default SearchPage;