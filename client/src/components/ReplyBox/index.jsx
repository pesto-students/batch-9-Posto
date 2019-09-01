import React, { useContext, useState } from 'react';
import { Form, TextArea, Button } from 'semantic-ui-react';
import GlobalContext from '../../context/GlobalContext';
import { addReply } from '../../API';
import { COMMENTS } from '../../context/constants';

const ReplyBox = ({ buttonText, placeholder, commentId }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const [text, setText] = useState('');
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (!text) {
        return;
      }
      const reply = {
        reply: text,
        user: state.user.id,
      };
      const response = await addReply(reply, commentId, state.post._id);
      const comments = state.comments.map((comment) => {
        if (comment._id === commentId) {
          comment.replies = [...comment.replies, response.data.savedReply];
        }
        return comment;
      });
      const payload = comments;
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
        style={{ marginLeft: '15%', width: '85%', backgroundColor: 'gainsboro' }}
        textAlign="left"
        rows={3}
        value={text}
        placeholder={placeholder}
        onChange={(e) => handleTextChange(e)}
      />
      <Button style={{ marginTop: '16px', marginLeft: '15%' }} content={buttonText} primary />
    </Form>
  );
};

export default ReplyBox;
