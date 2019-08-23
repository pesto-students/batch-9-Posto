import axios from 'axios';
import axiosConfig from '../config/axiosConfig';

const createPost = async (body) => {
  let response;
  try {
    response = await axios.post('posts', body, axiosConfig);
    if (!response.data.success) {
      alert(response.data.message);
    }
  } catch (err) {
    return alert(err.message);
  }
  return response.data;
};

const getCategories = async () => {
  let result;
  try {
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

export { createPost, getCategories };
