export const REST_API_KEY = '2dd2c609b33cc95dd999115739fd792b';

export const REDIRECT_URI = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000/kakao'
  : 'https://stupendous-youtiao-9d82a1.netlify.app/kakao';

export const REDIRECT_URI_HOME = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000'
  : 'https://stupendous-youtiao-9d82a1.netlify.app';