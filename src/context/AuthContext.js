import React, { createContext, useState, useContext } from 'react';

// 1. 컨텍스트 만들기
// AuthContext를 생성합니다. 이 컨텍스트는 로그인 상태와 상태 업데이트 함수를 관리하는데 사용됩니다.
export const AuthContext = createContext();  // 새로운 Context 객체를 만듭니다. 하위 컴포넌트에서 이 상태를 공유할 수 있게 합니다.

// 2. Provider 컴포넌트 만들기
// AuthProvider는 하위 컴포넌트들에 로그인 상태를 공급하는 역할을 합니다.
export const AuthProvider = ({ children }) => {
  // 로그인 상태를 관리하는 state 훅
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // 초기 상태는 false, 로그인 여부를 관리합니다.
  const [userName, setUserName] = useState('');

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userName, setUserName }}>
      {/* Provider 컴포넌트를 통해 자식 컴포넌트들이 로그인 상태에 접근할 수 있게 합니다. */}
      {children}  {/* 하위 컴포넌트들이 이 Provider로 감싸지면, 이 컴포넌트들은 AuthContext를 통해 로그인 상태를 사용 가능합니다. */}
    </AuthContext.Provider>
  );
};

// 3. 간단한 커스텀 훅을 만들어서 하위 컴포넌트들이 쉽게 상태를 가져다 쓸 수 있도록 함
// useAuth 훅을 통해 하위 컴포넌트들이 AuthContext에 접근하여 로그인 상태와 상태 업데이트 함수를 쉽게 사용할 수 있게 합니다.
export const useAuth = () => {
  return useContext(AuthContext);  // useContext를 사용해서 AuthContext를 가져옵니다.
};