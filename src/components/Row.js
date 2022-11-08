import React, { useCallback, useEffect, useState } from 'react';
import axios from '../api/axios';
import MovieModal from './MovieModal';
import '../styles/Row.css';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Row({isLargeRow, title, fetchUrl}) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  const fetchMovieData = useCallback (async () => {
    const request = await axios.get(fetchUrl);
    // console.log(request);
    setMovies(request.data.results);
  }, [fetchUrl]);

  /*
    const fetchMovieData = useCallback (async () => {
      const request = await axios.get(fetchUrl);
      // console.log(request);

      const movieId = request.data.results[
        Math.floor(Math.random() * request.data.results.length + 0)
      ].id;

      const {data: movieDetail} = await axios.get(`${"movie" || "discover/movie" || "discover/tv" || "trending/all"}${"/" || "?"}${movieId}`, {params: {append_to_response: "videos"}});
      setMovies(movieDetail);
    }, [fetchUrl]);
  */
  
  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  }

  return (
    <section className='row'>
      <h2>{title}</h2>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop={true} // loop 기능을 사용할 것인지
        breakpoints={{
          1378: {
            slidesPerView: 6, // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 6 // 몇개씩 슬라이드할지
          },
          998: {
            slidesPerView: 5, // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 5 // 몇개씩 슬라이드할지
          },
          625: {
            slidesPerView: 4, // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 4 // 몇개씩 슬라이드할지
          },
          0: {
            slidesPerView: 3, // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 3 // 몇개씩 슬라이드할지
          }
        }}
        navigation // arrow 버튼 사용 유무
        pagination={{clickable: true}} // 페이지 버튼 보이게 할지
      >
        {/* <div className="slider"> */}
          {/* <div className="slider__arrow left">
            <span
              onClick={() => {
                document.getElementById(id).scrollLeft -= (window.innerWidth - 80);
              }}
              className="arrow"
            >{"<"}</span>
          </div> */}
          <div className="row__posters">
            {movies.map(movie => (
              <SwiperSlide key={movie.id}>
                <img
                  className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                  src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                  alt={movie.title || movie.name || movie.original_name}
                  onClick={() => handleClick(movie)}
                />
              </SwiperSlide>
            ))}
            {/* {movies.map(movie => (
              <SwiperSlide key={movie.id}>
                <img
                  className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                  src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                  alt={movie.title || movie.name || movie.original_name}
                  onClick={() => handleClick(movie)}
                />
              </SwiperSlide>
            ))} */}
            {/* <SwiperSlide key={movies.id}>
              <img
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movies.poster_path : movies.backdrop_path}`}
                alt={movies.title || movies.name || movies.original_name}
                onClick={() => handleClick(movies)}
              />
            </SwiperSlide> */}
          </div>
          {/* <div className="slider__arrow right">
            <span
              onClick={() => {
                document.getElementById(id).scrollLeft += (window.innerWidth - 80);
              }}
              className="arrow">{">"}</span>
          </div> */}
        {/* </div> */}
      </Swiper>
      {modalOpen && (
        <MovieModal
          {...movieSelected}
          setModalOpen={setModalOpen}
        />
      )}
    </section>
  )
}

export default Row;