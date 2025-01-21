import 'express-async-errors';
import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';

import { connectDB } from './db/connect';
import { errorhandlerMiddleware, notFoundMiddleware } from './middleware';
import { taskRouter } from './routes/task.router';

config();

const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(fileUpload({
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit to 10MB
  safeFileNames: true,
  preserveExtension: true,
}));

app.get('/api/v1', (req, res) => {
  res.send('API is running');
});

app.use('/api/v1/tasks', taskRouter);

app.use(notFoundMiddleware);
app.use(errorhandlerMiddleware);

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

const start = () => {
  if (!mongoUri) {
    throw new Error(
      'An error occurred while validating the MongoDB URI. Please check your environment variables',
    );
  }

  connectDB(mongoUri)
    .then(() => {
      app.listen(port, () => {
        console.log(`Server is listening on port ${ port }`);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

start();
