import Sequelize  from 'sequelize';
import db from '../utils/db.js';

class Actor extends Sequelize.Model {}

Actor.init(
  {
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    dob: {
      type: Sequelize.DataTypes.DATE
    },
    pob: {
      type: Sequelize.DataTypes.STRING
    }
  },
  {
    sequelize: db,
    modelName: 'Actor'
  }
    
);

export default Actor;

