const { User } = require('../models');

// Controller methods for user actions
const userController = {
  // Get all users
  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] }
      });
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },

  // Get user by ID
  getUserById: async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: { exclude: ['password'] }
      });
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },

  // Create new user
  createUser: async (req, res, next) => {
    try {
      const { username, email, password, role } = req.body;
      const newUser = await User.create({
        username,
        email,
        password,
        role
      });
      
      // Remove password from response
      const userData = newUser.toJSON();
      delete userData.password;
      
      res.status(201).json(userData);
    } catch (error) {
      next(error);
    }
  },

  // Update existing user
  updateUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { username, email, password, isActive, role } = req.body;
      
      const user = await User.findByPk(id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      await user.update({
        username: username || user.username,
        email: email || user.email,
        password: password || user.password,
        isActive: isActive !== undefined ? isActive : user.isActive,
        role: role || user.role
      });
      
      // Remove password from response
      const userData = user.toJSON();
      delete userData.password;
      
      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  },

  // Delete user
  deleteUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      await user.destroy();
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
};

module.exports = userController;
