
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Header from './components/common/Header.js';
import Footer from './components/common/Footer.js';

import SearchInput from './components/common/SearchInput.js';

import Home from './components/Home/Home.js';
import Login from './components/common/Login.js';
import KakaoLoginPage from './components/common/KakaoLoginPage.js';
import SearchResult from './components/SearchResult/SearchResult.js';
import MovieViewRouter from './components/SearchResult/MovieViewRouter.js';
import MovieViewSlide from './components/SearchResult/MovieViewSlide';

import MovieRunningRouter from './components/MovieRunning/MovieRunningRouter.js';
import MovieRanking from './components/MovieRanking/MovieRanking.js';
import MoviePointReviewRouter from './components/MoviePointReview/MoviePointReviewRouter.js';
import MoviePreviewRouter from './components/MoviePreview/MoviePreviewRouter.js';
import MovieEventRouter from './components/MovieEvent/MovieEventRouter.js';
import Download from './components/download/Download.js';
import IndiTheater from './components/IndiTheater/IndiTheater.js';

import btn_top from './images/home/btn_top.png';
import React from 'react';
import { createContext } from 'react';
import { useTest } from './context/TestContext';  // useTest 훅 가져오기
import { useAuth } from './context/AuthContext';  // useAuth 훅 가져오기: AuthContext에서 로그인 상태를 관리하는 훅을 가져옵니다.

export const ThemeContext = createContext('light');  // ThemeContext 생성: 현재 테마 상태를 관리할 컨텍스트입니다. 기본값은 'light'입니다.

function App(){
    // useAuth 훅을 통해 전역 상태인 로그인 상태와 로그인 상태를 변경하는 toggleLogin 함수를 가져옵니다.
    const { isLoggedIn, toggleLogin } = useAuth();  // 전역 상태와 상태 업데이트 함수 가져오기: 로그인 상태(isLoggedIn)와 로그인/로그아웃 기능(toggleLogin)을 가져옵니다.

    return(
      <ThemeContext.Provider value='dark'>
      <div id='App'>
      <h1>로그인 여부: {isLoggedIn? 'true':'false'}</h1>
        <BrowserRouter>
          
          <Header/>
          <div id='main'>
            <SearchInput/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/search' element={<SearchResult />} />
                <Route path='/login' element={<Login />} />
                <Route path='/kakao' element={<KakaoLoginPage />} />
                <Route path='/movie/view/*' element={<MovieViewRouter/>} />
                <Route path='/movie/slide' element={<MovieViewSlide />} />
                <Route path='/movie/running/*' element={<MovieRunningRouter />} />
                <Route path='/movie/sdb/*' element={<MovieRanking />} />
                <Route path='/movie/preview/*' element={<MoviePreviewRouter/>} />
                <Route path='/movie/event/*' element={<MovieEventRouter/>} />
                <Route path='/movie/*/list.naver' element={<MoviePointReviewRouter/>} />
                <Route path='/download' element={<Download />} />
                <Route path='/movie/indi' element={<IndiTheater />} />
            </Routes> 
            <Footer/>
          </div>
          <div id="top">
                <img src={btn_top} alt='탑'/>
          </div>
         </BrowserRouter>
      </div>
      </ThemeContext.Provider>
  )
}

export default App;
