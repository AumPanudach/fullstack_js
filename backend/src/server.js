const app = require('./app');
const { sequelize, connectWithRetry } = require('./config/database');
const { initializeModels } = require('./models');

const PORT = process.env.PORT || 3000;

// Initialize database and start server
async function startServer() {
  try {
    // Connect to database with retry mechanism
    await connectWithRetry();
    
    // Initialize models and sync with database
    await initializeModels();
    
    // Start listening for requests
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
