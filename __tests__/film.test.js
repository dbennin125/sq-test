
import db from '../lib/utils/db.js';
import request from 'supertest';
import app from '../lib/app.js';
import Studio from '../lib/models/Studio.js';
import Film from '../lib/models/Film.js';
import Actor from '../lib/models/Actor.js';
import Review from '../lib/models/Review.js';
import Reviewer from '../lib/models/Reviewer.js';

describe('demo routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  it('POSTS a film', async () => {
    const studio = await Studio.create({
      name: 'MGM',
      city: 'Los Angeles',
      state: 'California',
      country: 'USA'
    });

    const res = await request(app)
      .post('/api/v1/films')
      .send({
        title: 'Fast & Furious',
        StudioId: studio.id,
        released: 2017,
      });

    expect(res.body).toEqual({
      id: 1,
      title: 'Fast & Furious',
      //change StudioId: back to studio:
      StudioId: 1,
      released: 2017,
      updatedAt: expect.any(String),
      createdAt: expect.any(String)
    });
  });

  it('GETS a film by id', async () => {
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

    const actor = await Actor.create({
      name: 'Arnold',
      dob: new Date(1957, 12, 18),
      pob: 'Vienna, Austria'
    });

    const reviewer = await Reviewer.create({
      name: 'Roger Ebert',
      company: 'Siskel & Ebert'
    });

    const review = await Review.create({
      rating: 1,
      FilmId: film.id,
      ReviewerId: reviewer.id,
      review: 'Terminator sucks!',
    });
    
    await actor.addFilm(film);

    const res = await request(app)
      .get(`/api/v1/films/${film.id}`);

    expect(res.body).toEqual({
      title: film.title,
      released: 1993,
      Studio: { id: studio.id, name: studio.name },
      Actors: [{ id: actor.id, name: actor.name }],
      Reviews: [{
        id: review.id,
        rating: review.rating,
        review: review.review,
        Reviewer: { id: reviewer.id, name: reviewer.name }
      }]
    });
  });

  it('GETs all films with studio, studio id & studio name', async () => {
    const studio1 = await Studio.create({
      name: 'MGM',
      city: 'Los Angeles',
      state: 'California',
      country: 'USA'
    });

    const studio2 = await Studio.create({
      name: 'MGV',
      city: 'Lost',
      state: 'Oregon',
      country: 'USA'
    });

    await Film.create({
      title: 'Fast & Furious',
      StudioId: studio1.id,
      released: 2017,
    });

    await Film.create({
      title: 'Slow & Furious',
      StudioId: studio2.id,
      released: 2017,
    });

    const res = await request(app).get('/api/v1/films/');

    expect(res.body).toEqual([
      {
        id: 1, title: 'Fast & Furious',
        released: 2017,
        Studio: { id: studio1.id, name: studio1.name },
        StudioId: 1,
      },
      {
        id: 2, title: 'Slow & Furious',
        released: 2017,
        Studio: { id: studio2.id, name: studio2.name },
        StudioId: 2,
      }],
    );
  });

  it('deletes a film', async () => {
    const studio = await Studio.create({
      name: 'MGM',
      city: 'Los Angeles',
      state: 'California',
      country: 'USA'
    });
    
    await Film.create({
      title: 'The Notebook',
      StudioId: studio.id,
      released: 2007
    });

    const res = await request(app).delete('/api/v1/films/1');
    expect(res.body).toEqual({ delete: 'complete' });
  });
});

