import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Image, Icon, Segment,
} from 'semantic-ui-react';

const PostAuthorDetails = ({ post }) => {
  const date = new Date(post.createdAt);
  const { author } = post;
  const [readTime, setReadTime] = useState(0);
  const formattedDate = Intl.DateTimeFormat('en-us', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }).format(date);
  const divider = ' | ';

  useEffect(() => {
    const calculateReadTime = async () => {
      const { content } = post;
      const wordLength = content.split(' ').length;
      const avgReadPerMinute = 150;
      const minutes = wordLength / avgReadPerMinute;
      if (minutes < 1) {
        return setReadTime(1);
      }
      const seconds = (minutes % 1) * 0.60;
      if (seconds > 0.30) {
        return setReadTime(Math.ceil(minutes));
      }
      return setReadTime(Math.floor(minutes));
    };
    calculateReadTime();
  }, [post]);

  return (
    <Segment>
      <span>
        <a href="#/">
          {author.profilePic
            ? (
              <Image
                style={{ display: 'inline', marginRight: '10px' }}
                src={author.profilePic}
                size="mini"
                circular
                alt={`${author.name} profile image`}
              />
            )
            : <Icon name="user" style={{ display: 'inline', marginRight: '10px' }} />}
          <span>{author.name}</span>
        </a>
      </span>
      <span>
        <time dateTime={post.createdAt}>{divider + formattedDate}</time>
      </span>
      <span className="read-time">{`${divider} ${readTime} ${readTime > 1 ? ' minutes' : ' minute'} read`}</span>
    </Segment>
  );
};

PostAuthorDetails.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      profilePic: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
    category: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    createdAt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    upvotes: PropTypes.array.isRequired,
    views: PropTypes.array.isRequired,
  }),
};

PostAuthorDetails.defaultProps = {
  post: {},
};

export default PostAuthorDetails;
