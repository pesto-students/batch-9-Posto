const config = {};

if (process.env.NODE_ENV === 'production') {
  config.baseURL = 'https://posto-blog.herokuapp.com';
  config.headers = {
    'Content-Type': 'application/json',
  };
} else {
  config.baseURL = 'http://localhost:8080';
  config.headers = {
    'Content-Type': 'application/json',
  };
}

export default config;
