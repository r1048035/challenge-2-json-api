const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Statische array als vervanging van een databank
let messages = [
  {
    _id: "66fa85b6ad5aaee2d047fa28",
    user: "pikachu",
    text: "Hi! I'm a message",
    __v: 0
  },
  {
    _id: "qsd4f56sdf456ds4f56dsf4",
    user: "pikachu",
    text: "Hi! I'm another message",
    __v: 0
  },
  {
    _id: "1",
    user: "John",
    text: "Hello",
    message: "Hello", // voor compatibiliteit met voorbeeldafbeeldingen
    __v: 0
  },
  {
    _id: "2",
    user: "Jane",
    text: "Hi",
    message: "Hi",
    __v: 0
  }
];

// Helper om ID's te genereren
const generateId = () => Math.random().toString(36).substring(2, 15);

/* ==========================================================================
   ROUTES
   ========================================================================== */

// GET /api/v1/messages OR /api/v1/messages?user=username
app.get('/api/v1/messages', (req, res) => {
  const { user } = req.query;

  if (user) {
    const filteredMessages = messages.filter(
      (m) => m.user.toLowerCase() === user.toLowerCase()
    );
    return res.status(200).json({
      status: "success",
      message: `Messages from user ${user}`,
      data: {
        messages: filteredMessages
      }
    });
  }

  return res.status(200).json({
    status: "success",
    message: "GETTING messages",
    data: {
      messages: messages
    }
  });
});

// GET /api/v1/messages/:id
app.get('/api/v1/messages/:id', (req, res) => {
  const { id } = req.params;
  const message = messages.find((m, index) => m._id === id || index.toString() === id);

  if (!message) {
    return res.status(404).json({
      status: "fail",
      message: "Message not found",
      data: null
    });
  }

  return res.status(200).json({
    status: "success",
    message: `GETTING message ${id}`,
    data: {
      message: message
    }
  });
});

// POST /api/v1/messages
app.post('/api/v1/messages', (req, res) => {
  const messageData = req.body.message || req.body;
  const { user, text } = messageData;

  if (!user || !text) {
    const errors = {};

    if (!user) {
      errors.user = "User is required";
    }
    if (!text) {
      errors.text = "Text is required";
    }

    return res.status(400).json({
      status: "fail",
      data: errors
    });
  }

  const newMessage = {
    _id: generateId(),
    user: user,
    text: text,
    __v: 0
  };

  messages.push(newMessage);

  return res.status(201).json({
    status: "success",
    message: "Message saved",
    data: {
      message: newMessage
    }
  });
});

// PUT /api/v1/messages/:id
app.put('/api/v1/messages/:id', (req, res) => {
  const { id } = req.params;
  const messageData = req.body.message || req.body;

  const index = messages.findIndex((m, idx) => m._id === id || idx.toString() === id);

  if (index === -1) {
    return res.status(404).json({
      status: "fail",
      data: {
        id: "Message not found"
      }
    });
  }

  if (messageData.text) {
    messages[index].text = messageData.text;
  }
  if (messageData.user) {
    messages[index].user = messageData.user;
  }

  return res.status(200).json({
    status: "success",
    message: "Message updated",
    data: {
      message: messages[index]
    }
  });
});

// DELETE /api/v1/messages/:id
app.delete('/api/v1/messages/:id', (req, res) => {
  const { id } = req.params;
  const index = messages.findIndex((m, idx) => m._id === id || idx.toString() === id);

  if (index === -1) {
    return res.status(404).json({
      status: "fail",
      data: {
        id: "Message not found"
      }
    });
  }

  const deletedMessage = messages.splice(index, 1)[0];

  return res.status(200).json({
    status: "success",
    message: "Message deleted",
    data: {
      message: {
        _id: deletedMessage._id
      }
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});