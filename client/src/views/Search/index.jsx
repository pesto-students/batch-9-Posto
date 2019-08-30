import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDebouncedCallback } from 'use-debounce';

import { fetchSearchResults } from '../../API';
import Header from '../../components/Header';
import SearBar from '../../components/SearchBar';
import CenterContainer from '../../elements/CenterContainer';
import BlogList from '../../components/BlogList';

const Search = ({ location }) => {
  const [searchText, setSearchText] = useState(location.state.text);
  const [blogs, setBlogs] = useState([]);

  const handleFetch = async () => {
    try {
      const object = {
        searchText, category: 'all', skip: 0, limit: 10,
      };
      const response = await fetchSearchResults(object);
      if (response.data.success) {
        setBlogs(response.data.results);
      } else {
        setBlogs([]);
      }
    } catch (err) {
      alert(err);
    }
  };

  const [debouncedCallback] = useDebouncedCallback(
    async () => {
      await handleFetch();
    }, 800,
  );

  const conditionallyRenderBlogs = () => {
    if (blogs.length === 0) {
      return <h4>No posts found...</h4>;
    }
    return <BlogList blogs={blogs} />;
  };

  useEffect(() => {
    debouncedCallback();
  }, [searchText]);

  return (
    <>
      <Header disabledSearchBox />
      <CenterContainer>
        <SearBar
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div
          style={{
            paddingTop: '150px',
          }}
        >
          {conditionallyRenderBlogs()}
        </div>
      </CenterContainer>
    </>
  );
};

Search.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      text: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Search;
