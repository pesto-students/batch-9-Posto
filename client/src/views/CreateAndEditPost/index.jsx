import React, { useState, useEffect, useContext, lazy } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Segment } from 'semantic-ui-react';

import {
  TITLE, CONTENT, CATEGORY, IS_PUBLIC,
} from '../../context/constants';
import GlobalContext from '../../context/GlobalContext';
import Loader from '../../components/Loader';
import { useInput } from '../../hooks/index';
import axiosConfig from '../../config/axiosConfig';

const Help = lazy(() => import('../../components/Help'));
const WritePost = lazy(() => import('../../components/WritePost'));
const EditPost = lazy(() => import('../../components/EditPost'));
const PreviewPost = lazy(() => import('../../components/PreviewPost'));
const CenterPost = lazy(() => import('../../elements/CenterPost'));
const PostMenu = lazy(() => import('../../components/PostMenu'));
const Header = lazy(() => import('../../components/Header'));

const CreateAndEditPost = ({ match: { params: { postId } } }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useInput('');
  const [content, setContent] = useInput('');
  const { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    if (postId) {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(`posts/${postId}`, axiosConfig);
          if (response.data.success) {
            const { post } = response.data;
            dispatch({ type: TITLE, payload: post.title });
            dispatch({ type: CONTENT, payload: post.content });
            if (post.category) {
              dispatch({ type: CATEGORY, payload: post.category._id });
            }
            dispatch({ type: IS_PUBLIC, payload: post.public });
          } else {
            alert(response.data);
          }
        } catch (err) {
          alert(err);
        }
        setIsLoading(false);
      };
      fetchData();
    }
  }, [postId]);

  return (
    isLoading
      ? <Loader />
      : (
        <>
          <Header />
          <CenterPost>
            {
              postId
              ? (
                <>
                    <PostMenu />
                    <Segment attached="bottom">
                      {
                        state.activeTab === 'write'
                          ? <EditPost postId={postId} />
                          : state.activeTab === 'preview'
                            ? <PreviewPost title={state.title} content={state.content} />
                            : <Help />
                      }
                    </Segment>
                </>
              )
              : (
                <>
                  <PostMenu newPost/>
                  <Segment attached="bottom">
                    {
                      state.activeTab === 'write'
                        ? <WritePost title={title} content={content} setTitle={setTitle} setContent={setContent}/>
                        : state.activeTab === 'preview'
                          ? <PreviewPost title={title} content={content} />
                          : <Help />
                    }
                  </Segment>
                </>
              )
            }
          </CenterPost>
        </>
      )
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
