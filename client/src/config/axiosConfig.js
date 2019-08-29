const config = {};

if (process.env.NODE_ENV === 'production') {
  config.baseURL = 'https://posto-blog.herokuapp.com';
  config.headers = {
    'Content-Type': 'application/json',
    authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
  };
} else {
  config.baseURL = 'http://localhost:8080';
  config.headers = {
    'Content-Type': 'application/json',
  };
}

export default config;
