//fill in after actor and reviewer (or reviews?)
import Sequelize from 'sequelize';
import db from '../utils/db.js';

class Film extends Sequelize.Model {}

Film.init(
  {
    title: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    released: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: 'Film'

  }
);

export default Film;
