import React from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-autosize-textarea';
import {
  Button, Radio, Divider, Message,
} from 'semantic-ui-react';
import styles from './Post.module.css';

const Post = ({
  handlePublish, handleSave, saveDisabled, publishDisabled,
  isSaveLoading, isPublishedLoading, title, content, isPublic,
  handleTitleChange, handleContentChange, handleIsPublicChange,
}) => (
  <>
    <TextareaAutosize
      placeholder="Title"
      className={styles.title}
      value={title}
      onChange={handleTitleChange}
    />
    <Divider />
    <TextareaAutosize
      autoFocus={Boolean(content)}
      placeholder="Share your thoughts..."
      className={styles.content}
      value={content}
      onChange={handleContentChange}
    />
    <div className={styles.container}>
      <Radio
        className={styles.flexElement}
        label="Private"
        name="radioGroup"
        value="private"
        checked={!isPublic}
        onChange={handleIsPublicChange}
      />
      <Radio
        className={styles.flexElement}
        label="Public"
        name="radioGroup"
        value="public"
        checked={isPublic}
        onChange={handleIsPublicChange}
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

Post.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleContentChange: PropTypes.func.isRequired,
  handlePublish: PropTypes.func.isRequired,
  handleIsPublicChange: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  isPublic: PropTypes.bool.isRequired,
  saveDisabled: PropTypes.bool.isRequired,
  publishDisabled: PropTypes.bool.isRequired,
  isSaveLoading: PropTypes.bool.isRequired,
  isPublishedLoading: PropTypes.bool.isRequired,
};

export default Post;
