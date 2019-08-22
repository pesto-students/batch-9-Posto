import React from 'react';

import { Input } from 'semantic-ui-react';

const SearchBox = () => (
  <Input
    transparent
    icon={{ name: 'search', link: true }}
    placeholder="Search Blogs..."
  />
);

export default SearchBox;
