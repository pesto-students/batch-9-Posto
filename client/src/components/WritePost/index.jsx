import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-autosize-textarea';
import {
  Button, Radio, Divider, Message,
} from 'semantic-ui-react';

import { createPost } from '../../API';
import styles from './WritePost.module.css';
import { useBoolean } from '../../hooks';

const WritePost = ({
  title, content, category, onTitleChange, onContentChange,
}) => {
  const [isPublic, setIsPublic] = useBoolean(true);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isPublishedLoading, setIsPublishedLoading] = useState(false);

  const handlePublish = async () => {
    setIsPublishedLoading(true);
    const body = {
      author: '5d5d60a51930b06b21e65765',
      title,
      content,
      category,
      public: isPublic,
      published: true,
    };
    await createPost(body);
    setIsPublishedLoading(false);
  };

  const handleSave = async () => {
    setIsSaveLoading(true);
    const body = {
      author: '5d5d60a51930b06b21e65765',
      title,
      content,
      public: isPublic,
      published: false,
    };
    await createPost(body);
    setIsSaveLoading(false);
  };

  let saveDisabled = true;
  let publishDisabled = true;
  if (title && content) {
    saveDisabled = false;
  }
  if (category && title && content) {
    publishDisabled = false;
  }

  return (
    <>
      <TextareaAutosize
        placeholder="Title"
        className={styles.title}
        value={title}
        onChange={onTitleChange}
      />
      <Divider />
      <TextareaAutosize
        placeholder="Share your thoughts..."
        className={styles.content}
        value={content}
        onChange={onContentChange}
      />
      <div className={styles.container}>
        <Radio
          className={styles.flexElement}
          label="Public"
          name="radioGroup"
          value="public"
          checked={isPublic}
          onChange={setIsPublic}
        />
        <Radio
          className={styles.flexElement}
          label="Private"
          name="radioGroup"
          value="private"
          checked={!isPublic}
          onChange={setIsPublic}
        />
      </div>
      <div className={styles.container}>
        <Button
          loading={isSaveLoading}
          primary
          disabled={saveDisabled}
          className={styles.flexElement}
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          loading={isPublishedLoading}
          disabled={publishDisabled}
          className={styles.flexElement}
          positive
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

WritePost.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onContentChange: PropTypes.func.isRequired,
};

export default WritePost;
