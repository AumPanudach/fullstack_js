const { Category, Product } = require('../models');

const categoryController = {
  getAll: async (req, res, next) => {
    try {
      const categories = await Category.findAll({ include: Product });
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  },
  getById: async (req, res, next) => {
    try {
      const category = await Category.findByPk(req.params.id, { include: Product });
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      const { name } = req.body;
      const newCategory = await Category.create({ name });
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { name } = req.body;
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      await category.update({ name });
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      await category.destroy();
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
};

module.exports = categoryController;