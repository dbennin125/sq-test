import Sequelize  from 'sequelize';
import db from '../utils/db.js';

class Review extends Sequelize.Model {}

Review.init(
  {
    rating: {
      type: Sequelize.DataTypes.INTEGER,
      require: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    review: {
      type: Sequelize.DataTypes.STRING(140),
      allowNull: false,
    }
  },
  {
    sequelize: db,
    modelName: 'Review',
    timestamps: false
  }
);

export default Review;
