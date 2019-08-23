import React, { useState, useEffect } from 'react';
import { Segment } from 'semantic-ui-react';

import { getCategories } from '../../API';
import WritePost from '../../components/WritePost';
import PreviewPost from '../../components/PreviewPost';
import CenterPost from '../../elements/CenterPost';
import PostMenu from '../../components/PostMenu';
import { useInput } from '../../hooks';

const New = () => {
  const [title, setTitle] = useInput('');
  const [content, setContent] = useInput('');
  const [category, setCategory] = useState('');
  const [activeTab, setActiveTab] = useState('write');
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const options = await getCategories();
      setCategoryOptions(options);
    };
    fetchData();
  }, []);

  const handleDropDown = (e, { value }) => setCategory(value);

  const handleWriteClick = () => setActiveTab('write');
  const handlePreviewClick = () => setActiveTab('preview');
  const handleHelpClick = () => setActiveTab('help');

  const DisplayContent = () => (activeTab === 'preview'
    ? <PreviewPost title={title} content={content} /> : <h1>Help</h1>);

  return (
    <>
      <CenterPost>
        <PostMenu
          activeTab={activeTab}
          value={category}
          options={categoryOptions}
          placeholder="Select post category"
          handleDropDown={handleDropDown}
          handleWriteClick={handleWriteClick}
          handlePreviewClick={handlePreviewClick}
          handleHelpClick={handleHelpClick}
        />
        <Segment attached="bottom">
          {
              activeTab === 'write'
                ? (
                  <WritePost
                    title={title}
                    content={content}
                    category={category}
                    onTitleChange={setTitle}
                    onContentChange={setContent}
                  />
                )
                : <DisplayContent />
            }
        </Segment>
      </CenterPost>
    </>
  );
};

export default New;
