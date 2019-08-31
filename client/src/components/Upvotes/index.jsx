import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import { upvoteAPost } from '../../API';
import GlobalContext from '../../context/GlobalContext';

const Upvote = ({ upvotes, postId }) => {
  const { state } = useContext(GlobalContext);
  const [upVoted, setUpvote] = useState('downvote');
  const [color, setColor] = useState('black');
  const [localUpvote, setLocalUpvote] = useState(upvotes);

  useEffect(() => {
    const hasUserUpvoted = () => {
      const hasVoted = localUpvote.includes(state.user.id);
      setColor(hasVoted ? 'red' : 'black');
      setUpvote(hasVoted ? 'upvote' : 'downvote');
    };
    hasUserUpvoted();
  }, [localUpvote, state.user.id]);

  const handleUpvoteChange = async () => {
    try {
      const changeType = upVoted === 'downvote' ? 'upvote' : 'downvote';
      await upvoteAPost(postId, state.user.id, changeType);
      if (changeType === 'upvote') {
        setLocalUpvote([...localUpvote, state.user.id]);
      } else {
        setLocalUpvote(localUpvote.slice(0, localUpvote.length - 1));
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <Icon name="like" color={color} size="big" onClick={() => handleUpvoteChange()} />
      {localUpvote.length}
    </>
  );
};

Upvote.propTypes = {
  upvotes: PropTypes.arrayOf(
    PropTypes.string,
  ),
  postId: PropTypes.string.isRequired,
};

Upvote.defaultProps = {
  upvotes: [],
};

export default Upvote;
