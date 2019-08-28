import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-autosize-textarea';
import {
  Button, Radio, Divider, Message,
} from 'semantic-ui-react';
import GlobalContext from '../../context/GlobalContext';
import {
  TITLE, CONTENT, IS_PUBLIC,
} from '../../context/constants';
import styles from './Post.module.css';

const Post = ({
  handlePublish, handleSave, saveDisabled, publishDisabled, isSaveLoading, isPublishedLoading,
}) => {
  const { state, dispatch } = useContext(GlobalContext);

  const onTitleChange = (event) => dispatch({ type: TITLE, payload: event.target.value });
  const onContentChange = (event) => dispatch({ type: CONTENT, payload: event.target.value });
  const onPublicChange = () => dispatch({ type: IS_PUBLIC, payload: !state.isPublic });

  return (
    <>
      <TextareaAutosize
        placeholder="Title"
        className={styles.title}
        value={state.title}
        onChange={onTitleChange}
      />
      <Divider />
      <TextareaAutosize
        placeholder="Share your thoughts..."
        className={styles.content}
        value={state.content}
        onChange={onContentChange}
      />
      <div className={styles.container}>
        <Radio
          className={styles.flexElement}
          label="Private"
          name="radioGroup"
          value="private"
          checked={!state.isPublic}
          onChange={onPublicChange}
        />
        <Radio
          className={styles.flexElement}
          label="Public"
          name="radioGroup"
          value="public"
          checked={state.isPublic}
          onChange={onPublicChange}
        />
      </div>
      <div className={styles.container}>
        <Button
          primary
          loading={isSaveLoading}
          disabled={saveDisabled}
          className={styles.flexElement}
          onClick={handleSave}
        >
            Save
        </Button>
        <Button
          positive
          loading={isPublishedLoading}
          disabled={publishDisabled}
          className={styles.flexElement}
          onClick={handlePublish}
        >
            Publish
        </Button>
      </div>
      {
          publishDisabled
            ? (
              <div className={styles.container}>
                <Message className={styles.warn} warning>
                  Fill in Title, Content and Category before you can publish.
                </Message>
              </div>
            )
            : null
        }
    </>
  );
};

Post.propTypes = {
  handlePublish: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  saveDisabled: PropTypes.bool.isRequired,
  publishDisabled: PropTypes.bool.isRequired,
  isSaveLoading: PropTypes.bool.isRequired,
  isPublishedLoading: PropTypes.bool.isRequired,
};

export default Post;
