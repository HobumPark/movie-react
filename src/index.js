import React from 'react'; // React 라이브러리를 가져옵니다. JSX 구문을 사용하기 위해 필요합니다.
import ReactDOM from 'react-dom/client'; // ReactDOM 라이브러리를 가져옵니다. 리액트 앱을 HTML에 렌더링할 때 사용합니다.
import './index.css'; // 글로벌 스타일을 설정한 CSS 파일을 가져옵니다. 애플리케이션의 기본 스타일을 적용합니다.
import App from './App'; // 앱의 주요 컴포넌트를 가져옵니다.
import reportWebVitals from './reportWebVitals'; // 성능 측정 기능을 위한 파일입니다. 웹 성능 측정을 위한 코드입니다.

import { TestProvider } from './context/TestContext';  // TestProvider를 가져와서 테스트 관련 데이터를 관리하는 컨텍스트를 제공합니다.
import { AuthProvider } from './context/AuthContext';  // AuthProvider를 가져와서 로그인 상태 관련 데이터를 관리하는 컨텍스트를 제공합니다.
import { CookiesProvider } from 'react-cookie';  // react-cookie 라이브러리에서 제공하는 CookiesProvider를 가져옵니다.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>  {/* 쿠키를 관리하기 위한 CookiesProvider로 감쌉니다. */}
    <AuthProvider>  {/* 로그인 상태와 인증 관련 상태를 관리하는 AuthProvider로 앱을 감쌉니다. */}
      {/* <TestProvider> 앱에서 테스트 관련 데이터도 같이 관리하려면 주석을 해제하고 사용하세요. */}
      <App />  {/* App 컴포넌트를 렌더링합니다. 이 컴포넌트가 애플리케이션의 주요 뷰를 담당합니다. */}
    </AuthProvider>
  </CookiesProvider>
);

reportWebVitals();
