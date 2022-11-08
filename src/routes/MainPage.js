import React from 'react';
import requests from "../api/requests";
import Banner from "../components/Banner";
import Row from '../components/Row';

function MainPage() {
  return (
    <>
      <Banner />
      <Row title='NETFLIX ORIGINALS' id='NO' fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
      <Row title='Trending Now' id='TN' fetchUrl={requests.fetchTrending} />
      <Row title='Top Rated' id='TR' fetchUrl={requests.fetchTopRated} />
      <Row title='Science Fiction Movie' id='SM' fetchUrl={requests.fetchScienceFictionMovies} />
      <Row title='Fantasy Movie' id='FM' fetchUrl={requests.fetchFantasyMovies} />
      <Row title='Adventure Movie' id='AM' fetchUrl={requests.fetchAdventureMovies} />
      <Row title='Romance Movie' id='RM' fetchUrl={requests.fetchRomanceMovies} />
      <Row title='Documentary' id='DC' fetchUrl={requests.fetchDocumentaries} />
    </>
  )
}

export default MainPage;