import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import GlobalContext from '../../context/GlobalContext';
import styles from './CategoryScrollBar.module.css';

const CategoryScrollBar = ({ selectedCategory }) => {
  const { state } = useContext(GlobalContext);

  const renderCategories = () => (
    <div className={styles.scrollmenu}>
      {state.categoryOptions.map((category) => (
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
