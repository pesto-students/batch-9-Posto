import React from 'react';
import {
  Segment, Container, Image, Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Reply = ({ data }) => {
  const { user } = data;
  return (
    <Segment style={{ width: '90%' }} floated="right" textAlign="left" raised>
      <span>
        <a href="#/">
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
          <span>{user.name}</span>
        </a>
      </span>
      <Container text textAlign="left">
        {data.reply}
      </Container>
    </Segment>
  );
};

Reply.propType = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    reply: PropTypes.string.isRequired,
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      profilePic: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }),
};

Reply.defaultProps = {
  data: {},
};

export default Reply;
