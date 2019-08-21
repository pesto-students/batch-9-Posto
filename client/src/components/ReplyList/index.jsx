import React from 'react';
import PropTypes from 'prop-types';
import Reply from '../Reply';

const ReplyList = ({ replies }) => {
  const RepliesDiv = replies.map((reply) => (<Reply key={reply._id} data={reply} />));
  return (
    <>
      {RepliesDiv}
    </>
  );
};

ReplyList.propType = {
  replies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      reply: PropTypes.string.isRequired,
      user: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        profilePic: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
    }),
  ),
};

ReplyList.defaultProps = {
  replies: [],
};

export default ReplyList;
