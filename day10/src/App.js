import './App.css';
import { Outlet, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import { useState } from 'react';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer';
import Banner from './components/Banner';
import { LOGIN_KEY } from './common/common';
import MainPage from './components/MainPage/MainPage';
import SearchPage from './components/SearchPage/SearchPage';
import DetailPage from './components/DetailPage/DetailPage';

const Layout = ({ isLogin, setIsLogin }) => {
  return (
    <div>
      <Nav isLogin={isLogin} setIsLogin={setIsLogin} />
      <Outlet />
      {isLogin ? <Footer /> : null}
    </div>
  );
};

function App() {
  const [isLogin, setIsLogin] = useState(() => {
    return localStorage.getItem(LOGIN_KEY)
      ? JSON.parse(localStorage.getItem(LOGIN_KEY))
      : false;
  });
  return (
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={<Layout isLogin={isLogin} setIsLogin={setIsLogin} />}
        >
          {isLogin ? (
            <>
              <Route path='/' element={<MainPage />} />
              <Route path='search' element={<SearchPage />} />
              <Route path=':movieId' element={<DetailPage />} />
            </>
          ) : (
            <Route path='/' element={<Home />} />
          )}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
