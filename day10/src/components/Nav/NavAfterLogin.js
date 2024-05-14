import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LOGIN_KEY } from './../../common/common';

const NavAfterLogin = ({setIsLogin}) => {
    const [searchValue,setSearchValue] = useState("")
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSearchValue(e.target.value)
        navigate(`/search?q=${e.target.value}`)
    }

    const onClickLogOut = ()=>{
        setIsLogin(false);
        localStorage.setItem(LOGIN_KEY,JSON.stringify(false));
    }

  return (
    <div>
      <NavInput value={searchValue} onChange={handleChange} className='nav__input' type="text" placeholder='영화를 검색해 주세요'/>
        <NavAvatar 
            alt='User logged'
            src='https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg'
            onClick={onClickLogOut}
        />
    </div>
  )
}

const NavAvatar = styled.img`
    position: fixed;
    right: 40px;
    width: 30px;
    object-fit: contain;
    cursor:pointer;
`

const NavInput = styled.input`
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0,0,0,0.582);
    border-radius:5px ;
    color:white;
    padding: 5px;
    border: none;
`
export default NavAfterLogin
