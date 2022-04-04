export const fetchAllMessages = async () => {
  const response = await fetch(`/messages`);
  const data = await response.json();

  return data;
};

export const deleteMessage = async ({ messageId }) => {
  const requestOption = {
    method: 'DELETE'
  };

  const response = await fetch(
    `/messages/${messageId}`,
    requestOption
  );
  return response;
};

export const addMessage = async ({
  id_user,
  author_name,
  text_message,
  date,
  avatar_url,
  image
}) => {
  let formData = new FormData();

  formData.append('id_user', id_user);
  formData.append('author_name', author_name);
  formData.append('text_message', text_message);
  formData.append('date', date);
  formData.append('avatar_url', avatar_url);
  formData.append('file', image);

  const requestOption = {
    method: 'POST',
    body: formData
  };

  const response = await fetch(`/messages`, requestOption);
  return response;
};

export const editMessage = async ({ id_user, text_message }) => {
  const requestOption = {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      id: id_user,
      text: text_message
    })
  };

  const response = await fetch(`/messages`, requestOption);
  return response;
};
