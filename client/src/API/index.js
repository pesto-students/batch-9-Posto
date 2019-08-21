import axios from 'axios';
import axiosConfig from '../config/axiosConfig';

const user = JSON.parse(localStorage.getItem('user'));

function getToken() {
  if (user) {
    axiosConfig.headers.authorization = `Bearer ${user.token}`;
  }
}

const createPost = async (body) => {
  try {
    getToken();
    const response = await axios.post('posts', body, axiosConfig);
    return response.data.post._id;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err);
  }
};

const updatePost = async (body, postId) => {
  try {
    getToken();
    const response = await axios.put(`posts/${postId}`, body, axiosConfig);
    return response.data.post;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err);
  }
};

const getCategories = async () => {
  try {
    getToken();
    let result;
    const response = await axios.get('categories', axiosConfig);
    if (response && response.data && response.data.success) {
      result = response.data.categories.map((categoryData) => (
        {
          key: categoryData._id,
          value: categoryData._id,
          text: categoryData.name,
        }
      ));
    }
    return result;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err);
  }
};

const signup = async (body) => {
  try {
    delete axiosConfig.headers.authorization;
    const response = await axios.post('auth/signup', body, axiosConfig);
    return response.data.user;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err);
  }
};

const signin = async (body) => {
  try {
    delete axiosConfig.headers.authorization;
    const response = await axios.post('auth/signin', body, axiosConfig);
    return response.data.user;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err);
  }
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

const fetchSearchResults = async ({
  searchText, category, skip, limit,
}) => {
  try {
    const body = {
      term: searchText,
      category,
      skip,
      limit,
    };
    getToken();
    const response = await axios.post('/posts/search', body, axiosConfig);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

const fetchUserPosts = async ({
  limit, skip, orderBy, orderType, type, userId,
}) => {
  try {
    getToken();
    const response = await axios.get(`posts?limit=${limit}&skip=${skip}&orderby=${orderBy}&orderType=${orderType}&type=${type}&userId=${userId}`, axiosConfig);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

const upvoteAPost = async (postId, userId, type) => {
  let response;
  try {
    response = await axios.patch(`${axiosConfig.baseURL}/posts/${postId}/${type}`, { userId }, axiosConfig);
  } catch (err) {
    throw new Error(err);
  }
  return response;
};

const addComment = async (comment) => {
  let response;
  try {
    response = await axios.post(`${axiosConfig.baseURL}/posts/${comment.post}/comments`, comment, axiosConfig);
  } catch (err) {
    throw new Error(err);
  }
  return response;
};

const addReply = async (reply, commentId, postId) => {
  let response;
  try {
    response = await axios.post(`${axiosConfig.baseURL}/posts/${postId}/comments/${commentId}/replies`, reply, axiosConfig);
  } catch (err) {
    throw new Error(err);
  }
  return response;
};

export {
  fetchUserPosts,
  createPost,
  updatePost,
  getCategories,
  signup,
  signin,
  getTop10Posts,
  fetchCategoryBlogs,
  fetchSearchResults,
  upvoteAPost,
  addComment,
  addReply,
};
