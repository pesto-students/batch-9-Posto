import React, { useState, useEffect, lazy } from 'react';
import PropTypes from 'prop-types';
import { useDebouncedCallback } from 'use-debounce';

import { fetchSearchResults } from '../../API';
import Loader from '../../components/Loader';

const CenterContainer = lazy(() => import('../../elements/CenterContainer'));
const Header = lazy(() => import('../../components/Header'));
const SearBar = lazy(() => import('../../components/SearchBar'));
const BlogList = lazy(() => import('../../components/BlogList'));

const Search = ({ location }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState(location.state.text);
  const [blogs, setBlogs] = useState([]);

  const handleFetch = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const [debouncedCallback] = useDebouncedCallback(
    async () => {
      await handleFetch();
    }, 800,
  );

  const conditionallyRenderBlogs = () => {
    if (blogs.length === 0) {
      return <h2>No posts found...</h2>;
    }
    return <BlogList blogs={blogs} />;
  };

  useEffect(() => {
    debouncedCallback();
  }, [searchText]);

  return (
    isLoading
      ? <Loader />
      : (<>
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
    </>)
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
