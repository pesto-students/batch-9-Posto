import axios from 'axios';
import axiosConfig from '../config/axiosConfig';

const user = JSON.parse(localStorage.getItem('user'));

function getToken() {
  if (user) {
    axiosConfig.headers.authorization = `Bearer ${user.token}`;
  }
}

const createPost = async (body) => {
  let response;
  try {
    getToken();
    response = await axios.post('posts', body, axiosConfig);
    if (!response.data.success) {
      alert(response.data.message);
    }
  } catch (err) {
    return alert(err.message);
  }
  return response.data.post._id;
};

const updatePost = async (body, postId) => {
  let response;
  try {
    getToken();
    response = await axios.put(`posts/${postId}`, body, axiosConfig);
    if (!response.data.success) {
      alert(response.data.message);
    }
  } catch (err) {
    return alert(err.message);
  }
  return response.data.post;
};

const getCategories = async () => {
  let result;
  try {
    getToken();
    const response = await axios.get('categories', axiosConfig);
    if (response && response.data && response.data.success) {
      result = response.data.categories.map((categoryData) => (
        {
          key: categoryData._id,
          value: categoryData._id,
          text: categoryData.name,
        }
      ));
    } else {
      return alert(response.data.message);
    }
  } catch (err) {
    return alert(err.message);
  }
  return result;
};

const signup = async (body) => {
  let response;
  try {
    delete axiosConfig.headers.authorization;
    response = await axios.post('auth/signup', body, axiosConfig);
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err);
  }
  return response.data.user;
};

const signin = async (body) => {
  let response;
  try {
    delete axiosConfig.headers.authorization;
    response = await axios.post('auth/signin', body, axiosConfig);
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err);
  }
  return response.data.user;
};

const getTop10Posts = async () => {
  try {
    getToken();
    const response = await axios.get('posts/top/10', axiosConfig);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

const fetchCategoryBlogs = async (params) => {
  try {
    getToken();
    const response = await axios.get(`posts?limit=${params.limit}&skip=${params.skip}&orderby=${params.orderBy}&orderType=${params.orderType}&type=${params.type}&categoryId=${params.categoryId}`, axiosConfig);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export {
  createPost, updatePost, getCategories, signup, signin, getTop10Posts, fetchCategoryBlogs,
};
