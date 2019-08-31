import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { getCategories } from '../../API';
import styles from './CategoryScrollBar.module.css';

const CategoryScrollBar = ({ selectedCategory }) => {
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

  const renderCategories = () => (
    <div className={styles.scrollmenu}>
      {categories.map((category) => (
        <NavLink
          className={styles.linkStyle}
          activeClassName={styles.active}
          isActive={() => selectedCategory === category.key}
          to={{
            pathname: `/category/${category.text}`,
            state: {
              categoryId: category.key,
            },
          }}
          key={category.key}
        >
          {category.text}
        </NavLink>
      ))}
    </div>
  );

  return (
    <>
      {renderCategories()}
    </>
  );
};

CategoryScrollBar.propTypes = {
  selectedCategory: PropTypes.string,
};

CategoryScrollBar.defaultProps = {
  selectedCategory: '',
};

export default CategoryScrollBar;
