import { Router } from 'express';
import Film from '../models/Film.js';
import Review from '../models/Review.js';
import Reviewer from '../models/Reviewer.js';

export default Router()
  .post('/', async (req, res, next) => {
    Reviewer.create(req.body)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .get('/', async (req, res, next) => {
    Reviewer.findAll({
      attributes: ['id', 'name', 'company']
    })
      .then(reviewers => res.send(reviewers))
      .catch(next);
  })

  .get('/:id', async (req, res, next) => {
    Reviewer.findByPk(req.params.id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: {
        model: Review,
        attributes: {
          exclude: ['ReviewerId', 'FilmId'],
        },
        include: {
          model: Film,
          attributes: ['id', 'title']
        }
      }
    })
      .then(reviews => res.send(reviews))
      .catch(next);
  })

  .put('/:id', async (req, res, next) => {
    Reviewer.update(req.body, {
      where: {
        id: req.params.id
      }, returning: true
    })
      .then(([, reviewer]) => res.send(reviewer[0]))
      .catch(next);
  })

  .delete('/:id', async (req, res, next) => {
    const reviewer = await Reviewer.findByPk(req.params.id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: {
        model: Review,
        attributes: {
          exclude: ['ReviewerId', 'FilmId'],
        },
        include: {
          model: Film,
          attributes: ['id', 'title']
        }
      }
    });

    if (reviewer.toJSON().Reviews.length <= 0) {
      Reviewer.destroy({
        where: { id: req.params.id }
      }).then(() => res.send({ delete: 'complete' }))
        .catch(next);
    } else {
      res.status(500);
      res.send({ error: 'Cannot delete' });
    }
  });
