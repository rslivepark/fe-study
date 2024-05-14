import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import useDebounce from '../../customHooks/useDebounce';
import axios from '../../api/axios';
import styled from 'styled-components';

const SearchPage = () => {
    const[searchResult,setSearchResult] = useState([]);
    const navigate = useNavigate();

    const useQuery = () => {
        return new URLSearchParams(useLocation().search)
    }

    const debounceSearchTerm = useDebounce(useQuery().get('q'),500);

    useEffect(()=>{
        if(debounceSearchTerm){
          fetchSearchMovie();
        }
      },[debounceSearchTerm])

    const fetchSearchMovie = async () => {
        try {
          const request = await axios.get(`/search/multi?include_audult=false&query=${debounceSearchTerm}`)
          setSearchResult(request.data.results);
        } catch (error) {
          console.log(error);
        }
    }

    const renderSearchResults = () => {
        return searchResult.length > 0 ? (
          <SearchContainer className='search-container'>
            {searchResult.map(movie => {
              if(movie.backdrop_path !== null && movie.media_type !== "person"){
                const movieImageUrl = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                return(
                  <Movie className='movie' key={movie.id}>
                    <MovieColumnPoster className='movie__column-poster' onClick={()=>navigate(`/${movie.id}`)}>
                      <MoviePoster
                        src={movieImageUrl}
                        alt='movie image'
                        className='movie__poster'
                      />
    
                    </MovieColumnPoster>
                  </Movie>
                )
              }
              })}
          </SearchContainer>
        )
        :
        <section className='no-results'>
          <div className='no-results__text'>
            <p> 찾고자 하는 검색어"{debounceSearchTerm}"에 맞는 영화가 없습니다. </p>
          </div>
        </section>
      }
  return renderSearchResults();
}

export const SearchContent = styled.div`
  height: 100vh;
  background-color: black;
`;

export const SearchContainer = styled.div`
  background-color: black;
  width: 100%;
  text-align: center;
  padding: 5rem 0;
`;

export const NoResults = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  color: #c5c5c5;
  height: 100%;
  padding: 8rem;
`;

export const Movie = styled.div`
  flex: 1 1 auto;
  display: inline-block;
  padding-right: 0.5rem;
  padding-bottom: 7rem;
`;

export const MovieColumnPoster = styled.div`
  cursor: pointer;
  transition: transform 0.3s;
  -webkit-transition: transform 0.3s;

  &:hover {
    transform: scale(1.25);
  }
`;

export const MoviePoster = styled.img`
  width: 90%;
  border-radius: 5px;
`;

export default SearchPage
