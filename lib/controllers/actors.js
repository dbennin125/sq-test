import { Router } from 'express';
import Actor from '../models/Actor.js';
import Film from '../models/Film.js';

export default Router()
  .post('/', async (req, res, next) => {
    Actor.create(req.body)
      .then(actor => res.send(actor))
      .catch(next);
  })

  .get('/', async (req, res, next) => {
    Actor.findAll({
      attributes: ['id', 'name']
    })
      .then(actors => res.send(actors))
      .catch(next);
  })

  .get('/:id', async (req, res, next) => {
    Actor.findByPk(req.params.id, {
      attributes: {
        //don't want to return any of this stuff, including the actual actors id,
        exclude: ['createdAt', 'updatedAt', 'id']
      },
      include: [{
        model: Film,
        through: {
          //sequelize returns data from through (junction) table by default, set through atr. to empty array prevents this
          attributes: []
        },
        attributes: ['id', 'released', 'title']
      }]
    })
      .then(actor => res.send(actor))
      .catch(next);
  })

  .delete('/:id', async (req, res, next) => {
    Actor.destroy({
      where: { id: req.params.id }
    })
      .then(() => res.send({ delete: 'complete' }))
      .catch(next);
  });

