import { Router } from 'express';
import Film from '../models/Film.js';
import Review from '../models/Review.js';

export default Router()
  .post('/', async (req, res, next) => {
    Review.create(req.body)
      .then(review => res.send(review))
      .catch(next);
  })

  .get('/', async (req, res, next) => {
    Review.findAll({
      attributes: ['id', 'rating', 'review'],
      include: [{
        model: Film,
        attributes: ['id', 'title']
      }],
      order: [['rating', 'DESC']],
      limit: 100
    })
      .then(reviews => res.send(reviews))
      .catch(next);
  })

  .delete('/:id', async (req, res, next) => {
    Review.destroy({
      where: { id: req.params.id }
    })
      .then(() => res.send({ delete: 'complete' }))
      .catch(next);
  });
