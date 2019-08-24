import React, { useEffect, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Segment } from 'semantic-ui-react';
import PostContext from '../../Context/PostContext';
import {
  title, content, category, categoryOptions, isPublic,
} from '../../Context/constants';

import reducer from '../../Context/PostReducer';
import { getCategories } from '../../API';
import WritePost from '../../components/WritePost';
import EditPost from '../../components/EditPost';
import PreviewPost from '../../components/PreviewPost';
import CenterPost from '../../elements/CenterPost';
import PostMenu from '../../components/PostMenu';
import axiosConfig from '../../config/axiosConfig';

const CreateAndEditPost = ({ match: { params: { postId } } }) => {
  const initialState = useContext(PostContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      const options = await getCategories();
      dispatch({ type: categoryOptions, payload: options });
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (postId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`posts/${postId}`, axiosConfig);
          if (response.data.success) {
            const { post } = response.data;
            dispatch({ type: title, payload: post.title });
            dispatch({ type: content, payload: post.content });
            if (post.category) {
              dispatch({ type: category, payload: post.category });
            }
            dispatch({ type: isPublic, payload: post.public });
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
      <PostContext.Provider value={{ state, dispatch }}>
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
      </PostContext.Provider>
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
