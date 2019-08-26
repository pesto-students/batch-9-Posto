import { ObjectId } from 'mongodb';

const createCategories = () => {
  const categories = [
    { _id: '', name: 'Art' },
    { _id: '', name: 'Books' },
    { _id: '', name: 'Food' },
    { _id: '', name: 'Fitness' },
    { _id: '', name: 'Travel' },
    { _id: '', name: 'Politics' },
    { _id: '', name: 'News' },
    { _id: '', name: 'Business' },
    { _id: '', name: 'Movies' },
    { _id: '', name: 'Entertainment' },
  ];
  for (let i = 0; i < 10; i += 1) {
    categories[i]._id = ObjectId();
  }
  return categories;
};

export default createCategories;
