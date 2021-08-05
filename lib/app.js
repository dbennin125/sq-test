import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import actorsController from './controllers/actors.js';
import filmsController from './controllers/films.js';
import reviewsController from './controllers/reviews.js';
import reviewersController from './controllers/reviewers.js';
import studiosController from './controllers/studios.js';
//this imports ./models/index.js
import './models/index.js';

const app = express();

app.use(express.json());

app.use('/api/v1/actors', actorsController);
app.use('/api/v1/films', filmsController);
app.use('/api/v1/reviews', reviewsController);
app.use('/api/v1/reviewers', reviewersController);
app.use('/api/v1/studios', studiosController);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
