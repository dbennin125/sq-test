import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';
// dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false
}
);

//disables all the sql query logging ^^

// , {
//     logging: false
//   }



// async function run () {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }

// run();

export default sequelize;
