import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery, useQueryClient, useMutation } from 'react-query';

import Input from '../Input';

import { fetchAllMessages, deleteMessage } from '../../fetch/messages.fetch';
import { getActiveUser } from '../../helpers';
import {
  MessagesWrapper,
  TextBox,
  MessageBox,
  Avatar,
  Tools,
  Thumbnail,
  Container,
  InputWrapper
} from './styles';

export default function MessagesList() {
  const users = useSelector((store) => store.users);
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery('messagesData', fetchAllMessages);
  const [currentEditedMasseageId, setCurrentEditedMasseageId] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedMessageText, setEditedMessageText] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const refMessagesWrapper = useRef(null);

  const mutation = useMutation(deleteMessage, {
    onSuccess: () => {
      queryClient.invalidateQueries('messagesData');
    }
  });

  useEffect(() => {
    const activeUser = getActiveUser(users);
    setCurrentUser(activeUser);

    if (refMessagesWrapper.current) {
      refMessagesWrapper.current.scrollTop =
        refMessagesWrapper.current.scrollHeight;
    }
  }, [users, data]);

  const handleDeleteMessage = async ({ target }) => {
    const messageId = target.value;

    try {
      const deleteMessage = await mutation.mutateAsync({ messageId });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditMessage = ({ target }) => {
    const messageId = target.value;

    const editedMessage = data.messages.find(
      (message) => message.id === messageId
    );

    setEditMode((prev) => {
      if (!prev) {
        setCurrentEditedMasseageId(messageId);
        setEditedMessageText(editedMessage);
      } else {
        if (currentEditedMasseageId !== messageId) {
          window.alert('You must finish editing the message !');
          return prev;
        }
        setEditedMessageText(null);
      }
      return !prev;
    });
  };

  if (isLoading) {
    return <div>Is loading...</div>;
  }

  return (
    <Container>
      <MessagesWrapper ref={refMessagesWrapper}>
        {data.messages.map((message) => {
          return (
            <MessageBox
              key={message.id}
              active={message.id_user === currentUser.id ? true : false}
            >
              <Avatar
                src={message.avatar_url}
                alt={message.author_name}
                active={message.id_user === currentUser.id ? true : false}
              ></Avatar>
              <TextBox
                active={message.id_user === currentUser.id ? true : false}
              >
                <p>{message.author_name}</p>
                <p>{message.text_message}</p>
              </TextBox>
              {message.image_src && (
                <Thumbnail
                  src={`/images/${message.image_src}`}
                />
              )}
              <Tools>
                <p>{message.date}</p>
                <button onClick={handleEditMessage} value={message.id}>
                  Edit
                </button>
                <button onClick={handleDeleteMessage} value={message.id}>
                  Delete
                </button>
              </Tools>
            </MessageBox>
          );
        })}
      </MessagesWrapper>
      <InputWrapper>
        <Input
          idEditMode={editMode ? true : null}
          editedMessageText={editedMessageText ? editedMessageText : null}
          setEditMode={setEditMode}
        />
      </InputWrapper>
    </Container>
  );
}
