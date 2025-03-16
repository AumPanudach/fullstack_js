const { sequelize } = require('../config/database.js');
const User = require('./User');
// Import other models here

// Define model associations here
const initializeModels = async () => {
  // Define associations
  // Example: User.hasMany(Post);

  // Sync all models with the database
  // In development, you might want to use { force: true } to recreate tables
  // In production, use { alter: true } or no options
  const syncOptions = process.env.NODE_ENV === 'production' 
    ? {} 
    : { alter: true };
  
  await sequelize.sync(syncOptions);
  console.log('Database synchronized successfully');
};

module.exports = {
  sequelize,
  User,
  // Export other models
  initializeModels
};
