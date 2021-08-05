import db from '../lib/utils/db.js';
import request from 'supertest';
import app from '../lib/app.js';
import Film from '../lib/models/Film.js';
import Review from '../lib/models/Review.js';
import Reviewer from '../lib/models/Reviewer.js';
import Studio from '../lib/models/Studio.js';

describe('demo routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  it('POST a review', async () => {
    const studio = await Studio.create({
      name: 'MGM',
      city: 'Los Angeles',
      state: 'California',
      country: 'USA'
    });

    const film = await Film.create({
      title: 'Terminator',
      StudioId: studio.id,
      released: 1993,
    });

    const reviewer = await Reviewer.create({
      name: 'Kara Pedersen',
      company: 'Pedersens reviews',
    });

    const res = await request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 3,
        ReviewerId: reviewer.id,
        review: 'It was ok for the time period, but I like Arnold',
        FilmId: film.id
      });

    expect(res.body).toEqual({
      id: 1,
      rating: 3,
      ReviewerId: reviewer.id,
      review: 'It was ok for the time period, but I like Arnold',
      FilmId: film.id
    });
  });

  it('GET all reviews', async () => {
    const studio = await Studio.create({
      name: 'MGM',
      city: 'Los Angeles',
      state: 'California',
      country: 'USA'
    });

    const film = await Film.create({
      title: 'Terminator',
      StudioId: studio.id,
      released: 1993,
    });

    const reviewer1 = await Reviewer.create({
      name: 'Roger Ebert',
      company: 'Siskel & Ebert'
    });

    const reviewer2 = await Reviewer.create({
      name: 'Casey',
      company: 'Casey reviews'
    });

    await Review.create({
      rating: 1,
      FilmId: film.id,
      ReviewerId: reviewer1.id,
      review: 'Terminator sucks!',
    });

    await Review.create({
      rating: 5,
      FilmId: film.id,
      ReviewerId: reviewer2.id,
      review: 'Terminator is great!!!!!!',
    });

    const res = await request(app)
      .get('/api/v1/reviews');

    expect(res.body).toEqual([{
      id: 2, rating: 5, review: 'Terminator is great!!!!!!',
      Film: { id: 1, title: 'Terminator' }
    }, {
      id: 1, rating: 1, review: 'Terminator sucks!',
      Film: { id: 1, title: 'Terminator' }
    }]);
  });

  it('deletes a review', async () => {
    const studio = await Studio.create({
      name: 'MGM',
      city: 'Los Angeles',
      state: 'California',
      country: 'USA'
    });

    const film = await Film.create({
      title: 'Terminator',
      StudioId: studio.id,
      released: 1993,
    });

    const reviewer = await Reviewer.create({
      name: 'Roger Ebert',
      company: 'Siskel & Ebert'
    });

    await Review.create({
      rating: 5,
      FilmId: film.id,
      ReviewerId: reviewer.id,
      review: 'Terminator is the bomb!'
    });
    const res = await request(app).delete('/api/v1/reviews/1');
    expect(res.body).toEqual({
      delete: 'complete'
    });
  });
});
