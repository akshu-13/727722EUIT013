export const ACCESS_TOKEN_KEY = 'accessToken';

export const setAccessToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const initializeAuth = () => {
  const jwtToken = import.meta.env.VITE_API_TOKEN;
  if (!jwtToken) {
    console.error('VITE_API_TOKEN is not defined in .env');
    return;
  }
  setAccessToken(jwtToken);
};
