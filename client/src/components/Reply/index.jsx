import React from 'react';
import {
  Segment, Container, Image, Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Reply = ({ data }) => {
  const { user } = data;
  return (
    <Segment style={{ marginLeft: '15%', width: '85%' }} textAlign="left">
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
          <span style={{ fontWeight: 'bolder', fontSize: '18px' }} className="capitalize">{user.name}</span>
        </Link>
      </span>
      <Container style={{ padding: '15px 35px 0px 40px', fontSize: '20px', lineHeight: '26px' }}>
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
