import Sequelize  from 'sequelize';
import db from '../utils/db.js';

class Studio extends Sequelize.Model {}

Studio.init(
  {
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: Sequelize.DataTypes.STRING
    },
    state: {
      type: Sequelize.DataTypes.STRING
    },
    country: {
      type: Sequelize.DataTypes.STRING
    }
  },
  {
    sequelize: db,
    modelName: 'Studio'
  }
    
);

export default Studio;

