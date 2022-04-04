const { v4: uuid } = require('uuid');
const fs = require('fs');

module.exports = {
  getMessages,
  deleteMessage,
  addMessage,
  updateMessage
};

const messagesData = require('./fakeMessagesDb');

async function addMessage(
  id_user,
  author_name,
  text_message,
  date,
  avatar_url,
  fileName
) {
  try {
    if (!id_user || !author_name || !date) {
      return {
        status: 400,
        message: 'Not all dates was provided'
      };
    }

    const newMessage = {
      id: uuid(),
      id_user,
      author_name,
      text_message,
      date,
      avatar_url,
      image_src: fileName
    };

    messagesData.push(newMessage);
    return {
      status: 201,
      messagesData: messagesData
    };
  } catch (error) {
    return {
      status: 501,
      error,
      message: 'Something went wrong'
    };
  }
}

async function getMessages(req, res, next) {
  try {
    res.status(200).json({
      messages: messagesData
    });
  } catch (err) {
    res.status(500).json({
      err,
      message: 'Something went wrong'
    });
  }
}

async function deleteMessage(id) {
  const indexItemToDelete = messagesData.findIndex(
    (message) => message.id === id
  );

  if (indexItemToDelete === -1) {
    return { status: 404, message: 'No message found with this id' };
  }

  const findMessage = messagesData.find((message) => message.id === id);

  if (findMessage.image_src.length > 0) {
    fs.unlinkSync(`images/${findMessage.image_src}`);
  }

  messagesData.splice(indexItemToDelete, 1);
  return { status: 200, message: 'ok' };
}

async function updateMessage(id, text) {
  try {
    if (!id || !text) {
      return {
        status: 404,
        message: 'Not all date was provided'
      };
    }

    const findMessage = messagesData.find((message) => message.id === id);
    const indexMessageToUpdate = messagesData.findIndex(
      (message) => message.id === id
    );

    if (!findMessage && indexMessageToUpdate === -1) {
      return { status: 404, message: 'No message found with this id' };
    }

    const updatedMessage = {
      ...findMessage,
      text_message: text
    };

    messagesData.splice(indexMessageToUpdate, 1, updatedMessage);
    return {
      status: 200,
      message: 'Updated message',
      messagesData: messagesData
    };
  } catch (error) {
    return { status: 500, message: 'No message found with this id' };
  }
}
