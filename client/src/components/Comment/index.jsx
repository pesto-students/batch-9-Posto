import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.css';

import {
  Container, Segment, Image, Icon,
} from 'semantic-ui-react';
import ReplyList from '../ReplyList';
import ReplyBox from '../ReplyBox';

const Comment = ({
  text, replies, user, commentId,
}) => {
  const [showReplies, setShowReplies] = useState(false);
  return (
    <>
      <Segment raised textAlign="left" className="comment-segment" onClick={() => setShowReplies(!showReplies)}>
        <span>
          <Link to="#/">
            {user.profilePic
              ? (
                <Image
                  style={{ display: 'inline', marginRight: '10px' }}
                  src={user.profilePic}
                  size="mini"
                  circular
                  alt={`${user.name} profile image`}
                />
              )
              : <Icon name="user" style={{ display: 'inline', marginRight: '10px' }} />}
            <span className="capitalize">{user.name}</span>
          </Link>
        </span>
        <Container text>
          {text}
        </Container>
      </Segment>
      {showReplies
        ? (
          <>
            <ReplyList replies={replies} />
            <ReplyBox buttonText="Reply" placeholder="Reply to the comment" commentId={commentId} />
          </>
        )
        : null}
    </>
  );
};

Comment.propType = {
  data: PropTypes.shape({
    text: PropTypes.string.isRequired,
    replies: PropTypes.array.isRequired,
    user: PropTypes.string.isRequired,
    commentId: PropTypes.string.isRequired,
  }),
};

Comment.defaultProps = {
  data: {
    text: '',
    replies: [],
  },
};

export default Comment;
