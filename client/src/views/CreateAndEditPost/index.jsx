import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Segment } from 'semantic-ui-react';
import {
  TITLE, CONTENT, CATEGORY, CATEGORY_OPTIONS, IS_PUBLIC,
} from '../../context/constants';
import GlobalContext from '../../context/GlobalContext';

import { getCategories } from '../../API';
import WritePost from '../../components/WritePost';
import EditPost from '../../components/EditPost';
import PreviewPost from '../../components/PreviewPost';
import CenterPost from '../../elements/CenterPost';
import PostMenu from '../../components/PostMenu';
import axiosConfig from '../../config/axiosConfig';

const CreateAndEditPost = ({ match: { params: { postId } } }) => {
  const { state, dispatch } = useContext(GlobalContext);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const options = await getCategories();
        dispatch({ type: CATEGORY_OPTIONS, payload: options });
      };
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  }, []);

  useEffect(() => {
    if (postId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`posts/${postId}`, axiosConfig);
          if (response.data.success) {
            const { post } = response.data;
            dispatch({ type: TITLE, payload: post.title });
            dispatch({ type: CONTENT, payload: post.content });
            if (post.category) {
              dispatch({ type: CATEGORY, payload: post.category });
            }
            dispatch({ type: IS_PUBLIC, payload: post.public });
          } else {
            alert(response.data);
          }
        } catch (err) {
          alert(err);
        }
      };
      fetchData();
    }
  }, [postId]);

  const DisplayContent = () => (state.activeTab === 'preview'
    ? <PreviewPost title={state.title} content={state.content} /> : <h1>Help</h1>);
  return (
    <CenterPost>
      <PostMenu />
      <Segment attached="bottom">
        {
          state.activeTab === 'write'
            ? postId
              ? <EditPost postId={postId} />
              : <WritePost />
            : <DisplayContent />
        }
      </Segment>
    </CenterPost>
  );
};

CreateAndEditPost.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      postId: PropTypes.string,
    }).isRequired,
  }),
};

CreateAndEditPost.defaultProps = {
  match: {
    params: {
      postId: '',
    },
  },
};

export default CreateAndEditPost;
