import React, { useEffect } from 'react';
import styled from 'styled-components';
import { LOGIN_KEY } from '../../common/common';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const NavBeforeLogin = ({ setIsLogin }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const handleClickLogin = () => {
    doGoogleLogin();

    setIsLogin(true);
    localStorage.setItem(LOGIN_KEY, JSON.stringify(true));
  };

  const doGoogleLogin = () => {
    const url =
      'https://accounts.google.com/o/oauth2/v2/auth?client_id=' +
      process.env.REACT_APP_GOOGLE_CLIENT_ID +
      '&redirect_uri=' +
      'http://localhost:3000' +
      '&response_type=code' +
      '&scope=email profile';

    // 구글 로그인 페이지로 리다이렉트
    window.location.href = url;
  };

  return (
    <div>
      <NavLoginButton onClick={handleClickLogin}>Login</NavLoginButton>
    </div>
  );
};

const NavLoginButton = styled.button`
  position: fixed;
  right: 40px;
  width: auto;
  height: 40px;
  padding: 9px 12px;
  border: 1px solid #f9f9f9;
  color: #f9f9f9;
  background-color: #0e0b14;
  border-radius: 0.25rem;
  cursor: pointer;
`;

export default NavBeforeLogin;
