import axios from 'axios';
import axiosConfig from '../config/axiosConfig';

const createPost = async (body) => {
  let response;
  try {
    response = await axios.post('posts', body, axiosConfig);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
  } catch (err) {
    console.error(err);
  }
  return response;
};

const getCategories = async () => {
  let response;
  try {
    response = await axios.get('categories', axiosConfig);
    if (response.data.success) {
      response = response.data.categories.map((categoryData) => (
        {
          key: categoryData._id,
          value: categoryData._id,
          text: categoryData.name,
        }
      ));
    } else {
      throw new Error(response.data.message);
    }
  } catch (err) {
    console.error(err);
  }
  return response;
};

export { createPost, getCategories };
