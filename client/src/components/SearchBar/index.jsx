/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './SearchBar.module.css';

const SearchBar = ({ value, onChange }) => (
  <div className={styles.wrap}>
    <div className={styles.search}>
      <input
        autoFocus
        value={value}
        onChange={onChange}
        type="text"
        className={styles.searchTerm}
        placeholder="What are you looking for?"
      />
      <button type="submit" className={styles.searchButton}>
        <img className={styles.image} src="https://img.icons8.com/cotton/64/000000/search--v1.png" alt="Search" />
      </button>
    </div>
  </div>
);

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBar;
