import Category from '../models/Category';

const fetchCategories = async function fetchCategories(req, res) {
  try {
    const query = {};
    const categories = await Category.find(query);
    if (Array.isArray(categories) && !categories.length) {
      return res.status(200).json({ success: false, message: 'No Categories found' });
    }
    return res.status(200).json({ success: true, message: 'Categories fetched', categories });
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Could not fetch categories', error: error.message });
  }
};

const controllerMethods = {
  fetchCategories,
};

export default controllerMethods;
