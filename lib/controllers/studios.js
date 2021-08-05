import { Router } from 'express';
import Film from '../models/Film.js';
import Studio from '../models/Studio.js';

export default Router()
  .post('/', async (req, res, next) => {
    Studio.create(req.body)
      .then(studio => res.send(studio))
      .catch(next);
  })

  .get('/', async (req, res, next) => {
    Studio.findAll({
      attributes: ['id', 'name']
    })
      .then(studios => res.send(studios))
      .catch(next);
  })

  .get('/:id', async (req, res, next) => {
    Studio.findByPk(req.params.id, {
      attributes: {
        exclude: ['updatedAt', 'createdAt'],
      },
      include: {
        model: Film, as: 'films',
        attributes: ['id', 'title']
      }
    })
      .then(studio => res.send(studio))
      .catch(next);
  })

  .delete('/:id', async (req, res, next) => {
    Studio.destroy({
      where: { id: req.params.id }
    })
      .then(() => res.send({ delete: 'complete' }))
      .catch(next);
  });

