import React, { useState, useEffect, lazy } from 'react';
import PropTypes from 'prop-types';
import { useDebouncedCallback } from 'use-debounce';

import { fetchSearchResults } from '../../API';
import Loader from '../../components/Loader';

const CenterContainer = lazy(() => import('../../elements/CenterContainer'));
const Header = lazy(() => import('../../components/Header'));
const SearchBar = lazy(() => import('../../components/SearchBar'));
const BlogList = lazy(() => import('../../components/BlogList'));

const Search = ({ location }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState(location.state ? location.state.text : '');
  const [prevSearch, setPrevSearch] = useState('');
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
    setPrevSearch(searchText);
    setIsLoading(false);
  };

  const [debouncedCallback] = useDebouncedCallback(
    async (newSearchText) => {
      if (searchText === newSearchText) {
        await handleFetch(newSearchText);
      }
    }, 800,
  );

  const conditionallyRenderBlogs = () => {
    if (blogs.length === 0) {
      return <h2>No posts found...</h2>;
    }
    return <BlogList blogs={blogs} />;
  };

  useEffect(() => {
    if (searchText !== prevSearch) {
      debouncedCallback(searchText);
    }
  }, [searchText]);

  useEffect(() => {
    if (searchText === prevSearch) {
      handleFetch(searchText);
    }
  }, []);

  return (
    isLoading
      ? <Loader />
      : (<>
      <Header disabledSearchBox />
      <CenterContainer>
        <SearchBar
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
    }),
  }).isRequired,
};

export default Search;
