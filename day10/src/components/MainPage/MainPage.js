import React from 'react';
import Banner from './../Banner';
import Row from './../Row';
import requests from '../../api/requests';

const MainPage = () => {
  return (
    <div>
      <Banner />
      <Row
        title='NETFLIX ORIGINALS'
        id='NO'
        fetchURL={requests.fetchNetflixOriginals}
        isLargeRow={true}
      />
      <Row title='Trending Now' id='TN' fetchURL={requests.fetchTrending} />
      <Row title='Top Rated' id='TR' fetchURL={requests.fetchTopRated} />
      <Row
        title='Action Movies'
        id='AM'
        fetchURL={requests.fetchActionMovies}
      />
      <Row title='Comedy Movie' id='CM' fetchURL={requests.fetchComedyMovies} />
    </div>
  );
};

export default MainPage;
