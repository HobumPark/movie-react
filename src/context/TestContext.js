import React, { createContext, useState, useContext } from 'react';

// 1. 컨텍스트 만들기
export const TestContext = createContext();

// 2. Provider 컴포넌트 만들기
export const TestProvider = ({ children }) => {
  const [globalTestValue, setGlobalTestValue] = useState('변경됨');  // 전역 상태

  const updateTestValue = (newValue) => {
    setGlobalTestValue(newValue);  // 상태 업데이트 함수
  };

  return (
    <TestContext.Provider value={{ globalTestValue, updateTestValue }}>
        {children}
    </TestContext.Provider>
  );
};

// 3. 커스텀 훅을 만들어서 하위 컴포넌트들이 쉽게 상태를 가져다 쓸 수 있도록 함
export const useTest = () => {
  return useContext(TestContext);
};