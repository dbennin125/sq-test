import Sequelize  from 'sequelize';
import db from '../utils/db.js';

class Reviewer extends Sequelize.Model {}

Reviewer.init(
  {
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    company: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
  },
  {
    sequelize: db,
    modelName: 'Reviewer'
  }
);

export default Reviewer;
