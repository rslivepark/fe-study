import React, { useEffect, useState } from 'react'
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import axios from '../api/axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import MovieModal from './MovieModal';
import styled from 'styled-components';
import 'swiper/css';

const Row = ({title,id,fetchURL,isLargeRow}) => {

    const [movies, setMovies] = useState([]);
    const [modalOpen,setModalOpen] = useState(false);
    const [movieSelected,setMovieSelected] = useState({});

    useEffect(() => {
        fetchMovieData();
    },[]);

    const fetchMovieData = async () => {
        const request = await axios.get(fetchURL);
        setMovies(request.data.results);
    }

    const handleClick = (movie) => {
        console.log(movie);
        setModalOpen(true);
        setMovieSelected(movie);
    }

  return (
    <RowSection>
            <RowTitle>{title}</RowTitle>
            <Swiper
                id={id}
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                pagination={{ clickable: true }}
                loop={true}
                breakpoints={{
                    1378: {
                    slidesPerView: 6,
                    slidesPerGroup: 6,
                    },
                    998: {
                    slidesPerView: 5,
                    slidesPerGroup: 5,
                    },
                    625: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                    },
                    0: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    },
                }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                <RowPosters id={id}>
                    {movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <Poster
                        src={`https://image.tmdb.org/t/p/original/${
                            isLargeRow ? movie.poster_path : movie.backdrop_path
                        }`}
                        alt={movie.name}
                        onClick={() => handleClick(movie)}
                        isLargeRow={isLargeRow}
                        />
                    </SwiperSlide>
                    ))}
                </RowPosters>
                </Swiper>

            {
                modalOpen && (
                    <MovieModal {...movieSelected} setModalOpen={setModalOpen}></MovieModal>
                )
            }
    </RowSection>
  )
}

const RowTitle = styled.h2`
    margin-left: 20px;
    color: white;
`;

const RowSection = styled.section`

  .swiper-pagination {
    text-align: right !important;
  }
  
  .swiper-pagination-bullet {
    background: gray !important;
    opacity: 1 !important;
  }
  
  .swiper-pagination-bullet-active {
    background: white !important;
  }
  
  .swiper-button-prev {
    color: white !important;
  }
  
  .swiper-button-next {
    color: white !important;
  }
  
  .swiper-button-next:after, .swiper-button-prev:after{
    font-size: 1.3rem !important;
    font-weight: 600 !important;
  }

  .swiper-pagination {
    text-align: right !important;
  }
  
  .swiper-pagination-bullet {
    background: gray !important;
    opacity: 1 !important;
  }
  
  .swiper-pagination-bullet-active {
    background: white !important;
  }
  
  .swiper-button-prev {
    color: white !important;
  }
  
  .swiper-button-next {
    color: white !important;
  }
  
  .swiper-button-next:after, .swiper-button-prev:after{
    font-size: 1.3rem !important;
    font-weight: 600 !important;
  }
`;


const RowPosters = styled.div`
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  padding: 20px 0 20px 20px;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Poster = styled.img`
  object-fit: contain;
  width: 100%;
  max-height: ${({ isLargeRow }) => (isLargeRow ? '320px' : '144px')};
  margin-right: 10px;
  transition: transform 450ms;
  border-radius: 4px;
  &:hover {
    transform: ${({ isLargeRow }) => (isLargeRow ? 'scale(1.1)' : 'scale(1.08)')};
    opacity: ${({ isLargeRow }) => (isLargeRow ? '1' : 'unset')};
  }
`;




export default Row
