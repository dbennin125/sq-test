import Studio from './Studio.js';
import Film from './Film.js';
import Actor from './Actor.js';
import Review from './Review.js';
import Reviewer from './Reviewer.js';
// import Sequelize from 'sequelize';
// import db from '../utils/db.js';

Studio.hasMany(Film, { as: 'films' });
Film.belongsTo(Studio);


Film.belongsToMany(Actor, { through: 'ActorFilms' });
Actor.belongsToMany(Film, { through: 'ActorFilms' });

Film.hasMany(Review);
Review.belongsTo(Film);

Reviewer.hasMany(Review);
Review.belongsTo(Reviewer);
