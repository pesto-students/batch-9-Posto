import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getCategories } from '../../API';
import styles from './CategoryScrollBar.module.css';
import LoaderCentered from '../../elements/LoaderCentered/LoaderCenter';

const CategoryScrollBar = () => {
  const [categories, setCategories] = useState([]);

  // eslint-disable-next-line consistent-return
  async function fetchData() {
    try {
      const response = await getCategories();
      if (!response) {
        return alert('fetching data failed');
      }
      setCategories(response);
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
              pathname: `/category/${category.text}`,
              state: {
                categoryId: category.key,
              },
            }}
            key={category.key}
          >
            {category.text}
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
