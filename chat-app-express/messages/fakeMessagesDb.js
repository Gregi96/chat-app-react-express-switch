const { v4: uuid } = require('uuid');

const messagesData = [
  {
    id: 'qwefsa',
    id_user: 1,
    author_name: 'John Doe',
    text_message: 'Hello, how are you?',
    date: new Date().getHours() + ':' + new Date().getMinutes(),
    avatar_url: 'https://i.pravatar.cc/150?img=68',
    image_src: '1649059969219.jpg'
  },
  {
    id: 'sdasdasd',
    id_user: 2,
    author_name: 'Krystian Pach',
    text_message: 'I’m good, thanks! How about you?',
    date: new Date().getHours() + ':' + new Date().getMinutes(),
    avatar_url: 'https://i.pravatar.cc/150?img=69',
    image_src: ''
  },
  {
    id: 'asdasdas',
    id_user: 1,
    author_name: 'John Doe',
    text_message: 'Pretty good! What would you like to learn today?',
    date: new Date().getHours() + ':' + new Date().getMinutes(),
    avatar_url: 'https://i.pravatar.cc/150?img=68',
    image_src: ''
  },
  {
    id: 'sdasdase',
    id_user: 2,
    author_name: 'Krystian Pach',
    text_message: 'Well, maybe business English? What do you think?',
    date: new Date().getHours() + ':' + new Date().getMinutes(),
    avatar_url: 'https://i.pravatar.cc/150?img=69',
    image_src: '1649059987736.jpg'
  }
];

module.exports = messagesData;
