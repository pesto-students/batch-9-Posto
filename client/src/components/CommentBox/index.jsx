import React, { useContext, useState } from 'react';
import { Form, TextArea, Button } from 'semantic-ui-react';
import GlobalContext from '../../context/GlobalContext';
import { addComment } from '../../API';
import { COMMENTS } from '../../context/constants';

const CommentBox = ({ buttonText, placeholder }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const [text, setText] = useState('');

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (!text) {
        return;
      }
      const comment = {
        comment: text,
        user: state.user.id,
        post: state.post._id,
        status: 'active',
        replies: [],
      };
      const response = await addComment(comment);
      const payload = [...state.comments, response.data.savedComment];
      dispatch({ type: COMMENTS, payload });
      setText('');
    } catch (error) {
      alert(error);
    }
  };

  const handleTextChange = (event) => {
    const { target } = event;
    setText(target.value);
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <TextArea
        rows={3}
        value={text}
        placeholder={placeholder}
        onChange={(e) => handleTextChange(e)}
        style={{ backgroundColor: '#fbfbfb', fontSize: '22px' }}
      />
      <Button style={{ marginTop: '16px' }} size="large" content={buttonText} primary />
    </Form>
  );
};

export default CommentBox;
