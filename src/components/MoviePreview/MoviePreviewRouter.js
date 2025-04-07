import '../../css/MoviePreview/MoviePreviewRouter.css';
import MoviePreviewMain from './MoviePreviewMain.js';
import MoviePreviewView from './MoviePreviewView.js';
import MoviePreviewWrite from './MoviePreviewWrite.js';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function MoviePreviewRouter() {
  const [isAuth, setIsAuth] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // 로그인 상태 저장
  const [loading, setLoading] = useState(true);  // 로딩 상태

  useEffect(() => {
    checkAccessToken();
  }, []);  // 컴포넌트가 마운트될 때 한 번만 실행

  const checkAccessToken = () => {
    console.log('checkAccessToken(MoviePreviewRouter)');
    const token = localStorage.getItem('token');

    if (token === null) {
      console.log('토큰정보 존재하지 않음');
      setIsLoggedIn(false);  // 토큰이 없으면 로그아웃 처리
      setLoading(false);  // 로딩 상태 해제
      return;
    }

    axios({
      url: '/v1/user/access_token_info',
      method: 'get',
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then((response) => {
        console.log('checkAccessToken then(MoviePreviewRouter)');
        console.log(response);
        const time_left = response.data.expires_in;
        if (time_left > 0) {
          console.log('time remain');
          setIsLoggedIn(true);  // 로그인된 상태로 업데이트
        } else {
          setIsLoggedIn(false);  // 토큰이 만료되었으면 로그아웃 처리
          localStorage.removeItem('token');
        }
      })
      .catch((error) => {
        console.log('error');
        console.log(error);
        setIsLoggedIn(false);  // 오류가 발생하면 로그아웃 처리
      })
      .finally(() => {
        setLoading(false);  // API 호출 완료 후 로딩 상태 해제
      });
  };

  if (loading) {
    return <div>Loading...</div>;  // 로딩 중인 경우 로딩 화면을 표시
  }

  return (
    <div id="movie-preview-router">
      <Routes>
        {/* 공개된 라우트 */}
        <Route path="/list" element={<MoviePreviewMain />} />
        <Route path="/view" element={<MoviePreviewView />} />

        {/* 보호된 라우트: 인증된 사용자만 접근 가능 */}
        {isLoggedIn ? (
          <Route path="/write" element={<MoviePreviewWrite />} />
        ) : (
          <Route path="/write" element={<Navigate to="/" />} />
        )}
      </Routes>
    </div>
  );
}

export default MoviePreviewRouter;