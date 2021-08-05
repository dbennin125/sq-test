import db from '../lib/utils/db.js';
import request from 'supertest';
import app from '../lib/app.js';
import Actor from '../lib/models/Actor.js';
import Studio from '../lib/models/Studio.js';
import Film from '../lib/models/Film.js';
import '../lib/models';

describe('demo routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  it('POSTS an actor', async () => {
    const res = await request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Brad Pitt',
        dob: new Date(1963, 12, 18),
        pob: 'Shawnee, Oklahoma'
      });

    expect(res.body).toEqual({
      id: 1,
      name: 'Brad Pitt',
      dob: new Date(1963, 12, 18).toISOString(),
      pob: 'Shawnee, Oklahoma',
      updatedAt: expect.any(String),
      createdAt: expect.any(String),
    });
  });

  it('GET all actors', async () => {
    await Actor.create({
      name: 'Brad Pitt',
      dob: new Date(1963, 12, 18),
      pob: 'Shawnee, Oklahoma'
    });

    await Actor.create({
      name: 'Angelina Jolie',
      dob: new Date(1975, 6, 4),
      pob: 'Los Angeles, California'
    });

    const res = await request(app)
      .get('/api/v1/actors');

    expect(res.body).toEqual([{
      id: 1,
      name: 'Brad Pitt'
    },
    {
      id: 2,
      name: 'Angelina Jolie'
    }]);

  });

  it('gets an actor by id', async () => {
    const studio1 = await Studio.create({
      name: 'MGM',
      city: 'Los Angeles',
      state: 'California',
      country: 'USA'
    });

    const film = await Film.create({
      title: 'Fast & Furious',
      StudioId: studio1.id,
      released: 2017,
    });

    const actor = await Actor.create({
      name: 'Brad Pitt',
      dob: new Date(1963, 12, 18),
      pob: 'Shawnee, Oklahoma'
    });

    //magic method... exist on models that have associations, basically adding a film tied to this actor in the junction table
    await actor.addFilm(film);

    const res = await request(app)
      .get('/api/v1/actors/1');

    expect(res.body).toEqual(
      {
        name: 'Brad Pitt',
        dob: new Date(1963, 12, 18).toISOString(),
        pob: 'Shawnee, Oklahoma',
        Films: [
          {
            id: 1,
            title: 'Fast & Furious',
            released: 2017
          }]
      });
  });

  it('delete an actor', async () => {
    await Actor.create({
      name: 'Megan Fox',
      dob: new Date(1986, 5, 16).toISOString(),
      pob: 'West-Hills, California',
    });

    const res = await request(app).delete('/api/v1/actors/1');
    expect(res.body).toEqual({
      delete: 'complete'
    });
  });
});
