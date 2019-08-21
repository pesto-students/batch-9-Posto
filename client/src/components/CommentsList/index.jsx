import React from 'react';
import PropTypes from 'prop-types';
import Comment from '../Comment';

const CommentsList = ({ comments }) => {
  const Comments = comments.map((comment) => {
    const {
      comment: text, replies, user, _id,
    } = comment;
    return (
      <Comment
        key={comment._id}
        text={text}
        replies={replies}
        user={user}
        commentId={_id}
      />
    );
  });
  return (
    <>
      {Comments}
    </>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      replies: PropTypes.array.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        profilePic: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
      }),
    }),
  ),
};

CommentsList.defaultProps = {
  comments: [],
};

export default CommentsList;
