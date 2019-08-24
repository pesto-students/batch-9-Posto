import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './index.css';
import axiosConfig from '../../config/axiosConfig';
import LoaderCentered from '../../elements/LoaderCentered/LoaderCenter';

const CategoryScrollBar = () => {
  const [categories, setCategories] = useState([]);

  // eslint-disable-next-line consistent-return
  async function fetchData() {
    try {
      const response = await axios.get('categories', axiosConfig);
      if (!response.data.success) {
        return console.error('fetching data failed');
      }
      setCategories(response.data.categories);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const renderCategories = () => {
    if (categories.length === 0) {
      return (
        <div className="loader">
          <LoaderCentered />
        </div>
      );
    }
    return (
      <div className="scrollmenu">
        {categories.map((category) => (
          <Link
            to={{
              pathname: `/category/${category.name}`,
              state: {
                categoryId: category._id,
              },
            }}
            key={category._id}
          >
            {category.name}
          </Link>
        ))}
      </div>
    );
  };

  return (
    <>
      {renderCategories()}
    </>
  );
};

export default CategoryScrollBar;
