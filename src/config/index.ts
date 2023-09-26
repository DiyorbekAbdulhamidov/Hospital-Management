const ENV = process.env

const config = {
  api: {
    baseURL: ENV.REACT_APP_BASE_URL,
    tokensKEY: ENV.REACT_APP_TOKENS_KEY
  },
}

export default config;