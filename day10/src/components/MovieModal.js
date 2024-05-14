import React, { useRef } from 'react'
import useOnClickOutside from '../customHooks/useOnClickOutside';
import styled, { keyframes } from 'styled-components';

const MovieModal = ({
    backdrop_path,
    title,
    overview,
    name,
    release_date,
    first_air_date,
    vote_average,
    setModalOpen
}) => {
  const ref = useRef();

  useOnClickOutside(ref,()=>{
    setModalOpen(false);
  })

  return (
    <Presentation>
      <ModalWrapper>
            <ModalContent ref={ref}>
              <ModalClose onClick={() => setModalOpen(false)}>X</ModalClose>
              <ModalPosterImg
                src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                alt='modal__poster-img'
              />
              <ModalContentInner>
                <ModalDetails>
                  <ModalUserPerc>100% for you</ModalUserPerc>
                  {release_date ? release_date : first_air_date}
                </ModalDetails>
                <ModalTitle>{title ? title : name}</ModalTitle>
                <ModalOverview>평점: {vote_average}</ModalOverview>
                <ModalOverview>{overview}</ModalOverview>
              </ModalContentInner>
            </ModalContent>
      </ModalWrapper>
    </Presentation>
    
  )
}
const Presentation = styled.div`
    z-index: 1200;
    position: absolute;
`

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const ModalWrapper = styled.div`
  position: fixed;
  inset: 0px;
  background-color: rgba(0, 0, 0, 0.71);
  -webkit-tap-highlight-color: transparent;
  display: flex;
  justify-content: center;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 800px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
  background: #111;
  overflow: hidden;
  border-radius: 8px;
  transition: all 400ms ease-in-out 2s;
  animation: ${fadeIn} 400ms;
`;

const ModalClose = styled.span`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  z-index: 1000;
  color: white;
`;

const ModalPosterImg = styled.img`
  width: 100%;
  height: auto;
`;

const ModalContentInner = styled.div`
  padding: 40px;
  color: white;
`;

const ModalTitle = styled.h2`
  padding: 0;
  font-size: 40px;
  margin: 16px 0;
`;

const ModalDetails = styled.p`
  font-weight: 600;
  font-size: 18px;
`;

const ModalOverview = styled.p`
  font-size: 20px;
  line-height: 1.5;
`;

const ModalUserPerc = styled.span`
  color: #46d369;
`;

export default MovieModal
