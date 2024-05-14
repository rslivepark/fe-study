import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from '../api/axios';
import requests from '../api/requests';

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // 현재 상영중인 영화 정보를 가져오기 (여러 영화)
    const request = await axios.get(requests.fetchNowPlaying);

    // 여러 영화 중 영화 하나의 ID를 가져오기
    const movieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id;

    // 특정 영화의 더 상세한 정보를 가져오기(비디오 정보도 포함)
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: 'videos' },
    });

    setMovie(movieDetail);
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  if (!isClicked) {
    return (
      <BannerContainer movie={movie}>
        <BannerContents className='banner__contents'>
          <h1 className='banner__title'>
            {movie.title || movie.name || movie.originam_name}
          </h1>

          <div className='banner__buttons'>
            <button
              className='banner__button play'
              onClick={() => setIsClicked(true)}
            >
              Play
            </button>
            <button className='banner__button info'>More Information</button>
          </div>

          <h1 className='banner__description'>
            {truncate(movie.overview, 100)}
          </h1>

          <div className='banner--fadeBottom'></div>
        </BannerContents>
      </BannerContainer>
    );
  } else {
    return (
      <Container>
        <HomeContainer>
          <Iframe
            width='640'
            height='360'
            frameborder='0'
            allow='autoplay; fullscreen'
            src={`https://www.youtube.com/embed/${movie.videos.results[0]?.key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0]?.key}`}
          ></Iframe>
        </HomeContainer>
      </Container>
    );
  }
};

const BannerContainer = styled.header`
  color: white;
  object-fit: contain;
  height: 448px;
  background-image: url('https://image.tmdb.org/t/p/original/${(props) =>
    props.movie.backdrop_path}');
  background-position: top center;
  background-size: cover;

  @media (min-width: 1500px) {
    position: relative;
    height: 600px;

    .banner--fadeBottom {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 40rem;
      background-image: linear-gradient(
        180deg,
        transparent,
        rgba(37, 37, 37, 0.61),
        #111
      );
    }
  }

  @media (max-width: 768px) {
    .banner__contents {
      width: min-content !important;
      padding-left: 2.3rem;
      margin-left: 0px !important;
    }

    .banner__description {
      font-size: 0.8rem !important;
      width: auto !important;
    }

    .info {
      text-align: start;
      padding-right: 1.2rem;
    }

    .space {
      margin-left: 6px;
    }

    .banner__button {
      font-size: 0.8rem !important;
      border-radius: 4px !important;
    }
  }
`;

const BannerContents = styled.div`
  margin-left: 40px;
  padding-top: 140px;
  height: 190px;

  .banner__title {
    font-size: 3rem;
    font-weight: 800;
    padding-bottom: 0.5rem;
  }

  .banner__description {
    width: 45rem;
    line-height: 1.3;
    padding-top: 1rem;
    font-weight: 500;
    font-size: 1rem;
    max-width: 400px;
    height: 80px;
  }

  .banner__buttons {
    display: flex;
    flex-direction: row;
  }

  .banner__button {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    cursor: pointer;
    outline: none;
    border: none;
    font-size: 1rem;
    font-weight: 700;
    border-radius: 0.2vw;
    padding: 0.4rem 1.8rem 0.4rem 1rem;
    margin-right: 1rem;

    &:hover {
      color: #000;
      background-color: rgba(170, 170, 170, 0.9);
      transition: all 0.2s;
    }
  }

  .play {
    background-color: white;
    color: black;
  }

  .info {
    background-color: rgba(109, 109, 110, 0.7);
    color: white;

    &:hover {
      background-color: rgb(74, 74, 74);
      color: white;
    }
  }

  .space {
    margin-left: 4px;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export default Banner;
