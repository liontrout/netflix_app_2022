import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import requests from '../api/requests';
import styled from 'styled-components';
import '../styles/Banner.css';

function Banner() {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  

  const fetchData = async () => {
    // 현재 상영 중인 영화 정보 20개 가져오기
    const request = await axios.get(requests.fetchNowPlaying);
    // console.log(request);

    // 20개 영화 중 하나의 ID를 가져오기
    const movieId = request.data.results[
      Math.floor(Math.random() * request.data.results.length + 0)
    ].id;

    // console.log(Math.floor(Math.random() * request.data.results.length + 0));
    // console.log(movieId);

    // 특정 영화의 더 상세한 정보를 가져오기(videos 정보도 포함)
    const {data: movieDetail} = await axios.get(`movie/${movieId}`, {params: {append_to_response: "videos"}});
    // console.log(movieDetail);
    setMovie(movieDetail);
  };

  const onPlayBtn = () => {
    if (!movie.videos.results.length === 0) {
      setIsClicked(false)
    } else {
      setIsClicked(true)
    }
  }

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const timeOut = setTimeout(() => {
    if (isClicked && movie.videos.results.length === 0) {
      window.location.reload();
    }
  }, 5000);
  console.log(timeOut);
  if (!isClicked) {
    return (
      <header
        className='banner'
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover"
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie.title || movie.name || movie.original_name}
          </h1>
          <div className="banner__buttons">
            <button
              className='banner__button play'
              onClick={onPlayBtn}
            >Play</button>
            <button className='banner__button info'>More Information</button>
          </div>
          <p className="banner__description">
            {truncate(movie.overview, 100)}
          </p>
        </div>
        <div className="banner__fadeBottom"></div>
      </header>
    )
  } else {
    return (
      <Container>
        <HomeContainer>
          {movie.videos.results.length !== 0 ? (
            <Iframe
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
              width='640' height='360'
              frameBorder='0'
              style={{marginTop: 70}}
              allow='autoplay; fullscreen'
              title='Youtube video player'
              allowfullscreen
            ></Iframe>
          ) : (
            <BannerError>
              <p>영상을 재생할 수 없습니다.</p>
              <p>{timeOut}초 뒤에 홈으로 이동합니다.</p>
            </BannerError>
          )}
        </HomeContainer>
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex; flex-direction: column; justify-content: center; align-items: center;
  width: 100%; height: 100vh;
`;
const HomeContainer = styled.div`
  width: 100%; height: 100%;
`;
const Iframe = styled.iframe`
  z-index: 1;
  width: 100%; height: 100%;
  border: none;
  opacity: 0.65;
  &::after{
    content: "";
    position: absolute; top: 0; left: 0;
    width: 100%; height: 100%;
  }
`;
const BannerError = styled.div`
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  font-size: 30px; font-weight: 600;
  color: #fff;
  text-align: center;
`;

export default Banner;