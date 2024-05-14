import React, { useEffect, useState } from 'react'
import NavAfterLogin from './NavAfterLogin'
import NavBeforeLogin from './NavBeforeLogin'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Nav = ({isLogin,setIsLogin}) => {
    const [show,setShow] = useState(false)
    const [searchValue,setSearchValue] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener("scroll",() => {
            if(window.scrollY > 50){
                setShow(true)
            }else{
                setShow(false)
            }
        })
        return () => {
            window.removeEventListener("scroll",()=>{});
        };
    },[])

 


  return (
    <Navigation className={`nav ${show && 'nav_black'}`}>
        <NavLogo src='https://static-assets.bamgrid.com/product/disneyplus/images/disney-plus-logo-white.3b4910ec3c8417655f6f0511d5d9244d.svg' alt='netflix-logo' className='nav_logo' onClick={()=> navigate('/')}/>
        {/* <input value={searchValue} onChange={handleChange} className='nav__input' type="text" placeholder='영화를 검색해 주세요'/>
        <img 
            alt='User logged'
            src='https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg'
            className='nav_avatar'
        /> */}
        {isLogin ? (
        <NavAfterLogin setIsLogin={setIsLogin}/>
      ) : (
        <NavBeforeLogin setIsLogin={setIsLogin}/>
      )}
    </Navigation>
  )


}

const Navigation = styled.nav`
position: fixed;
top: 0;
width: 100%;
height: 30px;
z-index: 1;
padding: 20px;
display: flex;
justify-content: space-between;
align-items: flex-start;
transition-timing-function: ease-in;
transition: all 0.5s;
background-color: ${({ show }) => (show ? 'black' : 'transparent')};
`;

const NavLogo = styled.img`
position: fixed;
left: 40px;
width: 80px;
object-fit: contain;
cursor: pointer;
`

export default Nav
