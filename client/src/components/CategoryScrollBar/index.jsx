import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import styles from './CategoryScrollBar.module.css';
import axiosConfig from '../../config/axiosConfig';
import LoaderCentered from '../../elements/LoaderCentered/LoaderCenter';

const CategoryScrollBar = (props) => {
  const [categories, setCategories] = useState([]);

  // eslint-disable-next-line consistent-return
  async function fetchData() {
    try {
      const response = await axios.get('categories', axiosConfig);
      if (!response.data.success) {
        return alert('fetching data failed');
      }
      setCategories(response.data.categories);
    } catch (err) {
      alert(err.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const renderCategories = () => {
    if (categories.length === 0) {
      return (
        <div className={styles.loader}>
          <LoaderCentered />
        </div>
      );
    }
    return (
      <div className={styles.scrollmenu}>
        {categories.map((category) => (
          <Link
            className={styles.linkStyle}
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
