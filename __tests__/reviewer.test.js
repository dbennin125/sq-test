import db from '../lib/utils/db.js';
import request from 'supertest';
import app from '../lib/app.js';
import Reviewer from '../lib/models/Reviewer.js';
import Studio from '../lib/models/Studio.js';
import Film from '../lib/models/Film.js';
import Review from '../lib/models/Review.js';

describe('demo routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  it('POSTS an reviewer', async () => {
    const res = await request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Roger Ebert',
        company: 'Siskel & Ebert'
      });

    expect(res.body).toEqual({
      id: 1,
      name: 'Roger Ebert',
      company: 'Siskel & Ebert',
      updatedAt: expect.any(String),
      createdAt: expect.any(String),
    });
  });

  it('GET all reviewers', async () => {
    await Reviewer.create({
      name: 'Roger Ebert',
      company: 'Siskel & Ebert'
    });

    await Reviewer.create({
      name: 'Gene Siskel',
      company: 'Siskel & Ebert'
    });

    const res = await request(app)
      .get('/api/v1/reviewers');

    expect(res.body).toEqual([{
      id: 1,
      name: 'Roger Ebert',
      company: 'Siskel & Ebert'
    },
    {
      id: 2,
      name: 'Gene Siskel',
      company: 'Siskel & Ebert'
    }]);
  });

  it('GETS a reviewer by id', async () => {
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

    const review = await Review.create({
      rating: 1,
      FilmId: film.id,
      ReviewerId: reviewer.id,
      review: 'Terminator sucks!',
    });

    const res = await request(app).get(`/api/v1/reviewers/${reviewer.id}`);

    expect(res.body).toEqual({
      id: 1, name: 'Kara Pedersen', company: 'Pedersens reviews',
      Reviews: [{
        id: 1, rating: 1, review: review.review,
        Film: { id: film.id, title: film.title }
      }]
    });
  });

  it('updates a reviewer via PUT', async () => {
    const reviewer = await Reviewer.create({
      name: 'Zach Gaines',
      company: 'Zachy Reviewers'
    });

    reviewer.name = 'Casey Gabriel';
    const res = await request(app).put(`/api/v1/reviewers/${reviewer.id}`).send({
      name: 'Casey Gabriel',
    });

    expect(res.body).toEqual({
      id: 1,
      name: 'Casey Gabriel',
      company: 'Zachy Reviewers',
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    });
  });

  it('does not delete a reviewer if they have reviews attached', async () => {
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

    await Review.create({
      rating: 1,
      FilmId: film.id,
      ReviewerId: reviewer.id,
      review: 'Terminator sucks!',
    });

    const res = await request(app)
      .delete('/api/v1/reviewers/1');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({
      error: 'Cannot delete'
    });
  });

  it('deletes a reviewer that has no reviews', async () => {
    await Reviewer.create({
      name: 'Kara Pedersen',
      company: 'Pedersens reviews',
    });

    const res = await request(app)
      .delete('/api/v1/reviewers/1');

    expect(res.body).toEqual({
      delete: 'complete'
    });
  });
});
