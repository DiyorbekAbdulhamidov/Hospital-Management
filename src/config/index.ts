const ENV = process.env;

const config = {
  api: {
    baseURL: ENV.REACT_APP_BASE_URL,
    baseURL2: ENV.REACT_APP_BASE_URL_2,
    baseURL3: ENV.REACT_APP_BASE_URL_3,
    tokensKEY: ENV.REACT_APP_TOKEN_KEY, 
  },
};

export default config;