const express = require('express');
const router = express.Router();
const messagesService = require('./messages.service');
const upload = require('../services/uploader');

const { response } = require('express');

router.get('/', messagesService.getMessages);
router.delete('/:id', deleteMessage);
router.post('/', upload.single('file'), addMessage);
router.put('/', updateMessage);

function addMessage(req, res, next) {
  let fileName = '';

  if (req.file) {
    fileName = req.file.filename;
  }

  const { id_user, author_name, text_message, date, avatar_url } = req.body;

  messagesService
    .addMessage(
      Number(id_user),
      author_name,
      text_message,
      date,
      avatar_url,
      fileName
    )
    .then((response) => {
      if (response.status === 201) {
        res.status(201).json(response.messagesData);
      }
      if (response.status === 400) {
        res.status(400).json({ message: response.message });
      }
      if (response.status === 409) {
        res.status(409).json({ message: response.message });
      }
    });
}

function deleteMessage(req, res, next) {
  const { id } = req.params;

  messagesService
    .deleteMessage(id)
    .then((response) => {
      if (response.status === 404) {
        res.status(404).json({ message: response.message });
      } else if (response.status === 200) {
        res.status(200).end();
      }
    })
    .catch((err) =>
      response.status(500).json({ err, message: 'Something went wrong' })
    );
}

function updateMessage(req, res, next) {
  const { id, text } = req.body;
  messagesService.updateMessage(id, text).then((response) => {
    if (response.status === 200) {
      res.status(response.status).json(response.messagesData);
    }

    if (response.status === 404) {
      res.status(response.status).json({ message: response.message });
    }

    if (response.status === 500) {
      res.status(response.status).json({
        message: response.message
      });
    }
  });
}

module.exports = router;
