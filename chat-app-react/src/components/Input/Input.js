import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { useQueryClient, useMutation } from 'react-query';

import {
  addMessage,
  editMessage,
  deleteMessage
} from '../../fetch/messages.fetch';

import { getActiveUser } from '../../helpers';

import imageIcon from '../../assets/icons/image-uploader-icon.svg';
import arrowIcon from '../../assets/icons/arrow-right.svg';
import { InputWrapper, EditBadge, AddImage } from './styles';

export default function Input({
  idEditMode = false,
  editedMessageText = '',
  setEditMode
}) {
  const users = useSelector((store) => store.users);
  const [textMessage, setTextMessage] = useState('');
  const inputRef = useRef(null);
  const queryClient = useQueryClient();

  const [image, setImage] = useState({ preview: '', data: '' });

  const mutation = useMutation(addMessage, {
    onSuccess: () => {
      queryClient.invalidateQueries('messagesData');
    }
  });

  const mutationDelete = useMutation(deleteMessage, {
    onSuccess: () => {
      queryClient.invalidateQueries('messagesData');
    }
  });

  const mutationEdit = useMutation(editMessage, {
    onSuccess: () => {
      queryClient.invalidateQueries('messagesData');
    }
  });

  const handleTextContent = ({ target: { value } }) => {
    setTextMessage(value);
  };

  const handleEnterPress = ({ keyCode }) => {
    if (keyCode === 13) handleSendMessage();
  };

  useEffect(() => {
    if (editedMessageText) {
      setTextMessage(editedMessageText.text_message);
      inputRef.current.focus();
    } else {
      setTextMessage('');
    }
  }, [editedMessageText]);

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0]
    };
    setImage(img);
  };

  const handleRemoveImage = () => {
    setImage({ preview: '', data: '' });
  };

  const handleSendMessage = async () => {
    const activeUser = getActiveUser(users);

    if (idEditMode) {
      const messageId = editedMessageText.id;
      if (textMessage.length === 0) {
        try {
          const deleteMessage = await mutationDelete.mutateAsync({
            messageId
          });
        } catch (error) {
          console.error(error);
        } finally {
          setEditMode();
          setTextMessage('');
          return;
        }
      }

      try {
        const editMessage = await mutationEdit.mutateAsync({
          id_user: messageId,
          text_message: textMessage
        });
      } catch (error) {
        console.error(error);
      } finally {
        setEditMode();
        setTextMessage('');
      }

      return;
    }

    if (textMessage.length > 0 || image.data) {
      try {
        const newMessage = {};

        newMessage.id_user = activeUser.id;
        newMessage.author_name = activeUser.name;
        newMessage.text_message = textMessage;
        newMessage.date = new Date().getHours() + ':' + new Date().getMinutes();
        newMessage.avatar_url = activeUser.avatar_url;
        newMessage.image = image.data;

        const addMessage = await mutation.mutateAsync(newMessage);
      } catch (error) {
        console.error(error);
      } finally {
        setTextMessage('');
        setImage({ preview: '', data: '' });
      }
    }
  };

  return (
    <InputWrapper>
      {idEditMode && <EditBadge>Edit</EditBadge>}
      {!idEditMode && (
        <AddImage>
          {image.preview && (
            <div className="uploader_image_preview--wrapper">
              <img
                className="uploader_image_preview"
                src={image.preview}
                alt="preview"
                width="100"
                height="100"
              />
              <button onClick={handleRemoveImage}>-</button>
            </div>
          )}
          <label className="uploader_button" htmlFor="image_uploader">
            <img src={imageIcon} alt="gallery icon"></img>
          </label>
          <input
            id="image_uploader"
            type="file"
            name="file"
            onChange={handleFileChange}
          ></input>
        </AddImage>
      )}

      <input
        ref={inputRef}
        type="text"
        value={textMessage}
        onChange={handleTextContent}
        onKeyDown={handleEnterPress}
        placeholder="message..."
      ></input>
      <button onClick={handleSendMessage}>
        <img src={arrowIcon} alt="arrow right icon" />
      </button>
    </InputWrapper>
  );
}
