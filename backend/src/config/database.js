require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'testdb',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
    logging: false,
  }
);

function connectWithRetry(retries = 5, delay = 3000) {
  return new Promise((resolve, reject) => {
    const attemptConnection = (attempt) => {
      sequelize.authenticate()
        .then(() => {
          console.log('Database connected');
          resolve();
        })
        .catch((err) => {
          console.error('Connection failed:', err);
          if (attempt <= 1) {
            reject(err);
          } else {
            console.log(`Retrying in ${delay / 1000}s...`);
            setTimeout(() => attemptConnection(attempt - 1), delay);
          }
        });
    };
    attemptConnection(retries);
  });
}

module.exports = { sequelize, connectWithRetry };