require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '../chat-app-react/build')));

app.get('/images/:fileName', function (req, res, next) {
  const { fileName } = req.params;

  res.sendFile(path.join(__dirname, '/images', fileName));
});

// api routes
app.use('/messages', require('./messages/messages.controller'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../chat-app-react/build/index.html'));
});

// start server
// const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const port = process.env.PORT || 5000;

const server = app.listen(port, function () {
  console.log('Server listening on port ' + port);
});
