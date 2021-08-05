import { Router } from 'express';
import Actor from '../models/Actor.js';
import Film from '../models/Film.js';
import Review from '../models/Review.js';
import Reviewer from '../models/Reviewer.js';
import Studio from '../models/Studio.js';

export default Router()
  .post('/', async (req, res, next) => {
    Film.create(req.body)
      .then(film => res.send(film))
      .catch(next);
  })

  .get('/:id', async (req, res, next) => {
    Film.findByPk(req.params.id, {
      attributes: ['title', 'released'],
      include: [{
        model: Studio,
        attributes: ['id', 'name']
      },
      {
        model: Actor,
        attributes: ['id', 'name'],
        through: { attributes: [] }
      },
      {
        model: Review,
        attributes: {
          exclude: ['ReviewerId', 'FilmId'],
        },

        include: {
          model: Reviewer,
          attributes: ['id', 'name']
        }
      }]
    })
      .then(film => res.send(film))
      .catch(next);
  })

  .get('/', async (req, res, next) => {
    Film.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: {
        model: Studio,
        attributes: ['id', 'name']
      }
    })
      .then(film => res.send(film))
      .catch(next);
  })

  .delete('/:id', async (req, res, next) => {
    Film.destroy({
      where: { id: req.params.id }
    })
      .then(() => res.send({ delete: 'complete' }))
      .catch(next);
  });

