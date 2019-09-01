import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Input } from 'semantic-ui-react';

const SearchBox = ({ history, disabledSearchBox }) => {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    history.push('/search', { text });
  };

  const disableSearch = disabledSearchBox ? 'none' : 'block';

  return (
    <form onSubmit={handleSubmit}>
      <Input
        style={{
          display: disableSearch,
        }}
        transparent
        aria-label="search box"
        icon={{ name: 'search', link: true }}
        placeholder="Search Blogs..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  );
};

SearchBox.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  disabledSearchBox: PropTypes.bool,
};

SearchBox.defaultProps = {
  disabledSearchBox: false,
};

export default withRouter(SearchBox);
