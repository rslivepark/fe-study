import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';
import styled from 'styled-components';

const DetailPage = () => {

    const {movieId} = useParams();
    const [movie,setMovie] = useState({});

    useEffect(()=>{
        async function fetchData() {
          const request = await axios.get(`/movie/${movieId}`)
          setMovie(request.data);
        }
        fetchData();
      },[movieId])

      if (!movie) return <div>...loading</div>;
  
      return (
        <section>
          <ModalPoster
          className='modal__poster-img'
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt='poster'
          />
        </section>
      );
}

const ModalPoster = styled.img`
width: 100%;
    height: auto;
`



export default DetailPage
