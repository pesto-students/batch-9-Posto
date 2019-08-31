import React, { useEffect, lazy, useContext, useState } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { POST, COMMENTS } from '../../context/constants';
import axiosConfig from '../../config/axiosConfig';
import GlobalContext from '../../context/GlobalContext';
import Loader from '../../components/Loader';

const Markdown = lazy(() => import('../../components/Markdown'));
const Title = lazy(() => import('../../components/Title'));
const PostAuthorDetails = lazy(() => import('../../components/PostAuthorDetails'));
const CommentBox = lazy(() => import('../../components/CommentBox'));
const CommentsList = lazy(() => import('../../components/CommentsList'));
const Upvote = lazy(() => import('../../components/Upvotes'));

const Post = ({ match: { params: { postId } } }) => {
    const { state, dispatch } = useContext(GlobalContext);
    const [isLoading, setIsLoading] = useState(true);

    
    useEffect(() => {
      const fetchPost = async () => {
        setIsLoading(true);
        return axios.get(`posts/${postId}`, axiosConfig);
      };
  
      const fetchComments = async () => {
        setIsLoading(true);
        return axios.get(`posts/${postId}/comments`, axiosConfig);
      };
      axios.all([fetchPost(), fetchComments()])
        .then(axios.spread(function (postResponse, commentResponse) {
          dispatch({ type: POST, payload: postResponse.data.post || {} });
          dispatch({ type: COMMENTS, payload: commentResponse.data.comments || [] });
          setIsLoading(false);
        }));
    }, [postId]);

    return (
        isLoading ? <Loader /> :
            <Grid textAlign="center">
                <Grid.Column textAlign="center" mobile={16} tablet={16} computer={8}>
                    <Grid.Row>
                        <Segment>
                            <Title as="h1">{state.post.title}</Title>
                            <PostAuthorDetails post={state.post} />
                            <Markdown source={state.post.content} />
                            <Upvote upvotes={state.post.upvotes} postId={state.post._id} />
                        </Segment>
                        <Segment>
                            <CommentBox buttonText='Submit' placeholder='Add to the discussion' />
                        </Segment>
                    </Grid.Row>
                    {state.post && state.post.title && state.comments && state.comments.length ?
                        <Grid.Row>
                            <Segment>
                                <CommentsList comments={state.comments} />
                            </Segment>
                        </Grid.Row> : null}
                </Grid.Column>
            </Grid>
    );
}

Post.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            postId: PropTypes.string,
        }).isRequired,
    }),
};

Post.defaultProps = {
    match: {
        params: {
            postId: '',
        },
    },
};

export default Post;