import express from 'express';
import messagesRouter from './routes/api/v1/messages.js';

const app = express();
const port = 3000;

app.use("/api/v1/messages", messagesRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
